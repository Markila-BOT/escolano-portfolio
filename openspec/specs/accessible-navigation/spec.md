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

### Requirement: Mobile navigation contains keyboard focus

The open compact navigation SHALL expose a modal dialog named "Main navigation", move initial focus to its "Close menu" control, and keep Tab and Shift+Tab within its controls. Background controls MUST be unavailable while the modal is open. Closed menu links MUST NOT participate in the tab order.

#### Scenario: Open with keyboard
- **WHEN** a visitor activates "Open menu" with Enter or Space
- **THEN** the named modal opens, the trigger reports expanded state, and focus moves to "Close menu"

#### Scenario: Traverse the modal
- **WHEN** the visitor presses Tab on the last modal control or Shift+Tab on the first
- **THEN** focus wraps within the modal without reaching background links, theme or sound controls

#### Scenario: Menu is closed
- **WHEN** the compact menu is closed
- **THEN** its links are absent from keyboard traversal and the accessibility tree

### Requirement: Mobile navigation dismisses and restores focus

The compact menu SHALL close on Escape, activation of "Close menu", or selection of a section link. Dismissal while the compact header remains present SHALL return focus to "Open menu". Section selection SHALL retain its target hash and section navigation. A transition to desktop SHALL close the modal, release background interaction and move focus to a visible desktop navigation link when focus was inside the modal.

#### Scenario: Escape or close button
- **WHEN** a visitor dismisses the open compact menu with Escape or its close control
- **THEN** the modal closes, expanded state becomes false, and focus returns to "Open menu"

#### Scenario: Select a section
- **WHEN** a visitor activates a menu section link
- **THEN** the menu closes, navigation reaches the selected section hash, existing navigation feedback is retained, and focus returns to "Open menu"

#### Scenario: Resize into desktop navigation
- **WHEN** the open menu crosses the 960px desktop breakpoint with focus inside it
- **THEN** the modal closes, background controls become available, and focus moves to a visible desktop navigation link rather than a removed trigger

#### Scenario: Return to compact layout
- **WHEN** the viewport returns below 960px after the desktop transition
- **THEN** the menu remains closed until explicitly reopened

### Requirement: Keyboard visitors can bypass the header

The page SHALL provide "Skip to main content" as its first tabbable control. It SHALL become visibly focused above page chrome and target the main landmark. Activation SHALL move focus to main content without adding the main container to the normal tab order. This behavior SHALL work without JavaScript.

#### Scenario: Bypass navigation
- **WHEN** a visitor presses Tab from the start of the document and activates the skip link
- **THEN** the link is visible while focused and keyboard focus moves to the main landmark, bypassing header controls

#### Scenario: JavaScript disabled
- **WHEN** a visitor activates the skip link with JavaScript disabled
- **THEN** native navigation moves focus to main content and subsequent Tab proceeds to its interactive content

### Requirement: Navigation focus is visible across presentation preferences

The skip link and mobile-menu controls SHALL retain visible keyboard focus in light and dark themes. Reduced-motion mode SHALL expose navigation controls immediately without nonessential entrance or exit motion.

#### Scenario: Theme and motion preferences
- **WHEN** keyboard navigation is used in either theme with reduced motion enabled
- **THEN** focus remains visible and opening, traversal and closing remain operable without decorative transition delays
