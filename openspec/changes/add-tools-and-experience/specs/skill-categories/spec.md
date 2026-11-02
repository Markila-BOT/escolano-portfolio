# Spec Delta

## MODIFIED Requirements

### Requirement: Tools membership

The Tools group SHALL contain React, Next.js, Node.js, Git, Tailwind, Redux, GraphQL, Nest.js, Express, Framer Motion, Claude Code, Codex, Cursor, AWS, Amazon S3, Amazon SES, Amazon SQS, Amazon SNS, Azure DevOps, and Stripe, in that order, and no other chip.

#### Scenario: Tools chips

- **WHEN** the visitor reads the Tools group
- **THEN** the chips are React, Next.js, Node.js, Git, Tailwind, Redux, GraphQL, Nest.js, Express, Framer Motion, Claude Code, Codex, Cursor, AWS, Amazon S3, Amazon SES, Amazon SQS, Amazon SNS, Azure DevOps, and Stripe, in that order

### Requirement: Same chips, no notes

Every chip that already exists SHALL keep its current label and icon. The only added chips are AWS, Amazon S3, Amazon SES, Amazon SQS, Amazon SNS, Azure DevOps, and Stripe. The section MUST NOT show a one-line note under a chip or a proficiency mark. The section title SHALL stay "My skills".

#### Scenario: No notes or new chips

- **WHEN** the visitor reads the skills section
- **THEN** each chip shows only its icon and label, the title is "My skills", and there is no proficiency mark
