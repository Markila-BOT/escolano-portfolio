# Tasks

## 1. Current LCP attribution

- [x] 1.1 Capture fresh deployed and isolated local production baselines with the existing pinned audit tooling, three cold runs each for mobile/desktop, and unique raw-report directories. Record served build/source identity or explicit unknowns, settings/browser versions, all LCP/FCP/CLS/TBT values and LCP node/observed breakdown in docs/mobile-lcp-optimization.md; verify reports are valid production captures and do not overwrite earlier evidence or modify the active development build.
- [x] 1.2 Attribute the current hero LCP dependency using actual RoleTitleLoop server HTML, hydration visibility, font delivery and critical-path diagnostics. Reuse existing summarization; if missing attribution requires a small extension, add fixture tests for valid/missing evidence. Verify diagnostic assertions/tests and document the selected narrow rendering/font intervention or why existing visibility already passes; stop for revised scope if evidence requires broader changes.

## 2. Initial hero paint

- [x] 2.1 Ensure the first role and hero copy are visible in initial HTML and throughout hydration, changing only an evidenced initial-render dependency; retain ordered later transitions and reserved geometry. Add focused Node SSR/behavior tests and production HTML visibility assertions, run them, and document the implementation or evidence-backed preservation of already-correct behavior in docs/mobile-lcp-optimization.md.

## 3. Trace-backed critical-path optimization

- [x] 3.1 Capture trace/network artifacts from fresh isolated production loads using pinned Lighthouse artifact support, serial runs and unchanged acceptance profiles. Correlate LCP candidate timestamps and simulation dependencies with font/CSS discovery, hydration/main-thread work and role-transition timing; keep diagnostic controls separate from acceptance. Add diagnostic fixture tests for missing/malformed attribution and observed/simulated separation where tooling is extended, verify them, and document raw artifacts, served identities, limitations and a falsifiable bottleneck hypothesis in docs/mobile-lcp-optimization.md.
- [x] 3.2 Run controlled isolated experiments against the attributed critical-path dependency, including font/CSS, provider/hydration or below-fold scheduling/loading only when supported by traces. Verify the predicted request/task/paint change with matched serial measurements, add focused regression tests and documentation for each retained intervention, and discard inconclusive variants. Preserve existing libraries, visual design, content, title cadence/cycling, server rendering and Contact contracts; pause for approval if a fix requires changing those boundaries.
- [ ] 3.3 Complete browser acceptance for the retained candidate or verified unchanged behavior: first-title/no-script readability, delayed hydration, full cycle, reduced motion, hidden-document/greeting pause and resume, Contact access and stable layout at 320px/desktop in both themes. Record browser evidence and test results in docs/mobile-lcp-optimization.md; do not silently substitute unit tests for unavailable browser checks.

## 4. Production comparison

- [x] 4.1 Run all existing Node tests, pnpm lint, formatting, production/type build and HTML checks. Capture equivalent isolated baseline/candidate sets serially and compare all six reports per set, retaining values/median/range and LCP attribution. Verify attributable reproducible mobile LCP median improvement beyond baseline variation, no FCP/CLS budget regression and preserved desktop behavior; repeat ambiguous matched comparisons, document results and leave speculative edits out if evidence is inconclusive.

## 5. Deployed acceptance

- [ ] 5.1 After the user deploys the candidate and its identity is confirmed, capture three fresh deployed mobile and three desktop production audits with matching settings. Verify every run has LCP <2500ms, FCP <1500ms and CLS <0.1 before completing the LCP checklist row and recalculating totals; record raw reports and lab-only limitations. Keep this task and checklist pending if deployment, identity, valid measurements or any budget remains unresolved; do not archive as complete.
