#!/bin/sh
set -eu

# Production build only. Do not start the dev server.
stamp=$(date -u '+%Y%m%dT%H%M%SZ')
output=${1:-.performance-reports/$stamp}
url=http://127.0.0.1:3100/
mkdir -p "$(dirname "$output")"

pnpm build
pnpm start --hostname 127.0.0.1 --port 3100 &
server=$!
cleanup() {
  kill "$server" 2>/dev/null || true
}
trap cleanup EXIT

ready=0
i=0
while [ "$i" -lt 60 ]; do
  if curl -sf -o /dev/null "$url"; then
    ready=1
    break
  fi
  i=$((i + 1))
  sleep 1
done
if [ "$ready" -ne 1 ]; then
  printf '%s\n' "Production server did not respond on port 3100" >&2
  exit 1
fi

sh scripts/audit-performance.sh "$url" "$output"
node scripts/evaluate-performance-monitor.cjs "$output"
