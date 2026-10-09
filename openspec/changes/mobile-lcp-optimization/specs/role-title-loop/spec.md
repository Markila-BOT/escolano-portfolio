# Spec Delta

## MODIFIED Requirements

### Requirement: Introduction cycles verified role titles

The introduction SHALL show "Senior Software Engineer" first, followed by "Full Stack Engineer", "Lead Software Engineer", and "Front-End Engineer" in that order. It SHALL return to "Senior Software Engineer" after the last title. Each title SHALL remain readable between transitions, and the loop MUST NOT require visitor input. The first title SHALL be visible in the initial document without waiting for scripts or an entrance transition and SHALL remain readable through hydration.

#### Scenario: First title on load

- **WHEN** the visitor first views the introduction
- **THEN** "Senior Software Engineer" is readable before any title transition occurs

#### Scenario: Titles advance and wrap

- **WHEN** the visitor keeps the introduction visible through a complete title cycle
- **THEN** the four titles appear in the specified order and the title after "Front-End Engineer" is "Senior Software Engineer"

#### Scenario: Initial document and hydration

- **WHEN** scripts are unavailable, delayed or completing hydration
- **THEN** "Senior Software Engineer" remains visibly readable until the first scheduled role change without a client-readiness blank interval
