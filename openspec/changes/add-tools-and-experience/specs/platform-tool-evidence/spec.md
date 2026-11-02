# Spec Delta

## Purpose

Records AWS, Amazon S3, Amazon SES, Amazon SQS, Amazon SNS, Azure DevOps, and Stripe on the WealthPark-era roles, and links AWS and Stripe through MerchantSpring.

## ADDED Requirements

### Requirement: Both WealthPark-era roles list the platform tools

"Senior Software Engineer" and "Senior Full Stack Engineer (AI Engineer)" SHALL show these names after NestJS, in this order: AWS, Amazon S3, Amazon SES, Amazon SQS, Amazon SNS, Azure DevOps, Stripe. The names before those SHALL stay TypeScript, React, NextJS, Tailwind CSS, GraphQL, and NestJS.

#### Scenario: Timeline and journey agree

- **WHEN** the visitor reads either role on the timeline and then on its journey stop
- **THEN** both views show those seven names after NestJS, in that order, and the names before NestJS are unchanged

### Requirement: Other experience entries omit these tools

No experience entry other than those two SHALL show AWS, Amazon S3, Amazon SES, Amazon SQS, Amazon SNS, Azure DevOps, or Stripe.

#### Scenario: The 2021 role is unchanged

- **WHEN** the visitor reads "Full Stack Engineer"
- **THEN** its technology names are TypeScript, React, Node.js, Express, and MySQL

### Requirement: MerchantSpring links AWS and Stripe

The MerchantSpring project SHALL include AWS and Stripe among its tags. It MUST NOT include Amazon S3, Amazon SES, Amazon SQS, Amazon SNS, or Azure DevOps.

#### Scenario: MerchantSpring tags

- **WHEN** the visitor opens MerchantSpring
- **THEN** AWS and Stripe are tags, and Amazon S3, Amazon SES, Amazon SQS, Amazon SNS, and Azure DevOps are not

### Requirement: Other projects omit these tools

No project other than MerchantSpring SHALL include AWS, Amazon S3, Amazon SES, Amazon SQS, Amazon SNS, Azure DevOps, or Stripe.

#### Scenario: WealthPark projects stay clear

- **WHEN** the visitor opens Potato V3, House Elf, Valuation, Owner Web App, Workflow, or Chat-Admin
- **THEN** none of those seven labels is a tag on that project

### Requirement: Evidence is professional

Selecting any of the seven skills SHALL report "Used professionally". The sources SHALL be "Senior Full Stack Engineer (AI Engineer)" and then "Senior Software Engineer". AWS and Stripe SHALL also list MerchantSpring after those roles. Amazon S3, Amazon SES, Amazon SQS, Amazon SNS, and Azure DevOps MUST NOT list a project.

#### Scenario: A service lists the two roles only

- **WHEN** the visitor selects Amazon S3
- **THEN** the evidence says "Used professionally" and lists those two roles, and it lists no project

#### Scenario: Stripe includes MerchantSpring

- **WHEN** the visitor selects Stripe
- **THEN** the evidence says "Used professionally" and lists those two roles and then MerchantSpring

### Requirement: The project filter gains AWS and Stripe only

The project filter SHALL include AWS and Stripe. It MUST NOT include Amazon S3, Amazon SES, Amazon SQS, Amazon SNS, or Azure DevOps. Selecting AWS or Stripe SHALL show MerchantSpring and no other project.

#### Scenario: Stripe narrows to MerchantSpring

- **WHEN** the visitor selects Stripe in the project filter
- **THEN** MerchantSpring is the only project shown

#### Scenario: A service is not a filter option

- **WHEN** the visitor opens the project filter
- **THEN** Amazon S3, Amazon SES, Amazon SQS, Amazon SNS, and Azure DevOps are absent
