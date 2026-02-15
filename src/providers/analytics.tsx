import { Analytics } from '@vercel/analytics/react'
import { PostHogProvider } from 'posthog-js/react'
import type { ReactNode } from 'react'

const posthogKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY
const posthogHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST

const options = posthogHost
  ? ({
      api_host: posthogHost,
      defaults: '2026-01-30',
    } as const)
  : undefined

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  if (import.meta.env.DEV || !posthogKey || !options) {
    return <>{children}</>
  }

  return (
    <PostHogProvider apiKey={posthogKey} options={options}>
      {children}
      <Analytics />
    </PostHogProvider>
  )
}
