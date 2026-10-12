# Design

## Context

See proposal.md for motivation. `scripts/audit-performance.sh` already captures three mobile and three desktop performance-only reports using Lighthouse 13.5.0, storage reset and simulated throttling. `scripts/summarize-main-thread.cjs` validates those reports but its metric map excludes `interactive`; `tests/main-thread-audit.test.cjs` has reusable six-report fixtures and invalid-evidence tests.

Read-only inspection of `docs/performance/lcp-deployed-retest-20261009/` found raw TTI values of 3400.6965, 3360.751 and 3361.2755ms on mobile, and 663.841, 680.880 and 672.333ms on desktop. These stored samples are below the requested threshold but are historical measurements, not proof of current candidate deployment identity. The checklist and `docs/portfolio-performance.md` incorrectly describe the metric as unavailable.

[Chrome's TTI documentation](https://developer.chrome.com/docs/lighthouse/performance/interactive/) labels TTI retired and cautions about variability. Removal from the scored performance metrics does not negate the audit actually present in these pinned JSON files. Preserve the user's chosen legacy budget without recommending it as a field metric.

## Goals / Non-Goals

**Goals:** Extend existing evidence processing with a fail-closed legacy TTI verdict and preserve reproducibility without a second audit toolchain.

**Non-Goals:** Application optimization, new analytics, field responsiveness guarantees, framework/tool version changes, deployment, unrelated checklist corrections or replacement of TTI with TBT/INP. Paint budgets remain independent.

## Decisions

### Reuse the existing pinned collector and raw interactive audit

Add `ttiMs` sourced directly from `audits.interactive.numericValue` to the summary and require a successful numeric audit, finite nonnegative timing and `numericUnit: millisecond`. Preserve existing validation. Extend fixtures with genuine TTI shape rather than deriving it from LCP or TBT. Do not downgrade Lighthouse or build a custom quiet-window calculator: current reports already supply the metric, while either alternative introduces needless compatibility and methodology risk.

### Separate timing extraction from production acceptance

Summaries expose per-profile statistics and per-run strict `<3500` budget outcomes; an over-budget report is valid evidence of failure, not malformed input. Missing or invalid evidence raises a filename-specific error and exits unsuccessfully. A timing pass alone cannot attest deployment identity. The evidence document owns the production verdict and links served identity evidence plus the exact reports; local HEAD/source hashes in `identity.txt` are not proof of the remote build.

Require all six reports to share the same production URL and served deployment, and the existing pinned settings within each profile. Retain browser/capture metadata and reject missing metadata for production acceptance. Confirm production identity from served build/deployment metadata; if unavailable, document unverified status rather than adding a deployment or silently assuming parity. Prefer captured identity evidence over mutating immutable historical reports.

### Correct documentation only from qualified evidence

Create `docs/time-to-interactive.md` with the methodology, raw links, values, gate verdict and identity limitation. Correct the unsupported explanation in `docs/portfolio-performance.md` while retaining historical context. Update only the selected TTI row in `CHECKLIST.MD`, with strict units and dated scope. A failed or unidentified deployment keeps the row unchecked. Reuse stored evidence for extraction regression, then capture fresh production evidence through the existing script in a unique directory during apply; do not overwrite prior runs.

## Risks / Trade-offs

- [TTI is retired and variable] → Pin audit version/settings, retain every run and clearly label lab scope; no field guarantee.
- [Future audit versions omit TTI] → Reject missing evidence explicitly; version changes require a separate methodology decision.
- [Low median conceals a slow run] → Gate each run, including exact 3500ms failure.
- [Local identity mistaken for deployed identity] → Separate recorded local source from independently verified served deployment evidence.
- [Fresh production runs fail] → Keep the checklist open and document failure; propose optimization separately if requested.

## Migration Plan

No deployment is needed for audit tooling and documentation. Implement extraction/tests first, regenerate evidence with the existing collector, then update documentation from the verified verdict. Rollback removes the summary extension and restores the prior documentation without altering raw historical evidence or application behavior.
