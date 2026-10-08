# Design

## Context

See proposal.md for scope. Intro and Contact are existing server components; `IntroContactLink` already handles the single section jump. `lib/data.ts` owns intro copy, while Contact currently hardcodes its public email. Existing `tests/portfolio-html.py` checks production HTML. The intro spec forbids duplicate positioning claims and multiple start controls, so availability must be distinct supporting text.

## Goals / Non-Goals

**Goals:** Add owner-approved preferences to existing surfaces with minimal layout changes and consistent content ownership.

**Non-Goals:** New CTAs, forms, client state, status indicators, scheduling tools, email infrastructure changes, or claims about start dates and response speed.

## Decisions

- Add a shared hiring/contact data object in `lib/data.ts` with the availability sentence and public email. Render the same preferences near the existing intro CTA and above the contact methods. Preserve the current positioning sentence verbatim. Reusing plain text is preferable to an animated availability badge, which would add unrequested state and suggest live status.
- Keep `mark.escolano14@gmail.com` as the public mailto destination and keep Resend recipient configuration untouched. Different public and delivery mailboxes are intentional, not a mismatch to correct.
- Reuse existing paragraph and semantic color-token patterns. No new component abstraction or dependency is needed. Preserve heading hierarchy, link focus styling, form, and CV control.
- Extend production HTML assertions to check hiring copy in both sections, exact mailto destination, and a single intro contact path. Record narrow/wide viewport and theme checks in a short hiring-path verification document.

## Risks / Trade-offs

- [Preferences may change] → Keep the approved sentence in one content source; do not promise an immediate start.
- [Additional intro copy increases height] → Use compact supporting text; verify 320px and desktop layouts without hiding copy or duplicating positioning claims.
- [Two mailboxes could be confused during implementation] → Explicitly test the public destination; do not modify deployment or delivery configuration.
