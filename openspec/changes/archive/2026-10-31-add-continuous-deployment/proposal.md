# Proposal

## Why

The site is on Vercel, and this repo has no workflow that runs the same checks on every push. Deployment parity between `master` and the live project is still unverified. The checklist row for continuous deployment is open.

## What Changes

- Add a GitHub Actions workflow on `Markila-BOT/escolano-portfolio` for pull requests and pushes to `master`.
- Run `pnpm lint`, `pnpm exec tsc --noEmit`, the existing Node tests, and `pnpm build`. Do not start `pnpm dev`.
- Keep production deploy and preview deploys on Vercel's Git integration. The workflow must not store a Vercel token or deploy by itself.
- Record, in repo docs, that a green workflow is not proof of a production deploy, and that the owner still has to confirm the Vercel project tracks this repository.

## Capabilities

### New Capabilities

- `continuous-deployment`: Automated checks on the default branch and pull requests, with production hosting left on the existing Vercel project.

### Modified Capabilities

None.

## Impact

`.github/workflows/` and a short doc under `docs/`. No application runtime change. `pnpm-lock.yaml` and `packageManager` stay the install source so CI uses pnpm 11, not Vercel's default pnpm 9.
