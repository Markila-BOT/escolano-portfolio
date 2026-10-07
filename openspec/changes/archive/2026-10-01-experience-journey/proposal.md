# Proposal

## Why

The Experience section is a list, but the data tells a journey: Mandaluyong, Taguig, and Makati, then Tokyo, Manchester, back to Tokyo, home to Quezon City, then South Melbourne and Quezon City again. Four entries are already flights. A 3D view in which a person walks between jobs and flies between countries lets a visitor follow that path, with the controls written on the page as on [Bruno Simon](https://bruno-simon.com)'s site. The Explore in 3D map in the introduction only repeats the header links, so it goes, and 3D lives only on Experience.

## What Changes

- Add one switch to the Experience section. The timeline with Read More shows first. The switch replaces it with a 3D journey and switches back.
- The journey shows one stop for each entry in `experiencesData`, oldest first, from Education to the current role. A person walks between stops in the same country and boards a plane when the country changes.
- Real text on the page shows the current stop's title, location, date, and description, a stop count, Previous and Next buttons, and written controls: arrow keys or WASD on a wide screen, tap on a narrow screen.
- Switching back shows the timeline with the same number of entries it had before.
- Remove the Explore in 3D button and section map from the introduction, with their copy and stage component. **BREAKING** for anyone who used that button. The header and mobile links still reach every section.
- Move checklist line 84 from the introduction to the Experience list, reworded for the journey. Leave it unchecked until the journey is verified.

## Capabilities

### New Capabilities

- `experience-journey`: A switch in the Experience section between the timeline and a 3D journey through the same entries, with the controls written on the page.

### Modified Capabilities

- None. The introduction's section map was never synced into `openspec/specs/`, so removing it changes no main spec. The timeline keeps its theme and button requirements in `unified-theme` and `uniform-components`. Traveling and switching play no cue, so `interaction-sound` does not change.

## Impact

- `components/experience.tsx` gains the switch and keeps `visibleElements` while the 3D view is shown.
- A new client component draws the journey with `three`, loaded with `next/dynamic` and `ssr: false` only after the switch.
- `components/voxel-stage.tsx` is deleted. `components/intro.tsx` loses the map button, panel, and their state. `lib/data.ts` loses `heroNavigator` and `heroMapSections` and gains the journey copy.
- `CHECKLIST.MD` moves line 84 to section 3.3. The progress table goes from 64/110 to 63/110 (57%) while the item is open, and back to 64/110 (58%) when it is checked.
- No new package. `three` stays the only 3D dependency. No model files. The person and the plane are built from basic shapes.
