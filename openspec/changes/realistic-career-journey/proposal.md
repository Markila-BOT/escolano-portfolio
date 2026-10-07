# Proposal

## Why

The implemented journey now depicts all career chapters, but its capsule characters, flat buildings, and uniform framing lack visual appeal. Refine it into an original animated-feature career story with expressive sculpted characters, cohesive assets, and cinematic composition while retaining the accessible narrative.

## What Changes

- Replace generic platforms and posts with career dioramas containing buildings, terrain, backgrounds, furniture, and recognizable work or travel objects.
- Replace capsule-based characters with sculpted surfaces, expressive eyes and brows, articulated hands, tailored outfits, and distinct supporting characters; preserve the protagonist’s identity across all stops.
- Show study, coding, promotion, training, collaboration, leadership, and travel activities through staged poses and short gestures triggered by navigation.
- Establish distinct settings and accurate flags for the Philippines, Japan, United Kingdom, and Australia, based on the existing location data.
- Give chapters deliberate camera compositions, warm key lighting, soft shadows, material contrast, rounded furniture, and layered country-specific architecture. Preserve text, controls, lazy loading, reduced motion, silent interaction, and fallback behavior.
- Preserve the implemented bidirectional walking/flying classification and finite navigation-triggered gestures. Establish Education, UK Training, and Senior Engineer as visual checkpoints before reviewing all 12 chapters.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `experience-journey`: Add character continuity, career-specific environments and activities, geographic identity, responsive scene composition, and bounded gesture behavior; clarify bidirectional travel.

## Impact

Primary implementation areas are `components/experience-journey-stage.tsx` and `lib/experience-journey.ts`, with scene metadata in static TypeScript and optional local scene helper modules. `components/experience.tsx` may need viewport sizing adjustments; `lib/data.ts` remains the source of career facts and role tags. Reuse installed Three.js and OrbitControls; no new rendering or animation library is planned. No backend, routing, timeline content, or external asset service changes.
