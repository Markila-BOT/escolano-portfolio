# Proposal

## Why

The checklist treats server-state fetching as unfinished even though portfolio content is intentionally static in `lib/data.ts`. The user confirmed this item should be not applicable; documenting that decision removes a misleading implementation expectation.

## What Changes

- Mark server-state data fetching explicitly **not applicable** in `CHECKLIST.MD`, with the static-content rationale and a status-key explanation.
- Exclude this item from applicable progress totals without counting it as completed; reconcile the summary against its counted rows and update affected stale score references.
- Align the state-management and server-side data-fetching wording in `SPECIFICATION.md` with the static-content boundary in `docs/technology-convention.md`.

## Capabilities

### New Capabilities

None. This is a documentation correction; `.openspec.yaml` declares `skip_specs: true`.

### Modified Capabilities

None. Existing application behavior and OpenSpec requirements remain unchanged.

## Impact

Implementation touches `CHECKLIST.MD` and `SPECIFICATION.md` only. No runtime changes, dependencies, API endpoints, or content migration are needed. The existing technology convention remains authoritative for static portfolio copy.
