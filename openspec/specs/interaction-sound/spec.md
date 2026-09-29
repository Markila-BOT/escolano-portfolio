# interaction-sound Specification

## Purpose

Let a visitor turn short interaction cues on or off, remember that choice, and keep the page fully usable while sound stays off.

## Requirements

### Requirement: Sound choice is remembered and defaults to off

The page SHALL offer one control that turns interaction sound on and off. The choice SHALL be saved in local storage. When no choice is saved, sound SHALL be off.

#### Scenario: First visit

- **WHEN** the visitor loads the page with no saved sound choice
- **THEN** interaction sound is off

#### Scenario: Saved choice

- **WHEN** the visitor returns with sound saved on or off
- **THEN** the control shows that saved choice

### Requirement: Sound control names its next state and stays clear of the theme switch

The sound control SHALL be a button. Its accessible name SHALL be "Turn sound on" while sound is off and "Turn sound off" while sound is on. The icon MUST NOT be announced as a separate item. The target SHALL be at least 44 by 44 CSS pixels, and the control MUST NOT overlap the theme switch from a 320 px wide viewport through desktop widths.

#### Scenario: Sound is off

- **WHEN** sound is off
- **THEN** the control's accessible name is "Turn sound on" and its icon is not announced separately

#### Scenario: Sound is on

- **WHEN** sound is on
- **THEN** the control's accessible name is "Turn sound off" and its icon is not announced separately

#### Scenario: Placement

- **WHEN** the viewport is 320 px wide or a desktop width
- **THEN** the sound control is at least 44 by 44 CSS pixels and does not cover the theme switch

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

### Requirement: Turning sound off stops playback immediately

Turning sound off SHALL stop the current cue, including one that has already started.

#### Scenario: Cue in progress

- **WHEN** a cue is playing and the visitor turns sound off
- **THEN** that cue stops and no further cue plays until sound is turned on again

### Requirement: Audio loads only after opt-in

The audio file SHALL be requested only after the visitor's choice is on. The cues SHALL come from one sprite or a small set of files. The page MUST NOT gain a second audio player dependency beside the one player package this change adds.

#### Scenario: Sound stays off

- **WHEN** the visitor loads the page and leaves sound off
- **THEN** the page does not request the audio file

#### Scenario: Visitor opts in

- **WHEN** the visitor turns sound on
- **THEN** the audio file may be requested, and it is one sprite or a small set of files

### Requirement: The page does not autoplay

Loading the page SHALL NOT play a cue, including when the saved choice is on. With sound off, navigation, the theme switch, projects, and the contact form SHALL remain usable.

#### Scenario: Saved on

- **WHEN** the page loads with sound saved on
- **THEN** no cue plays until the visitor does an action that has a cue

#### Scenario: Sound off

- **WHEN** sound is off
- **THEN** the visitor can still navigate, switch theme, open and close a project, and submit the contact form
