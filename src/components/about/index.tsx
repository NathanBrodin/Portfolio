import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'

import { getUsersLocation as getServerUsersLocation } from '@/lib/functions'

import { Lines } from '../ui/backgrounds/lines'
import { DottedMap } from '../ui/dotted-map'
import { Section } from '../ui/section'

const TROMSO = {
  lat: 69.649208,
  lng: 18.955324,
  label: 'Tromsø',
  description: 'Where I currently live, north of the Arctic Circle',
  animated: true,
}

const LAVAL = {
  lat: 48.070469,
  lng: -0.7736,
  label: 'Laval',
  description: 'Where it all started: my hometown in France',
}

const SUNDSVALL = {
  lat: 62.390839,
  lng: 17.306919,
  label: 'Sundsvall',
  description: 'Exchange semester in Sweden',
}

const OSLO = {
  lat: 59.913868,
  lng: 10.752245,
  label: 'Oslo',
  description: 'Spent 3 internships learning frontend engineering here',
}

const KOKKOLA = {
  lat: 63.8391421,
  lng: 23.1336845,
  label: 'Kokkola',
  description: 'My first exchange semester, under the Northern Lights',
}

const LEGEND_ITEMS = [
  { label: 'Laval', description: 'Hometown', animated: false },
  {
    label: 'Kokkola',
    description: 'Exchange semester, Finland',
    animated: false,
  },
  { label: 'Oslo', description: '3 internships', animated: false },
  {
    label: 'Sundsvall',
    description: 'Exchange semester, Sweden',
    animated: false,
  },
  { label: 'Tromsø', description: 'Currently here', animated: true },
]

function LegendDot({ animated }: { animated: boolean }) {
  if (animated) {
    return (
      <span className="relative mt-0.5 flex size-2 shrink-0">
        <span
          className="bg-primary absolute inline-flex size-full animate-ping rounded-full opacity-75"
          style={{ animationDuration: '2s' }}
        />
        <span className="bg-primary relative inline-flex size-2 rounded-full" />
      </span>
    )
  }
  return <span className="bg-primary mt-0.5 size-2 shrink-0 rounded-full" />
}

export function About() {
  const getUsersLocation = useServerFn(getServerUsersLocation)

  const { data: location } = useQuery({
    queryKey: [],
    queryFn: () => getUsersLocation(),
  })

  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null)

  const isLocation = location?.lat != null

  return (
    <Section
      id="about"
      className="bg-background/50 grid w-full grid-cols-1 md:grid-cols-3"
    >
      <div className="flex flex-col gap-4 p-4 md:p-6">
        <h2 className="font-display text-primary font-medium">About</h2>
        <div className="text-muted-foreground flex flex-col gap-3 text-sm">
          <p>
            Originally from the west of France, I&apos;ve been moving north ever
            since: interning in Oslo, exchanging in Finland and Sweden, and
            somehow ending up north of the Arctic Circle in Tromsø, Norway.
          </p>
          <p>
            I build things for the web, mostly on the frontend, and I care way
            too much about how buttons feel when you click them.
          </p>
        </div>
        <ul className="flex flex-col gap-1.5">
          {LEGEND_ITEMS.map((item) => (
            <li
              key={item.label}
              className={`flex cursor-pointer items-start gap-2 rounded-sm px-1 py-0.5 transition-colors duration-150 ${
                hoveredLabel === item.label
                  ? 'bg-primary/10'
                  : 'hover:bg-muted/50'
              }`}
              onMouseEnter={() => setHoveredLabel(item.label)}
              onMouseLeave={() => setHoveredLabel(null)}
            >
              <LegendDot animated={item.animated} />
              <span className="text-muted-foreground text-xs leading-tight">
                <span className="text-foreground font-medium">
                  {item.label}
                </span>
                {' — '}
                {item.description}
              </span>
            </li>
          ))}
          {isLocation && (
            <li
              className={`flex cursor-pointer items-start gap-2 rounded-sm px-1 py-0.5 transition-colors duration-150 ${
                hoveredLabel === 'You' ? 'bg-primary/10' : 'hover:bg-muted/50'
              }`}
              onMouseEnter={() => setHoveredLabel('You')}
              onMouseLeave={() => setHoveredLabel(null)}
            >
              <LegendDot animated />
              <span className="text-muted-foreground text-xs leading-tight">
                <span className="text-foreground font-medium">You</span>
                {' — '}
                That&apos;s where you are
              </span>
            </li>
          )}
        </ul>
      </div>

      <div className="relative col-span-2 flex h-full w-full items-center border-t md:border-t-0 md:border-l">
        <Lines className="opacity-10 select-none dark:opacity-5" />
        <div className="bg-background h-fit w-full border-y py-2">
          <DottedMap
            markers={[
              TROMSO,
              KOKKOLA,
              OSLO,
              LAVAL,
              SUNDSVALL,
              ...(isLocation
                ? [
                    {
                      lat: location.lat,
                      lng: location.lng,
                      animated: true,
                      label: 'You',
                      description: "That's where you are",
                    },
                  ]
                : []),
            ]}
            paths={
              isLocation
                ? [{ start: 'Tromsø', end: 'You', animated: true }]
                : []
            }
            markerColor="var(--primary)"
            lineColor="var(--primary)"
            highlightedLabel={hoveredLabel}
            onMarkerHover={setHoveredLabel}
          />
        </div>
      </div>
    </Section>
  )
}
