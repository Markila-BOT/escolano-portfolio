# Spec Delta

## Purpose

Show the technologies for each role on the timeline and on the journey stop, as readable text chips, and show no chips on an entry that is not a role.

## ADDED Requirements

### Requirement: A role shows its technology names in both views

A role entry SHALL show its technology names as text under its description on the timeline, and the same names in the same order on that stop in the journey. The names SHALL be the ones stored on the entry. "Internship" SHALL include "Java". "Senior Software Engineer" SHALL include "TypeScript" and "React". A name SHALL be real text, readable in light and dark mode without hovering, and SHALL meet 4.5:1 against its surface. The canvas MUST NOT draw the names.

#### Scenario: Internship names Java in both views

- **WHEN** the visitor reads the Internship entry on the timeline, then opens the journey and moves to that stop
- **THEN** both views show the text "Java", and the journey shows the names in the same order as the timeline

#### Scenario: The current role names its tools

- **WHEN** the visitor reads the Senior Software Engineer entry in either theme
- **THEN** the text "TypeScript" and the text "React" are both visible without hovering

### Requirement: An entry that is not a role shows no chips

"Fly back home", "Fly to Japan", and "Education" SHALL show no technology chips on the timeline or on the journey stop. A role SHALL NOT show an empty chip row.

#### Scenario: A flight has no chips

- **WHEN** the visitor reads "Fly to Japan" on the timeline and on its journey stop
- **THEN** neither view shows a technology chip

#### Scenario: Education has no chips

- **WHEN** the visitor reads the Education entry
- **THEN** no technology chip is shown
