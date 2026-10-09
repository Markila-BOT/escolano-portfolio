# Tasks

## 1. Isolated production measurement

- [x] 1.1 Create an isolated current-source production snapshot without private environment files, reuse installed dependencies and build/start on a separate available port. Verify relevant source/config/lockfile hashes match the checkout, production HTML passes the existing regression check, and the user's port-3000 process and original build directory remain untouched; document served build identity and limitations.
- [x] 1.2 Capture three sequential cold mobile and desktop reports using the existing pinned script into a unique main-thread report directory. Verify each report has valid metrics, matching intended profiles, no runtime errors and production rather than development resources; save actual served snapshot identity alongside raw reports and stop on invalid evidence.

## 2. Analysis and handoff

- [x] 2.1 Produce a reproducible built-in Node/Python summary of all run values, median/range, category durations, top script CPU costs and initial JavaScript transfer bytes, plus TBT/FCP/LCP/CLS. Add focused tests for missing reports, runtime errors, missing metrics and summary calculations; verify the generated values agree with raw JSON and document methodology in docs/main-thread-audit.md.
- [x] 2.2 Record a scoped no-refactor recommendation if all six reports have no main-thread warning, or evidence-backed attribution and a separate optimization recommendation if warnings reproduce; explain inconsistent results without inventing a pass. Verify no components/dependencies or existing timing claims were changed, provide a manual post-deployment retest command with identity caveats, save evidence, and clean up only the temporary production process/snapshot while confirming dev remains available. Do not push or deploy.
