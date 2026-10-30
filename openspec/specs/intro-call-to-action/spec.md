# intro-call-to-action Specification

## Purpose

Tell a visitor, in the introduction, who the work is for, that it runs through deployment with a stated approach, and give them one way to start that reaches the contact section already on the page.

## Requirements

### Requirement: Introduction names the audience and the approach

The introduction SHALL state, in one sentence, who the work is for and what gets built. That sentence SHALL say the work is for product teams and runs through deployment, that the approach is new code with AI and spec-driven development, and that most of that code is TypeScript. The sentence SHALL be readable without hovering or animating the greeting, in both light and dark mode. The introduction MUST NOT repeat either claim in a second sentence.

#### Scenario: Audience and approach are visible on load

- **WHEN** the visitor views the introduction in either theme
- **THEN** they can read one sentence that the work is for product teams and runs through deployment, that the approach is new code with AI and spec-driven development, and that most of that code is TypeScript, without interacting with the greeting

#### Scenario: One positioning sentence

- **WHEN** the visitor reads the introduction
- **THEN** who the work is for and what gets built appear in a single sentence, and neither claim is repeated in another sentence in the introduction

### Requirement: Introduction offers one way to start

The introduction SHALL offer one hiring start control. Activating it SHALL bring the existing contact section into view, including the contact form. That control MUST NOT open a second form, a new email address, or a new page. A separate secondary Tools link SHALL be permitted as utility navigation, without adding another hiring start path.

#### Scenario: Start reaches contact
- **WHEN** the visitor activates the start control
- **THEN** the contact section is shown and the contact form is available there

#### Scenario: One start path
- **WHEN** the visitor views the introduction
- **THEN** there is a single hiring start control, it does not add another form or email address, and the separate Tools shortcut is identified as utility navigation

### Requirement: Start control is a named link

The start control SHALL be a link the visitor can reach and activate with the keyboard. Its accessible name SHALL say that it goes to contact. It SHALL keep a visible focus treatment in both themes, and it SHALL match the CV control in fill, text, and shape.

#### Scenario: Keyboard activation

- **WHEN** the visitor moves keyboard focus to the start control and activates it
- **THEN** focus is visible on the control before activation, and activation shows the contact section

#### Scenario: Start control matches the CV control

- **WHEN** the visitor views the start control and the CV control in either theme
- **THEN** both match in fill, text, and shape

### Requirement: Hiring preferences are visible

The introduction and Contact section SHALL state that Mark is open to full-time roles and contract/freelance work, remote or based in the Philippines. This copy SHALL be readable without interaction or JavaScript in both themes. It MUST NOT imply immediate availability, relocation outside the Philippines, or a guaranteed response time.

#### Scenario: Recruiter reads preferences
- **WHEN** a visitor reads the introduction or Contact section
- **THEN** both engagement types and the remote or Philippines-based preference are visible as real text

#### Scenario: Scripts disabled
- **WHEN** JavaScript is unavailable
- **THEN** the hiring preferences remain present in the page's semantic text

### Requirement: Hiring contact preserves the public mailbox

The existing Contact section SHALL display `mark.escolano14@gmail.com` as a named, keyboard-operable mailto link alongside the existing form. The introduction SHALL retain its single Contact start link and existing positioning sentence. Public contact copy MUST NOT expose or replace the separately configured form-delivery recipient. The secondary Tools shortcut SHALL leave this hiring contact path unchanged.

#### Scenario: Direct email contact
- **WHEN** a visitor activates the public email link
- **THEN** the link targets `mailto:mark.escolano14@gmail.com`

#### Scenario: Existing start path
- **WHEN** a visitor activates the introduction's Contact link
- **THEN** it reaches the existing Contact section with preferences, public email, and the same contact form, without introducing a second hiring CTA or form

### Requirement: Introduction includes a secondary Tools shortcut

The homepage introduction SHALL display "Something to get done? Try the free tools." beneath Contact and hiring preferences. "Try the free tools" SHALL be a native same-tab `/tools` link beside a decorative 🛠️ hidden from assistive technology. Copy and navigation SHALL remain available without interaction or JavaScript. Tools links MUST NOT appear in the header, shared footer or floating overlays.

#### Scenario: Discover Tools from the introduction
- **WHEN** a visitor reads the homepage introduction
- **THEN** the sentence appears below the hiring actions, and activating "Try the free tools" reaches `/tools` in the same tab

#### Scenario: JavaScript unavailable
- **WHEN** the homepage is loaded with JavaScript disabled
- **THEN** the sentence and native Tools link remain readable and usable

#### Scenario: Other navigation stays unchanged
- **WHEN** the shortcut is added
- **THEN** the header has no Tools entry, no floating Tools control appears, and the shared footer has no Tools link on either route while its other content remains

### Requirement: Tools shortcut is understated and accessible

The shortcut SHALL use a smaller, unfilled inline-link treatment below the primary Contact action, with a persistent non-color link cue and visible keyboard focus. Text SHALL meet 4.5:1 contrast in both themes. At 320 CSS pixels and 200% text sizing it SHALL wrap without page overflow or obscuring other controls. Reduced motion SHALL leave it immediately available.

#### Scenario: Keyboard navigation
- **WHEN** a visitor tabs through the introduction and activates the Tools shortcut with Enter
- **THEN** its visible text provides its accessible name, focus is visible, and native navigation reaches `/tools`

#### Scenario: Theme and text-size preferences
- **WHEN** the introduction is viewed in either theme, including reduced motion and enlarged text at a narrow viewport
- **THEN** the shortcut remains readable and operable, its focus indicator is visible, and Contact remains the primary action

### Requirement: Emoji feedback is optional and bounded

The shortcut SHALL offer a brief, one-shot emoji tilt on pointer hover and keyboard focus. It MUST NOT animate on initial paint, loop, move the label or hit target, delay navigation, or require a reveal tap. Reduced-motion preferences SHALL disable transforms while retaining visible focus and the underline.

#### Scenario: Hover and focus feedback
- **WHEN** a visitor hovers or keyboard-focuses the link without reduced motion
- **THEN** only the decorative emoji briefly tilts and settles, and activation immediately navigates to `/tools`

#### Scenario: Reduced motion and touch
- **WHEN** reduced motion is enabled or a touch visitor activates the link
- **THEN** reduced motion produces no tilt, and touch activation follows the link immediately without a preliminary reveal interaction
