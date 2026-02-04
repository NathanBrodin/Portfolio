import React from 'react'

import { cn } from '@/lib/utils'

export function Section({
  className,
  ...props
}: React.ComponentProps<'section'>) {
  return (
    <section
      className={cn(
        'item-center relative flex w-full max-w-5xl justify-between border-x px-4 py-1',
        className,
      )}
      {...props}
      data-slot="section"
    />
  )
}
