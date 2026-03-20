import { motion } from 'motion/react'
import * as React from 'react'

import {
  LAT_TO_Y,
  LNG_ORIGIN_X,
  LNG_SCALE_X,
  MAP_DIMENSIONS,
  MAP_DOTS_PATH,
  MAP_STAGGER,
} from '@/generated/map-data'
import { cn } from '@/lib/utils'

interface Marker {
  lat: number
  lng: number
  size?: number
  label?: string
  description?: string
  animated?: boolean
}

interface CurvedPath {
  start: string
  end: string
  animated?: boolean
}

export interface DottedMapProps extends React.SVGProps<SVGSVGElement> {
  markers?: Marker[]
  paths?: CurvedPath[]
  dotColor?: string
  markerColor?: string
  lineColor?: string
  markerSize?: number
  stagger?: boolean
  /** Label of the marker to highlight externally (e.g. from a legend hover) */
  highlightedLabel?: string | null
  /** Called when the user hovers/unhovers a marker on the map */
  onMarkerHover?: (label: string | null) => void
}

type ProcessedMarker = {
  x: number
  y: number
  label?: string
  description?: string
  animated?: boolean
  size?: number
}

function createCurvedPath(start: { x: number; y: number }, end: { x: number; y: number }) {
  const midX = (start.x + end.x) / 2
  const midY = Math.min(start.y, end.y) - 8
  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`
}

/**
 * Interpolate latitude to SVG Y using the pre-computed lookup table.
 * The map uses a non-linear (Mercator-like) projection, so we linearly
 * interpolate between the nearest two sampled latitudes.
 */
function latToY(lat: number): number {
  // Clamp to lookup range
  const first = LAT_TO_Y[0]
  const last = LAT_TO_Y[LAT_TO_Y.length - 1]
  if (lat <= first[0]) return first[1]
  if (lat >= last[0]) return last[1]

  // Binary search for the right interval
  let lo = 0
  let hi = LAT_TO_Y.length - 1
  while (lo < hi - 1) {
    const mid = (lo + hi) >> 1
    if (LAT_TO_Y[mid][0] <= lat) lo = mid
    else hi = mid
  }

  const [lat0, y0] = LAT_TO_Y[lo]
  const [lat1, y1] = LAT_TO_Y[hi]
  const t = (lat - lat0) / (lat1 - lat0)
  return y0 + t * (y1 - y0)
}

/** Project lat/lng to SVG x/y using pre-computed projection data. */
function projectMarker(marker: Marker): ProcessedMarker {
  const { lat, lng, ...rest } = marker
  return {
    x: LNG_ORIGIN_X + lng * LNG_SCALE_X,
    y: latToY(lat),
    ...rest,
  }
}

export function DottedMap({
  markers = [],
  paths = [],
  markerColor = '#FF6900',
  lineColor = '#0ea5e9',
  markerSize = 0.5,
  stagger = true,
  highlightedLabel,
  onMarkerHover,
  className,
  style,
}: DottedMapProps) {
  const { width, height } = MAP_DIMENSIONS
  const containerRef = React.useRef<HTMLDivElement>(null)
  const tooltipRef = React.useRef<HTMLDivElement>(null)
  const [hoveredMarker, setHoveredMarker] = React.useState<ProcessedMarker | null>(null)

  const processedMarkers = markers.map(projectMarker)

  const getMarkerOffset = (marker: ProcessedMarker) => {
    const rowIndex = MAP_STAGGER.yToRowIndex.get(marker.y) ?? 0
    return stagger && rowIndex % 2 === 1 ? MAP_STAGGER.xStep / 2 : 0
  }

  // Resolve paths to projected coordinates
  const resolvedPaths = paths
    .map((path) => {
      const startMarker = processedMarkers.find((m) => m.label === path.start)
      const endMarker = processedMarkers.find((m) => m.label === path.end)
      if (!startMarker || !endMarker) return null
      const startOffset = getMarkerOffset(startMarker)
      const endOffset = getMarkerOffset(endMarker)
      return {
        start: { x: startMarker.x + startOffset, y: startMarker.y },
        end: { x: endMarker.x + endOffset, y: endMarker.y },
        animated: path.animated ?? false,
      }
    })
    .filter(Boolean) as Array<{
    start: { x: number; y: number }
    end: { x: number; y: number }
    animated: boolean
  }>

  const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const handleMarkerHover = (marker: ProcessedMarker, event: React.MouseEvent) => {
    if (!marker.label) return

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }

    const container = containerRef.current
    const tooltip = tooltipRef.current
    if (!container || !tooltip) return

    const rect = container.getBoundingClientRect()

    setHoveredMarker(marker)
    onMarkerHover?.(marker.label)

    tooltip.style.left = `${event.clientX - rect.left}px`
    tooltip.style.top = `${event.clientY - rect.top}px`
  }

  const handleMarkerLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredMarker(null)
      onMarkerHover?.(null)
    }, 100)
  }

  return (
    <div ref={containerRef} className="relative" style={{ width: '100%', height: '100%' }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className={cn('text-gray-500 dark:text-gray-500', className)}
        style={{ width: '100%', height: '100%', ...style }}
      >
        {/* Single path for all map dots -- pre-computed at build time */}
        <path d={MAP_DOTS_PATH} fill="currentColor" />

        {/* Curved paths */}
        {resolvedPaths.length > 0 && (
          <defs>
            <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
              <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        )}
        {resolvedPaths.map((path, i) => {
          const d = createCurvedPath(path.start, path.end)
          return path.animated ? (
            <motion.path
              key={`path-${i}`}
              d={d}
              fill="none"
              stroke="url(#path-gradient)"
              strokeWidth="0.25"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 1,
                delay: 0.5 * i,
                ease: 'easeOut',
              }}
            />
          ) : (
            <path
              key={`path-${i}`}
              d={d}
              fill="none"
              stroke="url(#path-gradient)"
              strokeWidth="0.25"
            />
          )
        })}

        {/* Markers */}
        {processedMarkers.map((marker, index) => {
          const offsetX = getMarkerOffset(marker)
          const cx = marker.x + offsetX
          const cy = marker.y
          const isHighlighted = highlightedLabel != null && marker.label === highlightedLabel
          return (
            <g key={`marker-${marker.x}-${marker.y}-${index}`} className="group cursor-pointer">
              <circle
                cx={cx}
                cy={cy}
                r={markerSize * 6}
                fill="transparent"
                className={cn(
                  'transition-opacity duration-200 group-hover:opacity-10',
                  isHighlighted ? 'opacity-15' : 'opacity-0',
                )}
                style={{ fill: markerColor }}
                onMouseEnter={(e) => handleMarkerHover(marker, e)}
                onMouseLeave={handleMarkerLeave}
              />
              <circle
                cx={cx}
                cy={cy}
                r={markerSize}
                fill={markerColor}
                style={{ pointerEvents: 'none' }}
              />
              {marker.animated && (
                <circle
                  cx={cx}
                  cy={cy}
                  r={markerSize}
                  fill={markerColor}
                  opacity="0.5"
                  style={{ pointerEvents: 'none' }}
                >
                  <animate
                    attributeName="r"
                    from={String(markerSize)}
                    to="2"
                    dur="2s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.5"
                    to="0"
                    dur="2s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </g>
          )
        })}
      </svg>

      {/* Tooltip overlay */}
      <div
        ref={tooltipRef}
        className={cn(
          'bg-popover text-popover-foreground pointer-events-none absolute z-50 rounded-md border px-3 py-1.5 text-sm shadow-md transition-opacity duration-150',
          hoveredMarker?.label ? 'opacity-100' : 'opacity-0',
        )}
        style={{
          left: 0,
          top: 0,
          transform: 'translate(-50%, -100%) translateY(-16px)',
        }}
      >
        {hoveredMarker && (
          <>
            <p className="font-medium">{hoveredMarker.label}</p>
            {hoveredMarker.description && (
              <p className="text-xs text-muted-foreground">{hoveredMarker.description}</p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
