# Tasks

## 1. Baseline and audit evidence

- [x] 1.1 Create docs/accessibility-audit.md with every WCAG 2.1 A/AA criterion, applicability rationale and evidence status; verify the inventory against the W3C recommendation and record the production build and test matrix.
- [ ] 1.2 Add a reproducible test-only browser accessibility runner and documented command using available tooling or pinned axe-core; verify it reports a deliberately invalid fixture and saves baseline results for both themes and all distinct interaction states without adding production JavaScript.
- [x] 1.3 Record confirmed baseline failures and manual checks for menu, projects/media, skills, journey, greeting, sound/theme, notices and contact; verify each distinct state in the design matrix has coverage or an explicit unverified disposition.

## 2. Controls and contact process

- [x] 2.1 Add persistent associated contact labels, sender-email autocomplete and understandable required/error information; verify HTML and component regressions cover both fields, correction guidance and retained values on failure, and update the audit rows.
- [ ] 2.2 Keep submission named while pending and expose accessible pending, failure and accepted feedback; verify safe provider-stub tests exercise all outcomes, no email is sent, no unintended focus movement occurs, and document the fixture commands.
- [ ] 2.3 Remediate confirmed control-name, visible-label, decorative-icon and state/panel relationship defects across the interactive sections; verify regression tests and stateful browser scans, documenting the repaired criteria without duplicating existing keyboard contracts.

## 3. Dynamic structure and keyboard behavior

- [ ] 3.1 Repair the open drawer heading hierarchy and any confirmed modal naming, containment, restoration or neighbor-update barriers; verify Rail and Carousel openers, the existing embedded screenshot carousel (not a new fullscreen expansion feature), first/last boundaries and dismissal in both themes with browser and component tests, recording evidence.
- [ ] 3.2 Fix remaining confirmed reading-order, hidden-content, keyboard or focus barriers in skills and timeline/journey; verify all actions work without pointer gestures and preserve existing menu/skip-link/breakpoint tests, updating the corresponding audit rows.

## 4. Contrast and adaptable presentation

- [ ] 4.1 Measure and repair failing text/non-text contrast and color-only cues across both themes, including gradients, transparent surfaces, focus and feedback; verify a versioned ratio table records actual rendered pairs, font thresholds and exceptions, with regression checks for changed tokens/classes.
- [ ] 4.2 Remediate content loss or clipped controls at 320 CSS pixels, 200% text enlargement, 400% zoom and WCAG spacing overrides; verify menu, project overlays, skills, journey and contact in portrait/landscape and document screenshots and justified scrolling exceptions.

## 5. Motion, language and media

- [ ] 5.1 Provide accessible pause/update control for the automatic role loop where required while preserving default cycling and static reduced-motion behavior; verify pause/resume, stable accessible role descriptions and existing hero tests, documenting normal-mode acceptance.
- [ ] 5.2 Verify greeting language identification, flicker thresholds and reduced-motion handling, remediating confirmed barriers; verify transitions remain readable and source behavior tests pass, and retain measured/manual evidence for criteria automation cannot settle.
- [ ] 5.3 Audit each project video's actual content, controls and applicable caption/audio-description/alternative requirements; remediate with accurate alternatives and tests where possible, recording per-media evidence and leaving unavailable alternatives unresolved rather than inventing content.

## 6. Manual assistive-technology acceptance

- [ ] 6.1 Deliver a desktop/mobile screen-reader walkthrough with version fields and safe contact-feedback fixtures in the audit documentation; verify every interactive process and meaningful announcement has explicit steps and expected outcomes.
- [ ] 6.2 Execute or obtain user-reported VoiceOver/Safari macOS acceptance for reading order, controls, overlays, state changes and all contact outcomes; verify dated results distinguish tester reports from automated evidence and keep the task unchecked if testing is unavailable.
- [ ] 6.3 Execute or obtain user-reported VoiceOver/Safari iOS acceptance across the same processes and orientations; verify device/browser/AT versions and dated results are recorded, retaining the task as pending if a device or tester is unavailable.

## 7. Integration and evidence-based closure

- [ ] 7.1 Run the final production-build matrix, browser scans and all affected regressions plus pnpm lint, TypeScript and pnpm build; verify no unresolved automated failures, inspect incomplete scan rules, and link results to the final build rather than an earlier baseline.
- [ ] 7.2 Reconcile every criterion including remaining timing, input-modality, sensory and non-interference checks; verify all applicable A/AA criteria pass before closing compliance, otherwise document blockers and leave this acceptance task unchecked.
- [ ] 7.3 Update only the selected accessibility checklist rows to match evidence, preserving keyboard completion and separating local acceptance from deployment; verify no untested screen-reader, contrast, ARIA or full-compliance claim is marked passed.
