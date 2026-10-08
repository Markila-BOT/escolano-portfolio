# Hiring path

`hiringContact` in `lib/data.ts` owns the shared hiring preferences and public email. Intro and Contact display: "Open to full-time roles and contract/freelance work, remote or based in the Philippines."

The introduction keeps its existing positioning sentence and single Contact link. Contact keeps the existing form and CV control, with a direct `mailto:mark.escolano14@gmail.com` link. The public mailbox intentionally differs from the server-configured form recipient; this change does not alter Resend configuration. No start date, response deadline, or overseas relocation is promised.

## Regression checks

- Run `pnpm build` and `python3 tests/portfolio-html.py .next/server/app/index.html`. Assertions check static hiring text within both sections, one intro CTA, and the public mailto destination.
- Run `pnpm lint` and `pnpm exec tsc --noEmit`.
- On the production app, check 320px and desktop widths in both themes: text wraps without overflow; keyboard focus is visible on Contact and email links; Contact reaches the existing form.
- Disable JavaScript and confirm both sections still show preferences and public email. Email activation must target the public mailbox; no email needs to be sent.

## Verification results

Lint, TypeScript, production build, and production HTML assertions passed. Static HTML parsing ignores scripts and verifies the complete hiring text in both sections, the single introduction CTA, and public email destination.

Production-browser checks passed at 320px and 1440px in light and dark themes with no horizontal page overflow. Intro Contact activated with Enter and reached `#contact`. Shift+Tab from the email input reached the public email link with a visible native outline; Enter activation retained the correct mailto target. No email was sent. The owner confirmed the remaining JavaScript-disabled browser verification on 2026-10-08; this is owner-reported verification, separate from the automated static-HTML checks.
