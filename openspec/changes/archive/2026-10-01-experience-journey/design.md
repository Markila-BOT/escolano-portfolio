# Design

## Context

`components/experience.tsx` is a client component. It renders `react-vertical-timeline-component` from `experiencesData`, shows three entries, and adds three per Read More (`visibleElements`). `experiencesData` is newest first and has 12 entries. Each has `title`, `location` ("City, Country"), `description`, `icon`, and `date`. Countries in order of time: Philippines, Japan, United Kingdom, Japan, Philippines, Australia, Philippines.

The introduction currently ships an Explore in 3D button that opens `components/voxel-stage.tsx`, built on `three@0.186.1` and `three/examples/jsm/controls/OrbitControls`. That stage already has working parts this change reuses: render on demand, theme colors from CSS variables, a pixel ratio cap of 2, a 6 px click slop, and an empty result when `WebGLRenderer` throws. `hooks/useMediaQuery.ts` already powers the 960 px desktop split in the header.

## Goals / Non-Goals

**Goals:**

- One switch between the timeline and a 3D journey in the Experience section.
- A person who walks within a country and flies between countries, through the entries in order of time.
- Stop text, Previous, Next, and controls written as real text.
- Nothing 3D loaded before the switch, and the introduction's map removed.

**Non-Goals:**

- Driving, a free-roam world, physics, or collisions.
- Model files, textures, a map of the world, or Bruno Simon's assets.
- Remembering the chosen view across visits. The timeline always shows first.
- Sound for the switch or for travel.
- Tech tags on roles. That checklist item stays open.

## Decisions

### Switch inside `experience.tsx`

Add `isJourneyOpen` state next to `visibleElements`. The switch is the shared `Button` with `variant="outline"`, placed under the heading. Its name is the view it opens, like the theme and sound switches: "Show 3D journey" or "Show timeline". It has `aria-controls` pointing at the journey region. The timeline is unmounted while the journey shows, but `visibleElements` stays in the parent, so the Read More count survives a round trip.

A two-option toggle group was considered and rejected. It would need `@radix-ui/react-toggle-group` for one control, and a single named button matches the repo's other switches.

### Journey data from `experiencesData`

A pure helper in `lib/` builds the stops:

```ts
type JourneyLeg = "start" | "walk" | "flight";
```

Each stop is the entry plus `country` (the text after the last comma, trimmed) and the leg type used to reach it. The order is `[...experiencesData].reverse()`. Leg rules: the first stop is `start`. After that, a different country from the previous stop is `flight`, and the same country is `walk`.

The user's choice said to fly when the city changes. This design flies when the country changes. Mandaluyong, Taguig, and Makati are next to one another, and Tokyo appears twice. A flight between neighbors in Metro Manila would look wrong, so they are walks.

The stop count text, ("Stop N of M"), and the instructions live in `lib/data.ts` under `experienceJourney`: `showJourneyLabel`, `showTimelineLabel`, `instructionWide`, `instructionNarrow`, `previousLabel`, and `nextLabel`.

### Scene layout

`components/experience-journey-stage.tsx` is `"use client"` and loads with `next/dynamic(..., { ssr: false })` from `experience.tsx` only while the journey is open. Props are the stops, the current index, and nothing for selection. The stage never changes the index, so a drag or a zoom cannot travel.

- Each country is a low flat ground tile. Stops in the same country sit along a short path on that tile, about 30 units apart. The next country tile sits about 160 units further along x, so a flight covers a visible gap.
- A stop is a short post with a marker. The current stop's marker uses `--primary`. Others use `--border`.
- The person is a few `BoxGeometry` and `SphereGeometry` meshes: body, head, and legs. The plane is a box fuselage, two wings, and a tail fin. One group is visible at a time. The plane shows only during a flight leg.
- Colors come from `--background`, `--foreground`, `--primary`, `--border`, and `--muted-foreground`, and update on theme change.
- The camera follows the person from behind and above, with OrbitControls for drag and zoom. Pan is off. Zoom is clamped. The controls' target moves with the person.

### Movement

When the index changes, the stage animates the person from the old stop to the new one. A walk takes about 700 ms on the ground, with a small leg swing. A flight takes about 1600 ms. The person is swapped for the plane, the plane follows an arc that rises and lands, and then the person returns. A `requestAnimationFrame` loop runs only during that move, then stops. Otherwise the stage renders on demand, as `voxel-stage.tsx` does.

When `prefers-reduced-motion: reduce` matches, the person and camera are placed at the new stop in one frame. If several steps queue during a move, the stage jumps to the latest index.

### Keys and text

The journey region (`role="region"`, labeled by the section heading plus "3D journey") holds the canvas (`aria-hidden`, `tabIndex={-1}`), the stop card, Previous and Next, and the instruction. A `keydown` listener on that region handles the eight keys, calls `preventDefault` only for them, and clamps the index. It does not listen on `document`. The stop card is an `aria-live="polite"` block with the title as text, location, date, description, and "Stop N of M". Previous and Next are shared `Button`s with `disabled` at the ends.

The instruction uses `useMediaQuery("(min-width: 960px)")`. Wide: "Use the arrow keys or WASD to travel. Drag to look. Scroll to zoom." Narrow: "Tap Previous or Next to travel. Drag to look. Pinch or scroll to zoom." On the first render, before the media query resolves, use the narrow text, so a phone never sees keyboard copy.

### Remove the introduction map

Delete `components/voxel-stage.tsx`, `heroNavigator`, `heroMapSections`, the dynamic import, `isMapOpen`, the hover and focus state, the Escape effect, the map button, and `#hero-portfolio-map` from `components/intro.tsx`. The portrait, greeting, role titles, positioning sentence, and Contact link stay as they are.

## Risks / Trade-offs

- [The stage grows larger than the old map] → It loads only after the switch, and only `three` and OrbitControls are imported.
- [A 1.6 s flight feels slow] → It runs only after a request, a queued step jumps ahead, and reduced motion skips it.
- [Countries far apart in reality sit next to each other in the scene] → The journey shows order and mode of travel, not geography. The stop card names the location, and the canvas does not draw text.
- [A canvas region with its own keys can trap a keyboard user] → Tab moves out normally. Only the eight travel keys are handled.

## Migration Plan

No data migration. Remove the introduction map in the same change that adds the journey, so the site never has two 3D views. To roll back, revert the change. The timeline never depended on the journey.

## Open Questions

None.
