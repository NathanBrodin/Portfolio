import { Section } from '../ui/section'
import WorldMap from '../ui/world-map'

const TROMSO = {
  lat: 69.649208,
  lng: 18.955324,
  label: 'Tromso',
}

const LAVAL = {
  lat: 48.070469,
  lng: -0.7736,
  label: 'Laval',
}

const SUNDSVALL = {
  lat: 62.390839,
  lng: 17.306919,
  label: 'Sundsvall',
}

const OSLO = {
  lat: 59.913868,
  lng: 10.752245,
  label: 'Oslo',
}

const KOKKOLA = {
  lat: 63.8391421,
  lng: 23.1336845,
  label: 'Kokkola',
}

export function MyWorldMap() {
  return (
    <Section className="flex flex-col">
      <h2 className="sr-only">My World Map</h2>
      <div className="relative h-75 w-full overflow-hidden">
        <WorldMap
          dots={[
            { start: TROMSO, end: LAVAL },
            { start: TROMSO, end: SUNDSVALL },
            { start: TROMSO, end: KOKKOLA },
            { start: TROMSO, end: OSLO },
          ]}
          lineColor="var(--primary)"
        />
      </div>
    </Section>
  )
}
