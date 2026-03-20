# Agent Instructions

This is my portfolio, presenting my work, experiences, and myself.

## Tech Stack & Conventions

- **Framework**: React 19 + React Compiler + TanStack Router + TanStack Start (SSR)
- **Styling**: Tailwind CSS v4
- **UI Components**: Base UI + shadcn components
- **Validation**: Zod
- **Content**: Content Collections (Markdown)
- **Rule**: Rely on the React Compiler; avoid manual memoization (`useMemo`, `useCallback`) unless strictly necessary.

## Content and Voice

When adding any text, blog posts, or UI copy, your primary goal is to make it feel exactly as if I wrote it. Do not use generic, overly formal "AI-sounding" language.

To accurately mimic my voice, you must follow this process:

- **Analyze Context First:** Before generating new content, read existing Markdown files in `/content/` to analyze my vocabulary, sentence structure, and pacing.
- **Match the Intent:** Ensure the new content aligns perfectly with the spirit of the surrounding application and feels like a natural extension of my existing blogs.

## Useful Commands

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task.

### Develop

- `vp dev` - Run the development server
- `vp check` - Run format, lint, and TypeScript type checks
- `vp test` - Run tests

### Build

- `vp build` - Build for production
- `vp preview` - Preview production build

### Manage Dependencies

- `vp add <package>` - Add packages to dependencies
- `vp remove <package>` - Remove packages from dependencies
- `vp update` - Update packages to latest versions
