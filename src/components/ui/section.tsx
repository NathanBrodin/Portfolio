import React from 'react'

import { cn } from '@/lib/utils'

export function Section({
  className,
  ...props
}: React.ComponentProps<'section'>) {
  return (
    <section
      className={cn(
        'item-center relative flex w-full max-w-5xl justify-between border-x',
        className,
      )}
      {...props}
      data-slot="section"
    />
  )
}

export function SectionTitle({
  className,
  ...props
}: React.ComponentProps<'h2'>) {
  return (
    <h2
      className={cn(
        'font-display text-primary py-4 text-center font-medium text-balance',
        className,
      )}
      {...props}
      data-slot="section-title"
    />
  )
}
