# accessible-navigation Specification

## Purpose

Name the mobile menu button and the theme toggle so assistive technology can identify each control and its current state.

## Requirements

### Requirement: Mobile menu button has an accessible name

When the compact header is shown, the control that opens and closes the mobile menu SHALL expose an accessible name. The name SHALL be "Open menu" while the menu is closed and "Close menu" while the menu is open. The icon inside the control MUST NOT be announced as a separate item.

#### Scenario: Menu is closed

- **WHEN** the compact header is shown and the mobile menu is closed
- **THEN** the menu control's accessible name is "Open menu" and its icon is not announced separately

#### Scenario: Menu is open

- **WHEN** the visitor activates the menu control and the mobile menu is open
- **THEN** the menu control's accessible name is "Close menu" and its icon is not announced separately

### Requirement: Mobile menu button exposes expanded state

The mobile menu control SHALL expose whether the menu is expanded and SHALL identify the menu it controls. The expanded state SHALL be false while the menu is closed and true while the menu is open.

#### Scenario: Closed state is collapsed

- **WHEN** the mobile menu is closed
- **THEN** the menu control reports that it is not expanded and references the mobile menu

#### Scenario: Open state is expanded

- **WHEN** the mobile menu is open
- **THEN** the menu control reports that it is expanded and references the same mobile menu

### Requirement: Theme toggle has an accessible name

The theme control SHALL expose an accessible name that states the theme it will switch to. The name SHALL be "Switch to dark mode" while the theme is light and "Switch to light mode" while the theme is dark. The icon inside the control MUST NOT be announced as a separate item.

#### Scenario: Light theme

- **WHEN** the current theme is light
- **THEN** the theme control's accessible name is "Switch to dark mode" and its icon is not announced separately

#### Scenario: Dark theme

- **WHEN** the current theme is dark
- **THEN** the theme control's accessible name is "Switch to light mode" and its icon is not announced separately
