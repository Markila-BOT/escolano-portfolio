# Tasks

## 1. Copy

- [x] 1.1 Rewrite `aboutWorkflow` in `lib/data.ts` to name AI-assisted engineering, TDD, SDD, intent-driven development, and doubt-driven development, keep the spec → Claude Code / Codex / Cursor → tests → ownership loop, and add plain-language IDD and DDD clauses per `specs/about-workflow/spec.md`; verify the string does not contain the intro positioning sentence from `introCallToAction.positioning`

## 2. Layout and checklist

- [x] 2.1 Read About at `#about` in light and dark at 320px and desktop widths; verify career paragraphs are unchanged, workflow text meets all scenarios in the delta spec, and intro positioning is not duplicated
- [x] 2.2 Mark CHECKLIST.MD line 99 `[x]` and update the Progress table counts after verification

## 3. Quality gate

- [x] 3.1 Run `pnpm lint` and fix any issues introduced by the copy change; verify exit code 0
