# Realistic career journey verification

Verified on 6 October 2026 against the local production build in headless Google Chrome using bundled Playwright. No dependencies were added. The existing development server was reused for the first visual pass; the final confirmation and interaction checks used a temporary production server on port 3001.

## Build and source checks

| Check | Result |
| --- | --- |
| `pnpm lint` | Pass, no warnings or errors |
| `pnpm exec tsc --noEmit` | Pass |
| `pnpm build` | Pass, all static routes generated |
| Impeccable detector on stage and scene factories | Pass, no findings |
| 12 unique scene descriptors and fallback | Pass |
| Existing title, date, location, description, order, and tags | Preserved across all 12 entries |
| Adjacent travel classification in both directions | Pass |
| Shared material/geometry identity and batching | Pass |
| Three resource factory disposal cycles and repeated disposal | Pass |

Next emitted existing optional-sharp and outdated-Browserslist notices. Neither prevented compilation or page generation. No dependency changes were made for those notices.

## Visual coverage

Inspected all 12 stops at 1280px and 390px in light and dark themes: 48 captures. Each shows the main character, career props, built setting, and the correct country flag. Career stages preserve the same face/hair while changing clothing, accessories, and seated posture. Study, coding, acknowledgment, training, collaboration, guidance, and airport arrival scenes remain distinct. The narrow view reduces background buildings and disables shadows while retaining city cues, transit, flags, and essential activity props.

The initial pass found disconnected chimneys in reduced scenery and an aircraft hidden behind the terminal. The final confirmation verifies whole-building grouping and visible aircraft/transit placement. Maximum measured default-view cost is **105 draw calls and 40,470 triangles**, below the design budgets of 200 and 150,000. Renderer counters were checked at all stops; resting scenes issue no additional draw calls.

- [Desktop light overview](evidence/overview-1280-light.jpg)
- [Desktop dark overview](evidence/overview-1280-dark.jpg)
- [Phone light overview](evidence/overview-390-light.jpg)
- [Phone dark overview](evidence/overview-390-dark.jpg)
- [Education and original controls](evidence/education-section.png)
- [United Kingdom training and colleagues](evidence/training-section.png)
- [Senior engineer workspace and role tags](evidence/senior-section.png)
- [Per-stop text and renderer measurements](evidence/scene-results.json)

Canvas-only captures suppress the fixed header and toast text during capture to expose the scene; section captures retain the actual page presentation. Overview annotations identify stop number, viewport width, and theme. Browser screen sizes are emulated; physical phones and screen-reader speech were not tested.

## Interaction and lifecycle checks

All checks passed; [machine-recorded results](evidence/behavior-results.json) contain the individual outcomes.

1. Timeline is initially shown without a canvas or loaded journey chunk. Read More expands to six entries and retains that count after returning from the journey.
2. Opening starts at stop 1 with a static study pose. Previous is disabled. The decorative canvas is excluded from accessibility and never receives keyboard or pointer focus.
3. Arrow keys and WASD move one stop while focus is inside the journey; the page does not scroll. The current stop is in a polite live region and the technology chips remain real text.
4. Walking ends in a finite typing gesture, then stops rendering. Country boundaries use a flight in both directions, including Promoted ↔ Fly to Japan and Japan ↔ UK training.
5. Switching to reduced motion during flight immediately settles at the destination. Subsequent navigation uses static activity poses.
6. Rapid Next/Previous input, reversal during travel, and resize during travel resolve the latest requested stop. Phone instructions name tap and omit keyboard advice.
7. Drag and scroll change the camera without changing the stop. With sound enabled, navigation, drag, and zoom start no audio. Arrow keys outside the journey retain normal page scrolling.
8. At stop 12, Next is disabled, Previous is enabled, and the senior role's TypeScript and React tags are visible.
9. Three open/close cycles delete 348 GPU buffers and three allocated flag textures. The implementation disposes scene resources before disposing the renderer; reversing this order was detected and corrected during verification.
10. Exiting during travel cancels pending frames and removes the canvas. WebGL context loss removes the scene while text navigation remains usable.
11. Forced failure to create WebGL still permits reading all 12 stops and returning to the timeline.
12. No uncaught browser errors occurred during successful scene interactions.

## Flag construction references

Flags are generated locally with no external asset download or runtime request. Their country mapping comes from the existing location strings. Reference checks covered blue-over-red Philippine fields, the hoist triangle, eight sun rays and three five-pointed stars; Japan's centered red disc and 2:3 proportion; the Union Flag's offset saltires and orientation; and Australia's canton, Commonwealth Star, and Southern Cross.

- [Philippine flag construction guide — Department of Foreign Affairs](https://www.jakartape.dfa.gov.ph/images/articles/site-page/The_Flag_and_Heraldic_CodeFINAL-11.pdf)
- [Japan national flag — Cabinet Office](https://www.cao.go.jp/en/flag_anthem)
- [Union Flag orientation — College of Arms](https://www.college-of-arms.gov.uk/resources/union-flag-faqs)
- [Australian flags — Department of the Prime Minister and Cabinet](https://www.pmc.gov.au/honours-and-symbols/australian-national-symbols/australian-flags)
