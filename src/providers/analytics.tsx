import type { ReactNode } from 'react'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

const isProduction = import.meta.env.VITE_VERCEL_ENV === 'production'

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      {isProduction && (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      )}
    </>
  )
}
