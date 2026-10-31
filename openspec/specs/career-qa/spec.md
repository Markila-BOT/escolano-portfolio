# career-qa Specification

## Purpose

Collect three career answers that already exist elsewhere on the page, without adding a claim or a chat system.

## Requirements

### Requirement: Three questions restate existing sentences

The homepage SHALL include a Questions section before Contact. It SHALL contain three disclosures. Their answers SHALL restate only the hiring availability sentence, the about workflow sentence, and the introduction positioning sentence. An answer MUST NOT add an employer, a metric, a date, or a tool the source sentence does not contain.

#### Scenario: Hiring answer

- **WHEN** the visitor opens the hiring question
- **THEN** the answer states full-time and contract/freelance work, remote or based in the Philippines, and no further claim

#### Scenario: Workflow answer

- **WHEN** the visitor opens the workflow question
- **THEN** the answer restates the about workflow sentence, including AI-assisted engineering, test-driven development, spec-driven development, intent-driven development, and doubt-driven development

#### Scenario: Positioning answer

- **WHEN** the visitor opens the positioning question
- **THEN** the answer restates the introduction positioning sentence

### Requirement: Disclosures work without a script

Each question SHALL be a native disclosure. All three questions SHALL be readable with JavaScript off. Opening one MUST NOT remove the others. The section SHALL use the heading Questions as an h2.

#### Scenario: Scripts unavailable

- **WHEN** the page loads with JavaScript disabled
- **THEN** the three questions are present and can be opened as native disclosures

#### Scenario: Several can be open

- **WHEN** the visitor opens two questions
- **THEN** both answers remain visible

### Requirement: Questions are not a second hiring form

The section MUST NOT include a form, an email address other than the existing public mailbox, or a chat control. The introduction SHALL keep its single Contact start path.

#### Scenario: No chat or form

- **WHEN** the visitor reads Questions
- **THEN** there is no form, chat input, or additional email address
