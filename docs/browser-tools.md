# Browser tools

`/tools` contains three local, browser-only utilities. No login, uploads, server transformations, or extra dependencies are required. Utility input and output live in component memory, not URLs, analytics, logs, local/session storage, or IndexedDB. This is a statement about utility data handling, not a claim that the whole site makes no network requests.

## Definitions and limits

- **JSON formatter:** standard `JSON.parse` followed by `JSON.stringify(value, null, 2)`. Blank/malformed JSON is rejected without exposing source text in errors. This is not lossless: duplicate object keys keep the last value, numbers use JavaScript precision, and numeric notation can normalize. For example, `9007199254740993` becomes `9007199254740992`. Do not use this for lossless large-number processing.
- **Word/character counter:** words are nonempty whitespace-separated sequences; characters count Unicode code points, including whitespace. `Hi 👋` plus a newline is 2 words and 5 characters. Combining marks count separately: `e` plus a combining accent is 2 characters, not 1 grapheme.
- **URL encoder/decoder:** uses `encodeURIComponent` and `decodeURIComponent`, not full-URL parsing or form decoding. `a b+&` becomes `a%20b%2B%26`; decoding `a+b` preserves the plus. Malformed percent escapes, encoded invalid UTF-8, and unpaired surrogates during encoding produce correction guidance.
- Each input accepts up to **100,000 UTF-16 code units** (an emoji may occupy two units). Oversized changes retain the previous input and display an error rather than silently truncating it.

Transformations run only when explicitly requested; counts update while typing. Editing input invalidates previous transformation output. Reset affects only its section and keeps focus on the reset button. A successful empty URL conversion is still a valid result.

Copy writes only after an explicit click. If clipboard access is denied or unavailable, selectable output stays available with manual-copy guidance. No input is read from the clipboard automatically.

## Verification

Pure-function coverage: `node --test tests/browser-tools.test.cjs`.

Native screen-reader announcement quality and deployed behavior remain unverified. The checks below do not constitute a full WCAG compliance audit.

### Local production evidence — 2026-10-30

- All 57 Node regression tests and all 9 Python SEO fixture tests pass. `pnpm lint`, `pnpm exec tsc --noEmit`, Prettier checks for touched application/test files, and the production build pass. The previous `_document` build failure did not reproduce; its cause is not established by this result.
- Build `YWus_pf-GTgYDCgrCOUCY`, served temporarily at `http://127.0.0.1:3131/`, statically generates `/tools` with reported 99.2 kB first-load JavaScript. Chrome 156.0.8078.80 and Python Playwright 1.58.0 ran the browser checks. No browser exceptions occurred. The mechanical UI detector reported no findings for the new page and utility component.
- [Browser evidence](browser-tools/browser-evidence.json) records light/dark at 320, 390 and 1280px with reduced motion, plus normal-motion navigation/formatting checks at 390 and 1280px. All six reduced-motion configurations pass 100% and 200% root text sizing without page overflow, including 100,000-unit JSON input/output. This is text-size emulation through the root font size, not an assertion that every browser zoom implementation was tested.
- Formatting/correction, literal markup, Unicode counts, URL conversion/errors, empty successful URL output, stale-output invalidation, oversized-change rejection and independent reset pass. Keyboard traversal, copy success using the real browser clipboard, denied/missing clipboard fixtures, status/error associations and focus retention pass.
- A synthetic marker was absent from observed request URLs/bodies, console messages, location/history, local/session storage and IndexedDB database inventory. A fresh context had no IndexedDB databases. All three utilities worked offline after loading, and reload initialized empty inputs. This verifies the tested application handling, not browser extensions or operating-system clipboard history.
- Direct route loading, footer entry, directory anchors, homepage About navigation, native skip-link focus, compact menu Tab/Shift+Tab containment, Escape focus return and breakpoint recovery pass. JavaScript-disabled checks at 390 and 1280px pass directory navigation, skip-link focus and native keyboard activation of the portfolio fallback. Mobile pointer activation also passes. The fallback remains visible; utility actions require JavaScript. Playwright text/role locators omit `noscript` contents, so the fallback check uses direct DOM selectors; keyboard activation avoids a headless smooth-scroll pointer-stability timeout.
- Six Tools-main axe WCAG 2.1 A/AA scans report zero violations but retain color-contrast incompletes caused by layered backgrounds. These are retained rather than counted as automatic passes. [Supplemental measurements](browser-tools/contrast-evidence.json) compare computed foreground colors against rendered background pixels, temporarily suppressing text/decorations and excluding rounded-control corners. All sampled normal/placeholder text exceeds 4.5:1: light minimum 5.471:1, dark minimum 8.555:1. Input borders against their field backgrounds exceed 3:1: light 3.034:1, dark 3.905:1. This supplement found a real 4.408:1 muted-text case over the dark glow; Tools now uses the stronger existing foreground token in dark mode. Disabled controls are exempt from this text measurement.
- Initial 200% text-size checks exposed three actual overflow sources: the shared decorative glow, fixed-height/nonwrapping action buttons, and API names in guidance. The user approved the shared-layout correction. Only the inert decorative layer is clipped; buttons and guidance now wrap. Interactive content, focus rings and the document itself are not clipped.
- Live initial-HTML checks pass for homepage and Tools metadata, homepage semantics/identity graph, exact two-page sitemap, robots policy and the 1200×630 share image. The homepage content verifier also passes. These are local working-tree results, not deployed evidence; no deployment occurred.

### Reproduce

Use a Python environment with Playwright 1.58.0 and Pillow for the contrast supplement, and an installed Google Chrome at the path in the scripts. These are test-runner dependencies, not application packages. Build first; do not run a dev server against the same `.next` directory during production verification.

```sh
node --test tests/*.test.cjs
PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s tests -p 'seo_html_test.py'
pnpm lint
pnpm exec tsc --noEmit
pnpm build
pnpm start --hostname 127.0.0.1 --port 3131
```

In another terminal with that server running:

```sh
python3 tests/browser-tools-browser.py --url http://127.0.0.1:3131/
python3 tests/browser-tools-contrast.py --url http://127.0.0.1:3131/tools
python3 tests/seo-html.py http://127.0.0.1:3131/
python3 tests/portfolio-html.py http://127.0.0.1:3131/
```

The browser scripts default to evidence JSON and screenshots under `/tmp`; they never submit the contact form. Native VoiceOver follow-up: navigate the three sections, confirm labels and count definitions, submit malformed JSON, correct it and copy, deny clipboard access and use manual selection, then reset. Confirm announcements are understandable and nonduplicated. No native VoiceOver pass has been recorded.

## Homepage shortcut

### Emoji revision — 2026-10-30

Final verification supersedes the blocked run below. The user approved the scoped contrast correction: secondary utility buttons use the brighter foreground token in dark mode, without changing global tokens or utility behavior. Production build `x1UOuQYyTE0RyVbPbJFKf` passes the full Tools interaction/privacy/navigation/accessibility browser suite, including axe checks in both themes at 320, 390 and 1280px. The full intro suite also passes on this build, including emoji hover/focus settling, reduced-motion suppression, first-tap touch, no-JavaScript navigation and 100%/200% text sizing. Evidence: [final intro checks](browser-tools/intro-emoji-final-evidence.json), [final Tools regression](browser-tools/tools-emoji-final-evidence.json). All 58 Node tests, 9 SEO tests, lint, TypeScript, production compilation and live SEO endpoints pass. The temporary production server was stopped after verification. Native VoiceOver and deployed behavior remain unverified; no overall accessibility-compliance claim is made.

The current shortcut adds a decorative 🛠️ hidden from assistive technology, with a brief one-shot tilt on hover and keyboard focus using installed Framer Motion. Reduced motion disables the tilt. The shared footer Tools link is removed on both routes; header and floating controls are unchanged. The earlier static-shortcut verification below is historical.

Isolated production build `X_pAKNx_YdbVXm0Sk5Hvg` passes 58 Node tests, 9 SEO tests, lint, TypeScript, production compilation and live SEO endpoint checks. [Emoji evidence](browser-tools/intro-emoji-evidence.json) records Chrome 156 checks on localhost port 3132 using the isolated snapshot described below. Hover/focus motion settles without moving the target; no initial motion occurs. First-tap touch, keyboard and JavaScript-disabled navigation pass. Both themes at 320, 390 and 1280px pass 100%/200% text sizing, both project views and visible focus. Minimum shortcut text contrast is 6.838:1. No shortcut browser exceptions occurred. Mobile dark-theme rendering was visually reviewed.

The broader Tools regression run stopped at an axe contrast failure at dark theme/390px on an existing secondary utility button: foreground `#acb7d6`, background `#3e4c6b`, ratio 4.28:1 against the required 4.5:1. Light-theme interaction/privacy checks and earlier navigation configurations passed before this failure. This is not a full regression pass. The final shortcut production-regression task remains open pending a separately approved contrast correction; utility styling is unchanged. Native VoiceOver and deployed verification remain unverified.

### Earlier static shortcut verification

The introduction now includes "Something to get done? Try the free tools." after the Contact action and hiring preferences. "Try the free tools" is an underlined native same-tab `/tools` link. It adds no header entry, floating control, click handler or client state. Copy lives in `introCallToAction` in `lib/data.ts`.

Local build `30Su2wNLeaSYgl3rEQRnJ` on 2026-10-30 passes all 58 Node tests, lint, TypeScript and production compilation. `tests/intro-tools-shortcut.test.cjs` verifies the actual copy, SSR ordering and native-link semantics; portrait coverage still passes. [Shortcut evidence](browser-tools/intro-shortcut-evidence.json) and [Tools regression evidence](browser-tools/intro-tools-regression-evidence.json) refer to this same build.

Initial verification found a 622px document at 320px/200% text sizing, unchanged when the shortcut paragraph was hidden. The user approved including a homepage reflow correction. Isolated production measurements identified the long role title as the largest source, alongside other long text and unbounded controls. The homepage main now inherits `overflow-wrap: anywhere`; project view/paging controls wrap, and skill/journey buttons have bounded widths and grow vertically. No content was removed, font size reduced, or document overflow hidden. Role timing, portrait props and interaction handlers are unchanged.

`tests/intro-tools-shortcut-browser.py` passes light/dark checks at 320, 390 and 1280px with reduced motion and 100%/200% root text sizing. Both project views fit the 320px page at enlarged text size, including switching back to Carousel. The shortcut keeps its native same-tab destination, accessible visible label, sequential keyboard focus after Contact, focus ring and underline. The header has no Tools entry and the footer retains its link. Normal-motion and JavaScript-disabled navigation pass at 390 and 1280px. Rendered-background measurements give a minimum 6.838:1 contrast for the new sentence and link. No browser exceptions occurred.

The existing Tools interaction/privacy/navigation suite and live homepage/Tools SEO, sitemap, robots, share-image and document-content checks also pass on the new build. Screenshots at mobile and desktop sizes were reviewed. Native VoiceOver announcement quality and deployed behavior remain unverified; the separate accessibility audit is unchanged.

A concurrent portfolio dev server on port 3002 was writing the source tree's `.next` directory. Production verification therefore used an isolated source snapshot at `/tmp/portfolio-intro-production.Nu9szV` with linked existing dependencies and its own `.next`. It excluded `.git`, environment files and existing build output. Build/start commands used `pnpm --config.verify-deps-before-run=false` to avoid pnpm trying to reinstall the linked dependency directory. No dependency, configuration, or environment-file changes were made in the source project. The temporary production server on port 3131 stopped after verification.

To reproduce the shortcut check after a clean production build, run `python3 tests/intro-tools-shortcut-browser.py --url http://127.0.0.1:3131/` with the test-runner prerequisites described above. Its evidence defaults to `/tmp/intro-tools-shortcut-evidence.json`. Stop any dev server sharing `.next` first, or use a separate source snapshot.
