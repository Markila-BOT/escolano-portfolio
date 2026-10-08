# Tasks

## 1. Hiring copy and existing contact path

- [x] 1.1 Add shared hiring/contact data in `lib/data.ts` and render the approved full-time, contract/freelance, remote-or-Philippines copy in Intro and Contact; extend `tests/portfolio-html.py` to assert the text within both sections and verify it passes against production HTML without relying on scripts.
- [x] 1.2 Use the shared public email in Contact's displayed text and mailto destination while preserving the existing intro Contact link, positioning sentence, form, and CV; add HTML assertions for the exact email destination and single intro CTA, and verify server email configuration is unchanged.
- [x] 1.3 Document the hiring copy source, intentional public/form mailbox distinction, and regression steps in `docs/hiring-path.md`; verify it matches the rendered content and no immediate-start or response-time promise is added.

## 2. Integration and completion

- [x] 2.1 Verify at 320px and desktop widths in both themes, including keyboard focus/activation of Contact and email links, readable static copy with JavaScript disabled, and no overflow; record observed results in `docs/hiring-path.md` without sending email or starting `pnpm dev`.
- [x] 2.2 Run `pnpm lint`, `pnpm exec tsc --noEmit`, production build, and the updated production HTML checks; record results, then mark the hiring-path checklist row complete and update its progress totals consistently.
