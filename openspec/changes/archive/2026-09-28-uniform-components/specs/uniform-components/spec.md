# Spec Delta

## Purpose

Make buttons, icons, chips, and form fields come from one source so the palette from unified-theme stays consistent when a control is reused.

## ADDED Requirements

### Requirement: Button controls use the shared button

A control that submits the contact form, opens the CV, loads more experience, closes the project drawer, opens or closes the mobile menu, switches theme, or moves the project carousel SHALL render the shared button. The CV control and the submit control SHALL keep one shared appearance, including fill, text, shape, and the disabled state. The mobile menu control and the theme control SHALL keep the accessible names they already expose.

#### Scenario: Contact actions match

- **WHEN** the visitor views the CV control and the submit control in either theme
- **THEN** both render the shared button and match each other in fill, text, and shape

#### Scenario: Chrome controls use the shared button

- **WHEN** the visitor views the theme switch and the mobile menu button in either theme
- **THEN** each renders the shared button, and each keeps the accessible name it already exposes

#### Scenario: Carousel and drawer controls use the shared button

- **WHEN** the visitor views the project carousel arrows, the experience "Read More" control, and the project drawer close control
- **THEN** each renders the shared button

### Requirement: Icons come from one set

Icons in page sections and on the project carousel SHALL come from the icon set sections already use. The carousel MUST NOT introduce a second icon set for its arrows.

#### Scenario: Carousel arrows match section icons

- **WHEN** the visitor views the project carousel arrows and a section icon such as a skill or project tag
- **THEN** both come from the same icon set

### Requirement: Chips share one source

A skill chip and a project technology tag SHALL render one chip. A size difference MAY remain. Both SHALL use the active theme's surface, text, and border.

#### Scenario: Skill and project chips match

- **WHEN** the visitor views a skill chip and a project technology tag in either theme
- **THEN** both render the same chip, and both use that theme's surface, text, and border

### Requirement: Contact fields share one source

The contact email field and the contact message field SHALL render one field. Both SHALL use the active theme's surface, text, and border. Dark mode MUST NOT force either field to a light fill with dark text.

#### Scenario: Both fields match in each theme

- **WHEN** the visitor views the contact form in light mode, then in dark mode
- **THEN** the email field and the message field render the same field, and both follow that theme's surface, text, and border

### Requirement: Section titles share one heading

Each section title SHALL render the existing section heading. A section MUST NOT introduce a second heading treatment for its title.

#### Scenario: Section titles match

- **WHEN** the visitor views the About, Projects, Skills, Experience, and Contact titles
- **THEN** each title renders the same section heading
