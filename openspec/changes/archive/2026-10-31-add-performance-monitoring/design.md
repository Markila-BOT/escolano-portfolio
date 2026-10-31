# Design

## Context

`docs/portfolio-performance.md` records pinned Lighthouse 13.5.0 cold mobile and desktop runs. Budgets already in the specs: FCP under 1.5s, LCP under 2.5s, CLS under 0.1, TTI under 3.5s. Mobile LCP was 3.433–3.443s and the checklist item is user-accepted closed as a miss. There is no recurring job.

## Goals / Non-Goals

**Goals:**

- A command that rebuilds and measures both profiles.
- Fail on a new miss or on a regression of more than 100ms for FCP, LCP, or TTI, or more than 0.01 CLS, against the accepted baseline.
- Leave the known mobile LCP miss marked as known, not as a new failure and not as a pass.

**Non-Goals:**

- Field RUM, a visitor-facing score, or closing the LCP checklist item.
- Starting `pnpm dev`.

## Decisions

### Script, then CI

Add `scripts/performance-monitor.md` command notes and a pnpm script only if it can shell out without a new dependency. Prefer the Lighthouse CLI already described in the performance doc. If that CLI is not a repo dependency, document the pinned `npx` invocation rather than adding a second performance library.

Wire the same command into `.github/workflows/ci.yml` when `add-continuous-deployment` has created that file. If the file does not exist yet, add the job in this change so the command is still in git. Do not duplicate a second workflow name if the other change already added `ci.yml`; extend it.

### Known miss

If mobile LCP is above 2.5s and at or below 3.50s, record `known-miss` and exit 0 for that metric. If it exceeds 3.50s, fail. Any other budget that previously passed fails immediately when it misses.

### Output

Write JSON under a gitignored reports path and summarize in the doc. Do not commit multi-megabyte Lighthouse JSON unless the existing doc's pattern already commits a summary table. Update the summary table only.

## Risks / Trade-offs

- Lab variance can false-fail a 100ms margin. Three runs, same as the existing doc, and fail only when all three miss the margin.
- CI minutes. The job can be `workflow_dispatch` plus pushes to `master`, not every pull request, so pull requests stay on the faster checks.
