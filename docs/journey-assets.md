# Career journey assets

The journey uses original local Three.js surface assets authored in TypeScript. No remote model, stock character, film character, or external asset service is required. The source is the editable asset; no generated binary needs to be regenerated.

`lib/journey-scene-resources.ts` caches named surface profiles, curves, rounded boxes, and materials. Profiles describe radius/height rings and depth; head geometry shapes jaw and cheeks directly. `lib/journey-character.ts` composes these into one recognizable protagonist, two supporting silhouettes, face layers, swept hair, tailored outfits, and articulated hands. Joint groups drive the finite navigation gesture. Supporting cast is illustrative and does not claim factual identities.

`lib/journey-scenery.ts` authors furniture, ceramic objects, foliage, architecture, and country cues. Static geometry is merged by material. Give cache keys to different shapes, not each copy; identical shapes share geometry. Keep dynamic face/joint meshes outside static scenery batching. Register additional geometry/material/texture ownership with the resources helper so unmount and failed construction dispose them.

The cinematic palette pairs warm wood and clothing with cool trim. The stage supplies warm key, cool fill, restrained rim lighting, soft shadows, shared local radial contact-shadow textures on mobile and desktop, and filmic tone mapping. Chapter camera targets and offsets live with scene composition. Face and activity remain clear of screens and cutaway walls. Accurate flags and factual career text retain their existing source.

Validate default and close character views for Education, UK Training, and Senior Engineer first. Then inspect all twelve stops at 390px and 1280px in both themes. Current limits are 200 draw calls, 150k desktop / 100k mobile triangles and DPR 1 on mobile. Rendering stops when navigation gestures or direct camera interaction end. The asset module remains behind the journey's dynamic import; timeline-first loading and text fallback remain intact.
