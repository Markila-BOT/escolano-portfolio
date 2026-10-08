# Contact email

The portfolio uses its existing Resend server action and React Email template. No new service, paid plan, domain purchase, or Resend dashboard change is required for the restricted testing setup.

## Configuration

Copy `.env.example` to `.env.local` and set these server-only values. Configure the same values in your deployment provider's environment settings and redeploy:

| Setting | Value |
| --- | --- |
| `RESEND_API_KEY` | Your existing Resend API key; never commit or expose it with `NEXT_PUBLIC_` |
| `CONTACT_EMAIL_FROM` | `Contact Form <onboarding@resend.dev>` for testing |
| `CONTACT_EMAIL_TO` | Your Resend account email; the owner confirmed the existing portfolio recipient matches their account |

Missing or malformed settings return a safe submission error; they do not prevent importing the action or building the site. There is no silent hardcoded address fallback. Sender and recipient fields supplied by a visitor cannot override deployment settings.

## No-domain limitations

The shared sender is **testing-only** and sends only to the email associated with your Resend account. Visitors' email addresses are Reply-To, not recipients, so there are no visitor acknowledgements. Do not describe this setup as production-ready.

Resend's free tier has a 100-email daily limit and supports three custom domains, but that allowance does not provide ownership of a domain. Check current monthly quotas and account usage before deployment. Public form abuse can exhaust the quota; quota limits are not spam protection. Sources checked 2026-10-08: [pricing](https://resend.com/pricing) and [shared-domain restrictions](https://resend.com/docs/knowledge-base/403-error-resend-dev-domain).

For production later, obtain a domain you control, verify the DNS records Resend supplies, and change `CONTACT_EMAIL_FROM` to an address on that verified domain. The email checklist remains partial until verified-domain delivery is demonstrated. No domain or subscription has been purchased by this change.

## Submission behavior

The action rejects non-string fields, malformed/overlong emails, blank messages, and messages longer than 5000 characters before delivery. A valid email becomes Reply-To and the message retains the existing template. Resolved SDK errors, exceptions, and missing message IDs produce generic failure feedback. Only an accepted message with an ID reports success; acceptance is not proof of inbox delivery.

The existing pending submit button and opt-in sound behavior remain in place. Failure leaves the visitor's inputs available to retry.

## Verification

Run `node --test tests/contact-email.test.cjs`, `pnpm lint`, and `pnpm exec tsc --noEmit`. All automated email tests use a mocked provider and never send email or require real credentials.

Implementation checks passed: isolated action and form-feedback tests, lint, TypeScript, and a production build with all three email settings explicitly empty. Mocked form checks cover accepted/rejected feedback, deferred responses, retained submission values, and both sound preference states. Browser-level pending/input checks below remain a manual regression guide, not a claim of live browser verification.

Manual form regression checks:
1. Submit valid values with the server action mocked to return an accepted ID; expect acceptance feedback and no claim of inbox delivery.
2. Mock a returned provider error, a thrown exception, and a missing ID; expect failure feedback and retained input, never success feedback.
3. Repeat with sound off/on; off must remain silent and on must use only the matching success/error cue.
4. Hold the mocked response pending; verify Submit is disabled until completion and keyboard access to the remaining form controls still works.

### External delivery gate

The owner confirmed the current recipient belongs to their Resend account. Dashboard inspection reached login; dashboard history, inbox receipt, and Reply-To behavior have **not** been independently verified. No live test was authorized or sent. With explicit authorization later, submit one non-sensitive test message, check dashboard acceptance and inbox receipt, and verify replying targets the test visitor address. Keep this gate pending until evidence is available; it is separate from automated code verification.
