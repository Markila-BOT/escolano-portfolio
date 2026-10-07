# Design

## Context

See proposal.md for motivation and the experience-journey delta for behavior. The implemented imperative Three.js stage mounts only when selected, draws 12 contextual dioramas with shared resources, and renders on demand. The first pass meets behavioral requirements but capsule silhouettes, tiny facial details, flat props, and a uniform distant camera still feel plain. Career facts come from `experiencesData`; `buildExperienceJourney()` reverses these into 12 stops. The stage owns camera controls, theme updates, transitions, and resource cleanup. Bidirectional travel is already classified from both countries and must remain correct. No automated browser test suite is present.

## Goals / Non-Goals

**Goals:** Achieve an original animated-feature aesthetic with appealing silhouettes, expressive facial features, sculpted hands and hair, tailored clothing, and composed environmental depth with a manageable local asset footprint. Keep the scene architecture deterministic, reusable, and easy to dispose. Make each career chapter visually recognizable within the existing section width.

**Non-Goals:** Photorealistic likeness scanning, an open-world game, free roaming, fabricated career events, continuous ambient simulation, audio, new navigation controls, or a rendering-library migration. The character is an illustrative representation, not a claimed exact portrait.

## Decisions

### 1. Sculpted character and cohesive authored assets using installed Three.js

Keep the imperative renderer and OrbitControls. Build original local surface assets with custom head/body profiles, shaped cheeks and jaw, swept hair locks, large layered eyes, raised expressive brows, curved smiles, and modeled fingers and thumbs. Articulate the meshes at existing shoulder/elbow/hip/knee pivots and add hand and face expression pivots. Use fitted shirt and jacket surfaces, collars, seams, cuffs, shoes, and career accessories rather than capsule stacks. Supporting characters have distinct hair, face, skin, and wardrobe silhouettes.

Author reusable geometry in local TypeScript factories and share surfaces and materials through the existing ownership registry. GLB is appropriate if externally authored assets are introduced later, but this pass does not require a network asset service, a new loader library, or licensed film characters. Local sculpted surface construction keeps assets editable and avoids download/rig incompatibility. Simply increasing primitive mesh counts or recoloring the old avatar was rejected because the silhouette and expression are the underlying visual problem.

Use an original warm animated-film palette: mustard student clothing, blue early-career layers, teal experienced attire, warm wood, ivory ceramic, muted foliage, and contrasting ink-blue trim. Round/bevel furniture edges, model readable construction details, and use deliberate roughness/metalness contrast. Establish Education, UK Training, and Senior Engineer as visual checkpoints with default frames and character closeups before expanding review to every chapter.

### 2. Explicit visual metadata attached to existing facts

Add typed static visual descriptors beside career content in `lib/data.ts`, and expose the relevant descriptor through `JourneyStop`. Map by an explicit stable identifier or validated unique entry key, not by stop array position. Descriptors name setting, activity, career stage, prop set, and country palette. They do not duplicate dates, location, description, or technology tags. A generic workspace and country-neutral setting cover future unmapped entries without crashing.

Use one avatar identity with articulated shoulder, elbow, hip, and knee pivots. Swap appropriate attire and accessories and apply authored seated/standing poses per stop. Supporting people use shared sculpted geometry with distinct silhouettes and outfits; only the main character receives gestures. Avoid automatic age estimates or unsupported personal details.

| Existing stop | Setting and main activity | Contextual objects and growth cues |
| --- | --- | --- |
| Education | Campus cutaway, studying | Books, study desk, backpack; student clothes |
| Internship | Early developer office, coding | Computer, keyboard, chair, notebook; lanyard |
| First Job | City office, coding | Workstation, monitor, mug, desk lamp; work attire |
| Promoted | Office meeting corner, acknowledging progress | Desk, laptop, planning board; confident stance and brief acknowledgment gesture |
| Fly to Japan | Airport arrival, carrying luggage | Terminal, suitcase, bench, plane; travel outfit |
| Training in United Kingdom | Training room, learning with teammates | Shared table, laptop, board, chairs; listening/pointing pose |
| Apply training knowledge | Team workspace, collaboration | Shared monitors, board, notebooks, colleague; discussion pose |
| Front-End Engineer | Tokyo office, coding | Dual monitors, keyboard, chair, plant; focused working pose |
| Fly back home | Arrival terminal, returning | Luggage, terminal, bench, plane; arrival pose |
| Lead Software Engineer | Team area, guiding colleagues | Planning board, meeting table, laptops, colleagues; pointing pose |
| Full Stack Engineer | Melbourne workspace, developing | Laptop, secondary monitor, notebook, desk; experienced attire |
| Senior Software Engineer | Mature product workspace, planning and coding | Workstation, architecture board, notebook, plant; composed posture |

All workplaces are illustrative; do not add employer logos, awards, or imply that a location necessarily means physical relocation beyond the existing journey narrative. A promotion is conveyed through posture, not an invented trophy.

### 3. Country chapters with layered dioramas

Retain chronological stops but replace bare tiles with connected pedestrian paths, foreground props, active cutaway rooms or buildings, and background silhouettes. Separate successive country chapters with travel space. Reuse recognizable local cues: tropical urban campus and office landscaping for the Philippines, compact Tokyo streets and transit forms for Japan, Manchester brick and industrial streetscape for the United Kingdom, and Melbourne contemporary streetscape and tram cues for Australia. These are illustrative city cues, not exact addresses.

Model accurate static flags locally, including Philippine triangle/stars/sun, Japanese disc, UK cross/saltire layout, and Australian Union Jack/stars. Keep flag hues faithful rather than recoloring them with theme tokens. No waving animation. Keep career labels and technologies outside the canvas, respecting experience-role-tags. Plain country tiles were considered but offer too little geographic context.

### 4. One cancelable transition and activity sequence

Resolve travel mode from departure and destination countries. Walking animates joint pivots, facing the direction of travel; flights use a recognizable fuselage, wings, tail, windows, and boarding/arrival staging. After arrival, run a single activity gesture of at most three seconds, then stop requesting frames. Opening uses a static study pose. A new navigation command cancels the old sequence, resolves the latest requested stop, and synchronizes marker, pose, camera, and text. Recheck reduced motion during a sequence and immediately settle if enabled.

Use Three.js transforms inside the existing frame lifecycle for canvas motion; use existing Framer Motion patterns only for any DOM animation. Continuous animation loops were considered but conflict with the existing motion contract and increase idle GPU work.

### 5. Responsive framing and bounded rendering cost

Author chapter-specific camera targets and angles, emphasizing the protagonist and activity with a lower, closer three-quarter composition rather than a uniform overhead overview. Fit essential-scene bounds for viewport aspect ratio, keeping the avatar, essential props, and flag in frame. Navigation transitions may interpolate camera composition only during the existing finite sequence; initial opening and idle remain static. Refit on resize without changing the stop; retain a visitor's orbit direction where practical. Constrain orbit/zoom to useful views and keep initial framing clear of cutaway walls. Use theme-token background/fog with a warm directional key, soft cool fill, and restrained rim light; use soft contact shadows and filmic tone mapping while keeping skin, clothing, vegetation, and flag colors recognizable in either theme. Avoid heavy depth-of-field or bloom that hides story props.

Reuse geometries/materials and instance repetitive background windows or trees. Limit shadow casting to the main character and essential foreground structures, keep pixel ratio capped at two on desktop and one on mobile, and reduce background density and shadow quality on narrow screens. Establish a provisional ceiling of 200 draw calls and 150,000 desktop / 100,000 mobile triangles for the active default view; record renderer statistics and tune within that budget. Render on camera, resize, theme, or finite animation changes only. Dispose geometries, materials, any generated flag textures, observers, controls, and pending frames on exit. No extra scene data loads with the default timeline.

## Risks / Trade-offs

- [More geometry still looks primitive] → Review sculpted silhouette, face readability, varied cast, and chapter composition at the three visual checkpoints; do not treat behavior tests as evidence of art quality.
- [Props obscure the career story on phones] → Fit bounds around essential foreground elements, use cutaway walls, reduce background density, and visually check all stops at 390px.
- [Geographic cues become stereotypes or imply factual workplaces] → Use architectural and streetscape cues grounded in the existing cities, generic workplaces, accurate flags, and unchanged factual text.
- [Scene complexity increases GPU cost] → Share resources, limit shadows and geometry, inspect renderer statistics, and retain demand rendering and text fallback.
- [Gestures create interruption or cleanup bugs] → Keep a single cancelable sequence; exercise rapid navigation, direction reversal, reduced motion changes, and unmount during travel.

## Migration Plan

Preserve the first implementation and its checked task history. Implement sculpted character/resource assets, review three representative scenes, then apply the environment/camera treatment to all chapters behind the existing journey switch. No data migration or service changes are required. Verify all existing journey and role-tag contracts alongside the new delta before shipping. Rollback restores the prior stage and removes visual descriptors/helpers while retaining all original career data and timeline behavior.
