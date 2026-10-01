import { cva, type VariantProps } from 'class-variance-authority'
import { useId } from 'react'

import { cn } from '@/lib/utils'

const linesVariants = cva(
  'text-primary pointer-events-none absolute inset-0 -z-1 size-full py-px select-none',
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: 'opacity-10 dark:opacity-5',
        faint: 'opacity-5 dark:opacity-2',
        strong: 'opacity-10 dark:opacity-6',
      },
    },
  },
)

interface LinesProps extends React.ComponentProps<'svg'>, VariantProps<typeof linesVariants> {}

export function Lines({ className, variant, ...props }: LinesProps) {
  const patternId = useId()
  return (
    <svg aria-hidden="true" className={cn(linesVariants({ variant }), className)} {...props}>
      <defs>
        <pattern
          id={patternId}
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="4" stroke="currentColor" strokeWidth="1.5"></line>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`}></rect>
    </svg>
  )
}
