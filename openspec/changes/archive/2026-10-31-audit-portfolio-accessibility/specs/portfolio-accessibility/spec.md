# Spec Delta

## Purpose

Make the complete portfolio usable with assistive technology and accessible presentation preferences, with verifiable WCAG 2.1 AA acceptance rather than inferred compliance.

## ADDED Requirements

### Requirement: Full-page conformance is evidence gated

The portfolio SHALL meet every applicable WCAG 2.1 Level A and AA success criterion across the homepage and complete interaction processes. Acceptance SHALL record each criterion as passed, failed, unverified, or not applicable with rationale and evidence. Compliance MUST NOT be marked complete while an applicable criterion fails or remains unverified.

#### Scenario: Audit completion
- **WHEN** the accessibility checklist is reviewed for closure
- **THEN** every A and AA criterion has a justified disposition tied to the tested build, environment, and interaction states, and automated checks alone do not establish compliance

#### Scenario: Missing manual evidence
- **WHEN** a required screen-reader or other manual check cannot be performed
- **THEN** it remains unverified and the compliance item remains open

### Requirement: Controls expose useful names and states

Every interactive control SHALL expose its purpose, role, and applicable state to assistive technology. Accessible names SHALL include visible labels. Expanded controls SHALL reference the panel they own, and inactive panels MUST NOT expose hidden interactive content. Decorative graphics MUST NOT add redundant announcements.

#### Scenario: Explore interactive sections
- **WHEN** a visitor reads or operates navigation, theme, sound, projects, skill evidence, or the journey
- **THEN** controls have meaningful names and current states, panel relationships resolve, and collapsed content does not create duplicate reading or focus stops

### Requirement: Contact submission is accessible throughout

Contact fields SHALL have persistent visible, programmatically associated labels and identify the sender-email input purpose. Required fields and recoverable errors SHALL be understandable without color or placeholder text alone. Pending submission SHALL retain a named control. Success and failure feedback SHALL be announced without forcing focus away and preserve entered data on failure.

#### Scenario: Invalid input
- **WHEN** a visitor submits invalid contact information
- **THEN** the affected input and correction are identifiable to keyboard and screen-reader users without an email being sent

#### Scenario: Pending and resolved submission
- **WHEN** a valid contact request is pending and then succeeds or fails
- **THEN** the submit control remains named, the result is perceivable without sound, acceptance is not described as guaranteed delivery, and failure permits correction or retry

### Requirement: Dynamic content remains navigable

Open overlays and changing content SHALL preserve meaningful heading order, reading order, and logical focus. Project details SHALL expose a named modal, contain focus, and restore focus to a visible opener on dismissal. Neighbor navigation SHALL keep focus inside and make the changed project identifiable without announcing the entire page.

#### Scenario: Project details traversal
- **WHEN** a visitor opens details, changes projects through either endpoint, and dismisses the modal
- **THEN** its title and controls are discoverable, no additional h1 is introduced, focus remains usable, and closing returns to the opener

### Requirement: Presentation meets contrast requirements

Both themes SHALL provide at least 4.5:1 contrast for normal text and 3:1 for large text, subject to WCAG exceptions. Essential control boundaries, states, and graphical information SHALL meet applicable 3:1 non-text contrast. Focus SHALL be visible, and information MUST NOT depend on color alone.

#### Scenario: Rendered theme states
- **WHEN** content, controls, focus, and feedback are inspected in either theme
- **THEN** contrast measurements account for actual backgrounds, gradients, transparency, and applicable exceptions rather than token values alone

### Requirement: Resizing preserves content and operation

The homepage and its overlays SHALL remain usable at 200 percent text enlargement, at a 320 CSS-pixel width, and with WCAG text-spacing overrides. Content MUST NOT be lost, controls clipped, or two-dimensional scrolling required except for legitimately exempt content. Orientation MUST NOT be restricted without necessity.

#### Scenario: Narrow and enlarged layout
- **WHEN** a visitor enlarges text, uses a 320 CSS-pixel viewport, or applies text-spacing overrides
- **THEN** navigation, project details, skill evidence, journey, and contact controls retain their content and operation

### Requirement: Motion and media do not create barriers

Moving or auto-updating content SHALL provide pause, stop, hide, or update-frequency control where WCAG 2.2.2 applies. Flashing SHALL remain within WCAG thresholds. Reduced-motion behavior SHALL remain intact. Media SHALL expose accessible controls and required captions, audio description, or alternatives according to its actual content; sound MUST NOT be the only feedback channel.

#### Scenario: Automatic role updates
- **WHEN** a visitor views the automatic role loop without a reduced-motion preference
- **THEN** applicable pause or update controls are available without disabling the default loop for other visitors, and timed changes do not cause repeated screen-reader announcements

#### Scenario: Project media and greeting
- **WHEN** a visitor plays project media or activates a greeting transition
- **THEN** media alternatives satisfy applicable criteria, greeting language is identifiable where required, and transition flashing and reduced-motion behavior are verified

### Requirement: Screen-reader compatibility is manually verified

Acceptance SHALL include real screen-reader reading and interaction checks on desktop and mobile with recorded browser, assistive-technology version, steps, and results. DOM or accessibility-tree inspection MUST NOT be reported as a substitute for actual screen-reader testing.

#### Scenario: Complete assistive-technology walkthrough
- **WHEN** a tester uses desktop and mobile screen readers through the homepage, menu, project views, skill evidence, journey, and contact feedback
- **THEN** content and states are understandable, focus and announcements support completion, and any unsupported or untested environment is explicitly documented
