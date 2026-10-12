# Proposal

## Why

The TTI checklist remains unverified because documentation says Lighthouse 13.5.0 does not report it, but the stored production JSON contains `audits.interactive.numericValue`. The existing summary omits that audit, preventing an explicit, reproducible decision against the preserved TTI <3.5s target.

## What Changes

- Extract and validate legacy TTI from the existing pinned Lighthouse JSON, separately from TBT, and report each run plus median and range.
- Define a strict below-3500ms gate across three valid cold mobile and three valid cold desktop runs against one identified production deployment.
- Add regression coverage for absent, invalid, errored and boundary-valued TTI evidence without weakening current audit checks.
- Correct the unsupported-metric explanation in performance documentation and the selected checklist row during implementation; complete that row only with qualifying evidence.
- Keep historical measurements distinct from current deployment acceptance and retain every unrelated performance gate.

## Capabilities

### New Capabilities

- `interactive-readiness`: Reproducible legacy TTI lab evidence and truthful checklist acceptance for production initial loading.

### Modified Capabilities

None. The existing hero-initial-paint requirements remain unchanged.

## Impact

Affected implementation targets are `scripts/summarize-main-thread.cjs`, `tests/main-thread-audit.test.cjs`, `docs/portfolio-performance.md`, `CHECKLIST.MD` and a focused TTI evidence document/report summary. Reuse `scripts/audit-performance.sh` and Lighthouse 13.5.0; no application behavior, framework upgrade, dependency addition, deployment or production optimization is proposed. A failing measurement remains an open requirement rather than authorizing an unplanned code change.
