# Tasks

## 1. Decision

- [x] 1.1 Do not add `lib/locale-copy.ts`. The positioning sentence, hiring sentence, nav labels, and section headings stay the English copy already on the page.
- [x] 1.2 Keep the server-rendered document English with `lang="en"`, including when JavaScript is off.

## 2. Control

- [x] 2.1 Do not add a header locale control, a saved locale, or a change to `documentElement.lang`. The greeting advance and the role loop stay as they are.
- [x] 2.2 Do not change the Questions heading for this change. No application code changed, so `pnpm lint` and `pnpm exec tsc --noEmit` were not run. The dev server was not started.
