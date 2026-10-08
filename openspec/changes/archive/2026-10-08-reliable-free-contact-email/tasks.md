# Tasks

## 1. Server configuration and validation

- [x] 1.1 Read and validate server-only `RESEND_API_KEY`, `CONTACT_EMAIL_FROM`, and `CONTACT_EMAIL_TO` inside submission processing before constructing Resend; add mocked node:test coverage proving missing/invalid settings fail safely, module import tolerates missing settings, and submitted From/recipient overrides are ignored.
- [x] 1.2 Validate non-string fields, email syntax/length, and blank/overlong messages while retaining Reply-To and the React Email template; verify boundary, invalid-input, and valid-payload tests without network requests.
- [x] 1.3 Add `.env.example` and `docs/contact-email.md` with secret-free placeholders, account-email-only testing setup, deployment configuration, free-tier limits, and optional owned-domain migration; verify every documented setting matches code and no real key is present.

## 2. Accurate feedback

- [x] 2.1 Normalize returned provider errors, exceptions, and missing IDs into safe top-level failures; return minimal success data only for provider acceptance; verify mocked tests for success, resolved rejection, thrown failure, and malformed responses.
- [x] 2.2 Preserve existing pending and opt-in sound behavior, retain form input on failure, and use acceptance-based success wording; verify form feedback for mocked acceptance/failure and sound-on/off states, and document those manual checks in `docs/contact-email.md`.
- [x] 2.3 Update `CHECKLIST.MD` to retain partial status with the no-domain/testing-only limitation and link setup documentation; verify it does not claim production-domain delivery or change unrelated progress counts.

## 3. Integration checks

- [x] 3.1 Run the focused email tests, `pnpm lint`, `pnpm exec tsc --noEmit`, and a production build without email credentials; record results and verify no test sends real email.
- [x] 3.2 Record the account-recipient/live-delivery verification gate in `docs/contact-email.md`: if the owner supplies account access and explicitly authorizes a test message, confirm the recipient matches the account, check dashboard acceptance and inbox receipt, and verify Reply-To; otherwise explicitly record the external check as pending, never fabricated or production-ready.
