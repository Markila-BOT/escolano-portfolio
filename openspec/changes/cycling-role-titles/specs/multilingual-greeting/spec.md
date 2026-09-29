# Spec Delta

## MODIFIED Requirements

### Requirement: The moment stays on the greeting

The page SHALL have one heading. The greeting MUST NOT be a second heading. The greeting interaction MUST NOT change the name, the positioning sentence, or the role-title loop's current title. Hovering or activating the greeting MUST NOT advance or restart the role-title loop.

#### Scenario: Neighboring introduction text stays put

- **WHEN** the visitor hovers or activates the greeting
- **THEN** the name, the current role title, and the positioning sentence stay readable and unchanged

#### Scenario: Greeting transition pauses the independent title loop

- **WHEN** the greeting transition is running
- **THEN** the role-title loop remains on its current title and resumes with a complete display interval after the greeting settles
