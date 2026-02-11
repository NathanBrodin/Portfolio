import DottedMap from 'dotted-map'
import { motion } from 'motion/react'
import { useRef } from 'react'

import { useTheme } from '@/providers/theme'

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string }
    end: { lat: number; lng: number; label?: string }
  }>
  lineColor?: string
}

export default function WorldMap({
  dots = [],
  lineColor = '#0ea5e9',
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const map = new DottedMap({ height: 100, grid: 'diagonal' })

  const { theme } = useTheme()

  const svgMap = map.getSVG({
    radius: 0.22,
    color: theme === 'dark' ? '#FFFFFF40' : '#00000040',
    shape: 'circle',
    backgroundColor: theme === 'dark' ? 'black' : 'white',
  })

  const mapWidth = map.image.width
  const mapHeight = map.image.height

  const projectPoint = (lat: number, lng: number) => {
    const pin = map.getPin({ lat: lat - 3, lng: lng + 2 })
    return { x: pin.x, y: pin.y }
  }

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number },
  ) => {
    const midX = (start.x + end.x) / 2
    const midY = Math.min(start.y, end.y) - 12
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`
  }

  return (
    <div className="relative h-fit w-full bg-white py-4 font-sans dark:bg-black">
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="pointer-events-none h-fit w-full select-none"
        alt="world map"
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox={`0 0 ${mapWidth} ${mapHeight}`}
        className="pointer-events-none absolute inset-0 h-fit w-full select-none"
      >
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng)
          const endPoint = projectPoint(dot.end.lat, dot.end.lng)
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="0.25"
                initial={{
                  pathLength: 0,
                }}
                animate={{
                  pathLength: 1,
                }}
                transition={{
                  duration: 1,
                  delay: 0.5 * i,
                  ease: 'easeOut',
                }}
                key={`start-upper-${i}`}
              ></motion.path>
            </g>
          )
        })}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => (
          <g key={`points-group-${i}`}>
            <g key={`start-${i}`}>
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="0.5"
                fill={lineColor}
              />
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="0.5"
                fill={lineColor}
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from="0.5"
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
            </g>
            <g key={`end-${i}`}>
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="0.25"
                fill={lineColor}
              />
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="0.25"
                fill={lineColor}
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from="0.5"
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
            </g>
          </g>
        ))}
      </svg>
    </div>
  )
}
