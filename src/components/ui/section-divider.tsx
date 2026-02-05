import { cn } from '@/lib/utils'

import { Lines } from './backgrounds/lines'
import { Diamond } from './diamond'

export function SectionDivider({
  className,
  ...props
}: React.ComponentProps<'section'>) {
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
      <Lines />
    </section>
  )
}
