import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { lazy, Suspense, type ReactNode } from 'react'

const posthogKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY
const posthogHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST

const options = posthogHost
  ? ({
      cookieless_mode: 'always',
      api_host: posthogHost,
      defaults: '2026-01-30',
    } as const)
  : undefined

const LazyPostHogProvider = lazy(() =>
  import('posthog-js/react').then((mod) => ({ default: mod.PostHogProvider })),
)

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  if (import.meta.env.DEV || !posthogKey || !options) {
    return <>{children}</>
  }

  return (
    <Suspense fallback={children}>
      <LazyPostHogProvider apiKey={posthogKey} options={options}>
        {children}
        <Analytics />
        <SpeedInsights />
      </LazyPostHogProvider>
    </Suspense>
  )
}
