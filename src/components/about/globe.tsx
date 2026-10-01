import { useTheme } from '@lonik/themer'
import createGlobe, { type Globe as CobeGlobe } from 'cobe'
import { useEffect, useRef, type CSSProperties } from 'react'

import { Dither } from '../ui/backgrounds/dither'
import { CURRENT_PLACE_ID, PLACES, USER_MARKER, type UserLocation } from './locations'

interface GlobeProps {
  userLocation?: UserLocation | null
  highlightedId?: string | null
}

const MARKER_SIZE = 0.025

const DEFAULT_THETA = 0.2
const ROTATION_SPEED = 0.001
const FOCUS_EASE = 0.07
const SNAP_THRESHOLD = 0.0008

function markerSize(id: string, highlightedId?: string | null) {
  if (highlightedId === id) return MARKER_SIZE
  if (id === CURRENT_PLACE_ID || id === USER_MARKER.id) return MARKER_SIZE
  return MARKER_SIZE
}

function buildMarkers(
  userLocation: UserLocation | null | undefined,
  highlightedId?: string | null,
) {
  const markers = PLACES.map((p) => ({
    id: p.id,
    label: p.label,
    location: [p.lat, p.lng] as [number, number],
    size: markerSize(p.id, highlightedId),
  }))
  if (userLocation) {
    markers.push({
      id: USER_MARKER.id,
      label: USER_MARKER.label,
      location: [userLocation.lat, userLocation.lng] as [number, number],
      size: markerSize(USER_MARKER.id, highlightedId),
    })
  }
  return markers
}

// Only arc: from the current home to the visitor, when their location is known.
function buildArcs(userLocation: UserLocation | null | undefined) {
  if (!userLocation) return []
  const current = PLACES.find((p) => p.id === CURRENT_PLACE_ID) ?? PLACES[PLACES.length - 1]
  return [
    {
      id: `${current.id}-${USER_MARKER.id}`,
      from: [current.lat, current.lng] as [number, number],
      to: [userLocation.lat, userLocation.lng] as [number, number],
    },
  ]
}

// COBE exposes no focus API, only raw phi/theta rotations via update().
// Inverting its projection: the lat/lng facing the viewer satisfies
// phi = atan2(-x, z) and theta = atan2(y, hypot(x, z)) for the unit vector
// of that location. Easing phi/theta toward those angles "focuses" a marker.
function locationToAngles(lat: number, lng: number) {
  const latR = (lat * Math.PI) / 180
  const lngR = (lng * Math.PI) / 180 - Math.PI
  const x = -Math.cos(latR) * Math.cos(lngR)
  const y = Math.sin(latR)
  const z = Math.cos(latR) * Math.sin(lngR)
  return { phi: Math.atan2(-x, z), theta: Math.atan2(y, Math.hypot(x, z)) }
}

function shortestAngleDelta(target: number, current: number) {
  const TAU = Math.PI * 2
  return ((((target - current) % TAU) + Math.PI * 3) % TAU) - Math.PI
}

function resolveFocusLocation(
  highlightedId: string | null | undefined,
  userLocation: UserLocation | null | undefined,
) {
  if (!highlightedId) return null
  if (highlightedId === USER_MARKER.id) return userLocation ?? null
  return PLACES.find((p) => p.id === highlightedId) ?? null
}

// Park the initial view over the current home so the markers are visible on
// first paint instead of the default Americas-facing phi of 0.
const CURRENT_PLACE = PLACES.find((p) => p.id === CURRENT_PLACE_ID) ?? PLACES[PLACES.length - 1]
const INITIAL_PHI = locationToAngles(CURRENT_PLACE.lat, CURRENT_PLACE.lng).phi

const THEME_PRESETS = {
  dark: {
    dark: 1,
    diffuse: 1.2,
    mapBrightness: 10,
    baseColor: [0.3, 0.3, 0.3] as [number, number, number],
    markerColor: [0.8, 0.984, 0.945] as [number, number, number],
    arcColor: [0.8, 0.984, 0.945] as [number, number, number],
    glowColor: [0.1, 0.1, 0.1] as [number, number, number],
  },
  light: {
    dark: 0,
    diffuse: 1.2,
    mapBrightness: 10,
    baseColor: [1, 1, 1] as [number, number, number],
    markerColor: [0.059, 0.463, 0.431] as [number, number, number],
    arcColor: [0.059, 0.463, 0.431] as [number, number, number],
    glowColor: [1, 1, 1] as [number, number, number],
  },
} as const

function getThemePreset(theme: string | undefined) {
  return theme === 'dark' ? THEME_PRESETS.dark : THEME_PRESETS.light
}

export function Globe({ userLocation, highlightedId }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const globeRef = useRef<CobeGlobe | null>(null)
  const phiRef = useRef(INITIAL_PHI)
  const thetaRef = useRef(DEFAULT_THETA)
  const targetRef = useRef<{ phi: number; theta: number } | null>(null)
  const visibleRef = useRef(true)
  const { resolvedTheme } = useTheme()

  // Only the current home and the visitor are labeled by default. Hovering a
  // legend row reveals that place's label and rotates it into view, which
  // keeps the clustered European markers readable.
  const labels = buildMarkers(userLocation, highlightedId).filter(
    (m) => m.id === CURRENT_PLACE_ID || m.id === USER_MARKER.id || m.id === highlightedId,
  )

  // Steer the focus target whenever the hovered legend row changes. The
  // animation loop below eases phi/theta toward it each frame.
  useEffect(() => {
    const focus = resolveFocusLocation(highlightedId, userLocation)
    targetRef.current = focus ? locationToAngles(focus.lat, focus.lng) : null
  }, [highlightedId, userLocation])

  useEffect(() => {
    const canvasNode = canvasRef.current
    const containerNode = containerRef.current
    if (canvasNode === null || containerNode === null) return
    const canvas: HTMLCanvasElement = canvasNode
    const container: HTMLDivElement = containerNode

    let rafId = 0
    let attempts = 0
    let animationId = 0
    let revealed = false
    let observer: IntersectionObserver | null = null
    let sizeObserver: ResizeObserver | null = null
    let cancelled = false
    let started = false

    // Size via ResizeObserver: the callback carries content-box sizes, so no
    // synchronous layout read (and no forced reflow) is ever needed.
    function init() {
      if (cancelled || started) return
      if (typeof ResizeObserver !== 'undefined') {
        sizeObserver = new ResizeObserver((entries) => {
          if (cancelled || started) return
          const entry = entries[0]
          const box = entry.contentBoxSize?.[0]
          const size = box ? box.inlineSize : entry.contentRect.width
          if (size === 0) return
          started = true
          sizeObserver?.disconnect()
          sizeObserver = null
          start(size)
        })
        sizeObserver.observe(canvas)
        return
      }
      // Fallback for ancient browsers: single deferred read after paint.
      rafId = requestAnimationFrame(function fallback() {
        if (cancelled || started) return
        const size = canvas.clientWidth || container.clientWidth || 0
        if (size === 0) {
          attempts += 1
          if (attempts < 10) rafId = requestAnimationFrame(fallback)
          return
        }
        started = true
        start(size)
      })
    }

    function start(width: number) {
      if (cancelled) return
      const initialTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light'

      // Read viewport once at mount instead of subscribing to useIsMobile:
      // the value is identical for sizing, but doesn't recreate the WebGL
      // context when the media query flips (or hydrates false -> true).
      const isSmallScreen = window.innerWidth < 640
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, isSmallScreen ? 1 : 2),
        width,
        height: width,
        phi: phiRef.current,
        theta: thetaRef.current,
        mapSamples: isSmallScreen ? 4000 : 16000,
        markerElevation: 0.01,
        markers: buildMarkers(null, null).map((m) => ({
          location: m.location,
          size: m.size,
          id: m.id,
        })),
        arcs: buildArcs(null).map((a) => ({ from: a.from, to: a.to, id: a.id })),
        arcWidth: 0.5,
        arcHeight: 0.25,
        opacity: 0.7,
        scale: 1.7,
        offset: [110, 170],
        ...getThemePreset(initialTheme),
      })
      globeRef.current = globe

      function reveal() {
        if (revealed) return
        revealed = true
        requestAnimationFrame(() => {
          canvasRef.current?.style.setProperty('opacity', '1')
        })
      }

      // Static frame: no rotation loop, no continuous GPU work.
      if (prefersReducedMotion) {
        globe.update({ phi: phiRef.current, theta: thetaRef.current })
        reveal()
        return
      }

      function animate() {
        if (cancelled) return
        // Pause GPU work when offscreen or tab-hidden, but keep the rAF
        // chain alive so it resumes automatically without re-creating
        // the globe. The globe is above the fold, so this only saves
        // work after scrolling away — which is the common mobile case.
        if (!document.hidden && visibleRef.current) {
          const target = targetRef.current
          if (target) {
            const dPhi = shortestAngleDelta(target.phi, phiRef.current)
            const dTheta = target.theta - thetaRef.current
            phiRef.current += dPhi * FOCUS_EASE
            thetaRef.current += dTheta * FOCUS_EASE
            if (Math.abs(dPhi) < SNAP_THRESHOLD) phiRef.current = target.phi
            if (Math.abs(dTheta) < SNAP_THRESHOLD) thetaRef.current = target.theta
          } else {
            phiRef.current += ROTATION_SPEED
            thetaRef.current += (DEFAULT_THETA - thetaRef.current) * FOCUS_EASE
          }
          globe.update({ phi: phiRef.current, theta: thetaRef.current })
          reveal()
        }
        animationId = requestAnimationFrame(animate)
      }
      animate()

      if (typeof IntersectionObserver !== 'undefined') {
        observer = new IntersectionObserver(
          ([entry]) => {
            visibleRef.current = entry.isIntersecting
          },
          { threshold: 0 },
        )
        observer.observe(container)
      }
    }

    rafId = requestAnimationFrame(init)

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      cancelAnimationFrame(animationId)
      observer?.disconnect()
      sizeObserver?.disconnect()
      globeRef.current?.destroy()
      globeRef.current = null
    }
  }, [])

  // Push marker/arc changes (visitor location resolving, legend hover growing
  // a marker) into the live globe without recreating the canvas.
  useEffect(() => {
    globeRef.current?.update({
      markers: buildMarkers(userLocation, highlightedId).map((m) => ({
        location: m.location,
        size: m.size,
        id: m.id,
      })),
      arcs: buildArcs(userLocation).map((a) => ({ from: a.from, to: a.to, id: a.id })),
    })
  }, [userLocation, highlightedId])

  // Apply the theme preset live whenever the resolved theme changes.
  useEffect(() => {
    globeRef.current?.update({ ...getThemePreset(resolvedTheme) })
  }, [resolvedTheme])

  return (
    <div
      ref={containerRef}
      className="relative flex h-full min-h-84 w-full flex-1 items-end justify-end border-t bg-[radial-gradient(circle_at_60%_45%,var(--primary)/12%,transparent_65%)] md:border-t-0 md:border-l"
    >
      <Dither />
      <div className="relative aspect-square h-full overflow-hidden contain-[layout_style] select-none [--cobe-bg:var(--background)] [--cobe-ink:var(--primary)]">
        <canvas
          ref={canvasRef}
          width={512}
          height={512}
          className="aspect-square h-full w-full touch-none opacity-0 transition-opacity duration-1000 contain-[layout_paint_size]"
        />
        {labels.map((m) => (
          <div
            key={m.id}
            className="pointer-events-none absolute [bottom:anchor(top)] [left:anchor(center)] mb-2 [translate:-50%_0] rounded-xs bg-[var(--cobe-ink)] px-[0.35rem] py-[0.15rem] font-mono text-[0.6rem] tracking-[0.08em] whitespace-nowrap text-[var(--cobe-bg)] uppercase transition-[opacity,filter] duration-800 after:absolute after:top-full after:left-1/2 after:[transform:translate3d(-50%,-1px,0)] after:[border-width:5px] after:[border-style:solid] after:[border-color:var(--cobe-ink)_transparent_transparent_transparent] after:content-[''] max-sm:mb-1.5 max-sm:px-1 max-sm:py-[0.1rem] max-sm:text-[0.5rem] [@supports_not_(anchor-name:--test)]:hidden"
            style={
              {
                positionAnchor: `--cobe-${m.id}`,
                opacity: `var(--cobe-visible-${m.id}, 0)`,
                filter: `blur(calc((1 - var(--cobe-visible-${m.id}, 0)) * 8px))`,
              } as CSSProperties
            }
          >
            {m.label}
          </div>
        ))}
      </div>
    </div>
  )
}
