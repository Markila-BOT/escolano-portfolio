# Design

## Context

Contact already lists GitHub and LinkedIn with visible labels. `components/cv.tsx` opens `https://escolano-cv.vercel.app/` in a new tab via `window.open`. Theme and sound switches are fixed at the bottom right. The header is fixed at the top. `professional-social-links` currently forbids a floating action bar; this change amends that requirement.

## Goals / Non-Goals

**Goals:**

- A persistent bar with CV, GitHub, and LinkedIn.
- Hover and focus labels, 44px targets, no overlap at 320px.
- Contact's own links and CV button stay.

**Non-Goals:**

- A PDF download, a new CV file, or replacing `window.open` on the existing button in this change.
- A third-party social widget.

## Decisions

### Left edge on wide viewports, inline row when narrow

Render the bar from `app/page.tsx` as a server component of links, with a small client child only if hover motion needs Framer Motion. Prefer CSS `:hover` and `:focus-visible` so the labels do not require a client component.

Wide layout: fixed to the left, vertically centered, below the header. Narrow layout, under 640px: a static row at the end of the header flow or at the top of Contact's action area that is not `position: fixed` over the theme switch. Do not cover `components/theme-switch.tsx` or `components/sound-switch.tsx`.

### Same destinations, real links

Read `professionalSocialLinks` from `lib/data.ts`. CV `href` is `https://escolano-cv.vercel.app/` with `target="_blank"` and `rel="noopener noreferrer"`. Visible text is "CV", "GitHub", and "LinkedIn". Icons from `react-icons` are `aria-hidden`. The accessible name is the visible text, not a tooltip-only string.

### Contact button stays

Do not remove `CVButton` from `components/contact-form.tsx`. The intro spec still matches that control.

## Risks / Trade-offs

- The checklist says "CV download". This bar navigates to the CV site because no CV file exists. A later change can add a file without redesigning the bar.
- Fixed positioning can collide with the mobile menu. The menu is full-screen and above the bar in z-index; verify the bar is not focusable while the menu is open, or hide it while `aria-expanded` is true on the menu button.
