import { cn } from '@/lib/utils'
import React from 'react'

export function Section({
  className,
  ...props
}: React.ComponentProps<'section'>) {
  return (
    <section
      className={cn(
        'flex item-center justify-between border-x w-full px-4 py-1 max-w-5xl relative',
        className,
      )}
      {...props}
      data-slot="section"
    />
  )
}
