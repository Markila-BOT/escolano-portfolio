# Spec Delta

## MODIFIED Requirements

### Requirement: Tools membership

The Tools group SHALL contain React, Next.js, Node.js, Git, Tailwind, Redux, GraphQL, Nest.js, Express, Framer Motion, Claude Code, Codex, Cursor, AWS, Azure DevOps, Stripe, Playwright, TypeORM, and React Aria, in that order, and no other chip.

#### Scenario: Tools chips

- **WHEN** the visitor reads the Tools group
- **THEN** the chips are React, Next.js, Node.js, Git, Tailwind, Redux, GraphQL, Nest.js, Express, Framer Motion, Claude Code, Codex, Cursor, AWS, Azure DevOps, Stripe, Playwright, TypeORM, and React Aria, in that order

#### Scenario: The four AWS services are absent

- **WHEN** the visitor reads the Tools group
- **THEN** Amazon S3, Amazon SES, Amazon SQS, and Amazon SNS are not chips

### Requirement: Same chips, no notes

Every chip other than Amazon S3, Amazon SES, Amazon SQS, and Amazon SNS SHALL keep its current label and icon. Those four labels SHALL NOT appear in the skills section. The section MUST NOT add a chip, a one-line note under a chip, or a proficiency mark. The section title SHALL stay "My skills".

#### Scenario: No notes or new chips

- **WHEN** the visitor reads the skills section
- **THEN** each remaining chip shows only its existing icon and label, the title is "My skills", and there is no proficiency mark
