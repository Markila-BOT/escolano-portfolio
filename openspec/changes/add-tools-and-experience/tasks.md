# Tasks

## 1. Platform tools in the portfolio records

- [x] 1.1 Add AWS, Amazon S3, Amazon SES, Amazon SQS, Amazon SNS, Azure DevOps, and Stripe to the Tools group in `lib/data.ts`, immediately after Cursor, with `FaAws`, `FaAws`, `FaAws`, `FaAws`, `FaAws`, `VscAzureDevops`, and `SiStripe`. Give each a factual `note` that names no employer, metric, or personal claim. Append those seven labels, in that order, to the technology tags on "Senior Software Engineer" and "Senior Full Stack Engineer (AI Engineer)" only. Insert AWS and Stripe on MerchantSpring immediately before Git. Do not add the four services or Azure DevOps to MerchantSpring, and do not add any of the seven labels to another project or experience entry. Update `tests/skill-evidence.test.cjs` so the portfolio count is 29, the seven labels are professional, Amazon S3 lists only the two WealthPark-era roles, and Stripe lists those two roles and then MerchantSpring. Update the skill count in `docs/skill-evidence.md`. Verify with `pnpm exec node --test tests/skill-evidence.test.cjs`.
- [x] 1.2 Run `pnpm lint` and `pnpm exec tsc --noEmit`. Do not start the dev server.
- [x] 1.3 If the site is already running, confirm the Tools group ends with those seven chips, both WealthPark-era roles show them after NestJS on the timeline and on the journey stop, the Stripe filter shows only MerchantSpring, and Amazon S3 is not a filter option. Do not start the dev server. If the site is not running, record that this check was skipped.

Browser check skipped: nothing was listening on port 3000, and the dev server was not started.
