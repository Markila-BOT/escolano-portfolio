# Proposal

## Why

The introduction already leads to Contact, but recruiters cannot see which engagements and locations Mark is open to. The owner confirmed full-time and contract/freelance work, remote or Philippines-based, with `mark.escolano14@gmail.com` as the public contact address.

## What Changes

- Add concise, static availability copy near the introduction's existing Contact link and in the Contact section: "Open to full-time roles and contract/freelance work, remote or based in the Philippines."
- Keep the existing single introduction CTA and positioning sentence; do not add a second hiring button or form.
- Keep a readable direct email link to `mark.escolano14@gmail.com`, alongside the existing contact form and CV control.
- Centralize hiring/contact copy in `lib/data.ts` and mark the hiring-path checklist item complete only after verification.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `intro-call-to-action`: Add visible engagement/location preferences and a direct public email at the existing contact destination without changing the single start path.

## Impact

`lib/data.ts`, `components/intro.tsx`, `components/contact.tsx`, focused static-render checks, and `CHECKLIST.MD`. No new dependencies, routes, forms, availability animation, scheduling service, response-time promise, immediate-start claim, or change to the server-only Resend recipient. The public mailbox and form-delivery mailbox intentionally differ.
