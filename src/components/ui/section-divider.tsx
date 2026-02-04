import { cn } from '@/lib/utils'
import { Diamond } from './diamond'

export function SectionDivider({
  className,
  ...props
}: React.ComponentProps<'section'>) {
  return (
    <section
      className={cn(
        'flex item-center justify-between h-4 w-full border-x px-4 py-1 max-w-5xl relative before:absolute before:top-0 before:-left-[100vw] before:z-[-1] before:h-[0.5px] before:w-[200vw] before:bg-border after:absolute after:bottom-0 after:-left-[100vw] after:z-[-1] after:h-[0.5px] after:w-[200vw] after:bg-border',
        className,
      )}
      {...props}
      data-slot="section-divider"
    >
      <Diamond top left />
      <Diamond top right />
      <Diamond bottom left />
      <Diamond bottom right />
      <svg className="pointer-events-none absolute inset-0 -z-1 size-full select-none text-primary-foreground  py-px opacity-30 dark:opacity-60">
        <defs>
          <pattern
            id=":S6:"
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
              stroke-width="1.5"
            ></line>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#:S6:)"></rect>
      </svg>
    </section>
  )
}
