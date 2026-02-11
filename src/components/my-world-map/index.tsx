import { DottedMap } from '../ui/dotted-map'
import { Section } from '../ui/section'

const TROMSO = {
  lat: 69.649208,
  lng: 18.955324,
  label: 'Tromso',
  description: 'Current location',
  animated: true,
}

const LAVAL = {
  lat: 48.070469,
  lng: -0.7736,
  label: 'Laval',
  description: 'Hometown',
}

const SUNDSVALL = {
  lat: 62.390839,
  lng: 17.306919,
  label: 'Sundsvall',
  description: 'Previously lived here',
}

const OSLO = {
  lat: 59.913868,
  lng: 10.752245,
  label: 'Oslo',
  description: 'Previously lived here',
}

const KOKKOLA = {
  lat: 63.8391421,
  lng: 23.1336845,
  label: 'Kokkola',
  description: 'Previously lived here',
}

export function MyWorldMap() {
  const userLocation = {
    lat: 37.7879363,
    lng: -122.4075201,
    label: 'You',
    description: "That's where you are",
  }
  return (
    <Section className="flex flex-col">
      <h2 className="sr-only">My World Map</h2>
      <div className="relative h-75 w-full overflow-hidden">
        <DottedMap
          markers={[TROMSO, KOKKOLA, OSLO, LAVAL, SUNDSVALL, userLocation]}
          paths={[{ start: 'Tromso', end: 'You', animated: true }]}
          markerColor="var(--primary)"
          lineColor="var(--primary)"
        />
      </div>
    </Section>
  )
}
