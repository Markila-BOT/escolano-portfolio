# Spec Delta

## MODIFIED Requirements

### Requirement: Short cues play only while sound is on

While sound is on, the page SHALL play a short cue when the visitor activates a navigation link, switches theme, opens a project, closes a project, or the contact form succeeds or fails. While sound is on, a successful multilingual greeting change SHALL play one glitch burst of about 1.5 seconds. That greeting cue SHALL play once for that change and MUST NOT repeat while the same pointer remains over the greeting. While sound is off, those same actions MUST NOT play a cue. Scrolling a section into view MUST NOT play a cue.

#### Scenario: Sound is on

- **WHEN** sound is on and the visitor navigates, switches theme, opens or closes a project, or the contact form succeeds or fails
- **THEN** one short cue plays for that action

#### Scenario: Greeting changes

- **WHEN** sound is on and the multilingual greeting successfully changes
- **THEN** one glitch burst of about 1.5 seconds plays for that change

#### Scenario: Greeting remains hovered

- **WHEN** sound is on and a pointer remains over the greeting after changing it
- **THEN** the greeting cue does not repeat until the pointer leaves and causes another successful change

#### Scenario: Sound is off

- **WHEN** sound is off and the visitor does one of those actions
- **THEN** no cue plays and the action still completes
