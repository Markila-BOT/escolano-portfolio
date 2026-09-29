# role-title-loop Specification

## Purpose

Present Mark's verified engineering roles as a calm, accessible title loop in the introduction without destabilizing the hero or competing with its greeting interaction.

## Requirements

### Requirement: Introduction cycles verified role titles

The introduction SHALL show "Senior Software Engineer" first, followed by "Full Stack Engineer", "Lead Software Engineer", and "Front-End Engineer" in that order. It SHALL return to "Senior Software Engineer" after the last title. Each title SHALL remain readable between transitions, and the loop MUST NOT require visitor input.

#### Scenario: First title on load

- **WHEN** the visitor first views the introduction
- **THEN** "Senior Software Engineer" is readable before any title transition occurs

#### Scenario: Titles advance and wrap

- **WHEN** the visitor keeps the introduction visible through a complete title cycle
- **THEN** the four titles appear in the specified order and the title after "Front-End Engineer" is "Senior Software Engineer"

### Requirement: Title transition is restrained and stable

The outgoing title SHALL leave upward while fading out, and the incoming title SHALL enter from below while fading in. A title SHALL remain settled substantially longer than it is transitioning. The title region MUST reserve enough space for every title and MUST NOT move the greeting, name, positioning sentence, or Contact link when the displayed title changes.

#### Scenario: Title changes without layout shift

- **WHEN** the title changes between the shortest and longest titles at mobile or desktop width
- **THEN** the greeting, name, positioning sentence, and Contact link remain in the same layout positions

#### Scenario: Transition settles before the next title

- **WHEN** one title begins leaving
- **THEN** the next title becomes fully readable before another title transition starts

### Requirement: Reduced motion keeps one static title

When the visitor prefers reduced motion, the introduction SHALL keep "Senior Software Engineer" visible and MUST NOT start the automatic title loop.

#### Scenario: Reduced motion on load

- **WHEN** the visitor loads the introduction with reduced motion enabled
- **THEN** "Senior Software Engineer" remains visible without an automatic title transition

### Requirement: Cycling titles remain accessible without timed announcements

The page SHALL retain one heading. Assistive technology SHALL have access to all four role titles without relying on the visual timing, and automatic visual changes MUST NOT be exposed as a live region or announced on every transition.

#### Scenario: Screen reader reads the roles

- **WHEN** a screen reader reads the introduction heading
- **THEN** all four role titles are available in a stable accessible description without waiting for the visual loop

#### Scenario: Automatic change is silent

- **WHEN** the visible title advances automatically
- **THEN** the change does not trigger a live-region announcement or an interaction sound

### Requirement: Title loop pauses when it cannot be usefully seen

The automatic loop SHALL pause while the browser document is hidden and while the multilingual greeting transition is running. On resume, the current title SHALL remain settled for a complete display interval before the next transition.

#### Scenario: Browser tab becomes hidden

- **WHEN** the document becomes hidden while a role title is settled
- **THEN** the title does not advance until the document is visible again

#### Scenario: Greeting glitches

- **WHEN** the multilingual greeting begins its visual transition
- **THEN** the current role title remains settled until the greeting transition is complete
