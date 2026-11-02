# Proposal

## Why

Amazon S3, Amazon SES, Amazon SQS, and Amazon SNS are separate Tools chips that all use the AWS mark. The skills row already has an AWS chip, so the four service chips add length without a label a visitor can tell apart from AWS.

## What Changes

- Remove Amazon S3, Amazon SES, Amazon SQS, and Amazon SNS from the Tools group.
- Remove those four labels from the technology names on "Senior Software Engineer" and "Senior Full Stack Engineer (AI Engineer)".
- Keep the AWS chip, its current icon, and its current evidence: those two roles, then MerchantSpring.
- Keep Azure DevOps, Stripe, Playwright, TypeORM, React Aria, and every other existing chip.
- The skill count goes from 32 to 28.
- Do not add the four service names to the AWS note, to a project, or to any other experience entry.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `skill-categories`: Tools membership drops Amazon S3, Amazon SES, Amazon SQS, and Amazon SNS. AWS stays after Cursor. Azure DevOps, Stripe, Playwright, TypeORM, and React Aria stay after AWS.
- `skills-ai-tools`: The chips that remain keep their labels. HTML stays first. Framer Motion stays immediately before Claude Code. AWS stays immediately after Cursor. React Aria stays immediately before the databases.
- `current-engineering-role`: Both WealthPark-era roles drop the four service names. Their remaining technology names stay in the current order, and the descriptions stay unchanged.

## Impact

- `lib/data.ts`: four Tools entries and eight role-tag strings (four on each of the two roles).
- `tests/skill-evidence.test.cjs`: portfolio count and the professional-source assertions for the removed labels.
- `docs/skill-evidence.md`: the sentence that lists the four services, and the skill count.
- No dependency change. The project filter does not change, because none of the four labels is a project tag.
