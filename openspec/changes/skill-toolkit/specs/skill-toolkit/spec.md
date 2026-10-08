# Spec Delta

## Purpose

My toolkit sits after the skill chips and opens by category, so a visitor can read one factual sentence about each tool.

## ADDED Requirements

### Requirement: Toolkit follows the chips

My toolkit SHALL appear after the skill chips in the skills section. The chip groups SHALL stay visible, in their current order, with no sentence under a chip. The section title SHALL stay My skills. The toolkit title SHALL be My toolkit.

#### Scenario: Chips stay without a sentence

- **WHEN** the visitor reads the skill chips
- **THEN** each chip shows only its icon and label, the section title is My skills, and My toolkit comes after those groups

### Requirement: Categories start closed

My toolkit SHALL show Languages, Tools, and Databases as closed disclosures, in that order. A sentence MUST NOT be visible until its category is open. Opening one category MUST NOT close another.

#### Scenario: Toolkit starts closed

- **WHEN** the visitor reads My toolkit before opening a category
- **THEN** they see Languages, Tools, and Databases, and no tool sentence

#### Scenario: Opening one leaves the others closed

- **WHEN** the visitor opens Languages while Tools is still closed
- **THEN** the Languages sentences are visible and the Tools sentences are not

#### Scenario: Two categories can stay open

- **WHEN** the visitor opens Languages and then opens Tools
- **THEN** both sets of sentences are visible

### Requirement: Languages sentences

Each tool in the Languages disclosure SHALL show its name and exactly one sentence, in the chip order, and no other sentence.

#### Scenario: Languages notes

- **WHEN** the visitor opens Languages in My toolkit
- **THEN** the tools and sentences are HTML, "Markup for the structure of a page."; CSS, "Layout, color, and type for a page."; JavaScript, "The language that makes a page respond."; TypeScript, "JavaScript with types that are checked before it runs."; Rust, "A systems language that keeps memory safe without a garbage collector."

### Requirement: Tools sentences

Each tool in the Tools disclosure SHALL show its name and exactly one sentence, in the chip order, and no other sentence.

#### Scenario: Tools notes

- **WHEN** the visitor opens Tools in My toolkit
- **THEN** the tools and sentences are React, "A library for building an interface from components."; Next.js, "A React framework for routing and server-rendered pages."; Node.js, "A runtime for JavaScript outside the browser."; Git, "Version control for a repository."; Tailwind, "Utility classes that style an element from the markup."; Redux, "A store for application state."; GraphQL, "A query language for asking an API for specific fields."; Nest.js, "A Node.js framework that organizes a server into modules."; Express, "A Node.js framework for HTTP routes."; Framer Motion, "A React library for animation."; Claude Code, "Anthropic's coding agent for editing a repository from the terminal."; Codex, "OpenAI's coding agent for writing and editing code."; Cursor, "An editor that writes and edits code with an agent."

### Requirement: Databases sentences

Each tool in the Databases disclosure SHALL show its name and exactly one sentence, in the chip order, and no other sentence.

#### Scenario: Databases notes

- **WHEN** the visitor opens Databases in My toolkit
- **THEN** the tools and sentences are MongoDB, "A database that stores documents."; MySQL, "A relational database."; PostgreSQL, "A relational database."; Firebase, "A platform for stored data and sign-in."

### Requirement: No extra tools

The toolkit MUST NOT add a tool, a Design category, or a proficiency mark.

#### Scenario: Design and proficiency are absent

- **WHEN** the visitor reads My toolkit
- **THEN** there is no Design category and no proficiency mark
