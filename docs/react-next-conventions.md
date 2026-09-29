# React and Next.js

Next.js 14 App Router and React 18. Do not write Next.js 15 or React 19 APIs. `params` and `searchParams` on this version are plain objects, not promises. `cookies()` and `headers()` are synchronous.

Library roles are in [technology-convention.md](technology-convention.md). Styling is in [css-conventions.md](css-conventions.md).

## Server and client

- `app/page.tsx` and `app/layout.tsx` stay server components. They compose sections and own metadata.
- Add `"use client"` only on a file that uses state, effects, events, or a browser API. Do not mark a parent client so a child can receive a callback.
- Theme and the active section are React context (`context/theme-context.tsx`, `context/active-section-context.tsx`). Do not add a state library.
- The contact form submits to the server action `actions/sendEmail.ts` (`"use server"`). Resend and `@react-email` run there, never in the browser. Surface the result with `react-hot-toast`.

## Where files go

| Kind                   | Place                                                    | Export                            |
| ---------------------- | -------------------------------------------------------- | --------------------------------- |
| A page section         | `components/<name>.tsx`                                  | Default function                  |
| A shadcn primitive     | `components/ui/<name>.tsx`                               | Named, plus the generated pattern |
| Copy, projects, skills | `lib/data.ts`                                            | Named constants                   |
| Shared types           | `lib/types.ts`                                           | Named types                       |
| Section-aware hook     | `lib/hooks.ts`                                           | Named function                    |
| Generic hook           | `hooks/<name>.ts`                                        | Named function                    |
| Email template         | `email/`                                                 | Default function                  |
| Project screenshots    | `public/projects/`, imported statically in `lib/data.ts` | —                                 |

File names are lowercase with dashes (`theme-switch.tsx`). Component names are PascalCase.

## Content

- Portfolio copy lives in `lib/data.ts`. Change the data, not a hardcoded string in the component, when the words are content.
- A project always has `title`, `year`, `description`, `tags`, and `imageUrl`. `videoUrl` and `websiteUrl` are optional. A project without them shows the screenshot and the internal-project state.
- Images used with `next/image` are static imports so the size is known.

## Components

- One component per file. Keep the section component thin: read data, render, hand interaction to a child that already exists.
- Early return when a branch has nothing to render.
- Reuse `SectionHeading`, `SectionDivider`, `Button`, and `cn` before adding a new primitive.
- A new reusable interactive component follows [radix-ui-conventions.md](radix-ui-conventions.md).
- A section imports a primitive from `@/components/ui/...`.
- Comments only for a rule that the code cannot show. No comments that restate the next line.
