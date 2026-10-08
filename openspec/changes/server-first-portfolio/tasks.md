# Tasks

## 1. Initial rendering and theme

- [x] 1.1 Capture the current production HTML, JavaScript-disabled screenshots and route First Load JS before edits; parse body content without script/style payloads and record which required content is missing or invisible in a change-local baseline report. Use isolated build output when necessary and do not start pnpm dev unless requested.
- [x] 1.2 Remove the whole-page theme mount gate, preserve deterministic initial context and validate preference values with safe storage/system fallbacks; verify initial body content exists and hydration succeeds for stored light/dark, system preference, invalid storage and throwing storage.
- [x] 1.3 Add a repeatable production-response regression check for the required initial markup and document how to run it; verify it detects the baseline omission and passes after provider/rendering corrections, without matching text inside scripts.

## 2. Server composition and visible content

- [x] 2.1 Extract a small section-observation client wrapper accepting server-rendered children; move About prose and static divider rendering to server composition, preserving section IDs and headings. Verify About is readable without JavaScript and section observation still updates navigation after hydration.
- [x] 2.2 Split Skills and Contact into server shells/static content and focused client interaction components; verify toolkit notes and contact introduction are outside the client import graph, all 22 skill controls retain current evidence behavior, native toolkit disclosures work without JavaScript, and mocked form success/error feedback still works without real email delivery.
- [x] 2.3 Compose Intro, Projects and Experience through server section shells with their existing interactive bodies as client components; verify one heading/anchor/observer per section, valid serializable boundaries and preserved greeting/role, carousel/drawer and timeline/journey controls.
- [x] 2.4 Correct initial opacity/visibility in section reveals, intro content, role title, skill/project elements and timeline entries so content is visible before hydration; verify all required initial content at 390px/1280px with JavaScript disabled and reduced motion, including contact anchors and the first project card/three timeline entries.
- [x] 2.5 Document the final server/client boundary map and rendering terminology in docs, with production manifest/import-graph evidence and comparable before/after First Load JS measurements; confirm static About/toolkit/contact content is server-owned and explain any bundle increase without claiming unsupported performance gains.

## 3. Integration acceptance

- [x] 3.1 Verify light/dark hydration at desktop/mobile sizes without console mismatches, existing navigation and focus behavior, greeting/role interactions, project navigation, compact evidence, timeline expansion, deferred 3D loading, and theme/sound controls; record screenshots and regression results with both normal and reduced motion.
- [x] 3.2 Run pnpm lint, pnpm exec tsc --noEmit, relevant existing tests, a production build and strict OpenSpec validation; resolve attributable failures and record final results. Only after acceptance mark the selected CHECKLIST.MD item complete using accurate wording about server-rendered initial content and focused client interactions.
