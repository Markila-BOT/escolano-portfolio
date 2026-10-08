#!/bin/sh
set -eu
url=${1:?Pass the production URL}
output=${2:?Pass a unique report directory}
if [ -e "$output" ]; then
  printf '%s\n' "Report directory already exists: $output" >&2
  exit 1
fi
mkdir -p "$output"
export CHROME_PATH=${CHROME_PATH:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}
{
  printf 'URL: %s\n' "$url"
  printf 'UTC timestamp: '; date -u '+%Y-%m-%dT%H:%M:%SZ'
  printf 'Node: '; node --version
  printf 'Lighthouse: 13.5.0\n'
  printf 'Local HEAD: '; git rev-parse HEAD
  printf 'Local checkout build (not necessarily served): '
  if [ -f .next/BUILD_ID ]; then cat .next/BUILD_ID; else printf 'unavailable\n'; fi
  printf '\nWorking directory status:\n'; git status --short
  printf '\nSource hashes:\n'
  rg --files app components context hooks lib | sort | while IFS= read -r source; do shasum -a 256 "$source"; done
} > "$output/identity.txt"
for profile in mobile desktop; do
  for run in 1 2 3; do
    if [ "$profile" = desktop ]; then
      set -- --preset=desktop
    else
      set --
    fi
    pnpm dlx lighthouse@13.5.0 "$url" "$@" --only-categories=performance --output=json --output-path="$output/$profile-$run.json" --chrome-flags='--headless' --quiet
  done
done
