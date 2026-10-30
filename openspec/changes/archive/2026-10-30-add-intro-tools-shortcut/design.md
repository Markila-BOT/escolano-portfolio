# Design

## Context

See proposal.md for the requested change. `components/intro.tsx` renders the portrait, greeting, positioning sentence, Contact link and hiring preferences. It is a server component; `IntroContactLink` owns the existing contact-navigation state. Portfolio copy lives in `lib/data.ts`. Tools already exists at `/tools` and is linked from the footer.

The existing intro spec says there is one start control and its contact scenario excludes a second CTA. The delta makes that a single hiring action and expressly permits the approved utility link. This clarification warrants a short design document despite the small implementation.

## Goals / Non-Goals

Keep the existing intro hierarchy and server rendering. Add a useful link without changing how visitors contact Mark.

Header entries, floating controls, hover messages, popups, dismiss buttons, timers, new utility features and a new visual identity are outside this change. The separate `add-browser-tools` implementation must remain present; archiving it is a separate workflow.

## Decisions

### Keep the sentence visible below hiring preferences

Add a small paragraph after the current hiring-preference paragraph in `Intro`. Store the prompt "Something to get done?" and link label "Try the free tools" with the intro copy in `lib/data.ts`. Render the trailing period as punctuation outside the link. This yields the approved sentence without turning the full paragraph into a large click target.

Use a native anchor with `href="/tools"`. Its visible label is its accessible name. Add a decorative 🛠️ inside the link, hidden from assistive technology with `aria-hidden`. Keep Intro server-rendered and isolate motion in a small client link component using installed Framer Motion. No navigation interception, active-section update, timers or application state are needed. Native navigation works before hydration and without JavaScript. A tooltip would hide the message until interaction; a floating control would compete with existing sound and theme controls.

### Offer brief emoji feedback and remove duplicate navigation

Animate only the emoji with a small, one-shot tilt lasting roughly 300–400ms on pointer hover and keyboard focus. Keep the label and hit target stationary. Do not loop, animate on initial paint, delay navigation or require a first tap to reveal content. Touch activation follows the link immediately. Disable transforms when reduced motion is requested, retaining the underline and focus indicator. Static server HTML remains usable without JavaScript.

This follows [MDN reduced-motion guidance](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion) and [W3C guidance on animation from interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions). The latter is an AAA criterion, used as design guidance rather than an AA compliance claim. A continuously bouncing emoji was rejected because it competes with the Contact action.

Remove the shared footer Tools link and its unused import while preserving copyright and other footer content. The intro is the homepage entry point; the header remains section navigation. Reconcile this with `add-browser-tools`, which previously required a footer link.

### Keep Contact visually primary

Use a small text size and existing semantic colors. Give the Tools link a persistent underline, comfortable inline padding and a clear focus treatment; leave Contact's filled pill unchanged. Let the sentence wrap naturally. Limit motion to the decorative emoji and do not add a paid/free badge. The word "free" describes the existing tools, which require no account or payment in the implemented flow.

Check contrast over the actual intro glow in both themes. The Tools work found that the dark muted token can fall below 4.5:1 over a glow, so prefer the existing foreground token for dark text if needed. Do not change global colors for this link.

### Keep verification focused on the intro

Extend the existing TypeScript-transpilation/SSR test pattern to exercise the real Intro with updated dependency mocks. Assert the approved readable copy, one intro `/tools` link, decorative emoji semantics, ordering after Contact/preferences, native link semantics and unchanged Contact destination. Verify no footer Tools link on either route and unchanged header contents. Browser checks cover hover/focus feedback, reduced-motion suppression, touch activation, native navigation, no-JavaScript rendering, contrast and 320px/200% reflow. Record results in `docs/browser-tools.md` without expanding the separate accessibility audit's completion claims.

## Risks / Trade-offs

The user also approved correcting the Tools secondary-button contrast failure found during final regression. Scope the brighter dark foreground to secondary utility buttons, using `cn` and existing tokens; keep global tokens and utility behavior unchanged. Rerun the existing Tools interaction, privacy, accessibility and navigation suite before closing the final regression task.

The user approved extending implementation to the existing homepage reflow failure. Correct the measured causes through wrapping and bounded control widths; preserve project navigation, text and contact behavior. Do not hide the document's overflow or remove content. A concurrent portfolio dev server writes `.next`, so production verification can use a temporary source snapshot with its own build directory and linked existing dependencies. Record that isolation and the tested build identity in the evidence.

- A utility link can distract from hiring contact. Keep its smaller unfilled treatment and placement below the existing hiring copy.
- The single-CTA wording can conflict when specs are synchronized. Preserve the existing scenario names and explicitly distinguish hiring actions from utility navigation in the delta.
- Extra hero content can change first-viewport layout. Verify the Contact link and hiring preferences remain visible and readable at narrow sizes; do not hide the shortcut to recover space.

## Migration Plan

No data migration or dependency update is required. Ship the intro link, emoji interaction and footer removal together with their tests. Preserve the already verified reflow corrections. Rollback restores the prior static shortcut and footer navigation without reverting utility or reflow work. No deployment or archive is authorized by this planning request.
