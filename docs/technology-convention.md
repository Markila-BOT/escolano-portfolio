# Technology

Install and run with **pnpm**. The lockfile is `pnpm-lock.yaml`. Do not use npm or yarn. `package.json` `packageManager` pins the pnpm version Vercel installs with. Without it, Vercel uses pnpm 9, which rejects `pnpm-workspace.yaml` because that file has `allowBuilds` and no `packages` list. `engines.node` is `24.x`.

Do not bump a major version as part of a feature change. Majors still ahead of this repo (Next 16, React 19, Tailwind 4) are a separate task.

## Use this library for this job

| Library                                                                           | Use it for                                                                                                                        | Do not                                                                         |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `next@14.2`                                                                       | App Router, `next/image`, `next/font` via `geist`, metadata, server actions                                                       | Pages Router, a second image component                                         |
| `react@18.3` / `react-dom@18.3`                                                   | UI. This is React 18                                                                                                              | `useActionState` and other React 19-only APIs                                  |
| `typescript@5.9`                                                                  | All application code                                                                                                              | New `.js` files. See [typescript-conventions.md](typescript-conventions.md)    |
| `tailwindcss@3.4`, `tailwindcss-animate`, `prettier-plugin-tailwindcss`           | All styling                                                                                                                       | CSS modules, a CSS-in-JS library. See [css-conventions.md](css-conventions.md) |
| `clsx`, `tailwind-merge`                                                          | Class composition through `cn` in `lib/utils.ts`                                                                                  | String-concatenated class names                                                |
| `class-variance-authority`                                                        | Variants on `components/ui` primitives                                                                                            | A second variant helper                                                        |
| `@radix-ui/react-dialog`, `@radix-ui/react-label`, `@radix-ui/react-slot`, `vaul` | Dialog, label, `asChild`, and the project drawer. New reusable controls follow [radix-ui-conventions.md](radix-ui-conventions.md) | A new modal library, or a second primitive for a job this row already names    |
| `embla-carousel-react`                                                            | The project carousel (`components/ui/carousel.tsx`)                                                                               | Another carousel                                                               |
| `framer-motion@11`                                                                | Motion. Shared variants live in `lib/animations.ts`                                                                               | Another animation library                                                      |
| `geist`                                                                           | Sans and mono on `<body>` in `app/layout.tsx`                                                                                     | A second font package                                                          |
| `react-icons`                                                                     | Icons in sections and tech logos in `lib/data.ts`                                                                                 | Adding `lucide-react` to section components                                    |
| `lucide-react`                                                                    | Icons already inside `components/ui`                                                                                              | Replacing `react-icons` in sections                                            |
| `react-intersection-observer`                                                     | Which section is on screen (`lib/hooks.ts`)                                                                                       | Scroll listeners written by hand                                               |
| `react-wrap-balancer`                                                             | Headline wrapping                                                                                                                 | Manual `<br>` for wrapping                                                     |
| `react-hot-toast`                                                                 | Form success and failure                                                                                                          | Another toast library                                                          |
| `react-player`                                                                    | Project video, only when `videoUrl` is set                                                                                        | A second video player                                                          |
| `react-vertical-timeline-component`                                               | The experience timeline                                                                                                           | A timeline built from scratch                                                  |
| `@react-email/components`, `@react-email/tailwind`, `resend`                      | The contact email, sent from `actions/sendEmail.ts`                                                                               | Calling Resend from a client component                                         |
| `eslint@8.57.1` + `eslint-config-next@14.2`, `prettier`                           | `pnpm lint` and format-on-save                                                                                                    | A second linter or formatter                                                   |

Next 14's ESLint config supports ESLint 7 or 8. Keep ESLint pinned to 8.57.1 while using `next lint`; ESLint 9 requires a separate lint-toolchain migration.

## Boundaries

- Add a dependency only when nothing in the table covers the job. Prefer the library already listed.
- `RESEND_API_KEY` stays on the server. Never prefix it with `NEXT_PUBLIC_`.
- Content is static TypeScript in `lib/data.ts`. Do not add a CMS, database, or data-fetching client for portfolio copy.
- UI primitives that shadcn generated stay in `components/ui`. Edit them in place. Do not reinstall them with a different style.
