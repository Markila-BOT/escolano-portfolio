# Proposal

## Why

The skill chips name each tool and say nothing about it. The checklist asks for a toolkit you open by category, with one sentence on each tool.

## What Changes

- A separate block titled My toolkit sits after the skill chips, in the same skills section. The chip groups stay open, in their current order, with no note under a chip.
- My toolkit has three disclosures, in this order: Languages, Tools, Databases. Each starts closed. Opening one does not close the others.
- Each disclosure lists the same tools as that chip group, in the same order. Each tool shows its name and one sentence about what the tool is.
- The sentences are factual descriptions of the tools. They add no personal claim, metric, client, or job title. They are locked in the spec so they can be edited before implementation.
- No Design category, no new tool, and no proficiency mark. The section title My skills stays.

## Capabilities

### New Capabilities

- `skill-toolkit`: A My toolkit block after the skill chips, opened by Languages, Tools, and Databases, with one factual sentence on each existing tool.

### Modified Capabilities

- None. `skill-categories` still requires the chip groups to stay visible, with no note under a chip, and this toolkit is a separate block. `skills-ai-tools` still places Claude Code, Codex, and Cursor in Tools after Framer Motion, and the toolkit repeats that order.

## Impact

- `lib/data.ts`: one sentence on each skill in `skillGroups`. No new tool.
- `components/skills.tsx`: the toolkit block after the chip groups.
- `CHECKLIST.MD`: the toolkit item, after the behavior matches.
- Visual proficiency stays on its own checklist line.
- No new dependency. The disclosures are native `details` elements, because this is one section and the repo has no accordion primitive.
