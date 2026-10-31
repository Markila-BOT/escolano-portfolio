# Continuous deployment

Production and preview deploys stay on Vercel's Git integration for `Markila-BOT/escolano-portfolio`. The checks workflow is `.github/workflows/ci.yml`. It runs on pull requests and on pushes to `master`.

The workflow installs dependencies with the `packageManager` pin in `package.json`, through Corepack on Node 24. Pull requests and `master` pushes run these commands, in order:

1. `pnpm lint`
2. `pnpm exec tsc --noEmit`
3. `node --test tests/*.test.cjs`
4. `pnpm build`

A green checks job means those checks passed. It is not proof that production updated. The workflow has no Vercel token and no deploy step.

The same file has a `performance` job. It runs on `workflow_dispatch` and on pushes to `master`, not on pull requests. It measures the production build and uploads the lab report. It does not deploy.

Vercel can publish a push before the workflow finishes. This workflow is not a required status check on `master`.

The owner still has to confirm that the Vercel project tracks `Markila-BOT/escolano-portfolio`. That connection was not checked when this document was added.
