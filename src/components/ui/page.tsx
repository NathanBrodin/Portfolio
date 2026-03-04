import React from 'react'

import { cn } from '@/lib/utils'

import { Dither } from './backgrounds/dither'
import { Grid } from './backgrounds/grid'
import { Noise } from './backgrounds/noise'
import { Section } from './section'

export function Page({
  className,
  children,
  ...props
}: React.ComponentProps<'main'>) {
  return (
    <main
      className={cn(
        'relative flex h-full flex-1 flex-col items-center overflow-x-hidden px-4',
        className,
      )}
      {...props}
      data-slot="page"
    >
      <Noise />
      {children}
    </main>
  )
}

export function PageHeader({
  className,
  children,
  ...props
}: React.ComponentProps<'section'>) {
  return (
    <Section
      className={cn('relative p-4 py-8 sm:p-24', className)}
      {...props}
      data-slot="page-header"
    >
      <div className="flex flex-col">{children}</div>
      <Dither />
      <Grid />
    </Section>
  )
}

export function PageTitle({ className, ...props }: React.ComponentProps<'h1'>) {
  return (
    <h1
      className={cn(
        'font-display text-primary scroll-mt-24 font-normal',
        className,
      )}
      {...props}
      data-slot="page-title"
    />
  )
}

export function PageDescription({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn('text-muted-foreground max-w-md text-sm', className)}
      {...props}
      data-slot="page-description"
    />
  )
}
