# Spec Delta

## Purpose

Run the repository checks on every pull request and on `master`, and leave production deployment on the existing Vercel project.

## ADDED Requirements

### Requirement: Pull requests and master run the same checks

A push to `master` and a pull request SHALL run `pnpm lint`, TypeScript with no emit, the existing Node tests, and `pnpm build`. The workflow MUST NOT start the development server. It MUST NOT contain a Vercel token or a deploy step.

#### Scenario: Pull request checks

- **WHEN** a pull request is opened or updated
- **THEN** the workflow runs those four checks and does not deploy

#### Scenario: Master checks

- **WHEN** a commit is pushed to `master`
- **THEN** the workflow runs those four checks and does not deploy

### Requirement: Production hosting stays on Vercel Git

Production deployment SHALL remain the Vercel Git integration for this repository. A successful workflow run MUST NOT be described as proof that production updated. The repo doc SHALL state that the owner confirms the Vercel project tracks `Markila-BOT/escolano-portfolio`.

#### Scenario: Workflow succeeds

- **WHEN** the workflow passes
- **THEN** the recorded result is that checks passed, not that a production deployment completed

#### Scenario: Install uses the pinned package manager

- **WHEN** the workflow installs dependencies
- **THEN** it uses the `packageManager` pin in `package.json` rather than an unpinned pnpm 9
