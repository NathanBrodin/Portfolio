import { useId } from 'react'

import { cn } from '@/lib/utils'

export function Lines({ className, ...props }: React.ComponentProps<'svg'>) {
  const patternId = useId()
  return (
    <svg
      className={cn(
        'text-primary pointer-events-none absolute inset-0 -z-1 size-full py-px opacity-10 select-none dark:opacity-5',
        className,
      )}
      {...props}
    >
      <defs>
        <pattern
          id={patternId}
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="4"
            stroke="currentColor"
            strokeWidth="1.5"
          ></line>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`}></rect>
    </svg>
  )
}
