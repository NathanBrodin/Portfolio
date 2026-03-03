import { useTheme } from '@lonik/themer'
import { Dithering } from '@paper-design/shaders-react'

import { cn } from '@/lib/utils'

export function Dither({
  offset,
  className,
  ...props
}: React.ComponentProps<'div'> & { offset?: number }) {
  const { resolvedTheme } = useTheme()

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 -z-1 h-full w-full overflow-hidden opacity-10',
        className,
      )}
      {...props}
    >
      <Dithering
        width={1280}
        height={400}
        colorBack={resolvedTheme === 'dark' ? '#000000' : '#FFFFFF'}
        colorFront={resolvedTheme === 'dark' ? '#cbfbf1' : '#00786f'}
        shape="warp"
        type="4x4"
        size={1.0}
        speed={0.1}
        scale={1.84}
        offsetX={offset}
        offsetY={offset}
      />
    </div>
  )
}
