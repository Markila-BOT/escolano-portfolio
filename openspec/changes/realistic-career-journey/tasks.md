# Tasks

## 1. Career scene data and resource foundations

- [x] 1.1 Add typed static scene descriptors in `lib/data.ts` and expose them through `lib/experience-journey.ts` using stable entry keys; verify all 12 entries match the design table, missing metadata has a safe fallback, and existing order, facts, countries, and tags are unchanged.
- [x] 1.2 Create focused Three.js scene helpers with shared geometry/material ownership and disposal; verify repeated scene creation and disposal releases registered resources and strict TypeScript checking passes with `pnpm exec tsc --noEmit`.

## 2. Character and activity scenes

- [x] 2.1 Build the recognizable articulated character with face, hair, proportioned body, hands, feet, clothing materials, and stage-specific accessories; visually compare Education, First Job, and Senior Software Engineer to verify identity continuity and visible professional growth.
- [x] 2.2 Build reusable study and developer-workspace props and poses, then compose Education, Internship, First Job, Front-End Engineer, Full Stack Engineer, and Senior Software Engineer; verify every scene has a structure and at least three identifiable contextual objects matching the design table.
- [x] 2.3 Compose promotion, training, collaboration, and leadership settings with supporting colleagues where specified; verify acknowledgment, learning, discussion, and guidance are distinct, and no invented employer names, awards, or achievements appear.
- [x] 2.4 Compose both relocation stops with terminal structures, luggage, benches, and a detailed plane; verify travel scenes are distinguishable from work scenes and the character's travel accessories remain consistent.

## 3. Geographic environment and composition

- [x] 3.1 Replace generic tiles/posts with country chapters, paths, foreground detail, and background buildings or silhouettes; inspect Philippines, Tokyo, Manchester, and Melbourne settings to verify distinct architecture or streetscape cues and visible spatial depth.
- [x] 3.2 Create accurate static flags for all four countries and place a visible flag in every scene; verify flag geometry or texture details, colors, orientation, and country mapping against authoritative flag references during implementation.
- [x] 3.3 Integrate themed lighting, materials, background/fog, and active-scene camera bounds; inspect all 12 stops at 390px and 1280px in both themes to verify the character, essential props, flag, and setting fit without obstruction and text remains outside the canvas.
- [x] 3.4 Share or instance repeated scenery, limit shadows, and reduce narrow-screen background density; record renderer statistics at the densest stops, verify the provisional 200-draw-call/150,000-triangle default-view budget, and confirm no continuous idle rendering.

## 4. Travel, gestures, and lifecycle

- [x] 4.1 Resolve travel mode from departure/destination countries and integrate directional joint-based walking and flight transitions; verify adjacent same-country and cross-country pairs in both directions, especially Promoted ↔ Fly to Japan and the return from UK training.
- [x] 4.2 Add finite destination gestures and authored resting poses; verify initial opening is static, typing/training/guidance gestures settle within three seconds of arrival, and reduced motion skips travel and gestures, including when enabled mid-sequence.
- [x] 4.3 Make transitions cancelable and synchronize the latest stop, character, camera, and text; verify rapid Next/Previous input, direction reversal during flight, resize during travel, and switching back mid-gesture settle or dispose cleanly without stale frames.
- [x] 4.4 Extend cleanup to every new resource and preserve text fallback if scene construction fails; verify repeated journey open/close cycles release resources and forced WebGL failure still permits navigation through all text stops and return to the timeline.

## 5. Integrated acceptance

- [x] 5.1 Verify existing journey and role-tag contracts end to end: timeline-first lazy loading, Read More preservation, 12 chronological stops, correct disabled endpoints, keyboard/button navigation, drag/zoom without travel, silent interaction, accessible announcements, real-text tags, and canvas excluded from keyboard focus; record results and representative screenshots in a change-local verification report using an available running app or production build without starting `pnpm dev` unless requested.
- [x] 5.2 Run `pnpm lint`, `pnpm exec tsc --noEmit`, and `pnpm build`; record results and resolve failures attributable to this change before marking implementation complete.

## 6. Animated-feature character and authored assets

The checked tasks above record the first implementation; their verification does not certify the cinematic enhancement.

- [x] 6.1 Add shared sculpted surface and rounded asset helpers with resource ownership; verify geometry reuse, cleanup, strict TypeScript, and document the local asset authoring approach.
- [x] 6.2 Replace the capsule protagonist with shaped face/hair, layered expressive eyes/brows/mouth, articulated hands, tailored outfits, and career accessories; verify identity and growth in Education and Senior Engineer closeups and finite gestures/reduced-motion poses.
- [x] 6.3 Give supporting characters distinct sculpted silhouettes, hair, skin, and wardrobe; verify UK Training and leadership have a recognizable varied cast without invented factual identities.

## 7. Cinematic environment and composition

- [x] 7.1 Enhance rounded furniture and props, layered country architecture, and scene-specific construction details; compare Education, UK Training, and Senior Engineer default frames and document the visual checkpoint results before reviewing all chapters.
- [x] 7.2 Integrate warm key/cool fill/rim lighting, soft shadows, and cohesive material response; verify both themes retain readable faces, props, and accurate flags with no heavy effects hiding the story.
- [x] 7.3 Author chapter camera targets/angles and responsive framing with navigation-only finite camera transitions; verify 390px/1280px framing and static opening/idle, orbit/zoom independence, rapid navigation, and reduced-motion changes.
- [x] 7.4 Review all 12 enhanced chapters in both themes and widths; capture visual evidence, verify the 200-call and 150k desktop/100k mobile triangle ceilings, mobile DPR <=1, lazy loading, and resource cleanup; document results.

## 8. Enhancement integration

- [x] 8.1 Recheck the existing travel, keyboard/button navigation, text fallback, accessible announcements, silent operation, cancellation, and timeline switching with enhanced assets; run pnpm lint, pnpm exec tsc --noEmit, pnpm build, and OpenSpec strict validation and record outcomes.
