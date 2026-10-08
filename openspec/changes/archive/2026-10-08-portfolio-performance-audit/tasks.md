# Tasks

## 1. Repeatable baseline evidence

- [x] 1.1 Add a reproducible pinned audit command/profile and `docs/portfolio-performance.md` documenting browser/tool versions, mobile/desktop CPU/network/viewport settings, cold-cache procedure, three-run sampling, report storage, and target evaluation; verify the documented command produces valid raw reports without adding a production dependency.
- [x] 1.2 Capture unchanged local-production and deployed-site baselines for both profiles, with all run values, median/range, timestamps, source/build identities, FCP/LCP/CLS/TBT and legacy TTI availability; verify raw reports match summaries and explicitly distinguish unknown deployed versions or absent field data. Pause on access/tooling blockers rather than inventing results.

## 2. On-demand video media

- [x] 2.1 Move the sole eager ReactPlayer import behind an open-video-drawer demand boundary using existing Next tooling; add focused regression tests and cold network checks proving initial and image-only views request neither player nor video, while opening a video does; document the actual lazy boundaries and request evidence.
- [x] 2.2 Reserve the 16:9 region, add readable loading/error feedback and screenshot fallback, and reset/stop video on navigation or close; add tests for delayed and failed module/media loads and stale completion, then verify drawer title, neighbor navigation, focus return, existing playback settings and screenshot-only behavior at 320px/desktop in both themes.
- [x] 2.3 Verify readable initial HTML, reduced-motion and sound preferences, existing deferred 3D/Pretext behavior, and video-to-image/rapid-navigation regressions in the production app; record results and verify no real form submission or unauthorized deployment occurs.

## 3. Candidate measurements and checklist reconciliation

- [x] 3.1 Run lint, TypeScript, focused tests, production build and `tests/portfolio-html.py`; capture candidate local audits under the baseline's identical profiles, verify raw reports and compare bundle/request/metric changes without attributing deployed improvements to undeployed code.
- [x] 3.2 Reconcile checklist code-splitting/lazy-loading and stale known-cost notes using verified boundaries; report deployed timing budgets with evidence, retain unmet/unsupported targets as open, explain TTI versus TBT without silently replacing the target, and update progress counts consistently. Verify every completed timing row meets all three deployed runs in both profiles and document follow-up findings outside this change's optimization scope.
