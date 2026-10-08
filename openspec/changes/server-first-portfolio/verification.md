# Verification

Completed on 2026-10-07 against isolated production builds of the pre-edit and final source/config snapshots with the same installed dependencies.

## Outcome

Before the change, the theme mount gate produced an empty visible body: no main element and no portfolio sections at either viewport size with JavaScript disabled. The final response contains all six sections, initial content and native links/disclosures. Server-composed static sections now remain visible before hydration.

The six section modules compose on the server. ObservedSection owns visibility tracking; focused client components own greetings, carousel/drawer, skill selection, timeline/journey and form feedback. Static About prose, toolkit notes and contact introduction are absent from browser chunks. See the [client-reference manifest excerpt](evidence/client-boundaries.json) and [boundary documentation](../../../docs/portfolio-rendering.md).

| Production measurement                | Before  | After   |
| ------------------------------------- | ------- | ------- |
| Home route size                       | 56.7 kB | 55.5 kB |
| First Load JS                         | 256 kB  | 254 kB  |
| Main elements without JavaScript      | 0       | 1       |
| Portfolio sections without JavaScript | 0       | 6       |

Bundle figures are rounded Next CLI output, not user-visible timing measurements. The route remains statically prerendered.

## Automated checks

- `python3 tests/portfolio-html.py evidence/baseline.html` (using the full repository-relative evidence path): correctly fails on missing home section. The parser excludes script/style content.
- `python3 tests/portfolio-html.py openspec/changes/server-first-portfolio/evidence/after.html`: passes for real initial body text/markup, anchors, portrait, skills, initial timeline roles, contact fields and native links/disclosures.
- `pnpm exec node --test tests/skill-evidence.test.cjs`: both tests pass.
- `pnpm lint`: passes without warnings/errors.
- `pnpm exec tsc --noEmit`: passes.
- `pnpm exec next build /private/tmp/server-first-after`: passes, including lint/types and all five static pages. Existing optional sharp and stale Browserslist notices are non-failing.
- `openspec validate server-first-portfolio --strict`: passes.
- Whitespace checks on edited implementation files: pass.

## Browser acceptance

Headless Chrome verified 390px and 1280px without JavaScript: initial sections and data are present, required content is visible, the timeline has three readable entries, toolkit disclosures open natively, and the contact anchor works. All project titles/years and initial timeline dates were compared with current portfolio data. Screenshots were visually reviewed for initial content and typography.

Hydrated checks passed in light and dark at both sizes; light used normal motion and dark used reduced motion. No page errors or console errors remained. Coverage includes greeting activation, role rotation, carousel movement, project drawer opening/closing and focus return after its transition, all 22 skill controls and exact source values, timeline expansion and journey round trip, theme/sound toggles, section navigation and active-section updates on scroll.

3D did not initialize before explicit journey activation. Contact success/error responses were fulfilled locally using the Next 14 server-action response format; no real email was sent. Theme initialization passed for stored light/dark, system dark, invalid stored values and storage reads throwing. Content remains mounted while preferences resolve.

The existing project drawer emitted a missing dialog-title accessibility error during integration checks. Its existing DrawerTitle primitive now supplies the current project name, resolving the error without changing visible layout.

- [Hydration/theme results](evidence/browser-results.json)
- [Additional content, skill, role and focus results](evidence/additional-results.json)
- [Baseline report](evidence/baseline.md)

## Visual evidence

| View                                      | Mobile                                   | Desktop                                    |
| ----------------------------------------- | ---------------------------------------- | ------------------------------------------ |
| Baseline without JavaScript               | [390px](evidence/baseline-390.png)       | [1280px](evidence/baseline-1280.png)       |
| Final initial viewport without JavaScript | [390px](evidence/nojs-390-home.png)      | [1280px](evidence/nojs-1280-home.png)      |
| Final full page without JavaScript        | [390px](evidence/nojs-390-full.png)      | [1280px](evidence/nojs-1280-full.png)      |
| Hydrated light                            | [390px](evidence/hydrated-390-light.png) | [1280px](evidence/hydrated-1280-light.png) |
| Hydrated dark                             | [390px](evidence/hydrated-390-dark.png)  | [1280px](evidence/hydrated-1280-dark.png)  |

## Practical limits

Saved/system theme preference applies after hydration, so a color change may occur; the page no longer disappears during that process. JavaScript-dependent controls such as the carousel, evidence selector, form feedback and 3D journey still require JavaScript. Native contact links and toolkit disclosures do not.

The temporary production preview was stopped after verification. No pnpm dev process was started. The rendering checklist item is complete; prior skill changes remain unarchived.
