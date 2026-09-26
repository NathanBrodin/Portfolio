import { useTheme } from '@lonik/themer'
import { lazy, Suspense } from 'react'

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

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 -z-1 h-full w-full overflow-hidden opacity-10',
        className,
      )}
      aria-hidden="true"
      {...props}
    >
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
    </div>
  )
}
