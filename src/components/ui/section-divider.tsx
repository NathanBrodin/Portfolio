import { useId } from 'react'

import { cn } from '@/lib/utils'

import { Diamond } from './diamond'

export function SectionDivider({
  className,
  ...props
}: React.ComponentProps<'section'>) {
  const patternId = useId()

  return (
    <section
      className={cn(
        'item-center before:bg-border after:bg-border relative flex h-4 w-full max-w-5xl justify-between border-x px-4 py-1 before:absolute before:top-0 before:-left-[100vw] before:z-[-1] before:h-[0.5px] before:w-[200vw] after:absolute after:bottom-0 after:-left-[100vw] after:z-[-1] after:h-[0.5px] after:w-[200vw]',
        className,
      )}
      {...props}
      data-slot="section-divider"
    >
      <Diamond top left />
      <Diamond top right />
      <Diamond bottom left />
      <Diamond bottom right />
      <svg className="text-primary pointer-events-none absolute inset-0 -z-1 size-full py-px opacity-10 select-none dark:opacity-5">
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
    </section>
  )
}
