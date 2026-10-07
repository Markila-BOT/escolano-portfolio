# Tasks

## 1. Remove the introduction map

- [x] 1.1 Delete `components/voxel-stage.tsx`. Remove `heroNavigator` and `heroMapSections` from `lib/data.ts`. Remove the dynamic import, map state, Escape effect, map button, and `#hero-portfolio-map` from `components/intro.tsx`, and leave the portrait, greeting, role titles, positioning sentence, and Contact link in place. Verify with `rg "heroNavigator|heroMapSections|voxel-stage|hero-portfolio-map"` returning nothing and `pnpm exec tsc --noEmit` passing.

## 2. Journey data and copy

- [x] 2.1 Add `experienceJourney` copy to `lib/data.ts` with the labels and the two instruction sentences in `design.md`. Add a pure helper in `lib/` that turns `experiencesData` into stops oldest first, with `country` and a `start`, `walk`, or `flight` leg. Verify by reading the helper output, either in a short script or in a temporary log removed before finishing: 12 stops, Education first, the current role last, and flights into Tokyo (2017), Manchester (2018), Tokyo (2019), Quezon City (2021), South Melbourne, and Quezon City (2022). Every other leg is a walk.

## 3. The switch

- [x] 3.1 In `components/experience.tsx`, add `isJourneyOpen` and one outline `Button` under the heading named "Show 3D journey" or "Show timeline", with `aria-controls` on the journey region. Keep `visibleElements` in this component so Read More survives a round trip. Load the stage with `next/dynamic` and `ssr: false` only while the journey is open. Do not call `playCue`. Verify with `pnpm exec tsc --noEmit`.

## 4. The journey

- [x] 4.1 Create `components/experience-journey-stage.tsx` as `design.md` describes: country tiles, stop posts, a person and a plane built from basic shapes, theme colors from CSS variables, OrbitControls with pan off and zoom clamped, the camera following the person, animation only during a move, a one-frame jump under reduced motion, and an empty result when `WebGLRenderer` throws. The stage never changes the index. Verify with `pnpm exec tsc --noEmit`.
- [x] 4.2 Add the journey region in `components/experience.tsx`: an `aria-live="polite"` stop card with title, location, date, description, and "Stop N of M"; Previous and Next disabled at the ends; the wide or narrow instruction from `useMediaQuery("(min-width: 960px)")`, defaulting to narrow; and a region `keydown` listener for the eight travel keys that prevents default only for them. Verify with `pnpm exec tsc --noEmit` and by reading that nothing listens on `document`.

## 5. Check in the browser and update the checklist

- [x] 5.1 If something is already listening on port 3000, confirm: the timeline and Read More show first and no `three` chunk loads; Read More once, switch, and switch back still shows six entries; the journey opens at stop 1 of 12 on Education; the right arrow moves to stop 2 without scrolling the page; Makati to Tokyo shows the plane and Taguig to Makati walks; drag and scroll change the view without changing the stop and play no sound with sound on; Next is disabled on the last stop; the 390 px instruction mentions no keyboard; reduced motion jumps; with WebGL blocked, Previous, Next, and the switch back still work; text meets 4.5:1 in both themes; the introduction no longer has an Explore in 3D button. Do not start the dev server. If nothing is listening, stop and leave 5.2 unchecked.
- [x] 5.2 In `CHECKLIST.MD`, remove line 84 from section 3.1 and add under 3.3 Experience: `- [ ] A 3D journey you can switch to from the timeline, walking between jobs and flying between countries, with the controls written on screen ([Bruno Simon](https://bruno-simon.com) drives a Three.js world and writes the controls on the page)`. Set the progress row to 63 done, 11 partial, 36 not started, 63/110 (57%). If 5.1 passed, check the new item and set the row back to 64, 11, 35, 64/110 (58%). Update the Bruno Simon reference row's "Already here" to "3D experience journey; video drawer only". Verify by recounting with section 5 skipped and sections 11 and 12 counted as future.
