# Cinematic journey verification

Verified 2026-10-07. This report covers the eight enhancement tasks added after the original 16 completed tasks. The earlier verification report remains the record of the first implementation.

## Delivered treatment

Original sculpted TypeScript surface assets replace the capsule protagonist: shaped jaw and cheeks, layered eyes and catchlights, expressive brows, swept hair, curved smile, modeled fingers/thumbs, collars, shoes, backpack/lanyard, and a senior jacket. Two supporting silhouettes have different hair, skin, and wardrobe. Furniture has rounded construction, ceramic and metal material contrast, curved handles and lamp arms, detailed luggage, and layered country architecture. Chapters use authored camera targets/angles, warm key/cool fill/rim lighting, soft desktop shadows, and shared local contact shadows on both screen sizes.

The local authoring, ownership, palette, and validation approach is documented in [journey-assets.md](/Users/universe/Projects/Personal/escolano-portfolio/docs/journey-assets.md). No dependencies or remote models were added. All 12 career facts, flags, text controls, and tags retain their existing source.

## Representative visual checkpoints

Education, UK Training, and Senior Engineer were reviewed first at default framing and closer character views, then checked again after integration.

- Education: face/hair remain readable, mustard student attire and bag straps identify the stage, and books, shelves, chair, desk, and campus cutaway convey study. Working hands were raised to the desk after closeup review.
- UK Training: two distinct supporting characters sit beside the protagonist, with different hair, skin and clothing. Laptops and planning board communicate collective learning; brick streetscape and the accurate UK flag anchor the chapter.
- Senior Engineer: the same protagonist wears a teal jacket, with a composed working pose, dual screens, keyboard, curved desk lamp, and planning board. Face stays above and between the screens.

Default and close views are saved under `evidence/cinematic/`: `education-section.png`, `training-section.png`, `senior-section.png`, and their corresponding `*-closeup.png` files. These are visual reviews of the original animated-film treatment, not assertions of a photographic likeness or reproduction of a studio character.

## Full visual matrix and performance

All 12 stops were captured at 1280px and 390px in light and dark themes: 48 views total. Required character, activity objects, country flag and built setting remain visible; secondary background buildings may be cropped. All four contact sheets were reviewed. Screenshots hide the existing header and visitor toast during capture so they do not cover the canvas; product behavior is unchanged.

| Viewport | Peak draw calls | Peak triangles | Limit |
| --- | ---: | ---: | --- |
| 1280px desktop | 168 | 121,296 | 200 calls / 150,000 triangles |
| 390px mobile | 114 | 89,200 | 200 calls / 100,000 triangles |

Mobile canvas DPR is at most 1. Initial and settled scenes stop rendering. The asset module stays behind the journey dynamic import. Checks used headless Chrome with viewport emulation; physical-device FPS was not measured.

The first matrix exposed hidden supporting-character accessories included by static batching. Batching now traverses only visible objects; bevel tessellation was reduced while retaining rounded normals. Budget checks passed after the fix without raising limits. Walking paths now appear only during walking and disappear at rest.

Evidence: `evidence/cinematic/scene-results.json`, 48 individual PNGs, four `overview-*.jpg` contact sheets, and representative default/close views.

## Behavior and resource checks

Production-browser checks passed for timeline-first lazy loading, retained Read More expansion, all 12 stops and tags, disabled endpoints, keyboard/WASD and button navigation, canvas excluded from focus, live text, silent interactions, static opening/idle, finite gestures, bidirectional same-country walking/cross-country flight, rapid navigation/reversal, resize during travel, reduced motion enabled during flight, orbit/zoom without changing stop, unmount during travel, WebGL creation failure and context-loss text navigation.

Three final production open/close cycles released 753 GPU buffers and 12 textures, including contact-shadow assets. Successful scene interactions produced no uncaught browser errors. Detailed outcomes are in `evidence/cinematic/behavior-results.json`.

Focused geometry checks passed: all existing career fields/tags/order preserved; metadata fallback and bidirectional legs; cached sculpted profiles/curves; visibility-aware batching; finite joint transforms; exact gesture endpoints for all 12 stops and three cast variants; shared geometry/material reuse; idempotent resource disposal.

## Build checks

- `pnpm lint`: pass, no warnings or errors.
- `pnpm exec tsc --noEmit`: pass.
- `pnpm build`: pass during integration.
- Final-source production build in a temporary verification copy using the installed Next.js CLI: pass. The isolated output avoids replacing `.next` used by the user's already-running development server. Optional sharp/outdated Browserslist notices in that temporary copy did not fail the build.
- `openspec validate realistic-career-journey --strict`: pass.

Final screenshots and behavior checks ran against that isolated production build. Temporary production servers were stopped after verification. No `pnpm dev` was started by this implementation.
