# Design

## Context

See proposal.md for motivation. `actions/sendEmail.ts` initializes Resend at module scope, hardcodes sender/recipient, validates string lengths only, catches exceptions, and returns the entire resolved SDK response under `data`. Resend 4.8's response union includes a resolved error branch. `components/contact-form.tsx` only checks the action's top-level error, so that branch currently triggers success feedback. Existing node:test tests transpile TypeScript with local module stubs; no new runner is necessary.

The owner reports no domain. Dashboard inspection reached the login page, so the recipient's match to the account email is unverified. Official documentation confirms the shared sender is testing-only and account-recipient restricted. Sources checked 2026-10-08:
- https://resend.com/docs/knowledge-base/403-error-resend-dev-domain
- https://resend.com/pricing

## Goals / Non-Goals

**Goals:** Preserve the server-action boundary and existing form; make successful acceptance and failure unambiguous; allow a no-cost restricted setup without implying production readiness.

**Non-Goals:** Domain registration, DNS changes, paid plans, visitor auto-replies, alternative providers, queues, webhooks, and guaranteed inbox delivery. Abuse protection remains separate work; free-tier quotas are not spam protection.

## Decisions

1. Use `RESEND_API_KEY`, `CONTACT_EMAIL_FROM`, and `CONTACT_EMAIL_TO`, all server-only. Require explicit nonblank values and validate address configuration before constructing the client inside submission processing. `.env.example` supplies placeholders, not real keys. Document `Contact Form <onboarding@resend.dev>` as an explicit testing configuration and the account email as its recipient. No silent fallback to a hardcoded mailbox. Alternatives: leaving addresses hardcoded prevents deployment configuration; buying a domain violates the no-cost boundary.

2. Normalize the SDK result into the existing top-level error contract, returning only minimal success data with an ID. Check `error` first and require nonempty `data.id`. Generic visitor-facing provider/configuration errors avoid leaking operational details. Validate submitted email syntax and trimmed message nonemptiness without adding a validator library, while retaining existing length ceilings and email template. Alternatives: exception-only handling misses resolved failures; returning the raw SDK envelope causes false successes.

3. Preserve pending state and form values after failure. Change success copy to acceptance wording if necessary; success does not prove inbox arrival. Keep `playCue` opt-in behavior unchanged. No automatic acknowledgement: without a domain it would attempt delivery to disallowed visitor recipients.

4. Add isolated node:test coverage using the repository's transpilation/stub pattern for Resend, without network calls or credentials. Verify the unchanged client error/success branching separately during manual form checks. Live testing requires the owner's explicit authorization and account-recipient confirmation.

## Risks / Trade-offs

- [Testing sender is not a production solution] → Keep checklist partial and document optional migration to an owned verified domain; Resend's allowance of custom domains does not supply ownership of one.
- [Account recipient mismatch or free quota exhausted] → Document account-email confirmation and limits; render provider rejection as failure, not success.
- [Public form can consume the free quota] → Document this limitation; do not present this focused change as full production hardening.
- [Provider acceptance differs from delivery] → Use acceptance wording; verify inbox and dashboard manually only for an authorized smoke test.

## Migration Plan

Add safe example configuration and setup instructions, configure server deployment settings, then deploy code after mocked tests and lint/type checks. Missing configuration must not break module import/build. Perform an authorized account-recipient smoke test when access is available. Keep the checklist partial with testing-only status. A future owned verified domain can replace the sender configuration without changing the action. Roll back code independently; never commit secrets or perform account upgrades.

## Open Questions

- Which email belongs to the Resend account? Confirm during setup, without putting private account details in artifacts. The current hardcoded recipient must not be assumed to match.
