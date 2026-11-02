# Spec Delta

## Purpose

Records Playwright, TypeORM, and React Aria on the WealthPark-era roles and on the MerchantSpring project.

## ADDED Requirements

### Requirement: Both WealthPark-era roles list the three tools

"Senior Software Engineer" and "Senior Full Stack Engineer (AI Engineer)" SHALL show Playwright, TypeORM, and React Aria after Stripe, in that order. The names already before Stripe SHALL stay in their current order.

#### Scenario: Timeline and journey agree

- **WHEN** the visitor reads either role on the timeline and then on its journey stop
- **THEN** both views show Playwright, TypeORM, and React Aria after Stripe, in that order

### Requirement: Other experience entries omit these tools

No experience entry other than those two SHALL show Playwright, TypeORM, or React Aria.

#### Scenario: The 2021 role is unchanged

- **WHEN** the visitor reads "Full Stack Engineer"
- **THEN** its technology names are TypeScript, React, Node.js, Express, and MySQL

### Requirement: MerchantSpring links the three tools

The MerchantSpring project SHALL include Playwright, TypeORM, and React Aria among its tags.

#### Scenario: MerchantSpring tags

- **WHEN** the visitor opens MerchantSpring
- **THEN** Playwright, TypeORM, and React Aria are tags

### Requirement: Other projects omit these tools

No project other than MerchantSpring SHALL include Playwright, TypeORM, or React Aria.

#### Scenario: WealthPark projects stay clear

- **WHEN** the visitor opens Potato V3, House Elf, Valuation, Owner Web App, Workflow, or Chat-Admin
- **THEN** none of those three labels is a tag on that project

### Requirement: Evidence is professional

Selecting Playwright, TypeORM, or React Aria SHALL report "Used professionally". The sources SHALL be "Senior Full Stack Engineer (AI Engineer)", then "Senior Software Engineer", then MerchantSpring.

#### Scenario: Playwright lists both roles and MerchantSpring

- **WHEN** the visitor selects Playwright
- **THEN** the evidence says "Used professionally" and lists those two roles and then MerchantSpring

### Requirement: The project filter gains the three tools

The project filter SHALL include Playwright, TypeORM, and React Aria. Selecting any one of them SHALL show MerchantSpring and no other project.

#### Scenario: TypeORM narrows to MerchantSpring

- **WHEN** the visitor selects TypeORM in the project filter
- **THEN** MerchantSpring is the only project shown
