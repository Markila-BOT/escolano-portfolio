# Tasks

## 1. TTI extraction and validation

- [x] 1.1 Extend `scripts/summarize-main-thread.cjs` with validated `ttiMs` extraction and separate per-run below-3500ms outcomes plus profile statistics; verify the six stored `lcp-deployed-retest-20261009` values match raw interactive audits and existing metric outputs remain unchanged.
- [x] 1.2 Extend `tests/main-thread-audit.test.cjs` fixtures and tests for missing/errored TTI, invalid numeric values, wrong units, independence from TBT/LCP and strict 3499/3500/3501ms boundaries; verify `node --test tests/main-thread-audit.test.cjs` passes, including existing contamination/profile checks and a low-median failing-run case.
- [x] 1.3 Document extraction source, pinned profiles, strict all-run gate and retired-metric limitations in `docs/time-to-interactive.md`; verify its documented summary command works on stored reports and historical timing is not presented as current production acceptance.

## 2. Production evidence and checklist decision

- [x] 2.1 Capture served deployment/build identity evidence and six fresh cold production reports using `scripts/audit-performance.sh` in a new unique evidence directory; verify version, settings, URL consistency, browser/capture metadata, warnings and runtime errors with the summary and link identity evidence, explicitly recording any unavailable identity as unverified rather than inferring it from local HEAD.
- [x] 2.2 Add raw-report links, every TTI value, profile median/range and the qualified pass/fail/unverified verdict to `docs/time-to-interactive.md`; verify all six comparisons against 3500ms and keep failed measurements distinct from invalid evidence and unrelated paint budgets.
- [x] 2.3 Correct the unsupported-TTI claim in `docs/portfolio-performance.md` and only the selected TTI row in `CHECKLIST.MD`; verify the checkbox is complete only for six passing valid runs with served identity, otherwise retain an unchecked dated explanation, and confirm no unrelated checklist rows or application files change.

## 3. Integration review

- [x] 3.1 Run `node --test tests/*.test.cjs`, applicable Prettier checks and `git diff --check`; verify all pass and review the final evidence/spec alignment without deploying or modifying application behavior.
