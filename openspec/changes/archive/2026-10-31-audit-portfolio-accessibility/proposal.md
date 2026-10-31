# Proposal

## Why

The accessibility checklist targets WCAG 2.1 AA, but current evidence covers keyboard navigation only. Contact fields rely on placeholders, the pending submit button loses its text, and the open project drawer adds an h1; comprehensive screen-reader, contrast, and full-page acceptance remain unverified.

## What Changes

- Audit every WCAG 2.1 Level A and AA criterion against the complete homepage and its interactive states, recording applicability, failures, remediation, and evidence.
- Remediate confirmed barriers in labels, accessible state, headings, focus, form feedback, contrast, resizing, motion, and media without replacing existing interactions.
- Verify both themes, compact and desktop layouts, keyboard flows, and manual screen-reader operation, including the contact submission process with safe fixtures.
- Keep untested criteria and deployed checks explicitly pending; automated results alone cannot close the compliance checklist.

## Capabilities

### New Capabilities

- `portfolio-accessibility`: Full-page accessible presentation and interaction, with criterion-level conformance evidence and honest completion gates.

### Modified Capabilities

None. Existing accessible-navigation, portfolio-discovery, greeting, role-loop, drawer, and contact contracts remain authoritative; this adds cross-page requirements without replacing their scenarios.

## Impact

Likely implementation surfaces include contact-form, submit-btn, ui/field, project-details-drawer, carousel/rail, skill panels, experience journey, greeting/role motion, media, shared primitives, and theme tokens. Extend existing Node tests and HTML checks, add reproducible browser audit tooling and an accessibility evidence document, then update CHECKLIST.MD only to the extent verified. Preserve Next 14/React 18, pnpm, Radix/Vaul, Embla, and server-first rendering; no runtime accessibility library, redesign, deployment, or real email send is authorized by this proposal.
