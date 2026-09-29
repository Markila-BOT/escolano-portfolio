# Portfolio feature checklist

Tracks [SPECIFICATION.md](SPECIFICATION.md) against the current app.

Status key: `[x]` done, `[ ]` still open. Items marked **partial** exist, and do not yet meet the spec.

## Progress

| Scope               | Done | Partial | Not started |     Complete |
| ------------------- | ---: | ------: | ----------: | -----------: |
| Current spec        |   63 |      11 |          35 | 63/109 (58%) |
| Future enhancements |    0 |       1 |          14 |    0/15 (0%) |

Protected routes are out of scope. The site is a single public page.

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

Component origin and usage must also be uniform. Primitives come from `components/ui` (shadcn), and sections compose them. Today some sections do and some hand-roll the same element.

- [x] Every button uses `components/ui/button.tsx` variants (theme switch and the mobile menu use `chrome`; CV and submit use `pill`)
- [x] One icon library in sections: `react-icons` (carousel arrows included)
- [x] One import style for primitives: `@/components/ui/...`
- [x] One export style for components (sections are default function exports, `components/ui` is named)
- [x] `components/ui` files formatted by the repo Prettier config
- [x] Each shared element has a single source: section heading, tag chip, and form field are reused in Skills, Projects, and Contact

### 1.2 Adaptive logo

The current `public/logo.png` loses contrast on the navy theme. Treat the logo as a reusable brand asset rather than correcting the bitmap with CSS filters.

- [x] Replace the bitmap with a transparent SVG or intentional light and dark variants, preserving the same silhouette in both themes
- [x] Select the correct logo from the active theme without flashing the wrong variant during hydration
- [x] Keep at least 3:1 contrast against the header and page surfaces in both themes, including hover and focus states
- [x] Make the logo link expose "Home" while its image is decorative, and provide a visible keyboard focus treatment
- [x] Give the logo link a minimum 44×44 px target and responsive placement that does not overlap navigation from 320 px through desktop widths
- [x] Add restrained hover and entrance motion, disable nonessential motion under `prefers-reduced-motion`, and verify the asset causes no layout shift

### 1.3 Interaction sound

Sound stays off until the visitor turns it on. Use [`use-sound`](https://www.npmjs.com/package/use-sound), which wraps [Howler.js](https://github.com/goldfire/howler.js). Do not add Howler as a second direct dependency.

- [x] A sound control that turns interaction audio on and off, with the choice saved in local storage and defaulting to off
- [x] The control names the state it will switch to ("Turn sound on" / "Turn sound off"), keeps a 44×44 px target, and does not overlap the theme switch
- [x] Play short sounds only while sound is on, for navigation, the theme switch, opening and closing a project, and form success or error ([Howler.js examples](https://github.com/goldfire/howler.js#examples))
- [x] Stop playback immediately when sound is turned off, including a sound already in progress
- [x] Load audio after the visitor opts in so it does not compete with first paint, and keep one sprite or a small set of files
- [x] Do not autoplay on load, and keep the page usable with sound off

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
- [ ] A hero you can interact with, with the controls written on screen ([Gyanendra Pal Singh](https://gyanendra.vercel.app/))
- [x] Analytics and a toast once per device visit ([Gyanendra Pal Singh](https://gyanendra.vercel.app/))

### 3.2 About

- [x] Detailed personal information
- [x] Professional background
- [x] Key skills and expertise
- [ ] Update the About description to highlight the shift toward AI-assisted engineering, test-driven development (TDD), and spec-driven development (SDD) ([Bryan Elliott](https://elliottprogrammer.com) states how AI fits the daily workflow)

### 3.3 Experience

- [x] Professional work history
- [x] Timeline-based layout
- [x] Detailed role descriptions
- [ ] Tech tags on each role ([Brittany Chiang](https://brittanychiang.com))

### 3.4 Projects

- [x] Portfolio showcase
- [x] Project details and descriptions
- [x] Interactive project cards
- [x] Technology stack display
- [ ] Improve the project carousel’s presentation, navigation, responsiveness, and interaction feedback ([Adham Dannaway](https://www.adhamdannaway.com) leads with a few selected pieces)
- [ ] Case studies: problem, role, and outcome on featured work ([Adham Dannaway](https://www.adhamdannaway.com), [Delba](https://delba.dev), [Brittany Chiang](https://brittanychiang.com))
- [ ] Public code or a short build note on at least one project ([Bruno Simon](https://bruno-simon.com), [Bryan Elliott](https://elliottprogrammer.com))
- [ ] Expandable project rail: one project opens, the rest stay as slim labels ([Gyanendra Pal Singh](https://gyanendra.vercel.app/))
- [ ] Client, company, and timeline on each project ([Gyanendra Pal Singh](https://gyanendra.vercel.app/))
- [ ] Lay out each project description with [Pretext](https://github.com/chenglou/pretext) so drawer copy wraps from measured lines instead of a DOM reflow, while the text stays readable without JavaScript
- [ ] YouTube video in the project drawer for MatterWorx and House Elf (other projects already set `videoUrl`; these two still show the screenshot)

### 3.5 Skills

- [x] Technical skills display
- [ ] Categorized skill sets ([Gyanendra Pal Singh](https://gyanendra.vercel.app/) groups languages, tools, databases, and design)
- [ ] Visual representation of proficiency

### 3.6 Contact

- [x] Contact form
- [ ] Email integration (**partial** — Resend sends, from `onboarding@resend.dev`)
- [ ] Social media links ([Brittany Chiang](https://brittanychiang.com), [Chris Coyier](https://chriscoyier.net))
- [ ] A direct hiring path: what you are open to, and how to reach you ([Timmy O'Mahony](https://timmyomahony.com))
- [ ] A persistent action bar for CV download and social links, with labels that appear on hover ([Gyanendra Pal Singh](https://gyanendra.vercel.app/))
- [x] Professional contact information

## 4. Technical features

### 4.1 Performance

- [ ] Server-side rendering (**partial** — the page is a server component; almost every section is a client component)
- [x] Optimized image loading
- [ ] Code splitting (**partial** — Next.js defaults only; no route or component splits beyond that)
- [ ] Lazy loading components
- [ ] First Contentful Paint under 1.5s (not measured)
- [ ] Time to Interactive under 3.5s (not measured)
- [ ] Cumulative Layout Shift under 0.1 (not measured)
- [ ] Largest Contentful Paint under 2.5s (not measured)

Known cost: the theme provider renders nothing until mount, and `react-player` loads with the project cards.

### 4.2 Security

- [ ] Form validation (**partial** — required fields and a max-length check; no email-format check)
- [ ] Secure email handling (**partial** — no rate limit, no spam control, unverified sender)
- Protected routes: not applicable

### 4.3 SEO

- [ ] Meta tags (**partial** — title and description only; no Open Graph, Twitter, or canonical)
- [ ] Semantic HTML (**partial** — sections exist; Intro nests an `h1` inside an `h1`)
- [ ] Structured data
- [ ] Sitemap generation
- [ ] `robots` file

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
- [ ] CV (**partial** — button opens an external site)
- [x] Theme switch
- [x] Submit button
- [x] Section headings
- [x] Project cards

Component rows are inventory. They are not included in the 33/81 score above.

## 6. State and data

- [x] Context API for theme management
- [x] Local state for form handling
- [ ] Server state for data fetching (content is static in `lib/data.ts`)

## 7. Accessibility

Target is WCAG 2.1 AA.

- [ ] WCAG 2.1 AA compliance
- [ ] Keyboard navigation support (**partial** — links and the form are reachable; the mobile overlay has no focus trap)
- [ ] Screen reader compatibility
- [ ] Color contrast requirements (not audited)
- [ ] ARIA labels (**partial** — carousel controls, the mobile menu button, and the theme toggle)

Concrete gaps inside those items (not scored separately):

- Done: accessible name on the theme toggle
- Done: accessible name, `aria-expanded`, and `aria-controls` on the mobile menu button
- Focus trap and restore for the mobile menu
- Skip link
- One `h1` on the page

## 8. Development guidelines

- [x] TypeScript strict mode
- [x] ESLint configuration
- [x] Prettier formatting
- [x] Component-based architecture
- [x] Responsive design principles
- [ ] Performance optimization
- [ ] Accessibility best practices

## 9. Deployment

- [ ] Vercel hosting (no project config in the repo)
- [ ] Continuous deployment
- [ ] Environment variable management (no `.env.example`; `RESEND_API_KEY` is required)
- [ ] Build optimization (`next.config.js` is empty)

## 10. Maintenance

- [ ] Regular dependency updates (**partial** — current majors bumped: Next 14.2.35, React 18.3.1, Tailwind 3.4.19. Next 16, React 19, Tailwind 4, and the deprecated React Email packages are still ahead)
- [ ] Performance monitoring
- [ ] Security patches (**partial** — same-major bump only)
- [x] Content updates (copy and project data live in the repo)
- [ ] Analytics tracking

## 11. Future enhancements

- [ ] Blog integration ([Lee Robinson](https://leerob.io), [Chris Coyier](https://chriscoyier.net), [Dillion Megida](https://dillionmegida.com))
- [ ] Project filtering system
- [ ] Multi-language support
- [ ] Enhanced animations
- [ ] Interactive project demos (**partial** — project drawer plays video; [Bruno Simon](https://bruno-simon.com) and [Dustin Brett](https://dustinbrett.com) make one interaction the proof)
- [ ] A career Q&A grounded in your own project write-ups ([Bryan Elliott](https://elliottprogrammer.com))
- [ ] Analytics dashboard
- [ ] Content management system

### 11.1 Pretext-powered typography

[Pretext](https://github.com/chenglou/pretext) measures and lays out multiline text without DOM reflow; it does not animate text. Use it only where its line data enables effects that CSS and `react-wrap-balancer` cannot, then animate those measured lines with the existing Framer Motion dependency.

- [ ] Prototype and benchmark `@chenglou/pretext` against the current hero before adding it; record bundle cost, measurement time, resize cost, and the visual benefit
- [ ] Prepare multilingual greeting and hero copy once, then rerun only `layout()` or line-range traversal when the available width changes
- [ ] Build responsive, balanced hero typography from measured line count and width without reading layout through `getBoundingClientRect`
- [ ] Create one flagship variable-width effect with `layoutNextLineRange()`, such as hero copy flowing around the portrait or brand mark
- [ ] Feed materialized line ranges into Framer Motion for staggered reveals while preserving one semantic DOM heading and readable no-JavaScript content
- [ ] Match Geist font metrics in whole pixels, cache prepared text, prevent layout shift, support Unicode and bidirectional copy, and provide a static `prefers-reduced-motion` fallback
- [ ] Prepare each project description paragraph once with `@chenglou/pretext`, lay it out at the drawer width, and drive the existing word reveal from those measured lines

## 12. Reference portfolios

[developer-portfolios](https://github.com/emmabostian/developer-portfolios) is an alphabetical list of 1,986 sites. It has no ranking. These ten are entries from that list, chosen because they are the usual references for a senior frontend portfolio. Each feature above links back to the site it came from.

| Portfolio                                            | In the repo                | Feature worth taking                                                                                                                                                                    | Already here                                                               |
| ---------------------------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [Brittany Chiang](https://brittanychiang.com)        | Yes                        | One-line role, social links, tech tags per job, projects with a measurable outcome                                                                                                      | Experience timeline, project cards                                         |
| [Bruno Simon](https://bruno-simon.com)               | Yes                        | The site is the demo, with a public "how it's built" note                                                                                                                               | Video drawer only                                                          |
| [Lee Robinson](https://leerob.io)                    | Yes                        | First sentence is the positioning; writing shows how he thinks                                                                                                                          | Intro copy, no writing index                                               |
| [Adham Dannaway](https://www.adhamdannaway.com)      | Yes                        | A few selected case studies, not every project at once                                                                                                                                  | Carousel of all projects                                                   |
| [Chris Coyier](https://chriscoyier.net)              | Yes                        | Writing, plus more than one way to make contact                                                                                                                                         | Email form only                                                            |
| [Delba](https://delba.dev)                           | Yes                        | Each piece of work is one sentence of outcome                                                                                                                                           | Long project descriptions                                                  |
| [Dustin Brett](https://dustinbrett.com)              | Yes                        | One flagship interaction instead of a gallery                                                                                                                                           | Video drawer only                                                          |
| [Dillion Megida](https://dillionmegida.com)          | Yes                        | Short teaching notes that make the engineering legible                                                                                                                                  | No writing                                                                 |
| [Bryan Elliott](https://elliottprogrammer.com)       | Yes                        | Public code, an explicit AI workflow, one small interactive moment                                                                                                                      | External CV link                                                           |
| [Timmy O'Mahony](https://timmyomahony.com)           | Yes                        | Audience-specific headline, a direct CTA, and a short FAQ                                                                                                                               | Mailto inside the contact paragraph                                        |
| [Gyanendra Pal Singh](https://gyanendra.vercel.app/) | Local copy in `Portfolio/` | Cycling role line, an interactive hero with on-screen controls, an expandable project rail with client and timeline, categorized skills, and a hover action bar for CV and social links | Greeting animation, project carousel, flat skill chips, external CV button |
