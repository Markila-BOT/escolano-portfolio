# Spec Delta

## Purpose

Keep installed majors, security patches, and the written conventions in agreement, including the sequenced move off the current majors.

## ADDED Requirements

### Requirement: Conventions match installed majors

`package.json`, `docs/technology-convention.md`, `docs/react-next-conventions.md`, and `AGENTS.md` SHALL name the same Next, React, and Tailwind majors. A change that bumps one of those majors SHALL update all four in the same change. Until that bump, the app SHALL stay on Next 14.2, React 18.3, and Tailwind 3.4.

#### Scenario: Before the major migration

- **WHEN** the major migration task has not landed
- **THEN** the app and those documents still name Next 14.2, React 18.3, and Tailwind 3.4

#### Scenario: After the major migration

- **WHEN** Next, React, or Tailwind moves to a newer major
- **THEN** all four files name that newer major and the production build passes

### Requirement: Same-major security fixes are applied first

A known high or critical advisory with a fix inside the current major SHALL be applied before any Next 16, React 19, or Tailwind 4 bump. An advisory with no same-major fix SHALL be recorded, not silenced.

#### Scenario: Same-major fix exists

- **WHEN** a high or critical advisory has a patched version on the current major
- **THEN** the lockfile resolves that patched version before a major bump starts

#### Scenario: No same-major fix

- **WHEN** an advisory has no fix on the current major
- **THEN** the maintenance record names it and does not hide it with an audit waiver

### Requirement: React Email is replaced only with the major migration

`@react-email/components` and `@react-email/tailwind` SHALL remain the contact email renderer until the major migration task replaces them. The contact form SHALL still accept and reject the same cases after that replacement.

#### Scenario: Before replacement

- **WHEN** the major migration has not replaced the email packages
- **THEN** contact email still renders through those packages

#### Scenario: After replacement

- **WHEN** the email packages are removed
- **THEN** the existing contact acceptance and rejection behavior still holds
