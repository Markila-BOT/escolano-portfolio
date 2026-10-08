# Proposal

## Why

The portfolio uses Resend's testing sender and the owner has no domain. The server action also treats resolved provider errors as success, so visitors can receive a success notification even when Resend rejects a message.

## What Changes

- Retain Resend and React Email without paid services or new dependencies.
- Configure the server-only API key, sender, and recipient through documented environment variables. Support the shared testing sender only for the email associated with the Resend account; do not describe it as production-ready.
- Return success only when Resend accepts a message and supplies its ID; handle returned errors, thrown exceptions, missing configuration, and invalid input without exposing provider details to visitors.
- Preserve visitor email as Reply-To, existing pending state, and success/error feedback. Do not send visitor acknowledgements.
- Document the free-tier limitations, account-recipient verification, and optional future migration to an owned verified domain. Keep the checklist partial until production-domain delivery is verified.

## Capabilities

### New Capabilities

- `contact-email`: Server-side contact delivery, configuration, input validation, and accurate submission feedback.

### Modified Capabilities

None. Existing interaction sound requirements continue to apply.

## Impact

Targets `actions/sendEmail.ts`, `components/contact-form.tsx` only if feedback wording needs adjustment, focused tests, `.env.example`, setup documentation, and `CHECKLIST.MD`. No DNS changes, domain purchases, account upgrades, credentials in artifacts, or automatic live-email tests. The dashboard redirected to login during inspection; its plan, account email, and delivery history are unverified.
