import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

import { cn } from '@/lib/utils'

const sectionVariants = cva('relative flex w-full max-w-5xl justify-between border-x', {
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
  variants: {
    variant: {
      default: '',
      panel: 'bg-background/60',
    },
    size: {
      default: '',
      sm: 'p-2',
      md: 'p-4',
    },
  },
})

interface SectionProps
  extends React.ComponentProps<'section'>, VariantProps<typeof sectionVariants> {}

export function Section({ className, variant, size, ...props }: SectionProps) {
  return (
    <section
      className={cn(sectionVariants({ variant, size }), className)}
      {...props}
      data-slot="section"
    />
  )
}

export function SectionTitle({ className, ...props }: React.ComponentProps<'h2'>) {
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
