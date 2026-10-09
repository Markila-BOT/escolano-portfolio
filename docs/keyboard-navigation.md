# Keyboard navigation verification

## Implementation

The compact navigation uses the existing Radix Dialog package through the shared React 18 ref-forwarding primitive. It has a named Main navigation dialog, an internal Close menu control, primitive-managed Tab containment, Escape dismissal, background isolation and compact-trigger focus restoration. Section links retain native hash navigation and existing active-section/sound callbacks. Desktop transition resets menu state and directs modal focus to a visible desktop link without restoring to a removed trigger.

A native Skip to main content anchor precedes the header and targets `main#main-content[tabindex="-1"]`. It becomes visible on focus, uses theme tokens and does not require JavaScript. Menu entrance motion is disabled for reduced-motion preferences.

## Verification status

Verified on 2026-10-08 against an isolated Next 14 production build on port 3100 using the Codex in-app browser. Mobile viewport: 390×844; desktop: 1024×844. Five focused tests and all 28 Node tests pass. `pnpm lint`, TypeScript no-emit checks, Prettier checks and isolated production build/type/static-generation checks pass; the extended production HTML regression check also passes. No new dependencies or application changes outside navigation/skip-link scope were introduced.

| Case                                               | Observed result                                                                                                                             |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| First Tab and skip activation, hydrated production | Skip link receives focus; Enter sets `#main-content` and focuses main; next Tab reaches the greeting button inside main                     |
| Enter / Space on Open menu                         | Dialog opens and Close menu receives focus                                                                                                  |
| Semantics                                          | `role=dialog`, `aria-modal=true`, labelled by Main navigation; background content absent from the open-modal accessibility tree             |
| Focus wrapping                                     | Shift+Tab from Close menu reaches Contact; Tab returns to Close menu; another Tab reaches Home                                              |
| Escape / close-button activation                   | Dialog disappears and Open menu receives focus                                                                                              |
| Projects link                                      | Hash becomes `#projects`, project section top settles at 112px; focus returns to Open menu                                                  |
| Open-menu resize to 1024px                         | Dialog removed; focus moves to Projects desktop link; subsequent resize to 390px leaves Open menu collapsed                                 |
| Closed resize                                      | Desktop/mobile navigation switches without reopening a modal                                                                                |
| Light and dark                                     | Close control and links match `:focus-visible`; screenshots show the focus ring and token-based surfaces                                    |
| Desktop About link                                 | Keyboard activation sets `#about`                                                                                                           |
| Project rail and drawer                            | Space selects Rail; Enter opens MatterWorx details; Escape closes the drawer. Full drawer focus restoration was not asserted by this change |
| Journey                                            | Enter opens journey; ArrowRight from its Next control changes Stop 1 to Stop 2; Enter on Show timeline returns to timeline                  |
| Contact                                            | Tab from email reaches message; next Tab reaches Submit. No form submission or email was sent                                               |
| Sound and theme                                    | Keyboard activation switches each named control state; sound restored off and theme restored light                                          |

### No-JavaScript verification

The unmodified generated HTML was served on port 3101 with `Content-Security-Policy: script-src 'none'`, disabling page scripts without altering native anchors or focus targets. No client-only Rail/Carousel switch appeared, confirming hydration was blocked. First Tab exposed the skip link, Enter focused `main-content` and set its hash, and the next Tab reached the greeting button inside main. This tests page-script-disabled behavior via CSP, not a browser-wide JavaScript preference setting. The test fixture and production server are temporary and were stopped after verification.

### Manual reduced-motion acceptance

The automated browser reported `prefers-reduced-motion: reduce` as false and exposed no media-preference override. Native testing permissions were pending, so reduced-motion acceptance was handed to the user rather than claimed as agent-observed evidence. On 2026-10-08, the user reported **“All passed”** after the manual instructions to enable Reduce Motion, reload, verify skip-link focus, immediate menu opening, Tab/Shift+Tab containment, Escape/close restoration, section selection and the 960px breakpoint transition in both themes. This user-reported manual pass completes the remaining acceptance check alongside the automated evidence above. Tests independently verify `initial=false` and zero-duration menu entrance in the reduced-motion branch.

For future regressions, enable Reduce Motion (or emulate the preference in browser developer tools), reload, then repeat those flows in both themes. The focused keyboard checklist item is complete; full WCAG compliance, comprehensive screen-reader compatibility and contrast auditing remain open.

### Evidence

- [Light-theme mobile focus](keyboard-navigation/mobile-light.png)
- [Dark-theme mobile focus](keyboard-navigation/mobile-dark.png)
- [Native skip link with scripts disabled](keyboard-navigation/skip-no-js.png)

### Mobile cases

- Enter/Space opens; Close menu receives focus; Main navigation is announced as a modal.
- Tab and Shift+Tab wrap within Close menu and section links; background controls are unavailable.
- Escape and Close menu return focus to Open menu; section links retain hash/scroll and return focus.
- Resize open menu above 960px restores visible desktop navigation focus, unlocks the page and leaves the menu closed when shrinking again.

### Bypass and integration cases

- First Tab exposes the skip link; activation focuses main; subsequent Tab enters main content, with and without JavaScript.
- Both themes retain visible focus; reduced motion introduces no menu entrance delay.
- Existing desktop links, theme/sound, rail/drawer, journey and contact controls remain keyboard operable.

## Commands

```sh
node --test tests/keyboard-navigation.test.cjs
pnpm lint
```

Production HTML validation uses `python3 tests/portfolio-html.py <isolated-build>/.next/server/app/index.html`. Do not build over a running development checkout's `.next`.

This focused change is not full WCAG compliance or a comprehensive screen-reader/contrast audit.
