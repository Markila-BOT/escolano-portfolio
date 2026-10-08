# Spec Delta

## Purpose

Ensure the portfolio delivers useful, readable initial HTML and enhances that content with interactive behavior after hydration.

## ADDED Requirements

### Requirement: Initial document contains portfolio content

The initial home document SHALL contain the introduction and portrait, About narrative, all section headings, project card titles and years, all skill names and toolkit notes, the first three timeline entries, contact email and form fields, and footer. Content MUST be real document markup rather than only serialized script data. Closed evidence panels, project drawers and the 3D scene are excluded from this initial-content requirement.

#### Scenario: Initial response has meaningful content

- **WHEN** a visitor receives the production home document before JavaScript executes
- **THEN** its parsed body contains the required content and existing section anchor IDs

### Requirement: Initial content remains readable without hydration

Essential initial content SHALL remain visible with JavaScript disabled, without waiting for mounting, intersection observation or animation completion. The initial project card and first three timeline entries SHALL be readable; native toolkit disclosures SHALL remain operable. Contact email and the introduction's contact anchor SHALL remain usable as ordinary links.

#### Scenario: Scripts are unavailable

- **WHEN** a visitor loads the page with JavaScript disabled and scrolls through it
- **THEN** the introduction, About, headings, initial project card, skill names, first three timeline entries, contact details and footer can be read without invisible reveal states

#### Scenario: Native actions remain usable

- **WHEN** JavaScript is disabled and the visitor opens a toolkit category or follows the contact link
- **THEN** the notes are revealed or the browser reaches the contact section through native browser behavior

### Requirement: Theme initialization preserves the document

Theme initialization SHALL preserve portfolio content throughout hydration. Server output and the initial client render SHALL agree. Valid stored theme preferences SHALL take precedence over system preference after initialization; absent, invalid or inaccessible storage SHALL use system preference when available and otherwise the default theme. Theme failures MUST NOT blank the page.

#### Scenario: Stored dark preference

- **WHEN** the page hydrates with a valid stored dark preference
- **THEN** content stays present, dark mode applies and no hydration mismatch is emitted

#### Scenario: Storage unavailable

- **WHEN** reading local storage throws or returns an unsupported value
- **THEN** the page remains readable and theme initialization uses the documented fallback

### Requirement: Interactive enhancement preserves existing behavior

After hydration, the portfolio SHALL retain existing navigation, greeting and role interactions, project carousel and drawer controls, compact skill evidence selection, timeline expansion and 3D switching, contact feedback, and theme/sound controls. The 3D scene SHALL remain unloaded until explicitly opened. Reduced-motion preferences SHALL remain respected.

#### Scenario: Hydrated interaction smoke test

- **WHEN** the visitor uses project navigation, selects and closes skill evidence, expands the timeline and opens the journey
- **THEN** existing controls, focus behavior and content continue to work without hydration or browser errors

#### Scenario: No unnecessary 3D work

- **WHEN** the home document loads and the journey has not been opened
- **THEN** its readable timeline is available and no 3D scene initializes
