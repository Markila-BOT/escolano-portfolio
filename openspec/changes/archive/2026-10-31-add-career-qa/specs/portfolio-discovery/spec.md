# Spec Delta

## MODIFIED Requirements

### Requirement: Document semantics expose a coherent heading hierarchy

The homepage SHALL expose one main landmark, one nonempty h1 for the introductory identity, and h2 headings for About, Projects, Skills, Experience, Questions, and Contact in their corresponding sections. It SHALL retain native header, navigation, and footer landmarks and its English document language. Heading elements MUST NOT be nested inside other headings. If a locale control later sets `fil` or `ja` after first paint, that language change SHALL remain; this requirement still requires English before JavaScript runs.

#### Scenario: Initial semantic document

- **WHEN** the homepage is inspected before JavaScript execution
- **THEN** its landmarks and section headings are present, including Questions, there is exactly one h1, and no heading contains another heading

#### Scenario: Client initialization

- **WHEN** the homepage hydrates and the greeting or role changes
- **THEN** the single h1 and section-heading hierarchy remain intact without hiding introductory content
