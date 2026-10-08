# Verification

Verified on 2026-10-07 against the current portfolio data and an isolated Next.js production build.

## Results

- All 22 skills preserve their chip labels, icons, group membership and order: Languages 5, Tools 13, Databases 4.
- Evidence baseline: 11 used professionally, 4 used in projects, 7 with no linked evidence.
- All 15 supported disclosures start closed; seven unsupported rows have no disclosure. Expanded sources exactly match the resolver's source kind, title, date/year and original tag.
- Enter and Space toggle native disclosures; Chrome accessibility properties expose expanded state. Keyboard focus is visible. Disclosures open independently, and supported targets are at least 44px tall.
- At 390px and 1280px, in light and dark themes with reduced motion enabled, text meets applicable 4.5:1 or large-text 3:1 contrast checks, the block has no horizontal overflow, and browser page errors are absent.
- Original chips precede Skill evidence, which precedes My toolkit. Toolkit's three categories start closed; categories open independently and retain their existing fixed notes without evidence badges. Desktop navigation and the mobile menu's Skills link still reach the section.
- Screenshots were visually reviewed for text wrapping, layout and focus. Closed previews exclude fixed chrome and wait for the existing welcome toast to disappear; expanded screenshots demonstrate independent source lists.

## Commands

| Check                                                     | Result                                                                                                           |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `pnpm exec node --test tests/skill-evidence.test.cjs`     | Pass, 2 substantive resolver tests                                                                               |
| `pnpm lint`                                               | Pass, no warnings or errors                                                                                      |
| `pnpm exec tsc --noEmit`                                  | Pass                                                                                                             |
| `openspec validate skill-evidence-indicators --strict`    | Pass                                                                                                             |
| `pnpm build`                                              | Initial run collided with the existing dev server's shared `.next` output during page collection                 |
| `pnpm exec next build /private/tmp/skill-evidence-verify` | Pass using an isolated source/config snapshot with the same installed dependencies; all 5 static pages generated |
| Chrome production browser checks                          | Pass in all four viewport/theme variants                                                                         |

The isolated production preview was started with the installed Next CLI on port 3001 and stopped after verification. No `pnpm dev` process was started. Port 3000 was unavailable at the final read-only check, so final browser verification used the production preview.

## Evidence

[Machine-readable browser results](evidence/browser-results.json)

| Viewport        | Light                                                                         | Dark                                                                        |
| --------------- | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Desktop, 1280px | [Closed](evidence/1280-light-closed.png), [expanded](evidence/1280-light.png) | [Closed](evidence/1280-dark-closed.png), [expanded](evidence/1280-dark.png) |
| Mobile, 390px   | [Closed](evidence/390-light-closed.png), [expanded](evidence/390-light.png)   | [Closed](evidence/390-dark-closed.png), [expanded](evidence/390-dark.png)   |

Maintainer instructions: [Skill evidence](../../../docs/skill-evidence.md). The selected CHECKLIST.MD item is complete with evidence-based usage wording.
