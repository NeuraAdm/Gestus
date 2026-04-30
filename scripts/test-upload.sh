#!/usr/bin/env bash
set -euo pipefail

# Usage:
#  ./scripts/test-upload.sh [ENDPOINT] [FILE]
# If ENDPOINT is not provided the script will read VITE_R2_SIGN_ENDPOINT from the environment.
# If FILE is not provided the script will create a small temporary file to upload.

ENDPOINT="${1:-${VITE_R2_SIGN_ENDPOINT:-}}"
if [ -z "$ENDPOINT" ]; then
  echo "Error: endpoint not provided. Usage: $0 [ENDPOINT] [FILE]"
  exit 1
fi

# Normalize endpoint (remove trailing slash)
ENDPOINT="${ENDPOINT%/}"

FILE="${2:-}" 
TMP_FILE="/tmp/test-upload-$$.jpg"
CLEAN_TMP=false

if [ -z "$FILE" ]; then
  printf "x" > "$TMP_FILE"
  FILE="$TMP_FILE"
  CLEAN_TMP=true
fi

if [ ! -f "$FILE" ]; then
  echo "Error: file not found: $FILE"
  exit 1
fi

echo "Uploading $FILE to $ENDPOINT"

curl -i -X POST "$ENDPOINT" \
  -F "file=@${FILE};type=image/jpeg" \
  -F "slug=mi-slug" \
  -F "role=gallery" \
  -F "index=1"

if [ "$CLEAN_TMP" = true ]; then
  rm -f "$TMP_FILE"
fi
