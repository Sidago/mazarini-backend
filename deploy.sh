#!/usr/bin/env bash
# Deploy the Mazarini Strapi backend together with its own PostgreSQL container.
#
# Usage:
#   ./deploy.sh                    pull latest code, back up DB, rebuild and restart
#   ./deploy.sh --no-pull          same, but skip `git pull`
#   ./deploy.sh --import-shared    also copy the DB from the old shared `postgres` container
#   ./deploy.sh --restore FILE     also restore FILE (pg_dump -Fc) into the DB
#
# Every run takes a backup of the current DB into ./backups before touching anything.

set -Eeuo pipefail

cd "$(dirname "$(readlink -f "$0")")"

DB_CONTAINER="mazarini-postgres"
LEGACY_DB_CONTAINER="mazarini-backend-postgres-1"
SHARED_DB_CONTAINER="${SHARED_DB_CONTAINER:-postgres}"
SHARED_DB_USER="${SHARED_DB_USER:-xcellfund}"
BACKUP_DIR="backups"
KEEP_BACKUPS="${KEEP_BACKUPS:-10}"
TIMESTAMP="$(date +%Y%m%d_%H%M%S)"

# ---------- helpers ----------
log()  { printf '\033[1;34m==>\033[0m %s\n' "$*"; }
ok()   { printf '\033[1;32m ✓\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m !\033[0m %s\n' "$*" >&2; }
die()  { printf '\033[1;31m ✗\033[0m %s\n' "$*" >&2; exit 1; }

env_get() { grep -E "^$1=" .env | tail -n1 | cut -d= -f2- | sed -e 's/^["'\'']//' -e 's/["'\'']$//'; }

is_running() { [ "$(docker inspect -f '{{.State.Running}}' "$1" 2>/dev/null)" = "true" ]; }

table_count() {
  docker exec "$1" psql -U "$2" -d "$3" -tAc \
    "SELECT count(*) FROM information_schema.tables WHERE table_schema = 'public'" 2>/dev/null || echo 0
}

dump_db() { # container user db outfile
  docker exec "$1" pg_dump -U "$2" -d "$3" -Fc --no-owner --no-privileges > "$4" \
    || { rm -f "$4"; die "pg_dump from $1 failed"; }
  [ -s "$4" ] || { rm -f "$4"; die "Backup $4 is empty"; }
  ok "Backup written: $4 ($(du -h "$4" | cut -f1))"
}

wait_for_db() {
  for _ in $(seq 1 60); do
    # TCP check: the init-time temporary server listens on the socket only
    docker exec "$DB_CONTAINER" pg_isready -h 127.0.0.1 -U "$DB_USER" -d "$DB_NAME" -q 2>/dev/null && return 0
    sleep 2
  done
  docker compose logs --tail 40 postgres
  die "PostgreSQL did not become ready"
}

restore_db() { # file
  log "Restoring $1 into $DB_CONTAINER/$DB_NAME"
  # Recreate the DB instead of `pg_restore --clean`: tables that exist only in the
  # current DB would otherwise block dropping the dump's constraints.
  docker exec "$DB_CONTAINER" psql -U "$DB_USER" -d postgres -v ON_ERROR_STOP=1 -q \
    -c "DROP DATABASE IF EXISTS \"$DB_NAME\" WITH (FORCE)" \
    -c "CREATE DATABASE \"$DB_NAME\" OWNER \"$DB_USER\"" \
    || die "Could not recreate database $DB_NAME"
  docker exec -i "$DB_CONTAINER" pg_restore -U "$DB_USER" -d "$DB_NAME" \
    --no-owner --no-privileges < "$1" \
    || warn "pg_restore reported errors (often harmless), verifying tables..."
  local n; n="$(table_count "$DB_CONTAINER" "$DB_USER" "$DB_NAME")"
  [ "$n" -gt 0 ] || die "Restore failed: no tables in $DB_NAME"
  ok "Restore done ($n tables)"
}

# ---------- args ----------
PULL=1
IMPORT_SHARED=0
RESTORE_FILE=""
ARGS=("$@")
while [ $# -gt 0 ]; do
  case "$1" in
    --no-pull)       PULL=0 ;;
    --import-shared) IMPORT_SHARED=1 ;;
    --restore)       RESTORE_FILE="${2:-}"; shift
                     [ -f "$RESTORE_FILE" ] || die "Dump file not found: $RESTORE_FILE" ;;
    -h|--help)       sed -n '2,10p' "$0"; exit 0 ;;
    *)               die "Unknown option: $1 (see --help)" ;;
  esac
  shift
done

# ---------- preflight ----------
command -v docker >/dev/null || die "docker is not installed"
command -v curl >/dev/null || die "curl is not installed"
docker compose version >/dev/null 2>&1 || die "docker compose v2 is required"
[ -f .env ] || die ".env not found in $(pwd)"

DB_NAME="$(env_get DATABASE_NAME)"
DB_USER="$(env_get DATABASE_USERNAME)"
APP_PORT="$(env_get PORT)"; APP_PORT="${APP_PORT:-5001}"
[ -n "$DB_NAME" ] && [ -n "$DB_USER" ] && [ -n "$(env_get DATABASE_PASSWORD)" ] \
  || die "DATABASE_NAME, DATABASE_USERNAME and DATABASE_PASSWORD must be set in .env"

mkdir -p "$BACKUP_DIR"

# ---------- 1. pull ----------
if [ "$PULL" -eq 1 ]; then
  log "Pulling latest code"
  before="$(sha1sum "$0" | cut -d' ' -f1)"
  git pull --no-rebase --no-edit || die "git pull failed — resolve it, then rerun with --no-pull"
  if [ "$(sha1sum "$0" | cut -d' ' -f1)" != "$before" ]; then
    log "deploy.sh changed, restarting with the new version"
    exec bash "$0" --no-pull "${ARGS[@]}"
  fi
fi

# ---------- 2. backup current DB ----------
CURRENT_DB=""
if is_running "$DB_CONTAINER"; then CURRENT_DB="$DB_CONTAINER"
elif is_running "$LEGACY_DB_CONTAINER"; then CURRENT_DB="$LEGACY_DB_CONTAINER"
fi

PRE_BACKUP=""
if [ -n "$CURRENT_DB" ] && [ "$(table_count "$CURRENT_DB" "$DB_USER" "$DB_NAME")" -gt 0 ]; then
  log "Backing up current DB ($CURRENT_DB)"
  PRE_BACKUP="$BACKUP_DIR/pre-deploy-$TIMESTAMP.dump"
  dump_db "$CURRENT_DB" "$DB_USER" "$DB_NAME" "$PRE_BACKUP"
else
  warn "No running Mazarini DB with data found — skipping pre-deploy backup"
fi

# ---------- 3. optional: export from the old shared postgres ----------
if [ "$IMPORT_SHARED" -eq 1 ]; then
  is_running "$SHARED_DB_CONTAINER" || die "Shared DB container '$SHARED_DB_CONTAINER' is not running (docker start $SHARED_DB_CONTAINER)"
  log "Exporting $DB_NAME from shared container '$SHARED_DB_CONTAINER'"
  RESTORE_FILE="$BACKUP_DIR/shared-import-$TIMESTAMP.dump"
  dump_db "$SHARED_DB_CONTAINER" "$SHARED_DB_USER" "$DB_NAME" "$RESTORE_FILE"
fi

# ---------- 4. database container ----------
log "Stopping Strapi"
docker compose stop strapi >/dev/null 2>&1 || true

log "Starting $DB_CONTAINER"
docker compose up -d postgres
wait_for_db
ok "PostgreSQL is ready"

if [ -n "$RESTORE_FILE" ]; then
  restore_db "$RESTORE_FILE"
elif [ "$(table_count "$DB_CONTAINER" "$DB_USER" "$DB_NAME")" -eq 0 ] && [ -n "$PRE_BACKUP" ]; then
  # DB came up empty (e.g. container/volume was recreated) — bring the data back
  warn "Database is empty after recreate, restoring the pre-deploy backup"
  restore_db "$PRE_BACKUP"
fi

# ---------- 5. build & start Strapi ----------
log "Building and starting Strapi"
docker compose up -d --build --remove-orphans strapi

log "Waiting for Strapi on port $APP_PORT"
for i in $(seq 1 90); do
  if curl -fs -o /dev/null "http://127.0.0.1:$APP_PORT/_health"; then
    ok "Strapi is up"
    break
  fi
  if [ "$(docker inspect -f '{{.RestartCount}}' mazarini-strapi 2>/dev/null || echo 0)" -gt 0 ]; then
    docker compose logs --tail 80 strapi
    die "Strapi crashed on startup (see logs above) — DB backup is in $BACKUP_DIR"
  fi
  if [ "$i" -eq 90 ]; then
    docker compose logs --tail 60 strapi
    die "Strapi did not become healthy — DB backup is in $BACKUP_DIR"
  fi
  sleep 2
done

# ---------- 6. cleanup ----------
log "Keeping the newest $KEEP_BACKUPS backups"
ls -1t "$BACKUP_DIR"/*.dump 2>/dev/null | tail -n +"$((KEEP_BACKUPS + 1))" | xargs -r rm -f --
docker image prune -f >/dev/null

echo
docker compose ps
echo
ok "Deployment finished"
