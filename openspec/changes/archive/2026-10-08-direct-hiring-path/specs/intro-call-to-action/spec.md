# Spec Delta

## ADDED Requirements

### Requirement: Hiring preferences are visible

The introduction and Contact section SHALL state that Mark is open to full-time roles and contract/freelance work, remote or based in the Philippines. This copy SHALL be readable without interaction or JavaScript in both themes. It MUST NOT imply immediate availability, relocation outside the Philippines, or a guaranteed response time.

#### Scenario: Recruiter reads preferences
- **WHEN** a visitor reads the introduction or Contact section
- **THEN** both engagement types and the remote or Philippines-based preference are visible as real text

#### Scenario: Scripts disabled
- **WHEN** JavaScript is unavailable
- **THEN** the hiring preferences remain present in the page's semantic text

### Requirement: Hiring contact preserves the public mailbox

The existing Contact section SHALL display `mark.escolano14@gmail.com` as a named, keyboard-operable mailto link alongside the existing form. The introduction SHALL retain its single Contact start link and existing positioning sentence. Public contact copy MUST NOT expose or replace the separately configured form-delivery recipient.

#### Scenario: Direct email contact
- **WHEN** a visitor activates the public email link
- **THEN** the link targets `mailto:mark.escolano14@gmail.com`

#### Scenario: Existing start path
- **WHEN** a visitor activates the introduction's Contact link
- **THEN** it reaches the existing Contact section with preferences, public email, and the same contact form, without introducing a second CTA or form
