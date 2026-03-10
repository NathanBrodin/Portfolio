import { useTheme } from '@lonik/themer'
import { lazy, Suspense, useSyncExternalStore } from 'react'

import { cn } from '@/lib/utils'

const LazyDithering = lazy(() =>
  import('@paper-design/shaders-react').then((mod) => ({
    default: mod.Dithering,
  })),
)

const MOBILE_QUERY = '(max-width: 767px)'

function subscribeToMobileQuery(callback: () => void) {
  const mql = window.matchMedia(MOBILE_QUERY)
  mql.addEventListener('change', callback)
  return () => mql.removeEventListener('change', callback)
}

function getIsMobileSnapshot() {
  return window.matchMedia(MOBILE_QUERY).matches
}

function getIsMobileServerSnapshot() {
  return false
}

export function Dither({
  offset,
  className,
  ...props
}: React.ComponentProps<'div'> & { offset?: number }) {
  const { resolvedTheme } = useTheme()
  const isMobile = useSyncExternalStore(
    subscribeToMobileQuery,
    getIsMobileSnapshot,
    getIsMobileServerSnapshot,
  )

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 -z-1 h-full w-full overflow-hidden opacity-10',
        className,
      )}
      {...props}
    >
      <Suspense>
        <LazyDithering
          width={isMobile ? 640 : 1280}
          height={isMobile ? 200 : 400}
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
    </div>
  )
}
