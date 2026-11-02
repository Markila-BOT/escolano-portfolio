# Spec Delta

## MODIFIED Requirements

### Requirement: The 2022 role ends in 2023

"Senior Software Engineer" SHALL remain on the timeline with the date "2022-2023", the location "Quezon City, Philippines", and its current description. Its technology names SHALL be TypeScript, React, NextJS, Tailwind CSS, GraphQL, NestJS, AWS, Azure DevOps, Stripe, Playwright, TypeORM, and React Aria, in that order.

#### Scenario: The previous role stays

- **WHEN** the visitor reads "Senior Software Engineer"
- **THEN** its date is "2022-2023", its description still says the work is at a property-management technology company, and its technology names are TypeScript, React, NextJS, Tailwind CSS, GraphQL, NestJS, AWS, Azure DevOps, Stripe, Playwright, TypeORM, and React Aria, in that order

#### Scenario: The four AWS services are absent

- **WHEN** the visitor reads "Senior Software Engineer" on the timeline and on its journey stop
- **THEN** neither view shows Amazon S3, Amazon SES, Amazon SQS, or Amazon SNS

### Requirement: The new role shows the 2022 technology names

The 2023 role SHALL show these names, in this order: TypeScript, React, NextJS, Tailwind CSS, GraphQL, NestJS, AWS, Azure DevOps, Stripe, Playwright, TypeORM, React Aria. It MUST NOT show Claude Code, Codex, or Cursor. It MUST NOT show Amazon S3, Amazon SES, Amazon SQS, or Amazon SNS.

#### Scenario: Chips match the 2022 role

- **WHEN** the visitor reads the 2023 role on the timeline
- **THEN** the technology names are TypeScript, React, NextJS, Tailwind CSS, GraphQL, NestJS, AWS, Azure DevOps, Stripe, Playwright, TypeORM, and React Aria, in that order
