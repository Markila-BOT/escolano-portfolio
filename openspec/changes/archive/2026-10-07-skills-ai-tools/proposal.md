# Proposal

## Why

About already says a normal day uses Claude Code, Codex, and Cursor. The skills list, which is the list a visitor scans for tools, does not include them. The checklist asks for those three chips in the same list as the other tools.

## What Changes

- The skills list gains three chips, in this order, after the chips it already has: Claude Code, Codex, Cursor.
- Each chip uses the same chip as the existing tools. They are not a separate group.
- The chips already in the list stay, in their current order.
- About and the introduction stay as they are. About already names these tools, and the introduction does not gain a Cursor mention.

## Capabilities

### New Capabilities

- `skills-ai-tools`: The skills list includes Claude Code, Codex, and Cursor as chips in the same list as the other tools.

### Modified Capabilities

- None. `about-workflow` already names these tools in the About paragraph and does not change. `unified-theme` already requires every skill chip to use the shared palette, and these chips use that same chip.

## Impact

- `lib/data.ts`: three entries on `skillsData`. No new dependency. Icons come from the installed `react-icons` set.
- `components/skills.tsx`: no structural change. It already renders every entry in `skillsData` as one list.
- `CHECKLIST.MD`: the skills-chip item, after the behavior matches.
- Categorized skills and the toolkit notes stay on their own checklist lines.
