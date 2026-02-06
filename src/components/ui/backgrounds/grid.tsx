import { useId } from 'react'

import { cn } from '@/lib/utils'

export function Grid({ className, ...props }: React.ComponentProps<'svg'>) {
  const patternId = useId()
  return (
    <svg
      aria-hidden="true"
      className={cn(
        'fill-primary/20 stroke-primary/20 pointer-events-none absolute inset-0 z-2 size-full mask-[linear-gradient(to_top,#ffffffad,transparent)] opacity-[.30]',
        className,
      )}
      {...props}
    >
      <defs>
        <pattern
          id={patternId}
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
          x="-1"
          y="-1"
        >
          <path d="M.5 10V.5H10" fill="none" strokeDasharray="0"></path>
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth="0"
        fill={`url(#${patternId})`}
      ></rect>
    </svg>
  )
}
