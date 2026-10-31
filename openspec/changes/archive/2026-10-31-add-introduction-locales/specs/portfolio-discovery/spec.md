# Spec Delta

## MODIFIED Requirements

### Requirement: Document semantics expose a coherent heading hierarchy

The homepage SHALL expose one main landmark, one nonempty h1 for the introductory identity, and h2 headings for About, Projects, Skills, Experience, and Contact in their corresponding sections. It SHALL retain native header, navigation, and footer landmarks. The document language SHALL be `en` on first paint and when JavaScript is off. After the visitor selects Filipino or Japanese, the document language SHALL be `fil` or `ja`. Heading elements MUST NOT be nested inside other headings. If a Questions section exists, its h2 SHALL remain in this list in document order.

#### Scenario: Initial semantic document

- **WHEN** the homepage is inspected before JavaScript execution
- **THEN** its landmarks and section headings are present, there is exactly one h1, the document language is English, and no heading contains another heading

#### Scenario: Client initialization

- **WHEN** the homepage hydrates and the greeting or role changes
- **THEN** the single h1 and section-heading hierarchy remain intact without hiding introductory content

#### Scenario: Locale selected

- **WHEN** the visitor selects Filipino or Japanese
- **THEN** the document language matches that selection and the single h1 remains
