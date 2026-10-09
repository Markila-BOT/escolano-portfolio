# Proposal

## Why

The reported main-thread warning was obtained from a local server confirmed to run `pnpm dev`, so it cannot establish a production JavaScript problem. Recent production reports show mobile main-thread work of 851–1129ms and TBT of 0–2ms; a fresh, isolated production audit should determine whether optimization is actually needed before changing features.

## What Changes

- Audit the current working-tree production build without interrupting port 3000 or overwriting its development build output.
- Summarize main-thread categories, script attribution, initial JavaScript payload and TBT alongside FCP/LCP/CLS from three cold mobile and desktop runs.
- Deliver a findings document with a clear decision: no main-thread change needed, or a separately proposed targeted optimization supported by repeated production evidence.
- Document how to repeat the audit against the public URL after the user pushes and deploys. That deployment and later retest are not automatically performed here.

## Capabilities

### New Capabilities

None. This is diagnostic tooling/documentation work, not a visitor behavior change; specs are explicitly skipped.

### Modified Capabilities

None. Existing media-demand, portrait, interaction and server-rendered content contracts remain unchanged.

## Impact

Uses existing pinned Lighthouse tooling, an isolated temporary production snapshot, raw reports and `docs/main-thread-audit.md`. No component changes, dependency updates, commits, pushes or deployment. If profiling establishes a production issue, report the attribution and seek a separate optimization decision instead of silently extending this change.
