# Tasks

## 1. Measure

- [x] 1.1 Add the production-build monitor command for FCP, LCP, CLS, and TTI on the existing mobile and desktop profiles, three runs each. Verify a sample report names all four metrics and both profiles, and that the command does not start `pnpm dev`.
- [x] 1.2 Fail the command when a previously passing budget misses, when FCP, LCP, or TTI regresses by more than 100ms, or when CLS regresses by more than 0.01, using three-run agreement. Verify a fixture or documented dry run shows a failure for a synthetic miss and a `known-miss` result for mobile LCP between 2.5s and 3.50s without checking the LCP checklist item.

## 2. Record

- [x] 2.1 Write the summary into `docs/portfolio-performance.md` and add the job to `ci.yml` on `workflow_dispatch` and `master` pushes. Verify the workflow does not run the lab on every pull request and does not display scores in the page.
