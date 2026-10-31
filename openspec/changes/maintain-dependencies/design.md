# Design

## Context

`docs/technology-convention.md` pins Next 14.2, React 18.3, and Tailwind 3.4, and says majors are a separate task. This change is that task. ESLint stays on 8.57.1 while `next lint` is the lint command. Contact email uses `@react-email/components` and `@react-email/tailwind`. `docs/react-next-conventions.md` says `params` are plain objects on this Next version.

## Goals / Non-Goals

**Goals:**

- Apply same-major security fixes first.
- Then migrate Next, React, Tailwind, and the React Email packages together with the convention docs.
- Leave the public behavior specs passing.

**Non-Goals:**

- New features, a redesign, or an ESLint 9 move before the Next upgrade requires it.
- `useActionState` or other React 19 APIs before the React 19 task.

## Decisions

### Order

1. `pnpm audit` and `pnpm outdated`. Patch high and critical advisories inside the current majors. Record advisories with no same-major fix in `docs/dependency-maintenance.md`.
2. Upgrade Next, React, React DOM, and their type packages together. Update async `params`, `searchParams`, `cookies()`, and `headers()` only where this Next version requires them. Update `AGENTS.md` and both convention docs in that same commit sequence during apply.
3. Upgrade Tailwind 4 only after the Next/React build is green. Follow the Tailwind 4 config move; do not leave a Tailwind 3 config pointed at Tailwind 4.
4. Replace the deprecated React Email packages with the supported renderer that still runs inside `actions/sendEmail.ts`. Re-run the contact rejection cases.

ESLint 9 moves only if `next lint` on the new Next major no longer accepts ESLint 8. Keep the lint script as `pnpm lint`.

### Install

Use pnpm only. Commit `pnpm-lock.yaml`. Do not use npm or yarn.

## Risks / Trade-offs

- Tailwind 4 and Next 16 can invalidate class names and the ESLint config in one step. The task order keeps a green build between steps.
- React 19 may force `forwardRef` cleanup. The UI primitives still use `forwardRef` for React 18; update them only when the typecheck requires it.
- A failed major step stops there. Do not leave `package.json` on a new major while the docs still say 14/18/3.
