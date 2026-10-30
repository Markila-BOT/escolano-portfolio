# Proposal

## Why

The Tools page needs one subtle discovery point beneath the homepage's Contact action. Replace the duplicate footer shortcut with a playful intro link while keeping the header unchanged.

## What Changes

- Add the sentence "Something to get done? Try the free tools." below the existing Contact action and hiring-preference text in the introduction.
- Make "Try the free tools" a subtle, permanently visible inline link to `/tools`, opening in the same tab.
- Preserve Contact as the only hiring start action. Clarify the existing intro specification so its single-CTA wording permits this secondary utility link.
- Add a decorative 🛠️ beside the link label with brief hover and keyboard-focus feedback, disabled for reduced motion. Keep the label visible and navigation immediate.
- Remove the footer Tools link. Keep the header, floating theme/sound controls, hiring copy and utility behavior unchanged.
- Include the user-approved Tools secondary-button dark-theme contrast correction found during final regression, using existing semantic foreground tokens without changing utility behavior.
- Include the user-approved homepage reflow correction for existing controls and unbroken text that overflow at 320px with 200% text sizing. Preserve content and functionality without suppressing document overflow.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `intro-call-to-action`: Allow a secondary Tools shortcut below the existing hiring action, with readable copy and native keyboard navigation.

## Impact

Implementation touches `components/intro.tsx`, a focused client link component using installed Framer Motion, `components/footer.tsx`, intro copy in `lib/data.ts`, focused regression tests and `docs/browser-tools.md`. The approved reflow extension also touches the homepage text-wrapping boundary and project, skill and experience control layout. No new dependencies, client state, tooltip, popup, floating control, or header entry are needed. This depends on `/tools` from the unarchived `add-browser-tools` change, whose navigation artifacts are reconciled to remove the footer requirement; utility behavior and crawler discovery remain unchanged.
