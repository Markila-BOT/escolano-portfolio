# Design

## Context

See proposal.md for motivation. `components/skills.tsx` currently renders three lists from `skillGroups` in `lib/data.ts` using `TagChip`, section motion, and semantic theme tokens. The 22 skills have labels/icons but no ratings. `experiencesData` has string tags and role dates; `projectsData` has label/icon tags and years. Neither source declares proficiency.

The main `skill-categories` spec currently forbids proficiency marks anywhere in the section. This change modifies that requirement to retain plain chips and allow separate factual usage evidence. The pending `skill-toolkit` change adds a separate block with fixed factual sentences, requiring chips and toolkit rows to remain free of proficiency marks. Evidence therefore lives between those two blocks; it does not depend on the toolkit being implemented and does not modify its artifacts.

## Goals / Non-Goals

**Goals:** Traceable usage labels from explicit existing tags, deterministic classification, readable compact visual indicators, and inspection without leaving the section.

**Non-Goals:** Skill scores, stars, meters, percent mastery, inferred years, employment claims based only on projects, new skill memberships, external lookups, new navigation or project-drawer controls, and modifying the toolkit's text.

## Decisions

### 1. Qualify sources before matching

Keep content and aliases static in `lib/data.ts`. Explicitly identify qualifying work-role titles using types derived from `experiencesData`: Senior Software Engineer, Full Stack Engineer, Lead Software Engineer, Front-End Engineer, Apply training knowledge, Promoted, First Job, Internship. Their existing descriptions document employment/work; the last includes an internship. Education, training-only and relocation milestones do not establish professional use.

Use a focused pure typed helper (for example `lib/skill-evidence.ts`) to resolve matches from current source records, rather than store duplicated evidence text or editable badge levels on each skill. Return a discriminated status plus source kind/title/date/original tag. Match canonical labels exactly, with explicit alias lists for Next.js → NextJS, Tailwind → Tailwind CSS, Nest.js → NestJS; do not use substring, framework-to-language, or package-dependency inference. Deduplicate by kind/title and preserve each source array's order, displaying Experience sources first. Missing or stale work-role references cannot promote a label.

Use all matching portfolio project tags for project evidence, including private projects. A project entry is evidence of listed project usage, not proof of employment, access to public code, or a particular contribution. No project facts or source tag spellings are rewritten.

### 2. Deterministic initial content

The current data yields this reviewable baseline. Compute it from sources during implementation; this table is not a second runtime data source.

| Status | Skills | Example source |
| --- | --- | --- |
| Used professionally | JavaScript, TypeScript, React, Next.js, Node.js, Tailwind, Redux, GraphQL, Nest.js, Express, MySQL | Front-End Engineer; Senior Software Engineer; Full Stack Engineer; Apply training knowledge |
| Used in projects | Framer Motion, Git, Claude Code, Codex, Cursor, MongoDB, PostgreSQL, Firebase | Valuation; every project; MatterWorx, Potato V3, Owner Web App, Workflow, and House Elf; MerchantSpring; Lagoon |
| No linked evidence | HTML, CSS, Rust | No qualifying tags currently present |

This is 11 professional, 8 project-only, and 3 unlinked skills. HTML/CSS are not inferred from React or LESS/SCSS. Git is tagged on every project. Claude Code, Codex, and Cursor count only where a project tag names them. They are tagged on MatterWorx, Potato V3, Owner Web App, Workflow, and House Elf. The labels describe the documented record, not ability or a ranking.

### 3. Separate compact evidence presentation

After the chip groups, add an h3 titled Skill evidence and short explanatory copy: labels describe documented usage, not a proficiency score; No linked evidence means the portfolio has no matching source, not that the person lacks ability. Render group subheadings and a compact one-column mobile / two-column desktop grid within the existing section width, preserving skill order.

Use a small distinct icon plus visible status text, with semantic theme colors and no bars or ordinal filled dots. Supported skills use native `details`/`summary` rows with the existing skill name, decorative icon, and status in the summary. No `open` initially; more than one may stay open. Their source lists show source kind, original title/date/tag. Unlinked skills are plain noninteractive rows; no empty details or tooltip.

Native details satisfies keyboard and expanded-state semantics for this section-specific control; no new accordion dependency is needed. Keep a visible focus style, minimum 44px summary height, wrapped titles, and contrast in both themes. Preserve existing section animation patterns and reduced-motion support; evidence requires no extra animation. Reuse `cn`, installed icons, and existing static chip primitives when suitable, without changing the shared TagChip API just for this block.

Alternatives rejected: percentages or self-rating bars contradict the user's evidence choice; assigning every skill a positive label fabricates support; modifying chips conflicts with the pending toolkit plan; a new modal or direct project-opening mechanism increases scope without improving source readability.

## Risks / Trade-offs

- [No linked evidence is misread as low skill] → Explain its meaning beside the block and retain neutral styling with no low-score visual language.
- [Source naming variants lose matches] → Explicit alias table and focused tests for source spellings; unknown aliases stay unsupported until intentionally added.
- [Professional classification overstates project use] → Only allowlisted work-role tags establish professional status; training and project-only sources cannot promote it.
- [Skills repeat across chips, evidence and toolkit] → Keep the evidence rows compact and sources initially closed; maintain distinct headings and one source of skill membership.
- [Concurrent toolkit implementation touches the same component/data] → Keep evidence helper and presentation isolated; preserve optional notes and compose chips → evidence → toolkit in either apply order. No changes to toolkit scenarios are required.

## Migration Plan

Add alias/work-source metadata and the resolver, then the evidence block. Add focused resolver tests and data-authoring documentation alongside that work. Verify source removal, unknown skills, aliases, all 22 statuses and actual source titles. Check mobile/desktop themes, keyboard, reduced motion, and coexistence with toolkit if implemented. Only then complete CHECKLIST.MD's selected visual proficiency line, explicitly noting evidence-based usage.

Rollback removes the separate block/helper and metadata, restoring the original chips and leaving toolkit untouched. No data service or schema migration is required.
