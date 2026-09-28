# Portfolio feature checklist

Tracks [SPECIFICATION.md](SPECIFICATION.md) against the current app.

Status key: `[x]` done, `[ ]` still open. Items marked **partial** exist, and do not yet meet the spec.

## Progress

| Scope               | Done | Partial | Not started |    Complete |
| ------------------- | ---: | ------: | ----------: | ----------: |
| Current spec        |   33 |      11 |          50 | 33/94 (35%) |
| Future enhancements |    0 |       1 |           7 |    0/8 (0%) |

Protected routes are out of scope. The site is a single public page.

## 1. User interface

- [x] Responsive design for all device sizes
- [x] Light and dark mode, with the preference saved in local storage
- [x] Smooth animations and transitions
- [x] Modern, clean aesthetic
- [x] Accessible navigation (menu button is "Open menu" / "Close menu" with expanded state; theme toggle names the theme it switches to)

### 1.1 One theme for light and dark

The toggle works. The page and the drawer do not share a palette. Sections use gray utilities and hex blobs (`#fbe2e3`, `#dbd7fb`, `#f64a8a`). The drawer uses shadcn tokens (`bg-card`, `bg-primary`) from `app/globals.css`, which the rest of the page never applies.

- [ ] One semantic palette (background, surface, text, muted text, border, accent) that every section reads in both modes
- [ ] Project cards and the project drawer use that palette (cards stay `bg-gray-200` and `text-gray-800` in dark mode; the drawer repeats the page blobs)
- [ ] Contact fields use that palette (dark mode forces white fields and black text)
- [ ] Experience timeline reads the palette (colors are chosen in JavaScript with `theme === "light"`)
- [ ] CV and submit are one button (both files copy the same `bg-gray-900` / `dark:bg-white` classes)
- [ ] Header, mobile nav, theme switch, skill chips, and footer share the same surface and muted text
- [ ] Light and dark both pass the contrast check in section 7

Component origin and usage must also be uniform. Primitives come from `components/ui` (shadcn), and sections compose them. Today some sections do and some hand-roll the same element.

- [ ] Every button uses `components/ui/button.tsx` variants (CV and submit hand-roll their own; Experience and the project drawer already use `Button`)
- [ ] One icon library in sections: `react-icons` (the carousel uses `lucide-react` for its arrows)
- [ ] One import style for primitives: `@/components/ui/...` (sections mix `@/components/ui/drawer` and `./ui/label`)
- [ ] One export style for components (sections are default exports, `components/ui` is named, `cv.tsx` and `text-generate-effect.tsx` assign a const and export default at the end)
- [ ] `components/ui` files formatted by the repo Prettier config (generated files have no semicolons; the rest of the repo does)
- [ ] Each shared element has a single source: section heading, card surface, tag chip, and form field are one component each, reused in Skills, Projects, and Contact

## 2. Navigation

- [x] Header with main navigation
- [x] Mobile-responsive navigation menu
- [x] Section dividers
- [x] Smooth scrolling between sections

## 3. Content sections

### 3.1 Introduction

- [x] Personal introduction
- [x] Professional summary
- [ ] Call-to-action elements ([Timmy O'Mahony](https://timmyomahony.com) states who the work is for and how to start)
- [ ] One-line positioning: who you help and what you build ([Lee Robinson](https://leerob.io), [Brittany Chiang](https://brittanychiang.com))
- [ ] Improve the multilingual greeting animation and presentation ([Bryan Elliott](https://elliottprogrammer.com) uses one small interactive moment)
- [ ] Cycling role titles in the introduction ([Gyanendra Pal Singh](https://gyanendra.vercel.app/))
- [ ] A hero you can interact with, with the controls written on screen ([Gyanendra Pal Singh](https://gyanendra.vercel.app/))

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
