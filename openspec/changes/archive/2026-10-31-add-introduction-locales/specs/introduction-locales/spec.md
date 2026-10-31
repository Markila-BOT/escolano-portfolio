# Spec Delta

## Purpose

Offer English, Filipino, and Japanese for the introduction and section chrome, with English painted first and no new claims in translation.

## ADDED Requirements

### Requirement: English is the default document

The first paint and the no-JavaScript document SHALL use English. The locale control SHALL offer English, Filipino, and Japanese. A saved locale SHALL apply only after hydration, and the first paint MUST NOT show Filipino or Japanese before English.

#### Scenario: First visit

- **WHEN** a visitor loads the page with no saved locale
- **THEN** the introduction and section headings are English

#### Scenario: Scripts unavailable

- **WHEN** JavaScript is disabled
- **THEN** the document language is English and the English introduction remains readable

### Requirement: The catalog covers chrome only

A non-English locale SHALL translate only the positioning sentence, the hiring-preference sentence, the navigation labels, and the section headings. Project descriptions, experience, the about body, tools, and the contact form SHALL stay English. A translation MUST preserve the English claims and MUST NOT add a claim. A string without an approved translation SHALL stay English.

#### Scenario: Filipino or Japanese selected

- **WHEN** the visitor selects Filipino or Japanese
- **THEN** the chrome strings that have approved translations switch, and project descriptions stay English

#### Scenario: Missing translation

- **WHEN** a chrome string has no approved translation
- **THEN** that string remains the English source

### Requirement: The greeting is not the locale switch

The locale control SHALL be separate from the greeting. Changing locale MUST NOT advance the greeting or the role-title loop. Activating the greeting MUST NOT change the locale.

#### Scenario: Locale and greeting stay independent

- **WHEN** the visitor selects a locale and then activates the greeting
- **THEN** the locale remains the selected one and the greeting advances under its existing rules

### Requirement: The choice is saved

The selected locale SHALL be saved in local storage and reused on the next visit. Clearing storage SHALL return the next first paint to English.

#### Scenario: Return visit

- **WHEN** the visitor selects Japanese, reloads, and scripts run
- **THEN** Japanese chrome is shown after hydration

#### Scenario: Storage cleared

- **WHEN** the saved locale is removed
- **THEN** the next first paint is English
