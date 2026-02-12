import { motion } from 'motion/react'
import * as React from 'react'
import { createMap } from 'svg-dotted-map'

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
  width?: number
  height?: number
  mapSamples?: number
  markers?: Marker[]
  paths?: CurvedPath[]
  dotColor?: string
  markerColor?: string
  lineColor?: string
  markerSize?: number
  dotRadius?: number
  stagger?: boolean
}

type ProcessedMarker = {
  x: number
  y: number
  label?: string
  description?: string
  animated?: boolean
  size?: number
}

function createCurvedPath(
  start: { x: number; y: number },
  end: { x: number; y: number },
) {
  const midX = (start.x + end.x) / 2
  const midY = Math.min(start.y, end.y) - 8
  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`
}

export function DottedMap({
  width = 150,
  height = 75,
  mapSamples = 5000,
  markers = [],
  paths = [],
  markerColor = '#FF6900',
  lineColor = '#0ea5e9',
  markerSize = 0.4,
  dotRadius = 0.25,
  stagger = true,
  className,
  style,
}: DottedMapProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [hoveredMarker, setHoveredMarker] =
    React.useState<ProcessedMarker | null>(null)
  const [tooltipPos, setTooltipPos] = React.useState<{
    x: number
    y: number
  }>({ x: 0, y: 0 })

  const { points, addMarkers } = createMap({
    width,
    height,
    mapSamples,
  })

  const processedMarkers: ProcessedMarker[] = addMarkers(markers)

  // Compute stagger helpers in a single, simple pass
  const computeStagger = () => {
    const sorted = [...points].sort((a, b) => a.y - b.y || a.x - b.x)
    const rowMap = new Map<number, number>()
    let step = 0
    let prevY = Number.NaN
    let prevXInRow = Number.NaN

    for (const p of sorted) {
      if (p.y !== prevY) {
        // new row
        prevY = p.y
        prevXInRow = Number.NaN
        if (!rowMap.has(p.y)) rowMap.set(p.y, rowMap.size)
      }
      if (!Number.isNaN(prevXInRow)) {
        const delta = p.x - prevXInRow
        if (delta > 0) step = step === 0 ? delta : Math.min(step, delta)
      }
      prevXInRow = p.x
    }

    return { xStep: step || 1, yToRowIndex: rowMap }
  }
  const { xStep, yToRowIndex } = computeStagger()

  const getMarkerOffset = (marker: ProcessedMarker) => {
    const rowIndex = yToRowIndex.get(marker.y) ?? 0
    return stagger && rowIndex % 2 === 1 ? xStep / 2 : 0
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

  const handleMarkerHover = (
    marker: ProcessedMarker,
    event: React.MouseEvent,
  ) => {
    if (!marker.label) return
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    setTooltipPos({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    })
    setHoveredMarker(marker)
  }

  const handleMarkerLeave = () => {
    setHoveredMarker(null)
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ width: '100%', height: '100%' }}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className={cn('text-gray-500 dark:text-gray-500', className)}
        style={{ width: '100%', height: '100%', ...style }}
      >
        {points.map((point, index) => {
          const rowIndex = yToRowIndex.get(point.y) ?? 0
          const offsetX = stagger && rowIndex % 2 === 1 ? xStep / 2 : 0
          return (
            <circle
              cx={point.x + offsetX}
              cy={point.y}
              r={dotRadius}
              fill="currentColor"
              key={`${point.x}-${point.y}-${index}`}
            />
          )
        })}

        {/* Curved paths */}
        {resolvedPaths.length > 0 && (
          <defs>
            <linearGradient
              id="path-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
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
          return (
            <g
              key={`marker-${marker.x}-${marker.y}-${index}`}
              className="group cursor-pointer"
            >
              <circle
                cx={cx}
                cy={cy}
                r={markerSize * 4}
                fill="transparent"
                className="opacity-0 transition-opacity duration-200 group-hover:opacity-10"
                style={{ fill: markerColor }}
                onMouseEnter={(e) => handleMarkerHover(marker, e)}
                onMouseLeave={handleMarkerLeave}
              />
              <circle cx={cx} cy={cy} r={markerSize} fill={markerColor} />
              {marker.animated && (
                <circle
                  cx={cx}
                  cy={cy}
                  r={markerSize}
                  fill={markerColor}
                  opacity="0.5"
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
      {hoveredMarker && hoveredMarker.label && (
        <div
          className="bg-popover text-popover-foreground pointer-events-none absolute z-50 rounded-md border px-3 py-1.5 text-sm shadow-md"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y,
            transform: 'translate(-50%, -100%) translateY(-8px)',
          }}
        >
          <p className="font-medium">{hoveredMarker.label}</p>
          {hoveredMarker.description && (
            <p className="text-muted-foreground text-xs">
              {hoveredMarker.description}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
