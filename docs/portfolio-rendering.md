# Portfolio rendering

The home route remains statically prerendered by Next.js 14. Initial HTML includes portfolio content; Client Components attach interactive behavior during hydration. A `use client` directive does not disable server-rendered HTML. The theme provider always renders children with an initial light state matching the server; an effect then resolves a valid saved preference, system preference, or light fallback. A color change after hydration is possible, but content stays present.

## Boundaries

| Server composition                   | Client responsibility                                                                         |
| ------------------------------------ | --------------------------------------------------------------------------------------------- |
| About heading/prose                  | ObservedSection tracks section visibility; Balancer enhances wrapping                         |
| Intro portrait, positioning, section | IntroGreeting keeps greeting/role state together; IntroContactLink updates navigation context |
| Projects heading/section             | ProjectsInteractive owns carousel, cards, drawer and media                                    |
| Skills heading/caveat                | SkillSelector owns evidence selection, receiving labels/icon nodes                            |
| Experience heading/section           | ExperienceInteractive owns timeline pagination, view switching and deferred 3D                |
| Contact heading/email introduction   | ContactForm owns submission feedback, pending state, sound and CV controls                    |
| Divider and footer                   | Static markup                                                                                 |

ObservedSection accepts server-rendered children. It does not import static section content. Keep one observer and anchor per section. Pass serializable values or rendered React nodes across the boundary, never the whole data module or formatting functions.

Initial reveal styles keep content visible. The timeline disables entrance hiding. RoleTitleLoop retains `AnimatePresence initial={false}` so its first title is rendered immediately while subsequent changes can animate. The 3D stage remains dynamically imported with server rendering disabled and only mounts when requested.

## Verification

Build with `pnpm build` and run the production app. When another process owns `.next`, use an isolated source/config snapshot with the same dependencies for both baseline and final measurements. Do not start `pnpm dev` without a request.

Run `python3 tests/portfolio-html.py http://127.0.0.1:3001` against a production preview, or pass a saved HTML file. The check parses real body elements/text and ignores script/style payloads. It verifies the required sections, representative prose, skills, timeline roles, portrait, contact fields and native links/disclosures. Browser verification additionally checks every project title/year and the current initial timeline data.

With JavaScript disabled, check 390px/1280px layouts, readable introduction/About/first project/skills/three timeline entries/contact/footer and contact anchors. Hydrated checks cover light/dark/system preferences, invalid/blocked storage, navigation, greeting/role behavior, carousel/drawer, evidence selection, timeline/3D, theme/sound and mocked form results. Never send real email for verification.

For this change, comparable production builds report First Load JS decreasing from 256 kB to 254 kB (rounded CLI values), and route size from 56.7 kB to 55.5 kB. The important correctness improvement is that initial body content is present and visible; these bundle figures do not imply a measured user-visible timing improvement.
