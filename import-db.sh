#!/bin/bash
# Import/restore Mazarini PostgreSQL database from a .dump file

DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="mazarini-test"
DB_USER="postgres"

DUMP_FILE="${1:-$(dirname "$0")/../mazarini-dump.dump}"

if [ ! -f "$DUMP_FILE" ]; then
  echo "Error: Dump file not found: ${DUMP_FILE}"
  echo "Usage: ./import-db.sh [path/to/file.dump]"
  exit 1
fi

export PGPASSWORD="postgres"

echo "Importing '${DUMP_FILE}' into database '${DB_NAME}' at ${DB_HOST}:${DB_PORT}..."

pg_restore \
  --host="$DB_HOST" \
  --port="$DB_PORT" \
  --username="$DB_USER" \
  --dbname="$DB_NAME" \
  --clean \
  --if-exists \
  --no-owner \
  --no-privileges \
  "$DUMP_FILE"

if [ $? -eq 0 ]; then
  echo "Import complete."
else
  echo "Error: Import failed."
  exit 1
fi

unset PGPASSWORD
