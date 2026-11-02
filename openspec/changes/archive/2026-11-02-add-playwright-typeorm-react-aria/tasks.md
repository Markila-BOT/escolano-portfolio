# Tasks

## 1. App stack tools in the portfolio records

- [x] 1.1 Add Playwright, TypeORM, and React Aria to the Tools group in `lib/data.ts`, immediately after Stripe, with `VscBeaker`, `SiTypeorm`, and `FaReact`. Give each a factual `note` that names no employer, metric, or personal claim. Append those three labels, in that order, to the technology tags on "Senior Software Engineer" and "Senior Full Stack Engineer (AI Engineer)" only. Insert the three labels on MerchantSpring immediately before Git, after Stripe. Do not add them to another project or experience entry. Update `tests/skill-evidence.test.cjs` so the portfolio count is 32, the three labels are professional, and each lists the two WealthPark-era roles and then MerchantSpring. Update the skill count in `docs/skill-evidence.md`. Verify with `pnpm exec node --test tests/skill-evidence.test.cjs`.
- [x] 1.2 Run `pnpm lint` and `pnpm exec tsc --noEmit`. Do not start the dev server.
- [x] 1.3 If the site is already running, confirm the Tools group ends with Playwright, TypeORM, and React Aria, both WealthPark-era roles show them after Stripe on the timeline, and the TypeORM filter shows only MerchantSpring. Do not start the dev server. If the site is not running, record that this check was skipped.
