# Design

## Context

See proposal.md for motivation. Next.js 14 prerenders Client Components as well as Server Components on an initial load; the use-client directive establishes a JavaScript boundary rather than disabling HTML rendering. Reference: https://nextjs.org/docs/14/app/building-your-application/rendering/client-components.

Observed source findings:

- app/page.tsx and app/layout.tsx are already server components. Footer and SectionHeading are server-compatible.
- ThemeContextProvider wraps Header, page children and Footer but returns null until an effect sets mounted. This is the primary source-level blocker; production response inspection will establish the baseline during implementation.
- About uses client code only for section observation, Framer Motion and balancing. SectionDivider is client solely for an entrance animation.
- Contact combines static introduction with form feedback, sound and CV controls. Skills combines static toolkit notes with evidence selection.
- Intro contains greeting timers and role animation; Projects contains Embla, drawer/media and pointer tilt; Experience contains Read More, view switching and a dynamically imported ssr:false 3D stage. These are legitimate client responsibilities.
- sectionReveal and several local motion elements initially set opacity to zero; the timeline library also has reveal behavior. Removing the provider gate alone is insufficient for no-JavaScript visibility.

## Goals / Non-Goals

**Goals:** Deliver meaningful initial HTML; reduce unnecessary client ownership of static content; preserve hydration correctness and existing interaction contracts; verify the result against production output.

**Non-Goals:** Forced request-time SSR, removing all client components, a Next/React upgrade, a redesign, theme-flash elimination, replacing carousel/timeline libraries, or making JavaScript-dependent forms, evidence panels, drawers and 3D controls fully operable without JavaScript. No fixed bundle-reduction percentage is promised.

## Decisions

### Keep prerendering and fix provider initialization

Remove the root mounted/null gate. Always render the context provider and children with deterministic initial light state matching the server. Resolve saved light/dark preference in an effect; validate storage values and fall back to matchMedia/default safely. Do not use browser APIs in state initializers during rendering. Keep any mount-specific logic local to individual browser-dependent controls, never around the whole page.

A pre-hydration theme script could reduce color switching but adds a separate synchronization concern; it is outside this change. Cookies or force-dynamic would make a static portfolio request-dependent without resolving the actual mount gate.

### Server composition around focused client behavior

Use a small client section wrapper that accepts server-rendered children and owns useSectionInView. Keep its initial markup visible. The server parent imports static content and passes it as children; the client wrapper must not import server content modules itself.

Concrete boundaries:

| Area | Server ownership | Client ownership |
| --- | --- | --- |
| About | Heading and full prose | Section observation; optional balancing wrapper |
| Contact | Section shell, heading and email introduction | Form action feedback, pending state, sound and CV controls |
| Skills | Section shell, heading/caveat and native toolkit notes | Categorized evidence selector and its panel |
| Intro | Section shell and static portrait/positioning where practical | Greeting/role choreography and CTA context feedback |
| Projects | Section shell and heading | Existing carousel, cards and drawer/media |
| Experience | Section shell and heading | Timeline pagination, journey controls and deferred canvas |
| Divider/footer | Static markup | None required |

All six section shell modules should compose on the server; extract existing interactive bodies into named section-specific client files rather than merely relocating an unchanged full section. About prose, toolkit markup and contact introduction must actually leave the client import graph. Keep related greeting/role state together. Reuse existing libraries and providers; no second state or animation library.

Content in lib/data.ts includes React icon elements and callback-based formatting helpers. Do not pass the entire module or functions over a server/client boundary. Keep imports local to the appropriate environment or pass only serializable records/rendered React-node slots. Avoid a wholesale content-schema migration.

### Visible by default, enhancement after hydration

Ensure initial opacity is one and content has no offscreen translation or hidden class that requires script execution to clear. Apply this to the section wrapper, intro portrait/headline, role title initial state, project card/skill reveals and initial timeline entries. Disable timeline reveal animation where needed using its existing API; retain its library and content structure. Decorative animation may run after mounting only when it does not withhold essential content and respects reduced motion. Do not rely solely on a noscript override while leaving slow-hydration visitors looking at blanks.

### Verify behavior and architecture separately

Capture a baseline production response before edits. Parse HTML excluding script/style payloads, since an RSC payload string is not visible document content. Test the resulting page with JavaScript disabled at 390px and 1280px, scrolling all sections and checking actual visibility and native links/disclosures. Test normal hydration with light/dark/system preferences, blocked/invalid storage, and reduced motion.

Review the production client-reference manifest/import graph to confirm static About/toolkit/contact content is no longer owned by a client module. Record route First Load JS before and after using identical build conditions; explain any increase rather than substituting a directive count for a performance result. No bundle percentage is an acceptance gate.

Keep the existing no-dev-server-start rule. Use isolated build output if a user server owns .next. Mock contact delivery for success/error verification; do not send real email.

## Risks / Trade-offs

- [Previously masked hydration differences become visible] → Compare deterministic initial state for themes, media queries, greetings and timeline layout; test console hydration errors in both viewport sizes.
- [Moving a heading duplicates section IDs or observation] → Each section keeps one id, one heading and one observer owner; regression-test navigation.
- [Content is in HTML but still invisible] → Pair parsed-response tests with JavaScript-disabled visibility checks.
- [Reduced client scope does not guarantee lower total JS] → Record the build baseline and post-change result alongside the import-boundary review.
- [Theme color can change after hydration] → Accept this existing preference-resolution timing while keeping content visible; do not claim zero flash.

## Migration Plan

Capture baseline evidence, remove the provider gate, then extract static/server content and correct initial visibility. Validate each step before broader interaction checks. Update docs with the boundary table and only then complete CHECKLIST.MD with wording such as “Server-rendered initial content with focused client interactions,” explaining static prerendering. Rollback restores the changed provider/components together; no data migration or API change is involved.
