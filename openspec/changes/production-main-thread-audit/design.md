# Design

## Context

See proposal.md. Port 3000 is the user's Next 14 development server, confirmed through its process command. Existing production evidence is in `docs/performance/portrait-candidate/`: mobile main-thread work 1129.364, 850.920, 936.384ms with TBT 2, 0, 0ms. Script evaluation accounts for 278–379ms and parsing/compilation 56–58ms; style/layout and other categories also contribute. Initial JS is 249kB from the prior build, not a fresh measurement. React/shared chunk attribution does not by itself establish a specific library as the cause.

Existing `scripts/audit-performance.sh` pins Lighthouse 13.5.0 and runs three cold mobile/desktop profiles with identity/source hashes. It does not prevent auditing a development URL. The latest source already defers project videos, 3D and Pretext; blindly splitting them again cannot address this warning.

## Goals / Non-Goals

**Goals:** Correct the measurement environment, separate CPU categories from TBT, and produce a justified next-step decision.

**Non-Goals:** Refactor animations, replace timeline/UI libraries, change features, upgrade dependencies, fix image/LCP warnings, add workers, alter the dev server or automatically push/deploy/retest later.

## Decisions

1. Create a temporary production snapshot of current source/config/assets and lockfile, including relevant uncommitted/untracked application files. Exclude `.next`, `.git`, existing reports and private environment files. Reuse installed dependencies without changing the original checkout. Build/start within that snapshot on an available separate port; never run a build against the dev checkout's `.next`. Verify source hashes match and that production scripts run. The contact action must remain non-submitted; missing production-only secrets are a blocker to report, not a reason to copy credentials indiscriminately.
2. Run the existing pinned audit command against the production root URL, not the `#projects` fragment. The fragment changes initial scroll position and is not the standard load baseline; document this distinction. Persist unique raw reports under `docs/performance/main-thread-production/`. If running the audit script from the original checkout for Git metadata, separately record the isolated snapshot's actual BUILD_ID and source hashes so a stale original `.next/BUILD_ID` is not presented as the served build identity. Avoid concurrent builds/audits and minimize unrelated machine work; note that the user's dev process remains running as a background limitation.
3. Summarize all run values, median/range, category durations, top script costs and transferred JS. Report Lighthouse's own main-thread diagnostic verdict and TBT separately. The referenced Chrome documentation describes a 4-second main-thread warning threshold; confirm the pinned tool's actual score/verdict rather than assuming that threshold equals a TBT limit. No production warning in all six valid runs supports no main-thread refactor for this finding, not a claim that the whole page is optimized. A repeated warning warrants trace/module attribution and a separate targeted proposal. Inconsistent runs warrant explanation/repetition, not a passing claim.
4. Use existing JSON reports and built-in Node/Python for a reproducible summary with validation of missing/error reports. No dependency or production code changes are necessary. Include a handoff command and unique report path for the deployed URL after the user reports deployment; record deployed identity where available, otherwise unknown, and compare equivalent profiles without asserting local/deployed source parity.

## Risks / Trade-offs

- Snapshot omits a needed file or drifts during editing → compare hashes and stop on mismatches before measuring.
- Shared system workload skews CPU samples → use sequential runs, retain all values and record environmental limitations.
- Healthy TBT does not imply cheap rendering or fast LCP → report separate metrics and preserve existing unmet budgets.
- Shared bundles obscure ownership → attribute through specific bundle/trace evidence only when a production issue reproduces; never remove libraries based only on size.

## Migration Plan

No deployment or runtime migration. Deliver reports and diagnostic documentation, stop the temporary server and remove only the agent-created snapshot after evidence is saved. Keep the user's dev process untouched. User pushes/deploys independently; deployed retesting requires a later explicit request.

## References

[Chrome main-thread audit guidance](https://developer.chrome.com/docs/lighthouse/performance/mainthread-work-breakdown/) separates script evaluation, parsing, rendering and other CPU work. Existing local report data is the project-specific evidence; the guide is not proof that this portfolio has a production problem.
