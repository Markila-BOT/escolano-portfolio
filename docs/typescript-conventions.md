# TypeScript

`tsconfig.json` is strict: `strict`, `noImplicitAny`, `strictNullChecks`, `noUnusedLocals`, `noUnusedParameters`. Code that does not pass those checks is not done.

The compiler target and the Next.js version are in [technology-convention.md](technology-convention.md).

## Types

- Application code uses `type`, not `interface`. Leave `interface` in place only on generated `components/ui` files.
- No enums. Use a string union or a `as const` object.
- Derive types from the data when the data is the source of truth: `type ProjectProps = (typeof projectsData)[number]`.
- Optional fields that only some projects have (`videoUrl`, `websiteUrl`) stay optional on the props type. Render them only when they are present.
- Validate external data with a type predicate, as `validateString` does in `lib/utils.ts`. Do not assert with `as` to skip a check.
- `error` in a `catch` is `unknown`. Narrow it with `getErrorMessage`.

## Imports and modules

- Import from `@/` (`paths` in `tsconfig.json`). No deep relative paths that climb out of the folder (`../../`).
- Import a type with `import type` when the file does not need the value at runtime.
- Do not use `any`. If a third-party type is wrong, narrow at the boundary and keep `any` out of the component.

## Components

- Props are a named type next to the component: `type SectionHeadingProps = { children: React.ReactNode }`.
- Event handlers are named `handleClick`, `handleSubmit`. Booleans are named `isOpen`, `hasError`.
- No unused arguments. Prefix a required but unused argument with `_` only when a signature forces it.
