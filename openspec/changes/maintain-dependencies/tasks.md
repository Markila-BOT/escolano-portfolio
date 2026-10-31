# Tasks

## 1. Same-major patches

- [x] 1.1 Run `pnpm audit` and `pnpm outdated`. Apply high and critical fixes that stay on Next 14.2, React 18.3, and Tailwind 3.4. Verify `docs/dependency-maintenance.md` lists any advisory with no same-major fix and that `package.json` majors are unchanged.
- [x] 1.2 Run `pnpm lint`, `pnpm exec tsc --noEmit`, the Node tests, and `pnpm build`. Verify they pass before any major bump. Do not start the dev server.

## 2. Next and React majors

- [x] 2.1 Upgrade Next, React, and React DOM together and update call sites that the new versions reject, including async dynamic APIs where required. Verify the four files named in the spec agree on the new majors and the production build passes.
- [x] 2.2 Move ESLint only if `next lint` on that Next version refuses ESLint 8. Verify `pnpm lint` still passes.

## 3. Tailwind and email

- [x] 3.1 Upgrade Tailwind to 4 and adjust the config so the existing semantic tokens still resolve. Verify both themes build and the UI tests that assert class or token output still pass.
- [x] 3.2 Replace `@react-email/components` and `@react-email/tailwind` with the supported renderer inside the server action. Verify the contact acceptance and rejection tests pass and the old packages are gone from `package.json`.
