# Design

## Context

`origin` is `git@github.com:Markila-BOT/escolano-portfolio.git`. The default branch is `master`. There is no `.github/workflows` directory. Vercel is the host recorded in the performance docs. `package.json` pins `pnpm@11.21.0` and Node `24.x` because Vercel otherwise installs pnpm 9.

## Goals / Non-Goals

**Goals:**

- One workflow for pull requests and pushes to `master`.
- Lint, `tsc --noEmit`, Node tests, and `pnpm build`.
- A doc that separates a green check from a production deploy.

**Non-Goals:**

- A Vercel token, a deploy job, or `pnpm dev`.
- Changing application code.

## Decisions

### Workflow file

Add `.github/workflows/ci.yml`. Trigger on `pull_request` and `push` to `master`. Set Node 24 and enable Corepack so pnpm matches `packageManager`. Cache the pnpm store. Run the four commands in that order. Upload no secrets.

### Docs

Add `docs/continuous-deployment.md`. State that Vercel Git integration is the deploy path, that this workflow does not deploy, and that the owner must confirm the Vercel project is connected to this repository. Do not claim the connection was verified unless the apply step actually checks the GitHub or Vercel UI.

### Tests

No new test runner. The workflow's verification is that the YAML contains those commands and that each command passes locally during apply.

## Risks / Trade-offs

- Vercel may already deploy before CI finishes. This change does not add a required-status gate. Document that limitation.
- `pnpm build` in CI needs the same env the build tolerates today. Do not require `RESEND_API_KEY` if the current build does not.
