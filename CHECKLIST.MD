# Portfolio feature checklist

Tracks [SPECIFICATION.md](SPECIFICATION.md) against the current app.

Status key: `[x]` done or explicitly user-accepted closed, `[ ]` still open. **User-accepted closed** records a backlog decision, not proof that the stated acceptance criteria pass. Items marked **partial** exist, and do not yet meet the spec. Items marked **not applicable** have no checkbox and are excluded from progress totals, not counted as done.

## Progress

Reconciled against current source and existing verification records on 2026-10-31. Implementation completion does not imply fresh deployment, performance, or assistive-technology acceptance.

| Scope               | Done | Partial | Not started | Complete      |
| ------------------- | ---- | ------- | ----------- | ------------- |
| Current spec        | 108  | 4       | 3           | 108/115 (94%) |
| Future enhancements | 7    | 1       | 7           | 7/15 (47%)    |

Protected routes and server-state data fetching are not applicable. The public site has the portfolio homepage, `/tools`, and `/writing`, with static portfolio content.

## 1. User interface

- [x] Responsive design for all device sizes
- [x] Light and dark mode, with the preference saved in local storage
- [x] Smooth animations and transitions
- [x] Modern, clean aesthetic
- [x] Accessible navigation (menu button is "Open menu" / "Close menu" with expanded state; theme toggle names the theme it switches to)

### 1.1 One theme for light and dark

The toggle works. Sections, chrome, project cards, and the drawer read one navy and teal palette from `app/globals.css`, modeled on [Brittany Chiang](https://brittanychiang.com). Text meets 4.5:1 and boundaries meet 3:1 in both themes.

- [x] One semantic palette (background, surface, text, muted text, border, accent) that every section reads in both modes
- [x] Project cards and the project drawer use that palette
- [x] Contact fields use that palette
- [x] Experience timeline reads the palette
- [x] CV and submit are one button
- [x] Header, mobile nav, theme switch, skill chips, and footer share the same surface and muted text
- [x] Light and dark both pass the contrast check in section 7

Primitives come from `components/ui` (shadcn), and sections compose the shared elements listed below.

- [x] Every button uses `components/ui/button.tsx` variants (theme switch and the mobile menu use `chrome`; CV and submit use `pill`)
- [x] One icon library in sections: `react-icons` (carousel arrows included)
- [x] One import style for primitives: `@/components/ui/...`
- [x] One export style for components (sections are default function exports, `components/ui` is named)
- [x] `components/ui` files formatted by the repo Prettier config
- [x] Each shared element has a single source: section heading, tag chip, and form field are reused in Skills, Projects, and Contact

### 1.2 Adaptive logo

The adaptive SVG logo preserves its silhouette and reads the theme palette; implementation is in `components/logo-mark.tsx`.

- [x] Replace the bitmap with a transparent SVG or intentional light and dark variants, preserving the same silhouette in both themes
- [x] Select the correct logo from the active theme without flashing the wrong variant during hydration
- [x] Keep at least 3:1 contrast against the header and page surfaces in both themes, including hover and focus states
- [x] Make the logo link expose "Home" while its image is decorative, and provide a visible keyboard focus treatment
- [x] Give the logo link a minimum 44×44 px target and responsive placement that does not overlap navigation from 320 px through desktop widths
- [x] Add restrained hover and entrance motion, disable nonessential motion under `prefers-reduced-motion`, and verify the asset causes no layout shift

### 1.3 Interaction sound

Sound stays off until the visitor turns it on. Use `[use-sound](https://www.npmjs.com/package/use-sound)`, which wraps [Howler.js](https://github.com/goldfire/howler.js). Do not add Howler as a second direct dependency.

- [x] A sound control that turns interaction audio on and off, with the choice saved in local storage and defaulting to off
- [x] The control names the state it will switch to ("Turn sound on" / "Turn sound off"), keeps a 44×44 px target, and does not overlap the theme switch
- [x] Play short sounds only while sound is on, for navigation, the theme switch, opening and closing a project, and form success or error ([Howler.js examples](https://github.com/goldfire/howler.js#examples))
- [x] Stop playback immediately when sound is turned off, including a sound already in progress
- [x] Load audio after the visitor opts in so it does not compete with first paint, and keep one sprite or a small set of files
- [x] Do not autoplay on load, and keep the page usable with sound off

### 1.4 Current UI primitives

`components/ui/card.tsx` matches the current [shadcn card](https://ui.shadcn.com/docs/components/card): a function component with `data-slot`, `size`, and `CardAction`. Spacing uses a `--card-spacing` variable written for Tailwind 3. `button`, `drawer`, `label`, and `carousel` use named implementations and `data-slot` markers on rendered elements. Ref-bearing components retain `forwardRef` for React 18 compatibility; Root and Portal wrappers add no extra DOM. `field`, `tag-chip`, and `text-generate-effect` are local and stay as they are.

- [x] Align `components/ui/card.tsx` with the current shadcn card (`data-slot`, `size`, `CardAction`) ([Chánh Đại](https://chanhdai.com) builds with the current shadcn primitives)
- [x] Give `button`, `drawer`, `label`, and `carousel` that same shape (retain React 18 ref forwarding)
- [x] Section copy, skill chips, and project descriptions arrive together in under half a second, stay readable while they settle, and show at once when motion is reduced

## 2. Navigation

- [x] Header with main navigation
- [x] Mobile-responsive navigation menu
- [x] Section dividers
- [x] Smooth scrolling between sections

## 3. Content sections

### 3.1 Introduction

- [x] Personal introduction
- [x] Professional summary
- [x] Call-to-action elements ([Timmy O'Mahony](https://timmyomahony.com) states who the work is for and how to start)
- [x] One-line positioning: who you help and what you build ([Lee Robinson](https://leerob.io), [Brittany Chiang](https://brittanychiang.com))
- [x] Improve the multilingual greeting animation and presentation ([Bryan Elliott](https://elliottprogrammer.com) uses one small interactive moment)
- [x] Cycling role titles in the introduction ([Gyanendra Pal Singh](https://gyanendra.vercel.app/))
- [x] Analytics and a toast once per device visit ([Gyanendra Pal Singh](https://gyanendra.vercel.app/))

### 3.2 About

- [x] Detailed personal information
- [x] Professional background
- [x] Key skills and expertise
- [x] Update the About description to highlight the shift toward AI-assisted engineering, test-driven development (TDD), spec-driven development (SDD), intent-driven development (IDD), and doubt-driven development (DDD) ([Bryan Elliott](https://elliottprogrammer.com) states how AI fits the daily workflow)

### 3.3 Experience

- [x] Professional work history
- [x] Timeline-based layout
- [x] Detailed role descriptions
- [x] A 3D journey you can switch to from the timeline, walking between jobs and flying between countries, with the controls written on screen ([Bruno Simon](https://bruno-simon.com) drives a Three.js world and writes the controls on the page)
- [x] Tech tags on each role ([Brittany Chiang](https://brittanychiang.com))

### 3.4 Projects

- [x] Portfolio showcase
- [x] Project details and descriptions
- [x] Interactive project cards
- [x] Technology stack display
- [x] Improve the project carousel’s presentation, navigation, responsiveness, and interaction feedback ([Adham Dannaway](https://www.adhamdannaway.com) leads with a few selected pieces)
- [x] Move through the project carousel with the keyboard: ArrowLeft and ArrowRight move to the neighboring view, and Home and End move to the first and last view
- [x] After a project opens, Previous and Next move to the neighboring project in list order and keep the details open ([Francisco Salido](https://paco.fyi/projects/parkhub) labels the neighbor "Next" on the open project)
- [x] Looking Glass opens as one image at a time, with previous and next image controls, so the screenshots stay in a compact frame
- [x] Case studies: problem, role, and outcome on featured work ([Adham Dannaway](https://www.adhamdannaway.com), [Delba](https://delba.dev), [Brittany Chiang](https://brittanychiang.com))
- [x] Public code or a short build note on at least one project ([Bruno Simon](https://bruno-simon.com), [Bryan Elliott](https://elliottprogrammer.com))
- [x] Expandable project rail: one project opens, the rest stay as slim labels; optional Rail/Carousel switch preserves the carousel ([Gyanendra Pal Singh](https://gyanendra.vercel.app/))
- [x] Lay out drawer descriptions and case-study text with [Pretext](https://github.com/chenglou/pretext) using measured lines, cached preparation, and readable semantic fallbacks (verification in `docs/project-description-layout.md`)
- [x] YouTube video in the project drawer for MatterWorx, PotatoV3 and House Elf. MatterWorx - [https://youtu.be/vuIJBEjvYSo](https://youtu.be/vuIJBEjvYSo). Potato V3 - [https://youtu.be/KTq55vfBbGA](https://youtu.be/KTq55vfBbGA). House Elf - [https://youtu.be/lY9wpY_IktU](https://youtu.be/lY9wpY_IktU)
- [x] Add the personal project Truck Driver Guide ([live route desk](https://truck-driver-guide-web.vercel.app/)): a Django API and a React client. The card uses a screenshot of that route desk, links to the live client, has no video, and is tagged Personal. The GitHub README still describes an earlier health check; the card follows the live page.

### 3.5 Skills

- [x] Technical skills display
- [x] Add Claude Code, Codex, and Cursor to the skills chips, in the same list as the other tools ([Lee Robinson](https://leerob.io) names Cursor in the opening line)
- [x] Categorized skill sets ([Gyanendra Pal Singh](https://gyanendra.vercel.app/) groups languages, tools, databases, and design)
- [x] Visual representation of proficiency through evidence-based usage labels and linked project/experience sources

### 3.6 Contact

- [x] Contact form
- [x] Email integration (**user-accepted closed, 2026-10-09; partial verification** — reliable Resend submission; `onboarding@resend.dev` is testing-only, no verified production domain; setup in `docs/contact-email.md`)
- [x] Social media links ([Brittany Chiang](https://brittanychiang.com), [Chris Coyier](https://chriscoyier.net)) — labeled GitHub and LinkedIn links in Contact; [verification](docs/contact-social-links.md)
- [x] A direct hiring path: full-time and contract/freelance, remote or Philippines-based, with public email and the existing contact form (verification in `docs/hiring-path.md`)
- [x] A persistent action bar for CV, GitHub, and LinkedIn, with labels on hover and keyboard focus ([Gyanendra Pal Singh](https://gyanendra.vercel.app/)). CV opens `https://escolano-cv.vercel.app/`. No CV file was added.
- [x] Professional contact information

## 4. Technical features

### 4.1 Performance

- [x] Server-rendered initial content with focused client interactions (statically prerendered; verified with JavaScript disabled)
- [x] Optimized image loading
- [x] Code splitting (Next.js plus demand-loaded project video, 3D journey and Pretext; [evidence](docs/portfolio-performance.md))
- [x] Lazy loading components (video player only mounts in an open video drawer; 3D journey loads on request)
- [x] First Contentful Paint under 1.5s (deployed lab baseline: all three runs in both profiles pass; mobile 0.824–0.834s, desktop 0.280–0.285s)
- [x] Time to Interactive under 3.5s (2026-10-09 deployed lab: all three runs per profile pass; mobile 3.213–3.418s, desktop 0.658–0.661s; [served-build identity and raw TTI evidence](docs/time-to-interactive.md); not a field guarantee or TBT substitution)
- [x] Cumulative Layout Shift under 0.1 (deployed lab baseline: all three runs in both profiles pass; mobile 0.0134–0.0151, desktop 0)
- [x] Largest Contentful Paint under 2.5s (**user-accepted closed, 2026-10-09; mobile threshold not verified as passing** — deployed lab baseline: mobile 3.433–3.443s fails; desktop 0.676–0.701s passes)

Measured on 2026-10-08 with pinned Lighthouse 13.5.0 and cold mobile/desktop profiles; [raw reports, methodology and local comparison](docs/portfolio-performance.md). These are lab results, not field guarantees. Local video splitting reduces first-load JS from 256 to 249kB but does not materially improve paint times. The theme provider already renders initial content; ReactPlayer now loads only on video demand. The candidate is not deployed, and deployed source parity is unknown. Mobile LCP needs separate investigation.

### 4.2 Security

- [x] Form validation (**user-accepted closed with Contact readiness, 2026-10-09; partial verification** — server rejects malformed/overlong emails, blank messages and messages over 5000 characters; mocked-provider verification in `docs/contact-email.md`)
- [x] Secure email handling (**user-accepted closed with Contact readiness, 2026-10-09; partial verification** — no rate limit, no spam control, unverified sender recorded)

- Protected routes: **not applicable** — the portfolio is a single public page with no private content.

### 4.3 SEO

- [x] Meta tags (**local production verified, 2026-10-09** — canonical, Open Graph, Twitter large-image metadata and 1200×630 share image; deployed verification pending; see `docs/portfolio-seo.md`)
- [x] Semantic HTML (**local production verified, 2026-10-09** — one main and h1, section h2s and native landmarks; stale nested-h1 note corrected; see `docs/portfolio-seo.md`)
- [x] Structured data (**local production verified, 2026-10-09** — safely serialized Person/WebSite JSON-LD with published profiles; deployed verification pending)
- [x] Sitemap generation (**local production verified, 2026-10-09** — `/sitemap.xml` lists the canonical homepage, `/tools`, and `/writing`; a post URL is added only when a file is published; deployed verification pending)
- [x] `robots` file (**local production verified, 2026-10-09** — `/robots.txt` allows public discovery and advertises the canonical sitemap; deployed verification pending)

## 5. Component architecture

- [x] Header
- [x] Footer
- [x] Mobile navigation
- [x] Section dividers
- [x] Intro
- [x] About
- [x] Experience
- [x] Projects
- [x] Skills
- [x] Contact
- [x] Questions (three native disclosures before Contact; answers restate existing sentences)
- [x] CV component (implemented as a “Go to CV” button opening the external CV site; the persistent bar repeats that same site)
- [x] Theme switch
- [x] Submit button
- [x] Section headings
- [x] Project cards

Component rows are inventory. They are not included in the current-spec progress totals above. The drawer Pretext item repeated in section 11.1 is also excluded from future totals because it is already counted in section 3.4.

## 6. State and data

- [x] Context API for theme management
- [x] Local state for form handling

- Server state for data fetching: **not applicable** — portfolio content is imported from static TypeScript in `lib/data.ts`.

## 7. Accessibility

Target is WCAG 2.1 AA.

- [ ] WCAG 2.1 AA compliance (**partial** — audit and focused remediation exist; unresolved criteria and manual acceptance in `docs/accessibility-audit.md`)
- [x] Keyboard navigation support (modal mobile-menu focus containment/restoration, Escape dismissal, breakpoint recovery and native skip link; automated and user-reported reduced-motion verification in `docs/keyboard-navigation.md`)
- [ ] Screen reader compatibility
- [ ] Color contrast requirements (**partial** — palette/logo checks and `/tools` measurements exist; full-page rendered text/non-text acceptance remains unresolved in `docs/accessibility-audit.md`)
- [ ] ARIA labels (**partial** — carousel controls, the mobile menu button, and the theme toggle)

Concrete gaps inside those items (not scored separately):

- Done: accessible name on the theme toggle
- Done: accessible name, `aria-expanded`, and `aria-controls` on the mobile menu button
- Done: focus trap and restore for the mobile menu
- Done: skip link
- Done: one `h1` in the initial page (Intro uses one heading)

## 8. Development guidelines

- [x] TypeScript strict mode
- [x] ESLint configuration
- [x] Prettier formatting
- [x] Component-based architecture
- [x] Responsive design principles
- [x] Performance optimization (demand-loaded drawer/video/journey, responsive images and production audits; see `docs/portfolio-performance.md` and `docs/mobile-lcp-optimization.md`; passing every performance budget is separate)
- [x] Accessibility best practices (associated form labels, named controls, focus handling, skip link and reduced-motion support implemented; full WCAG/AT acceptance remains open in section 7)

## 9. Deployment

- [x] Vercel hosting (deployed site recorded in `docs/portfolio-performance.md` and `docs/time-to-interactive.md`; current checkout/deployment parity remains unverified)
- [ ] Continuous deployment
- [x] Environment variable management (`.env.example` and server-only contact configuration documented in `docs/contact-email.md`; deployment settings require separate verification)
- [x] Build optimization (Next.js production prerendering/code splitting plus explicit dynamic imports and responsive image sizing; an empty `next.config.js` does not disable these)

## 10. Maintenance

- [x] Regular dependency updates (Next 16.4.3, React 19.3.1, Tailwind 4.3.3, ESLint 9.39.5, and `@react-email/render` 2.2.0; recorded in `docs/dependency-maintenance.md`)
- [ ] Performance monitoring
- [ ] Security patches (**partial** — high and critical advisories are cleared after the Next 16 migration. One low and one moderate transitive advisory remain; see `docs/dependency-maintenance.md`)
- [x] Content updates (copy and project data live in the repo)
- [x] Analytics tracking (visitor/session tracking and delayed beacon/fetch delivery in `lib/visitor.ts`; requires `NEXT_PUBLIC_ANALYTICS_URL`, and live collection remains unverified)

## 11. Future enhancements

- [ ] Blog integration ([Lee Robinson](https://leerob.io), [Chris Coyier](https://chriscoyier.net), [Dillion Megida](https://dillionmegida.com))
- [x] Browser tools — initial `/tools` set: JSON formatter, word/character counter, and URL component encoder/decoder; browser-only processing, responsive/keyboard checks, contrast measurements and SEO verified in a local production build ([evidence](docs/browser-tools.md)). Native VoiceOver and deployment remain unverified; blog integration and additional utility categories remain separate.
  - Concept reference: [Gyanendra Pal Singh's live Tools page](https://gyanendra.vercel.app/tools), not an assumed implementation from the public repo.
- [x] Project filtering system — one filter listing All and each project tag. The carousel, rail, position total, and drawer Previous/Next follow that subset in published order. An empty match says "No projects use that technology."
- [x] Multi-language support (**user-accepted closed, 2026-10-31** — backlog decision, not a locale switcher. The greeting still cycles English, Filipino, and Japanese. Page copy and `lang` stay English. `add-introduction-locales` was closed without that control.)
- [x] Enhanced animations (cycling greeting/roles, expandable project rail, measured drawer-text reveals and the 3D career journey are implemented; hero-specific Pretext effects remain open below)
- [ ] Interactive project demos (**partial** — project drawer plays video; [Bruno Simon](https://bruno-simon.com) and [Dustin Brett](https://dustinbrett.com) make one interaction the proof)
- [x] A career Q&A before Contact: three native disclosures whose answers restate hiring availability, the about workflow, and the introduction positioning sentence. They do not add project write-ups ([Bryan Elliott](https://elliottprogrammer.com))
- [ ] Analytics dashboard — write-only beacon; no public dashboard. The row stays open until an external totals-only collector exists ([docs/analytics-dashboard.md](docs/analytics-dashboard.md))
- [x] Content management system (**user-accepted closed, 2026-10-30** — backlog decision, not a CMS install. A CMS was not added. Portfolio copy stays in the repository; see [docs/technology-convention.md](docs/technology-convention.md) and [static-content-authoring](openspec/changes/record-static-content-authoring/specs/static-content-authoring/spec.md))

### 11.1 Pretext-powered typography

[Pretext](https://github.com/chenglou/pretext) measures and lays out multiline text without DOM reflow; it does not animate text. Use it only where its line data enables effects that CSS and `react-wrap-balancer` cannot, then animate those measured lines with the existing Framer Motion dependency.

- [x] Prototype and benchmark `@chenglou/pretext` against the current hero before adding it (recorded in `docs/pretext-hero.md`: 21,552 bytes gzip, 55.1 ms cold prepare, 0.60 ms for 124 layouts). The 15kB gate failed, so the hero effect was not added and there is no visual benefit to record
- [ ] Prepare multilingual greeting and hero copy once, then rerun only `layout()` or line-range traversal when the available width changes
- [ ] Build responsive, balanced hero typography from measured line count and width without reading layout through `getBoundingClientRect`
- [ ] Create one flagship variable-width effect with `layoutNextLineRange()`, such as hero copy flowing around the portrait or brand mark
- [ ] Feed materialized line ranges into Framer Motion for staggered reveals while preserving one semantic DOM heading and readable no-JavaScript content
- [ ] Match Geist font metrics in whole pixels, cache prepared text, prevent layout shift, support Unicode and bidirectional copy, and provide a static `prefers-reduced-motion` fallback
- [x] Prepare drawer description paragraphs per text/font configuration with `@chenglou/pretext`, lay them out at the drawer width, and reveal measured lines (same completed feature as section 3.4; hero typography remains open)

## 12. Reference portfolios

To Check?
https://www.rsahani.space/about

[developer-portfolios](https://github.com/emmabostian/developer-portfolios) is an alphabetical list of 2,014 sites. It has no ranking. These twelve are entries from that list, chosen because they are the usual references for a senior frontend portfolio, plus two read while adding the skills, primitive, and project-navigation items. Each feature above links back to the site it came from.

| Portfolio                                            | In the repo                | Feature worth taking                                                                                                                                                       | Already here                                                                               |
| ---------------------------------------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [Brittany Chiang](https://brittanychiang.com)        | Yes                        | One-line role, social links, tech tags per job, projects with a measurable outcome                                                                                         | Experience timeline, project cards                                                         |
| [Bruno Simon](https://bruno-simon.com)               | Yes                        | A 3D hero you drive, with the controls written on the page, and a public "how it's built" note                                                                             | 3D experience journey; video drawer only                                                   |
| [Lee Robinson](https://leerob.io)                    | Yes                        | First sentence is the positioning; writing shows how he thinks                                                                                                             | Audience-specific intro and CTA; writing index at `/writing`, with no posts yet            |
| [Adham Dannaway](https://www.adhamdannaway.com)      | Yes                        | A few selected case studies, not every project at once                                                                                                                     | Carousel/Rail switch and featured case studies                                             |
| [Chris Coyier](https://chriscoyier.net)              | Yes                        | Writing, plus more than one way to make contact                                                                                                                            | Public email, contact form, GitHub and LinkedIn                                            |
| [Delba](https://delba.dev)                           | Yes                        | Each piece of work is one sentence of outcome                                                                                                                              | Problem, role and outcome case studies                                                     |
| [Dustin Brett](https://dustinbrett.com)              | Yes                        | One flagship interaction instead of a gallery                                                                                                                              | Video drawer only                                                                          |
| [Dillion Megida](https://dillionmegida.com)          | Yes                        | Short teaching notes that make the engineering legible                                                                                                                     | Writing index at `/writing`, with no posts yet                                            |
| [Bryan Elliott](https://elliottprogrammer.com)       | Yes                        | Public code, an explicit AI workflow, one small interactive moment                                                                                                         | AI workflow, multilingual greeting and project build note; external CV link                |
| [Timmy O'Mahony](https://timmyomahony.com)           | Yes                        | Audience-specific headline, a direct CTA, and a short FAQ                                                                                                                  | Direct hiring copy, public email, contact form, and Questions                              |
| [Gyanendra Pal Singh](https://gyanendra.vercel.app/) | Local copy in `Portfolio/` | Cycling role line, an expandable project rail with client and timeline, categorized skills, a toolkit you open by category, and a hover action bar for CV and social links | Cycling roles, project rail, categorized skill evidence, browser tools, and a persistent CV, GitHub, and LinkedIn bar |
| [Francisco Salido](https://paco.fyi)                 | Yes                        | Previous and Next on an open project, naming the neighbor                                                                                                                  | Previous/Next navigation inside the open drawer                                            |
| [Chánh Đại](https://chanhdai.com)                    | Yes                        | Work built on the current shadcn primitives, with Claude listed beside it                                                                                                  | Updated primitives with React 18 refs; Claude Code, Codex and Cursor skills                |
