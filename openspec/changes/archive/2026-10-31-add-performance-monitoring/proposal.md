# Proposal

## Why

Paint and interactivity budgets were measured in a one-off lab on 2026-10-09. Nothing reruns them when the site changes. Mobile LCP is still over 2.5s and that checklist row stays user-accepted closed as a miss; a monitor must not quietly mark it passed.

## What Changes

- Add a repeatable production-build lab check for FCP, LCP, CLS, and TTI, using the budgets already recorded in the checklist and in `hero-initial-paint` and `interactive-readiness`.
- Compare each run with the last accepted baseline in `docs/portfolio-performance.md`. Fail the check when a budget that previously passed now misses, or when a result regresses past that baseline by the margin in the design.
- Keep the known mobile LCP miss visible. The monitor must not complete the LCP checklist item.
- Store the report as a CI artifact. Do not show lab numbers to visitors and do not add a real-user monitoring vendor.

## Capabilities

### New Capabilities

- `performance-monitoring`: A repeatable lab check that reports the four budgets and refuses to close the known mobile LCP gap.

### Modified Capabilities

None. Existing paint and time-to-interactive specs remain the acceptance gates. This change adds the recurring check, not a new budget.

## Impact

A GitHub Actions job, or a documented pnpm script if Actions cannot run the pinned Lighthouse profile. Depends on the workflow from `add-continuous-deployment` when that change is applied; until then the script must be runnable locally with `pnpm`. No change to the hero render path. Do not start the dev server.
