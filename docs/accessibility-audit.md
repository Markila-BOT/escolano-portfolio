# Portfolio accessibility audit

## Scope and status

Change: `audit-portfolio-accessibility`. Local evidence only; no deployment or full-conformance claim.
Inventory verified on 2026-10-09 against the [W3C WCAG 2.1 recommendation, 6 May 2025](https://www.w3.org/TR/2025/REC-WCAG21-20250506/): 50 A/AA criteria including legacy 4.1.1. This is not WCAG 2.2. A scanner pass is not a criterion pass. Unverified includes tentative applicability: do not infer not-applicable from missing evidence.

Baseline production build: `aP0QVcpML8yo6oZbN1G41`, rebuilt before accessibility code edits. Current source includes unrelated uncommitted work that is preserved. Browser/scanner versions and timestamps are saved in [baseline.json](accessibility/baseline.json). This baseline is not post-remediation evidence.

## Criterion matrix

| Criterion | Level | Applicability / baseline observation | Status | Required evidence / affected source |
| --- | --- | --- | --- | --- |
| 1.1.1 | A | Images, icons and project previews require meaningful or decorative alternatives. | Unverified | Image names and purpose review; axe |
| 1.2.1 | A | Determine whether each prerecorded project video has audio; alternatives depend on content. | Unverified | Per-video content review |
| 1.2.2 | A | Project videos may contain speech or meaningful sound. | Unverified | Review captions against actual audio |
| 1.2.3 | A | Project videos may convey essential visual information. | Unverified | Compare media alternative or description with video |
| 1.2.4 | AA | No live broadcasts identified in static project data. | Unverified | Confirm every embedded source is prerecorded |
| 1.2.5 | AA | Essential video visuals may need audio description. | Unverified | Per-video description review |
| 1.3.1 | A | Baseline contact labels missing; persistent associated labels now implemented. Other page relationships remain under review. | Unverified | Contact HTML/component regressions pass; full-page relationships and AT pending |
| 1.3.2 | A | Responsive layouts, dynamic drawers and journeys need logical reading order. | Unverified | DOM order and desktop/mobile AT |
| 1.3.3 | A | Instructions must not depend only on spatial, visual or sound cues. | Unverified | Review all instructions and states |
| 1.3.4 | AA | Menu, overlays and forms must work in either orientation. | Unverified | Portrait/landscape browser and device |
| 1.3.5 | AA | Sender email is the personal-data field and now explicitly uses autocomplete=email. | Pass (local component) | tests/contact-accessibility.test.cjs; rendered native field and contact props |
| 1.4.1 | A | Selected, required, disabled and error states need non-color indicators. | Unverified | Both-theme state review |
| 1.4.2 | A | Sound cues and embedded media require audio-control assessment. | Unverified | Sound default, duration and player controls |
| 1.4.3 | AA | Gradient hero text, muted text, tags and toasts need rendered ratios. | Unverified | Rendered pair table, font thresholds; axe incomplete review |
| 1.4.4 | AA | All interactive content must remain usable with enlarged text. | Unverified | 200% text, both themes and overlays |
| 1.4.5 | AA | Project screenshots may include interface text; determine whether essential copy has text equivalents. | Unverified | Screenshots and surrounding descriptions |
| 1.4.10 | AA | Page and overlays must reflow without loss at 320 CSS pixels. | Unverified | 320px and actual 400% zoom at 1280px |
| 1.4.11 | AA | Essential boundaries, selected states and focus indicators require measured contrast. | Unverified | Rendered non-text pair table |
| 1.4.12 | AA | Spacing overrides must not clip or hide content. | Unverified | Line 1.5, paragraph 2, letter .12, word .16 em |
| 1.4.13 | AA | Any extra hover/focus content needs dismissal and persistence review. | Unverified | Inspect hover and keyboard focus states |
| 2.1.1 | A | Menu baseline is documented; full-page and player keyboard processes need checks. | Unverified | Existing keyboard regressions plus all processes |
| 2.1.2 | A | Menu/drawer focus containment must allow dismissal and restoration. | Unverified | Tab, Shift+Tab, Escape, opener restoration |
| 2.1.4 | A | Journey character-key handlers must remain scoped to appropriate focus. | Unverified | Focused and outside-region shortcut tests |
| 2.2.1 | A | Transient visitor/contact notifications require timing assessment. | Unverified | Check essential information remains available |
| 2.2.2 | A | Normal-mode role titles update indefinitely without a user pause control. | Fail | components/role-title-loop.tsx; normal-mode pause/resume |
| 2.3.1 | A | Greeting glitches, animated gradients and videos need flash assessment. | Unverified | Transition and per-media review; no inferred pass |
| 2.4.1 | A | Native skip link is covered by prior keyboard evidence; retest final build. | Unverified | docs/keyboard-navigation.md and browser |
| 2.4.2 | A | Page metadata supplies a title; validate the audited build. | Unverified | Rendered document.title |
| 2.4.3 | A | Drawer neighbors and timeline expansion may change focus availability. | Unverified | Boundary, expansion and dismissal keyboard tests |
| 2.4.4 | A | Icon links and CV/project destinations need contextual purpose. | Unverified | Rendered link names and targets |
| 2.4.5 | AA | Single page does not imply a set of multiple pages; confirm route scope. | Unverified | Route inventory and single-page rationale |
| 2.4.6 | AA | Baseline drawer introduced another h1; duplicate removed. Full dynamic heading/name review remains. | Unverified | Drawer source regression passes; browser and AT acceptance pending |
| 2.4.7 | AA | Every keyboard-operable control needs a visible focus indicator. | Unverified | Both themes and interactive boundaries |
| 2.5.1 | A | Carousel/3D gestures must have simple action alternatives. | Unverified | Buttons and no-gesture full process |
| 2.5.2 | A | Pointer activation must permit cancellation where required. | Unverified | Press, move away and release tests |
| 2.5.3 | A | Accessible names must include visible labels, including greetings. | Unverified | Name/text comparison across changing states |
| 2.5.4 | A | No device-motion-only action identified; inspect journey controls. | Unverified | Sensor and interaction source review |
| 3.1.1 | A | Document language is configured; inspect rendered HTML. | Unverified | html lang and AT pronunciation |
| 3.1.2 | AA | Greetings use several languages and require language-part assessment. | Unverified | Every greeting language and actual AT |
| 3.2.1 | A | Focus should not unexpectedly navigate or change context. | Unverified | Tab through all controls |
| 3.2.2 | A | Input changes should not unexpectedly submit or navigate. | Unverified | Contact editing and selector changes |
| 3.2.3 | AA | Check repeated navigation scope; this is a single-page portfolio. | Unverified | Route inventory and menu consistency |
| 3.2.4 | AA | Controls with the same function require consistent identification. | Unverified | Carousel, screenshots, project and journey controls |
| 3.3.1 | A | Contact native and server validation must identify errors accessibly. | Unverified | Invalid fields and safely stubbed failure |
| 3.3.2 | A | Contact now has visible associated required labels and correction guidance for both fields. | Unverified | Contact HTML/component regressions pass; all instructions and browser outcomes pending |
| 3.3.3 | AA | Contact errors should explain known corrections without losing values. | Unverified | Malformed email, empty message and server failure |
| 3.3.4 | AA | Contact sends correspondence, not an identified legal/financial commitment; assess data scope. | Unverified | Contact purpose and provider process review |
| 4.1.1 | A | The 2025 recommendation treats this legacy parsing criterion as always satisfied. | Pass | W3C 2025 recommendation note; other semantics still tested |
| 4.1.2 | A | Pending submission is now named/busy, decorative icons hidden. All state/panel relationships still need acceptance. | Unverified | Pending component and baseline axe evidence; final state scans and AT pending |
| 4.1.3 | AA | Contact, project and journey updates need meaningful accessible status feedback. | Unverified | Safe outcome fixtures and actual AT |

## Production test matrix

All checks require light/dark themes and normal/reduced motion. Base widths: 320, 390 and 1280 CSS pixels. Initial HTML and hydrated states are separate. Additional manual checks: 200% text, actual 400% browser zoom from 1280px, WCAG spacing overrides, portrait/landscape and 960px menu breakpoint recovery.

| Process / distinct states | Baseline coverage | Remaining acceptance |
| --- | --- | --- |
| Initial HTML / hydrated page | Planned hydrated scans: six width/theme pairs, both motion preferences; initial HTML remains unverified | Reading order, focus visibility, text and rendered contrast |
| Menu closed/open | Deep scan at 320px in both themes | Keyboard containment/restoration, Escape, 960px recovery |
| Carousel and Rail | Deep scans of both views and each Rail project drawer | Each Carousel opener, first/last neighbors, focus restoration |
| Project screenshots | Existing embedded carousel only; no screenshot-expansion control in source | First/last slides, keyboard and focus; clarify expansion task scope |
| All project videos | Open drawers scanned; external media not proof of content accessibility | Actual audio/visual content, captions and description for every URL |
| Skills collapsed/each expanded | Deep scans of every skill button at 320px in both themes | Correct reading order, language, focus and inactive content |
| Timeline collapsed/expanded | Deep scans before/after each Read More | Focus when expansion removes control |
| Journey open/each stop/closed | Deep scans via Next until disabled | Previous/keyboard boundary focus and shortcuts |
| Greeting languages | Initial greeting only | Every language transition, flash assessment and AT pronunciation |
| Sound/theme | Named controls inventoried; themes scanned | Sound-enabled cue behavior and AT feedback |
| Visitor notice | Toast timing may expire before hydrated scan | Notice announcement, persistence/timing and contrast |
| Contact invalid/pending/failure/accepted | Fields inventoried; POST explicitly blocked in runner | Native invalid and safe provider-stub browser/component outcomes |
| Desktop/mobile AT | Unverified | Real macOS Safari/VoiceOver and iOS Safari/VoiceOver acceptance |

Partial coverage is explicit. Unexecuted states, incomplete scanner rules and third-party-frame limitations are not passes. Full compliance and screen-reader checklist rows remain unchecked.

## Reproduce baseline

Install development dependencies with `pnpm install --frozen-lockfile`. Scanner is pinned `axe-core@4.11.0`, loaded only by the test browser; it is not imported into the application.

Python 3.12 with `playwright==1.58.0` and a Chromium executable are required. On this machine the Python test package is installed temporarily at `/tmp/portfolio-a11y-python`; this path is not a portable dependency installation.

```sh
python3 -m pip install --target /tmp/portfolio-a11y-python playwright==1.58.0
pnpm build
pnpm start --hostname 127.0.0.1 --port 3130
PYTHONPATH=/tmp/portfolio-a11y-python python3 scripts/audit-accessibility.py \\
  --url http://127.0.0.1:3130 \\
  --browser "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \\
  --output docs/accessibility/baseline.json
```

Stop the temporary production server afterwards. The runner self-tests an intentionally unlabeled field and unnamed button, rejects non-loopback targets, blocks all POST requests (no contact email or diagnostic POST), writes violations/incomplete findings and state errors, and exits nonzero for violations. POST-dependent feedback must use a separate safe fixture, not this scan. Automated screenshots/trees do not replace actual assistive technology.

## Baseline findings and pending decisions

Source-confirmed remediation candidates: persistent contact labels and email autocomplete; named pending submission; drawer heading hierarchy; user control of automatic role updates.

Baseline runner: Chrome 154.0.8037.98, axe-core 4.11.0; 162 scans, 12 viewport/theme/motion configurations, zero state-execution errors. Each theme has 76 standard-motion 320px scans including all 16 Rail project drawers, skill panels, timeline expansions and journey stops. Other configurations cover the hydrated base page only. The deliberate invalid fixture correctly reported `label` and `button-name`.

There are 46 rule-failure occurrences across scans, not 46 unique defects: 36 `svg-img-alt`, six `scrollable-region-focusable`, four `color-contrast`. Unnamed decorative technology/timeline icons and drawer scrolling are confirmed browser findings. Contrast findings occurred immediately after menu/view animations; the runner now waits 600ms before scanning, and a stable rendered-ratio review is still required. Incomplete rules, gradients and third-party frames remain unresolved manual work.

Implemented so far: associated persistent required contact labels and email autocomplete, field correction guidance, controlled values retained on failure; persistent polite feedback with duplicate toast announcements disabled; named busy submission and decorative spinner/icon; drawer title changed from extra h1 to paragraph, decorative technology icons hidden, named keyboard-scrollable details region with visible focus styling; decorative timeline icons hidden. These changes do not close full-page contrast, ARIA, keyboard or AT acceptance.

Safe regression command: `node --test tests/contact-accessibility.test.cjs tests/contact-email.test.cjs tests/keyboard-navigation.test.cjs tests/project-loading.test.cjs tests/project-video.test.cjs`. Provider requests are stubbed in Node VM tests; no live email is sent. Contact tests cover labels, required guidance, autocomplete, pending name, accepted/failure feedback and retained values. Browser focus/announcement acceptance for all contact outcomes is still pending. The component code does not call focus during submission.

Screenshot scope confirmed by the user on 2026-10-09: verify the existing embedded screenshot carousel and its boundaries, without adding a new fullscreen expansion feature. Design and task 3.1 reflect that decision.

The first two browser attempts could not locate `#contact` in the old production artifact `ptrFT661SmsigpLHhT4-w` and were stopped. A fresh production build resolved the observation; those aborted attempts are not acceptance evidence.

## Manual VoiceOver acceptance guide

Record tester, date, OS/device, Safari version, VoiceOver version, URL/build ID, theme, orientation and motion preference. Record each step as pass/fail/unverified with observed wording, focus destination and supporting evidence. Explicitly identify tester-reported results; screenshots and headless scans do not count as screen-reader acceptance.

1. Load the audited production build in Safari. Read by headings and landmarks: one introductory h1, section h2s, meaningful project headings, one active navigation landmark and logical reading order. Activate the skip link; verify it reaches main content.
2. In both themes, open the compact menu, traverse forwards/backwards, activate a section and dismiss using Escape on desktop or the close button on mobile. Focus returns to the visible opener. At the 960px breakpoint, no hidden menu control retains focus.
3. Switch Carousel/Rail; open each distinct project, read its named drawer, navigate previous/next to both boundaries, traverse screenshot slides using controls and keyboard, then close. Disabled boundaries do not strand focus; return reaches the actual visible opener. Verify inactive content is absent from reading order.
4. Expand/collapse every distinct skill; verify its name, expanded state and corresponding region. Expand the timeline completely, then open the journey and traverse every stop without pointer gestures. Check boundary focus and meaningful changed-stop announcements.
5. Cycle all greeting languages; check pronunciation and a stable description of roles without continuous announcements. Verify the eventual role pause/resume control and reduced-motion static behavior (not implemented yet). Check visitor notice announcement and whether important information remains available afterwards.
6. Operate theme and sound controls: purpose/state are understandable, default sound is off, sound never replaces visual/announced feedback. Inspect actual embedded player controls, captions, audio description and alternatives; record per-video results, not inferred passes.
7. Contact: verify both persistent labels, required state, email input purpose and descriptions. Submit empty/invalid input and correct it. For pending, rejection and acceptance, use only the safe fixtures described below; expect a named busy button, announced persistent result, retained failure values and no programmatic focus jump.
8. Repeat on a real iOS device in portrait/landscape with touch exploration, swipe navigation and rotor headings/links/controls. Repeat key flows with enlarged text. Record clipped or unreachable controls and any reading-order changes.

### Safe contact fixture limitation

The Node VM fixtures exercise provider rejection/acceptance and component state without delivery, but are **not** a Safari/VoiceOver browser fixture. Do not submit the deployed or ordinarily configured production contact form for acceptance testing. A dedicated browser-accessible stub harness for pending/failure/accepted states is still required before step 7 can be signed off. No production test backdoor has been added.

### Media inventory awaiting actual-content review

| Project | Video ID | Content / captions / audio description |
| --- | --- | --- |
| Valuation | gK5PkM5Okz8 | Unverified |
| Owner Web App | Vm0_QV5_snY | Unverified |
| Workflow | qTU8kAdfIWI | Unverified |
| Chat-Admin | 3i2YZLn77tw | Unverified |
| MerchantSpring | Hs6XEBY5BTI | Unverified |
| Lagoon | 6XUYfT9k07A | Unverified |
| Iris | mLPL8-nIMnE | Unverified |
| Rakuten Travel | xEo231TmRxc | Unverified |
| ADT | QRjNHXbdyvY | Unverified |
| WebOTX | uDpSI4LsSVk | Unverified |
| ECUs Non-Toyota-Diesel | k8YHQkQekk0 | Unverified |
| Lawson Smart Report | FypJL83X9Yg | Unverified |

No transcript or description has been fabricated. Current source autoplays/loops media without exposing player controls; this remains an unresolved control/motion issue, irrespective of caption applicability. Native macOS/iOS VoiceOver acceptance has not been performed.

## Implementation checkpoint: 2026-10-09

OpenSpec tasks 1.1, 1.3 and 2.1 are complete (3/19). Task 1.2 remains partial because the scanner does not yet exercise every interaction state in the approved matrix. Tasks 2.2, 2.3 and 3.1 have focused changes but remain unchecked pending complete process/browser acceptance. The manual guide is a draft: task 6.1 stays unchecked until a safe browser contact fixture exists.

Validation: 22 targeted Node tests pass; `pnpm lint` and `pnpm exec tsc --noEmit` passed for the focused changes, and strict OpenSpec validation passed after the screenshot clarification. The pre-remediation baseline production build passed. The post-remediation `pnpm build` compiled, linted and type-checked, then failed during page-data collection with `PageNotFoundError: Cannot find module for page: /_document`. There is no successful post-remediation production artifact or browser retest yet. No application `/_document` page was added as a workaround. Pause at this build blocker before further implementation; inspect generated `.next` state and retry a clean build only with an agreed recovery approach.

The selected checklist rows are unchanged: no unverified compliance, screen-reader, contrast or ARIA claim is marked complete. Existing keyboard acceptance remains preserved. No deployment or live contact delivery occurred.

All contrast ratios, resizing acceptance, media alternatives, timing, sensory/input-modality, non-interference and real desktop/mobile AT remain unverified. Do not mark compliance complete until every applicable criterion has final-build evidence.
