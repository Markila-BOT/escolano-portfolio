# Design

## Context

Open project details live in `components/projects.tsx`. The description card maps `project.description` through `TextGenerateEffect`. Optional fields are narrowed with `"videoUrl" in project` because `projectsData` is `as const`. Labels for drawer controls already live in `lib/data.ts`. See proposal.md for why the ten projects change.

## Goals / Non-Goals

**Goals:**

- A featured project is one that has a `caseStudy` in the data. The component does not keep its own title list.
- The description card shows Problem, Role, and Outcome when `caseStudy` is present, and the description paragraphs when it is not.
- The three strings are the restatements named in the delta spec. They are stored next to the existing `description`, which stays as the source sentences.

**Non-Goals:**

- Changing carousel cards, neighbor controls, media, or the six projects without a case study.
- Adding a personal job title, a metric, or a quote that is not already in the description.
- A new package.

## Decisions

### Case study is data, not a title check

Add `caseStudy: { problem, role, outcome }` only on the ten featured projects in `lib/data.ts`. Headings come from a `projectCaseStudy` label map (`problem`, `role`, `outcome`) in the same file, so the words Problem, Role, and Outcome are content, not a hardcoded string in the component.

Alternative: branch on `project.title` inside the drawer. Rejected. A renamed title would silently drop the case study, and the component would own a list the spec already fixes in data.

### The description card swaps, it does not stack

When `"caseStudy" in project`, the description card renders the three parts and does not map `description`. Otherwise it keeps the current paragraph map. The `description` array stays on every project, including featured ones, so the source sentences remain in the file.

Alternative: show the case study above the paragraphs. Rejected. The spec forbids repeating the description.

### A small component owns the three parts

`components/project-case-study.tsx` renders the three headings and their text. `projects.tsx` chooses it or the paragraph map. Each part's text uses the existing paragraph reveal (`TextGenerateEffect`) so featured copy settles the same way the other descriptions do. The project title stays the card's `h3`. The three parts are `h4`, in order.

Alternative: inline the markup in `projects.tsx`. Rejected. That file already owns the drawer grid, media, and neighbor controls.

### Neighbor moves need no new state

The drawer already replaces `project` when Previous or Next runs. The case-study branch reads the project that is open, so Valuation's Next shows Owner Web App's case study, and House Elf's Next shows LookingGlass's paragraphs. Do not change `project-drawer-navigation`.

## Risks / Trade-offs

- [The case study and the description can drift if only one is edited later] → Keep `description` in the file. A later edit of a featured project updates both, and the spec scenarios are the check that the three parts still only restate the description.
- [Role reads as the product's work, not a job title] → Accepted. The descriptions do not name a personal title, and the proposal forbids inventing one.
- [`as const` makes `caseStudy` absent on the other projects] → Narrow with `"caseStudy" in project`, the same way `videoUrl` is narrowed. Do not cast.

## Migration Plan

Add the fields and the branch. Rollback is removing `caseStudy` from the ten projects and the branch in the drawer. No data migration and no dependency install.

## Open Questions

None. The featured set and the no-new-claims rule are fixed in the spec.
