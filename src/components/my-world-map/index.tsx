import { useQuery } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'

import { getUsersLocation as getServerUsersLocation } from '@/lib/functions'

import { DottedMap } from '../ui/dotted-map'
import { Section } from '../ui/section'

const TROMSO = {
  lat: 69.649208,
  lng: 18.955324,
  label: 'Tromso',
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
  description: 'First exchange semester under the Northern Lights',
}

export function MyWorldMap() {
  const getUsersLocation = useServerFn(getServerUsersLocation)

  const { data: location } = useQuery({
    queryKey: [],
    queryFn: () => getUsersLocation(),
  })

  const isLocation = location?.lat != null

  return (
    <Section className="flex flex-col">
      <h2 className="sr-only">My World Map</h2>
      <div className="relative h-75 w-full">
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
            isLocation ? [{ start: 'Tromso', end: 'You', animated: true }] : []
          }
          markerColor="var(--primary)"
          lineColor="var(--primary)"
        />
      </div>
    </Section>
  )
}
