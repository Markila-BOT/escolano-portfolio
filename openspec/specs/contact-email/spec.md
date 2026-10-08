# contact-email Specification

## Purpose

Let portfolio visitors submit contact messages with truthful feedback while keeping email credentials and delivery configuration on the server.

## Requirements

### Requirement: Delivery is configured on the server

The system SHALL use server-only credentials, sender, and recipient configuration. Missing or invalid configuration SHALL fail gracefully without contacting the provider or exposing credentials. Visitors MUST NOT control the delivery recipient or From address.

#### Scenario: Missing configuration
- **WHEN** a required delivery setting is absent
- **THEN** submission returns a safe error without attempting delivery

#### Scenario: Visitor attempts to override recipient
- **WHEN** a submission includes a recipient or From field
- **THEN** only server-configured addresses are used

### Requirement: Contact inputs are validated before delivery

The system SHALL reject non-string fields, blank messages, malformed email addresses, emails longer than 500 characters, and messages longer than 5000 characters before attempting delivery. Valid visitor email SHALL be used as Reply-To, not as From.

#### Scenario: Invalid contact input
- **WHEN** a submitted field violates any input constraint
- **THEN** the visitor receives a validation error and no email is sent

#### Scenario: Valid contact input
- **WHEN** a visitor submits a valid email and nonblank message within the limits
- **THEN** delivery uses that email as Reply-To and includes the message in the existing email template

### Requirement: Submission feedback reflects provider acceptance

The system SHALL report success only after provider acceptance with a nonempty message identifier. Returned provider errors, exceptions, and responses without an identifier SHALL produce safe failure feedback. Success SHALL describe submission acceptance, not guaranteed inbox delivery. Existing pending and opt-in sound behavior SHALL remain intact.

#### Scenario: Provider accepts the email
- **WHEN** the provider returns a message identifier without an error
- **THEN** the visitor sees success feedback and the success cue follows their sound preference

#### Scenario: Provider rejects or fails
- **WHEN** the provider returns an error, throws, or omits a message identifier
- **THEN** the visitor sees failure feedback without raw provider details and never receives a success cue

### Requirement: No-domain setup is documented honestly

Setup documentation SHALL identify the shared sender as testing-only and restricted to the account email. It SHALL explain free-plan limits and future owned-domain verification without requiring purchases or upgrades. Production email readiness SHALL remain partial until verified-domain delivery has been demonstrated.

#### Scenario: Owner has no domain
- **WHEN** the owner follows no-domain setup instructions
- **THEN** they configure their Resend account email as recipient and understand the testing restriction and remaining production prerequisite
