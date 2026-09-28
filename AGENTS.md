# AGENTS.md

Single-page portfolio. Next.js 14 App Router, React 18, TypeScript, Tailwind 3. Versions and the package manager live in [package.json](package.json) and [docs/technology-convention.md](docs/technology-convention.md).

Follow the convention for the files you touch. Match an existing pattern in this repo. Do not add a second library for a job one already installed does.

| When you are | Read |
| --- | --- |
| Choosing a library, adding a dependency, or running the app | [docs/technology-convention.md](docs/technology-convention.md) |
| Writing or editing styles | [docs/css-conventions.md](docs/css-conventions.md) |
| Writing TypeScript | [docs/typescript-conventions.md](docs/typescript-conventions.md) |
| Adding or changing UI, routing, or content | [docs/react-next-conventions.md](docs/react-next-conventions.md) |
| Adding or changing anything a person operates | [docs/accessibility-conventions.md](docs/accessibility-conventions.md) |

`pnpm lint` is the lint command. Prettier sorts Tailwind classes. Do not start `pnpm dev` unless asked.
