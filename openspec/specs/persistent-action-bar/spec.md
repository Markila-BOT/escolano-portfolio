# persistent-action-bar Specification

## Purpose

Keep CV, GitHub, and LinkedIn available while the visitor scrolls, with names that do not depend on hover alone.

## Requirements

### Requirement: The bar offers CV and the two profiles

The page SHALL show a persistent bar with three controls: CV, GitHub, and LinkedIn. CV SHALL navigate to `https://escolano-cv.vercel.app/`. GitHub SHALL navigate to `https://github.com/Markila-BOT`. LinkedIn SHALL navigate to `https://www.linkedin.com/in/mark-escolano-2715ab129/`. Each control SHALL be a link. The bar MUST NOT download a generated CV file.

#### Scenario: Activate each control

- **WHEN** the visitor activates CV, GitHub, or LinkedIn on the bar
- **THEN** the control navigates to that destination

#### Scenario: No generated file

- **WHEN** the visitor activates CV
- **THEN** the browser goes to the existing CV site and does not download a file this change created

### Requirement: Labels are available without hover

Each bar control SHALL have a visible text label on hover and on keyboard focus. The accessible name SHALL be available without hover. Focus SHALL be visible in both themes. Each target SHALL be at least 44 by 44 CSS pixels.

#### Scenario: Keyboard focus

- **WHEN** the visitor tabs to a bar control in either theme
- **THEN** its text label and focus treatment are visible, and its accessible name identifies CV, GitHub, or LinkedIn

#### Scenario: Hover

- **WHEN** the visitor hovers a bar control
- **THEN** that control's text label is visible

### Requirement: The bar does not cover existing controls

At 320px width the bar SHALL NOT cover the theme switch, the sound switch, or the main content. It SHALL NOT sit on top of the header logo or the section navigation. Contact SHALL still show its own GitHub and LinkedIn labels and the existing CV button.

#### Scenario: Narrow viewport

- **WHEN** the page is viewed at 320px wide in either theme
- **THEN** the theme switch, sound switch, header, and main content remain usable, and the bar controls remain reachable

#### Scenario: Contact paths remain

- **WHEN** the visitor scrolls to Contact
- **THEN** the contact form, the Contact CV button, and the labeled GitHub and LinkedIn links are still there
