import { useTheme } from '@lonik/themer'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'

import { useIsMobile } from '@/hooks/use-is-mobile'
import { cn } from '@/lib/utils'

const LazyDithering = lazy(() =>
  import('@paper-design/shaders-react').then((mod) => ({
    default: mod.Dithering,
  })),
)

export function Dither({
  offset,
  className,
  ...props
}: React.ComponentProps<'div'> & { offset?: number }) {
  const { resolvedTheme } = useTheme()
  const isMobile = useIsMobile()
  const ref = useRef<HTMLDivElement>(null)
  const [nearViewport, setNearViewport] = useState(
    () => typeof window !== 'undefined' && typeof IntersectionObserver === 'undefined',
  )

  // Mount the WebGL shader only when near the viewport so at most 1-2
  // contexts are alive during scroll instead of one per section.
  // The wrapper keeps its dimensions, so toggling causes no layout shift.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setNearViewport(entry.isIntersecting)
      },
      { rootMargin: '400px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        'pointer-events-none absolute inset-0 -z-1 h-full w-full overflow-hidden opacity-10',
        className,
      )}
      aria-hidden="true"
      {...props}
    >
      {nearViewport ? (
        <Suspense>
          <LazyDithering
            className="animate-in duration-1000 fade-in"
            width={'100%'}
            height={'100%'}
            colorBack={resolvedTheme === 'dark' ? '#000000' : '#FFFFFF'}
            colorFront={resolvedTheme === 'dark' ? '#cbfbf1' : '#00786f'}
            shape="warp"
            type="4x4"
            size={1.0}
            speed={isMobile ? 0 : 0.1}
            scale={1.84}
            offsetX={offset}
            offsetY={offset}
          />
        </Suspense>
      ) : null}
    </div>
  )
}
