# Agent Instructions

This is my portfolio, presenting my work, experiences and presenting myself.

## Adding new changes

- Use `pnpm` as the package manager.
- Verify your work using:

```bash
pnpm run check # Format + fix ESLint issues
pnpm build # Check that the project compiles
```

## Tech Stack

- **Framework**: React 19 + React Compiler + TanStack Router + TanStack Start (SSR)
- **Styling**: Tailwind CSS v4
- **UI Components**: Base UI + shadcn components
- **Validation**: Zod
- **Content**: Content Collections (Markdown)

## Content and SEO

When adding any text to the app, make sure to follow the existing tone, way of writing and intent of the app to keep an uniform and understable content.

## Code Style Guidelines

### Server Functions

- Use `createServerFn` from `@tanstack/react-start`
- Always include `.inputValidator()` for type safety
- Handle errors with try/catch, return sensible defaults

Example:

```tsx
import { createServerFn } from '@tanstack/react-start'

export const myFn = createServerFn({ method: 'GET' })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    try {
      return await fetchData(data.id)
    } catch {
      return null
    }
  })
```

### File Structure

```
src/
  components/      # React components
    ui/           # Base UI components (Button, Card, etc.)
  hooks/          # Custom React hooks
  lib/            # Utilities and helpers
  providers/      # React context providers
  routes/         # TanStack Router routes
  config/         # Configuration files
```

### Error Handling

- Use Zod for runtime validation
- Return default values on error in server functions

### Environment Variables

- Use `@t3-oss/env-core` for type-safe env vars
- Server vars: no prefix
- Client vars: must use `PUBLIC_` prefix
- Define in `src/env.ts`
