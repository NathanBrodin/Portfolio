import { useQuery } from '@tanstack/react-query'
import { ScriptOnce } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useState } from 'react'

import { siteConfig } from '@/config/site'
import { getUsersLocation as getServerUsersLocation } from '@/lib/functions'

import { Diamond } from '../ui/diamond'
import { Section } from '../ui/section'
import { Globe } from './globe'
import { PLACES, USER_MARKER, type UserLocation } from './locations'

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

// Runs during HTML parsing, before first paint, so the prerendered "About"
// fallback is swapped before the user ever sees it. Self-removes after running
// (via ScriptOnce), so hydration sees the same DOM the client renders.
const GREETING_SCRIPT = `try{var h=new Date().getHours();var g=h<12?'Good morning':h<18?'Good afternoon':'Good evening';var el=document.getElementById('about-greeting');if(el)el.textContent=g;}catch(e){}`

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
        <ScriptOnce>{GREETING_SCRIPT}</ScriptOnce>
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
          {userLocation ? (
            <li
              tabIndex={0}
              className={`flex cursor-pointer items-start gap-2 rounded-sm px-1 py-0.5 transition-colors duration-150 ${
                hoveredId === USER_MARKER.id ? 'bg-primary/10' : 'hover:bg-muted/50'
              }`}
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
          ) : (
            <li className="h-4.75" />
          )}
        </ul>
      </div>
      <Globe userLocation={userLocation} highlightedId={hoveredId} />
    </Section>
  )
}
