import { useQuery } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import { lazy, Suspense, useState } from 'react'

import { siteConfig } from '@/config/site'
import { getUsersLocation as getServerUsersLocation } from '@/lib/functions'

import { Diamond } from '../ui/diamond'
import { Section } from '../ui/section'
import { PLACES, USER_MARKER, type UserLocation } from './locations'

const Globe = lazy(() => import('./globe').then((mod) => ({ default: mod.Globe })))

function LegendDot({ animated }: { animated: boolean }) {
  if (animated) {
    return (
      <span className="relative mt-0.5 flex size-2 shrink-0" aria-hidden="true">
        <span
          className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75"
          style={{ animationDuration: '2s' }}
        />
        <span className="relative inline-flex size-2 rounded-full bg-primary" />
      </span>
    )
  }
  return <span className="mt-0.5 size-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
}

function getGreeting(hour: number) {
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

function getInitialGreeting() {
  if (typeof window === 'undefined') return 'About'
  return getGreeting(new Date().getHours())
}

export function About() {
  // Read synchronously (like ThemeProvider does) instead of in useEffect, so
  // the first client render already matches the script-patched DOM: no swap flash.
  const [greeting] = useState(getInitialGreeting)
  const getUsersLocation = useServerFn(getServerUsersLocation)

  const { data: location } = useQuery({
    queryKey: [],
    queryFn: () => getUsersLocation(),
  })

  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const userLocation: UserLocation | null =
    location?.lat != null && location?.lng != null ? { lat: location.lat, lng: location.lng } : null

  return (
    <Section id="about" className="grid w-full grid-cols-1 bg-background/50 md:grid-cols-2">
      <div className="relative flex flex-col gap-4 p-4 md:p-6">
        <Diamond top right />
        <Diamond bottom right />
        <Diamond bottom left />
        <h2
          id="about-greeting"
          suppressHydrationWarning
          className="font-display font-medium text-primary italic"
        >
          {greeting}
        </h2>
        <p className="text-sm whitespace-pre-line text-foreground">{siteConfig.about}</p>
        <ul className="flex flex-col">
          {PLACES.map((item) => (
            <li
              key={item.id}
              tabIndex={0}
              className={`flex cursor-pointer items-start gap-2 rounded-sm px-1 py-1.5 transition-colors duration-150 ${
                hoveredId === item.id ? 'bg-primary/10' : 'hover:bg-muted/50'
              }`}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setHoveredId(item.id)}
              onBlur={() => setHoveredId(null)}
            >
              <LegendDot animated={item.current ?? false} />
              <span className="text-xs leading-tight text-muted-foreground">
                <span className="font-medium text-foreground">{item.label}</span>
                {' — '}
                {item.description}
              </span>
            </li>
          ))}
          {/* Same <li> shell prerendered and post-load: only its contents fill
              in when the visitor location resolves, so hydration always matches. */}
          <li
            tabIndex={userLocation ? 0 : -1}
            className={`flex min-h-4.75 cursor-pointer items-start gap-2 rounded-sm px-1 py-0.5 transition-colors duration-150 ${
              hoveredId === USER_MARKER.id ? 'bg-primary/10' : 'hover:bg-muted/50'
            }`}
            onMouseEnter={() => setHoveredId(USER_MARKER.id)}
            onMouseLeave={() => setHoveredId(null)}
            onFocus={() => setHoveredId(USER_MARKER.id)}
            onBlur={() => setHoveredId(null)}
          >
            {userLocation ? (
              <>
                <LegendDot animated />
                <span className="text-xs leading-tight text-muted-foreground">
                  <span className="font-medium text-foreground">{USER_MARKER.label}</span>
                  {' — '}
                  {USER_MARKER.description}
                </span>
              </>
            ) : null}
          </li>
        </ul>
      </div>
      <Suspense
        fallback={
          <div
            className="relative flex h-full min-h-84 w-full flex-1 items-end justify-end border-t bg-[radial-gradient(circle_at_60%_45%,var(--primary)/12%,transparent_65%)] md:border-t-0 md:border-l"
            aria-hidden="true"
          />
        }
      >
        <Globe userLocation={userLocation} highlightedId={hoveredId} />
      </Suspense>
    </Section>
  )
}
