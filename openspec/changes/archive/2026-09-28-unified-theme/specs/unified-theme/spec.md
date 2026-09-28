# Spec Delta

## Purpose

Make every section of the portfolio follow one palette when the visitor switches between light and dark mode.

## ADDED Requirements

### Requirement: Sections share one palette

The page background, section surfaces, body text, muted text, borders, and accent color SHALL come from one palette. Switching theme SHALL update each of those roles together. A section MUST NOT keep a light surface after the visitor switches to dark mode, or a dark surface after the visitor switches to light mode.

#### Scenario: Dark mode updates the page

- **WHEN** the visitor switches from light mode to dark mode
- **THEN** the page background, section text, and section surfaces all use the dark roles of the same palette

#### Scenario: Light mode updates the page

- **WHEN** the visitor switches from dark mode to light mode
- **THEN** the page background, section text, and section surfaces all use the light roles of the same palette

### Requirement: Theme styles reach the page

The palette colors, the dark-mode switch, and the page font SHALL all come from one Tailwind configuration. A second configuration file MUST NOT shadow it. A generated color variable MUST NOT overwrite a palette token with a reference to itself.

#### Scenario: Palette classes are generated

- **WHEN** the page loads in either theme
- **THEN** the page background and text use the palette colors instead of the browser defaults

#### Scenario: Page font applies

- **WHEN** the page loads
- **THEN** body text renders in the project's sans font, not the browser's default serif

### Requirement: Project cards and the project drawer follow the active theme

A project card and the open project drawer SHALL use the palette's surface, text, muted text, and border for the active theme. The decorative color fields behind the page and behind the drawer SHALL be the same two accent colors from that palette. A card's title and year MUST remain readable on the card surface in both themes.

#### Scenario: Dark mode project card

- **WHEN** dark mode is active and a project card is shown
- **THEN** the card surface and its title and year use the dark surface and text roles, and the title and year are readable on that surface

#### Scenario: Drawer matches the page accents

- **WHEN** the visitor opens a project drawer in either theme
- **THEN** the drawer's background uses that theme's surface role, and its decorative color fields use the same accent colors as the page behind it

### Requirement: Contact fields follow the active theme

The contact email field and message field SHALL use the palette's surface, text, and border for the active theme. Dark mode MUST NOT force those fields to a light fill with dark text.

#### Scenario: Dark mode contact fields

- **WHEN** dark mode is active and the contact form is shown
- **THEN** the email field and the message field use the dark surface and text roles

#### Scenario: Light mode contact fields

- **WHEN** light mode is active and the contact form is shown
- **THEN** the email field and the message field use the light surface and text roles

### Requirement: Experience timeline follows the active theme

Each experience entry's surface and text SHALL use the palette for the active theme. Changing the theme SHALL update those entries without a reload. An entry MUST NOT stay on a light fill in dark mode.

#### Scenario: Timeline updates with the theme

- **WHEN** the visitor switches theme while the experience section is visible
- **THEN** each entry's fill and text switch to that theme's surface and text roles

### Requirement: CV and submit are one button

The CV control and the contact submit control SHALL share one button appearance from the palette, including fill, text, shape, and the disabled state. Changing the palette SHALL change both controls together.

#### Scenario: Both controls match in each theme

- **WHEN** the visitor views the CV control and the submit control in light mode, then in dark mode
- **THEN** the two controls match each other in both themes

### Requirement: Chrome shares surface and muted text

The header, the mobile navigation panel, the theme switch, each skill chip, and the footer SHALL use the palette's surface and muted text for the active theme. The active navigation item SHALL remain distinguishable from the other items without relying on color alone.

#### Scenario: Dark chrome

- **WHEN** dark mode is active
- **THEN** the header, theme switch, skill chips, and footer use the dark surface and muted text roles

#### Scenario: Mobile panel matches the header

- **WHEN** the visitor opens the mobile menu in either theme
- **THEN** the panel uses the same surface role as the header for that theme

### Requirement: Touched surfaces meet contrast

Text on the surfaces in this capability SHALL meet a contrast ratio of at least 4.5:1 in both themes. Large text and UI boundaries on those surfaces SHALL meet at least 3:1. The theme control SHALL keep the accessible name that states the theme it will switch to.

#### Scenario: Dark text contrast

- **WHEN** dark mode is active
- **THEN** body text, muted text, card titles, field text, and timeline text on their surfaces each meet 4.5:1

#### Scenario: Light text contrast

- **WHEN** light mode is active
- **THEN** body text, muted text, card titles, field text, and timeline text on their surfaces each meet 4.5:1
