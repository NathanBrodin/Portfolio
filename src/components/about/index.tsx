import { useQuery } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import { lazy, Suspense, useState } from 'react'

import { siteConfig } from '@/config/site'
import { getUsersLocation as getServerUsersLocation } from '@/lib/functions'
import { cn } from '@/lib/utils'

import { Diamond } from '../ui/diamond'
import { Section } from '../ui/section'
import { PLACES, USER_MARKER, type UserLocation } from './locations'

const Globe = lazy(() => import('./globe').then((mod) => ({ default: mod.Globe })))

// Pixel-identical skeleton for the lazy Globe: same outer + inner boxes and
// same canvas box, so swapping fallback -> globe changes paint only (no CLS).
function GlobeFallback() {
  return (
    <div
      className="relative flex h-full min-h-84 w-full flex-1 items-end justify-end border-t bg-[radial-gradient(circle_at_60%_45%,var(--primary)/12%,transparent_65%)] md:border-t-0 md:border-l"
      aria-hidden="true"
    >
      <div className="relative aspect-square h-full overflow-hidden contain-[layout_style] select-none">
        <div className="aspect-square h-full w-full animate-pulse bg-muted/20 contain-[layout_paint_size]" />
      </div>
    </div>
  )
}

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

export function About() {
  const getUsersLocation = useServerFn(getServerUsersLocation)

  const { data: location } = useQuery({
    queryKey: ['user-location'],
    queryFn: () => getUsersLocation(),
    staleTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
  })

  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const userLocation: UserLocation | null =
    location?.lat != null && location?.lng != null ? { lat: location.lat, lng: location.lng } : null

  return (
    <Section id="about" variant="panel" className="grid w-full grid-cols-1 md:grid-cols-2">
      <div className="relative flex flex-col gap-4 p-4 md:p-6">
        <Diamond top right />
        <Diamond bottom right />
        <Diamond bottom left />
        <h2 id="about-greeting" className="font-display font-medium text-primary italic">
          <span className="greet greet-default">About</span>
          <span className="greet greet-morning">Good morning</span>
          <span className="greet greet-afternoon">Good afternoon</span>
          <span className="greet greet-evening">Good evening</span>
        </h2>
        <p className="text-sm whitespace-pre-line text-foreground">{siteConfig.about}</p>
        <ul className="flex flex-col">
          {PLACES.map((item) => (
            <li
              key={item.id}
              tabIndex={0}
              className={cn(
                'flex cursor-pointer items-start gap-2 rounded-sm px-1 py-1.5 transition-colors duration-150',
                hoveredId === item.id ? 'bg-primary/10' : 'hover:bg-muted/50',
              )}
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
          <li
            tabIndex={userLocation ? 0 : -1}
            className={cn(
              'flex cursor-pointer items-start gap-2 rounded-sm px-1 py-1.5 transition-colors duration-150',
              hoveredId === USER_MARKER.id ? 'bg-primary/10' : 'hover:bg-muted/50',
            )}
            onMouseEnter={() => setHoveredId(USER_MARKER.id)}
            onMouseLeave={() => setHoveredId(null)}
            onFocus={() => setHoveredId(USER_MARKER.id)}
            onBlur={() => setHoveredId(null)}
          >
            <LegendDot animated />
            <span className="text-xs leading-tight text-muted-foreground">
              <span className="font-medium text-foreground">{USER_MARKER.label}</span>
              {' — '}
              {USER_MARKER.description}
            </span>
          </li>
        </ul>
      </div>
      <Suspense fallback={<GlobeFallback />}>
        <Globe userLocation={userLocation} highlightedId={hoveredId} />
      </Suspense>
    </Section>
  )
}
