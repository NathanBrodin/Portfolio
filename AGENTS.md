This is my personal portfolio.
It tries to focus on performances, accessibility, SEO, and GEO: all changes introduced should reflect on if these are considered.

## Toolchain

This project uses Vite+. Always use `vp`, never npm/pnpm/yarn/tsc/eslint/prettier directly.

- `vp check`: format, lint, and typecheck. Run after every change and fix all errors.
- `vp build`: run to verify the app actually works when your change touches routes, content, config, or dependencies.
- `vp add` / `vp remove` / `vp update`: the only way to change dependencies. Ask before adding one.

There are no tests.

## Rendering

- The React Compiler is on. Don't write `useMemo`, `useCallback`, or `React.memo`; manual memoization fights the compiler.
- Pages are statically pre-rendered with TanStack Start (see the Vite config).

## Code Style

Write the least code that does the job.

- Inline logic that's only used once. Don't extract a helper or a constant unless it's reused or the name clearly makes the caller easier to read.
- Don't hoist values into top-of-file constants unless they're shared.
- Don't add comments. Only add one when the "why" is non-obvious and can't be expressed in code. Never comment what the code does.
- Rely on type inference. No explicit annotations unless needed for exports. No `any`.
- Validate unknown data once, at the boundary (Zod), then trust the types.
- Don't add error handling, fallbacks, or abstractions for cases that can't realistically happen. If you think one is warranted, explain the concrete failure mode and ask first.
- Stay in scope: don't refactor, rename, or restyle code unrelated to the task.

## Content

When writing or editing any text, blog post, or UI copy, first read content files in `content/`. There's plenty of material there. Match the voice, vocabulary, and pacing so it reads as if I wrote it. No generic "AI-sounding" prose.
