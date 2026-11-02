# current-engineering-role Specification

## Purpose

Record the 2023 title change on the experience timeline without inventing an employer or changing the introduction.

## Requirements

### Requirement: The newest experience is the 2023 role

The first experience on the timeline SHALL be "Senior Full Stack Engineer (AI Engineer)". Its date SHALL be "2023-Present". Its location SHALL be "Quezon City, Philippines". It SHALL be the only experience whose date includes Present.

#### Scenario: Timeline opens on the new role

- **WHEN** the visitor reads the first experience
- **THEN** the title is "Senior Full Stack Engineer (AI Engineer)", the date is "2023-Present", and the location is "Quezon City, Philippines"

#### Scenario: One current role

- **WHEN** the visitor reads every experience date
- **THEN** only the 2023 role includes Present

### Requirement: The 2022 role ends in 2023

"Senior Software Engineer" SHALL remain on the timeline with the date "2022-2023", the location "Quezon City, Philippines", and its current description. Its technology names SHALL be TypeScript, React, NextJS, Tailwind CSS, GraphQL, NestJS, AWS, Azure DevOps, Stripe, Playwright, TypeORM, and React Aria, in that order.

#### Scenario: The previous role stays

- **WHEN** the visitor reads "Senior Software Engineer"
- **THEN** its date is "2022-2023", its description still says the work is at a property-management technology company, and its technology names are TypeScript, React, NextJS, Tailwind CSS, GraphQL, NestJS, AWS, Azure DevOps, Stripe, Playwright, TypeORM, and React Aria, in that order

#### Scenario: The four AWS services are absent

- **WHEN** the visitor reads "Senior Software Engineer" on the timeline and on its journey stop
- **THEN** neither view shows Amazon S3, Amazon SES, Amazon SQS, or Amazon SNS

### Requirement: The new description adds no employer

The 2023 role's description SHALL say the work is at a property-management technology company and that it is senior full stack work with AI-assisted engineering. It MUST NOT name a different company, a metric, or a tool that is not already on the 2022 role.

#### Scenario: Description stays inside the existing record

- **WHEN** the visitor reads the 2023 role's description
- **THEN** it names the property-management technology company and AI-assisted engineering, and it names no other employer

### Requirement: The new role shows the 2022 technology names

The 2023 role SHALL show these names, in this order: TypeScript, React, NextJS, Tailwind CSS, GraphQL, NestJS, AWS, Azure DevOps, Stripe, Playwright, TypeORM, React Aria. It MUST NOT show Claude Code, Codex, or Cursor. It MUST NOT show Amazon S3, Amazon SES, Amazon SQS, or Amazon SNS.

#### Scenario: Chips match the 2022 role

- **WHEN** the visitor reads the 2023 role on the timeline
- **THEN** the technology names are TypeScript, React, NextJS, Tailwind CSS, GraphQL, NestJS, AWS, Azure DevOps, Stripe, Playwright, TypeORM, and React Aria, in that order

### Requirement: The introduction keeps its current title

The introduction's first role and the public SEO role SHALL remain "Senior Software Engineer". The role loop SHALL show "Senior Software Engineer", "Senior Full Stack Engineer (AI Engineer)", "Senior Lead Software Engineer", and "Senior Front-End Engineer", in that order.

#### Scenario: Hero title is unchanged

- **WHEN** the visitor loads the introduction
- **THEN** the first visible role is "Senior Software Engineer" and the role loop includes "Senior Full Stack Engineer (AI Engineer)"
