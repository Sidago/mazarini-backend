#!/bin/bash
# Export Mazarini PostgreSQL database (schema + data) to a .dump file

DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="mazarini"
DB_USER="postgres"

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
OUTPUT_FILE="$(dirname "$0")/database-export_${TIMESTAMP}.dump"

export PGPASSWORD="postgres"

echo "Exporting database '${DB_NAME}' from ${DB_HOST}:${DB_PORT}..."

pg_dump \
  --host="$DB_HOST" \
  --port="$DB_PORT" \
  --username="$DB_USER" \
  --format=custom \
  --no-owner \
  --no-privileges \
  "$DB_NAME" > "$OUTPUT_FILE"

if [ $? -eq 0 ]; then
  SIZE=$(du -h "$OUTPUT_FILE" | cut -f1)
  echo "Export complete: ${OUTPUT_FILE} (${SIZE})"
else
  echo "Error: Export failed"
  rm -f "$OUTPUT_FILE"
  exit 1
fi

unset PGPASSWORD
