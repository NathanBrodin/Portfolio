import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    GITHUB_API_TOKEN: z.string().min(1),
  },
  clientPrefix: 'PUBLIC_',
  client: {},
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
})
