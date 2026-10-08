# Tasks

## 1. Clarify documentation applicability

- [x] 1.1 Update `CHECKLIST.MD` to render server-state fetching as a plain **not applicable** item with the static `lib/data.ts` rationale, and explain in the status key that not-applicable items are excluded from progress; verify the row is neither an unfinished checkbox nor counted as completed.
- [x] 1.2 Reconcile the current-spec progress summary using its existing inventory and gap exclusions, removing the server-state item from the applicable denominator and updating the stale component-inventory score reference; verify done, partial, and not-started counts sum to the applicable total and the percentage agrees.
- [x] 1.3 Align `SPECIFICATION.md` State Management and Data Flow with static TypeScript content imports, explicitly marking server-state fetching not applicable; verify both sections agree with `docs/technology-convention.md` and retain theme, form, and email behavior.

## 2. Verify scope

- [x] 2.1 Review `git diff -- CHECKLIST.MD SPECIFICATION.md` and run `git diff --check`; verify the documentation is consistent and implementation adds no runtime files, dependencies, or fetching infrastructure. No app server or runtime tests are needed for these prose-only edits.
