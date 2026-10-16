import { useTheme } from '@lonik/themer'
import { lazy, Suspense, useEffect, useId, useRef, useState } from 'react'

import { useIsMobile } from '@/hooks/use-is-mobile'
import { cn } from '@/lib/utils'

const LazyDithering = lazy(() =>
  import('@paper-design/shaders-react').then((mod) => ({
    default: mod.Dithering,
  })),
)

function hash01(input: string): number {
  let hash = 2156136461
  for (let index = 0; index < input.length; index++) {
    hash ^= input.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return (hash >>> 0) / 4294967295
}

const OFFSET_RANGE = 4

function ditherSeed(id: string) {
  const offset = -OFFSET_RANGE + hash01(`offset:${id}`) * OFFSET_RANGE * 2
  return {
    offset,
    position: `${Math.round(hash01(`x:${id}`) * 100)}% ${Math.round(hash01(`y:${id}`) * 100)}%`,
  }
}

export function Dither({ className, ...props }: React.ComponentProps<'div'>) {
  const seed = ditherSeed(useId())
  const { resolvedTheme } = useTheme()
  const isMobile = useIsMobile()
  const ref = useRef<HTMLDivElement>(null)
  const [nearViewport, setNearViewport] = useState(
    () => typeof window !== 'undefined' && typeof IntersectionObserver === 'undefined',
  )

  // Mount the WebGL shader only when near the viewport
  useEffect(() => {
    if (isMobile || typeof IntersectionObserver === 'undefined') return
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
  }, [isMobile])

  // Mobile gets a pre-rendered capture to prevent creating WebGL contexts (performance heavy)
  if (isMobile) {
    return (
      <div
        className={cn(
          'pointer-events-none absolute inset-0 -z-1 h-full w-full overflow-hidden bg-no-repeat opacity-10',
          className,
        )}
        style={{
          backgroundImage: `url(${resolvedTheme === 'dark' ? '/assets/dither-dark.webp' : '/assets/dither-light.webp'})`,
          backgroundPosition: seed.position,
          backgroundSize: '184%',
        }}
        aria-hidden="true"
        {...props}
      />
    )
  }

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
            width="100%"
            height="100%"
            colorBack={resolvedTheme === 'dark' ? '#000000' : '#FFFFFF'}
            colorFront={resolvedTheme === 'dark' ? '#cbfbf1' : '#00786f'}
            shape="warp"
            type="4x4"
            size={1.0}
            speed={0.1}
            scale={1.84}
            offsetX={seed.offset}
            offsetY={seed.offset}
          />
        </Suspense>
      ) : null}
    </div>
  )
}
