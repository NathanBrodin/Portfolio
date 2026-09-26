export interface Place {
  id: string
  label: string
  description: string
  lat: number
  lng: number
  /** Currently living here — rendered larger + pulsing in the legend. */
  current?: boolean
}

// Journey order: hometown first, current home last. The globe draws arcs
// between each consecutive pair, so reordering this array rewrites the story.
export const PLACES: Place[] = [
  {
    id: 'laval',
    label: 'Laval',
    description: 'Hometown',
    lat: 48.070469,
    lng: -0.7736,
  },
  {
    id: 'kokkola',
    label: 'Kokkola',
    description: 'Exchange semester, Finland',
    lat: 63.8391421,
    lng: 23.1336845,
  },
  {
    id: 'sundsvall',
    label: 'Sundsvall',
    description: 'Exchange semester, Sweden',
    lat: 62.390839,
    lng: 17.306919,
  },
  {
    id: 'oslo',
    label: 'Oslo',
    description: '3 internships',
    lat: 59.913868,
    lng: 10.752245,
  },
  {
    id: 'tromso',
    label: 'Tromsø',
    description: 'Currently here',
    lat: 69.649208,
    lng: 18.955324,
    current: true,
  },
]

export const CURRENT_PLACE_ID = 'tromso'

export interface UserLocation {
  lat: number
  lng: number
}

export const USER_MARKER = {
  id: 'you',
  label: 'You',
  description: "That's where you are",
} as const
