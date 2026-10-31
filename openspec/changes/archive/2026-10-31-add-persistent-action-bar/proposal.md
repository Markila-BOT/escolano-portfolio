# Proposal

## Why

CV, GitHub, and LinkedIn are easy to miss once the visitor scrolls past Contact. The checklist asks for a persistent bar whose labels appear on hover, matching the reference pattern, without removing the contact paths that already exist.

## What Changes

- Add a persistent bar with three actions: CV, GitHub, and LinkedIn.
- CV goes to `https://escolano-cv.vercel.app/`, the destination `CVButton` already opens. Do not generate a PDF. A file download waits until the owner adds a real CV file in a later change.
- GitHub and LinkedIn use the same URLs as Contact. Labels are visible on hover and on keyboard focus, and are not the only way to name the control.
- Keep the Contact profile row, the contact form, the hiring copy, and the Contact-form CV button.
- On a 320px viewport the bar must not cover the theme switch, the sound switch, or the page content.

## Capabilities

### New Capabilities

- `persistent-action-bar`: A page-level bar for CV and the two professional profiles, including hover labels, focus, and narrow layout.

### Modified Capabilities

- `professional-social-links`: Allow that bar while Contact keeps its own always-visible GitHub and LinkedIn links. Remove the current ban on a floating action bar.

## Impact

New section-level component, `app/page.tsx` or the layout, and `lib/data.ts` only if the bar reuses the existing profile list. Theme and sound switches stay at the bottom right. No new icon package, widget, or analytics. `intro-call-to-action` stays as written because the Contact-form CV control remains the one the intro button matches.
