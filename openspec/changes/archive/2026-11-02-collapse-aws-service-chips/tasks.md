# Tasks

## 1. Collapse the four AWS service chips

- [x] 1.1 Remove Amazon S3, Amazon SES, Amazon SQS, and Amazon SNS from the Tools group in `lib/data.ts`, and remove those four strings from the technology tags on "Senior Software Engineer" and "Senior Full Stack Engineer (AI Engineer)". Keep the AWS chip, its `FaAws` icon, and its note. Keep Azure DevOps, Stripe, Playwright, TypeORM, React Aria, and every other chip and tag. Do not edit MerchantSpring or any role description. In `tests/skill-evidence.test.cjs`, set the portfolio count to 28, drop the four labels from `professional`, and remove them from the roles-only loop. Leave Azure DevOps in that loop, and leave AWS in the loop that expects the two WealthPark-era roles and then MerchantSpring. In `docs/skill-evidence.md`, remove the four service names from the evidence sentence and set the skill count to 28. Verify with `pnpm exec node --test tests/skill-evidence.test.cjs`.
- [x] 1.2 Run `pnpm lint` and `pnpm exec tsc --noEmit`. Do not start the dev server.
- [x] 1.3 If the site is already running, confirm the Tools group goes from Cursor to AWS, then Azure DevOps, Stripe, Playwright, TypeORM, and React Aria, with Amazon S3, Amazon SES, Amazon SQS, and Amazon SNS absent. Confirm both WealthPark-era roles show AWS immediately after NestJS and do not show those four names on the timeline. Confirm the AWS filter still shows only MerchantSpring. Do not start the dev server. If the site is not running, record that this check was skipped.

## Workflow follow-up

- Archive `add-tools-and-experience` and `add-playwright-typeorm-react-aria` before this change. Their deltas still name the four services, so archiving them afterward would put the chips back.
- Archive this change with `/opsx-archive` after its tasks are complete.
