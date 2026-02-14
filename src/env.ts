import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    GITHUB_API_TOKEN: z.string().min(1),
  },
  clientPrefix: 'VITE_PUBLIC_',
  client: {
    VITE_PUBLIC_POSTHOG_KEY: z.string().optional(),
    VITE_PUBLIC_POSTHOG_HOST: z.string().optional(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
})
