# Tasks

## 1. Intro shortcut

- [x] 1.1 Preserve the approved intro copy and native same-tab `/tools` link after hiring preferences; add a decorative, assistive-technology-hidden 🛠️ in a focused client link component using installed Framer Motion. Update SSR coverage for readable copy, emoji semantics, order and unchanged Contact behavior.
- [x] 1.2 Add a brief one-shot emoji tilt on hover and keyboard focus, without initial or looping motion, label movement or navigation delay; disable transforms for reduced motion. Verify keyboard/touch activation, light/dark contrast of at least 4.5:1 and 320px/200% wrapping, recording unverified checks explicitly.
- [x] 1.3 Remove the shared footer Tools link and unused import, preserving other footer content. Verify the intro entry with and without JavaScript, absence of footer Tools links on both routes, unchanged header and floating controls, and actual hover/focus/reduced-motion behavior. Refresh `docs/browser-tools.md` and coordinate navigation acceptance with `add-browser-tools`.

- [x] 1.4 Correct the measured existing homepage reflow sources with bounded widths and wrapping, without clipping the document or removing content; verify both project views, contact text and the shortcut at 320px/200% text sizing and record the approved scope extension in `docs/browser-tools.md`.

## 2. Regression checks

- [x] 2.1 Run the full Node tests, including updated Intro dependency mocks in portrait coverage, plus `pnpm lint`, `pnpm exec tsc --noEmit` and `pnpm build`; verify all commands pass without changing the portrait, greeting, Contact behavior or utility implementation.
- [x] 2.2 Smoke-test the production build with `pnpm start`, checking revised intro navigation, emoji interaction, footer removal and existing Tools browser/SEO checks; record results and the build identity in `docs/browser-tools.md`, without deploying or changing the separate accessibility audit's status.
