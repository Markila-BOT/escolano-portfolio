# Proposal

## Why

The root theme provider returns null until mounting, preventing portfolio content from appearing in the initial server-rendered document. Broad client boundaries and initially invisible reveal animations further make static content depend on JavaScript, so the checklist needs a verifiable rendering contract rather than a count of client components.

## What Changes

- Render provider children on the server and on the first client render with a deterministic theme, then apply saved/browser preferences safely.
- Keep essential initial portfolio content visible before hydration; decorative reveals must not hide that content when JavaScript is unavailable.
- Move static About content, section headings/shells, toolkit notes, contact introduction and dividers to server composition, retaining focused client components for interaction and observation.
- Preserve existing hydrated navigation, greetings, projects, evidence, timeline/3D journey, form feedback and theme/sound behavior.
- Add production HTML and JavaScript-disabled verification, document remaining client boundaries, and correct the checklist wording after acceptance.

## Capabilities

### New Capabilities

- `portfolio-rendering`: Readable initial HTML, deterministic hydration and progressively enhanced portfolio interactions.

### Modified Capabilities

None. Existing interaction and content contracts remain applicable.

## Impact

Primary files: app/page.tsx, app/layout.tsx, context/theme-context.tsx, section components, lib/animations.ts and new small section-observation/interaction components where needed. Documentation and CHECKLIST.MD will explain static prerendering versus client hydration. No new framework, dependency, forced request-time rendering or deployment change is required.

This proposal is independent of the pending skill-spec archive decision. It preserves the implemented compact skill evidence behavior and does not archive or rewrite prior changes.
