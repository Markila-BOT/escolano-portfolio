# professional-social-links Specification

## Purpose

Give portfolio visitors direct, accessible access to the owner's confirmed public professional profiles from the Contact section.

## Requirements

### Requirement: Contact exposes confirmed professional profiles

Contact SHALL display one GitHub link targeting `https://github.com/Markila-BOT` and one LinkedIn link targeting `https://www.linkedin.com/in/mark-escolano-2715ab129/`, between the contact copy and form. Their visible labels SHALL be GitHub and LinkedIn. The links SHALL navigate in the current tab and MUST NOT require hover, login within the portfolio or JavaScript.

#### Scenario: Read and activate profiles
- **WHEN** a visitor views Contact and activates either profile link
- **THEN** its visible label identifies the platform and native navigation opens the corresponding confirmed destination in the current tab

#### Scenario: Scripts unavailable
- **WHEN** page scripts are disabled
- **THEN** both labeled links remain in the initial document and can be activated as ordinary links

### Requirement: Profile links are accessible and responsive

Each profile link SHALL expose its visible platform name to assistive technology and support keyboard activation with visible focus in both themes. Targets SHALL be at least 44×44 CSS pixels and fit the Contact layout at 320px through desktop widths without horizontal overflow. Any accompanying icon SHALL be decorative; labels MUST NOT depend on animation or hover.

#### Scenario: Keyboard traversal
- **WHEN** a visitor tabs through Contact in either theme
- **THEN** GitHub and LinkedIn are separately focusable, visibly focused and activatable by keyboard

#### Scenario: Narrow layout
- **WHEN** Contact is viewed at 320px wide
- **THEN** both labels and minimum-size targets remain usable without horizontal overflow

### Requirement: Existing contact paths remain intact

Adding profile links SHALL preserve the stated hiring preferences, `mailto:mark.escolano14@gmail.com`, existing contact form and introduction's single Contact CTA. The links MUST NOT introduce a floating action bar, third-party widget or additional contact form.

#### Scenario: Existing hiring path
- **WHEN** a visitor follows the introduction Contact CTA
- **THEN** the same Contact section presents preferences, public email, profile links and the existing form
