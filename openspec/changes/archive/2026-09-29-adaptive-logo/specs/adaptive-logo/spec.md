# Spec Delta

## Purpose

Keep the header logo recognizable on the light and navy themes, and make it a named Home control that stays reachable at every width of this page.

## ADDED Requirements

### Requirement: Logo keeps one silhouette in both themes

The header logo SHALL be a transparent brand asset. It MUST NOT be the current bitmap recolored with a CSS filter. The silhouette SHALL be the same circular emblem in light and dark.

#### Scenario: Both themes show the same emblem

- **WHEN** the visitor views the logo in light mode and in dark mode
- **THEN** both show the same emblem silhouette, and neither is the bitmap recolored by a filter

### Requirement: Logo matches the active theme without flashing the other

The painted logo SHALL be the one for the active theme. The other theme's logo MUST NOT appear before it on load, and MUST NOT remain after a theme switch.

#### Scenario: Saved dark theme

- **WHEN** the page loads with dark as the saved theme
- **THEN** the first painted logo is the dark-theme logo

#### Scenario: Theme switch

- **WHEN** the visitor switches theme
- **THEN** the logo shown after the switch is the logo for the new theme

### Requirement: Logo meets non-text contrast

The logo SHALL meet a contrast ratio of at least 3:1 against the header surface and against the page surface, in both themes. The resting, hover, and keyboard-focus appearances SHALL each meet that ratio.

#### Scenario: Dark surfaces

- **WHEN** dark mode is active
- **THEN** the logo meets 3:1 on the header and on the page while resting, hovered, and focused

#### Scenario: Light surfaces

- **WHEN** light mode is active
- **THEN** the logo meets 3:1 on the header and on the page while resting, hovered, and focused

### Requirement: Logo link is named Home

The logo control SHALL be a link whose accessible name is "Home". The graphic MUST NOT be announced as a separate item. Keyboard focus on the link SHALL stay visible in both themes.

#### Scenario: Accessible name

- **WHEN** the visitor reaches the logo link
- **THEN** its accessible name is "Home" and the graphic is not announced separately

#### Scenario: Keyboard focus

- **WHEN** keyboard focus is on the logo link in either theme
- **THEN** a visible focus treatment is present

### Requirement: Logo target and placement

The logo link SHALL provide a target of at least 44 by 44 CSS pixels. From a 320 px wide viewport through desktop widths, the link MUST NOT overlap the navigation links or the menu button.

#### Scenario: Narrow viewport

- **WHEN** the viewport is 320 px wide
- **THEN** the logo target is at least 44 by 44 CSS pixels and does not cover the menu button

#### Scenario: Desktop viewport

- **WHEN** the viewport is at a desktop width
- **THEN** the logo target is at least 44 by 44 CSS pixels and does not cover the navigation links

### Requirement: Logo motion stays restrained

Entrance and hover motion on the logo SHALL be small. When the visitor prefers reduced motion, that nonessential motion MUST NOT run. Loading the logo or switching theme MUST NOT move the surrounding header content.

#### Scenario: Reduced motion

- **WHEN** the visitor prefers reduced motion
- **THEN** the logo appears at its final position and size without the entrance or hover motion

#### Scenario: No layout shift

- **WHEN** the logo loads or the theme changes
- **THEN** the surrounding header content does not move
