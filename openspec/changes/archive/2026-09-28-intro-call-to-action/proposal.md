# Proposal

## Why

The introduction names Mark and a frontend focus, then stops. A visitor never sees who the work is for, that the work runs through deployment, or a way to start. Contact, the email, and the CV sit only at the bottom of the page.

## What Changes

- The introduction states who the work is for: product teams that need end-to-end implementation through deployment.
- The role phrase names the approach: new code, with AI, spec-driven development, and TypeScript. It replaces the line that says the focus is frontend technologies.
- The introduction offers one way to start: a link to the existing contact section (`#contact`), where the form, email, and CV already live.
- The start control is a link, uses the shared pill button, and keeps the same contrast and focus treatment as other pill controls.
- Neighboring introduction items stay open: the one-line positioning line, the greeting animation, cycling role titles, and an interactive hero.

## Capabilities

### New Capabilities

- `intro-call-to-action`: The introduction names the audience and the approach, and gives one path into the existing contact section.

### Modified Capabilities

- None. `uniform-components`, `unified-theme`, and `accessible-navigation` requirements stay as they are. The start control reuses the shared pill button and the existing contact target.

## Impact

- `components/intro.tsx` replaces the frontend-focus span with the approach phrase, and keeps the audience line and the start link
- Copy lives in `lib/data.ts`, with the rest of the portfolio copy
- The link sets the same click timestamp the header uses, so the section observer does not fight the jump to contact
- No new dependency, form, or email address
