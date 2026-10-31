# Proposal

## Why

Current majors are already bumped to Next 14.2.35, React 18.3.1, and Tailwind 3.4.19. The checklist still marks dependency updates and security patches partial because Next 16, React 19, Tailwind 4, and the deprecated React Email packages are ahead, and only same-major patches have landed.

## What Changes

- Apply security patches that stay on the majors named in `docs/technology-convention.md`.
- Treat Next 16, React 19, Tailwind 4, and replacing `@react-email/components` plus `@react-email/tailwind` as one sequenced migration inside this change, after the same-major patches.
- Update `docs/technology-convention.md`, `docs/react-next-conventions.md`, and `AGENTS.md` in the same task that changes those majors. Do not leave the docs describing React 18 after the code moves.
- Keep ESLint on 8.57.1 until `next lint` is replaced. Next 14's lint config does not support ESLint 9; a Next 16 migration has to include the lint toolchain on purpose.
- Do not mix this migration into a feature change.

## Capabilities

### New Capabilities

- `dependency-currency`: The published app and the written conventions name the same majors, and patches do not skip a known same-major security fix.

### Modified Capabilities

None. Feature specs stay in force and must still pass after the version changes.

## Impact

`package.json`, `pnpm-lock.yaml`, convention docs, and any call sites that break on Next 16, React 19, or Tailwind 4. React 19-only APIs stay unused until that migration task. Contact email rendering is the riskiest package removal. No new application feature.
