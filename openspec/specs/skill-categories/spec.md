# skill-categories Specification

## Purpose

The skills section groups the existing chips so a visitor can scan languages, tools, and databases separately.

## Requirements

### Requirement: Three groups in order

The skills section SHALL show three groups, in this order: Languages, Tools, Databases. Each group SHALL have a visible heading with that name.

#### Scenario: Headings appear in order

- **WHEN** the visitor reads the skills section
- **THEN** they see the headings Languages, then Tools, then Databases

### Requirement: Languages membership

The Languages group SHALL contain HTML, CSS, JavaScript, TypeScript, and Rust, in that order, and no other chip.

#### Scenario: Languages chips

- **WHEN** the visitor reads the Languages group
- **THEN** the chips are HTML, CSS, JavaScript, TypeScript, and Rust, in that order

### Requirement: Tools membership

The Tools group SHALL contain React, Next.js, Node.js, Git, Tailwind, Redux, GraphQL, Nest.js, Express, Framer Motion, Claude Code, Codex, and Cursor, in that order, and no other chip.

#### Scenario: Tools chips

- **WHEN** the visitor reads the Tools group
- **THEN** the chips are React, Next.js, Node.js, Git, Tailwind, Redux, GraphQL, Nest.js, Express, Framer Motion, Claude Code, Codex, and Cursor, in that order

### Requirement: Databases membership

The Databases group SHALL contain MongoDB, MySQL, PostgreSQL, and Firebase, in that order, and no other chip.

#### Scenario: Databases chips

- **WHEN** the visitor reads the Databases group
- **THEN** the chips are MongoDB, MySQL, PostgreSQL, and Firebase, in that order

### Requirement: No Design heading

The skills section MUST NOT show a Design heading while no chip belongs in Design.

#### Scenario: Design is absent

- **WHEN** the visitor reads the skills section
- **THEN** there is no Design heading

### Requirement: Same chips, no notes

Every chip SHALL keep its current label and icon. The section MUST NOT add a chip, a one-line note under a chip, or a proficiency mark. The section title SHALL stay "My skills".

#### Scenario: No notes or new chips

- **WHEN** the visitor reads the skills section
- **THEN** each chip shows only its existing icon and label, the title is "My skills", and there is no proficiency mark
