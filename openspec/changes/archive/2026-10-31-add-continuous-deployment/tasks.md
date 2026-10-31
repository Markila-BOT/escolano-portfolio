# Tasks

## 1. Workflow

- [x] 1.1 Add `.github/workflows/ci.yml` for pull requests and pushes to `master`, using Node 24 and the pinned pnpm. Verify the file runs `pnpm lint`, `pnpm exec tsc --noEmit`, the Node tests, and `pnpm build`, and that it contains no Vercel token or deploy step.
- [x] 1.2 Run those four commands locally. Verify each exits 0. Do not start the dev server.

## 2. Record the deploy boundary

- [x] 2.1 Add `docs/continuous-deployment.md` stating that Vercel Git integration deploys this repository and that a green workflow is not a production deploy. Verify the doc names `Markila-BOT/escolano-portfolio` and does not claim the Vercel connection was checked unless it was.
