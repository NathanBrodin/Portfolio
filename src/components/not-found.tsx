import { ArrowRightIcon } from 'lucide-react'

import { Link } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'

import { Noise } from './ui/backgrounds/noise'
import { Section } from './ui/section'

export function NotFound() {
  return (
    <main className="relative flex h-full w-full flex-1 flex-col items-center overflow-x-hidden px-4">
      <Noise />
      <Section className="relative h-full w-full flex-1 p-4 py-8 sm:p-16">
        <div className="flex w-full flex-col items-center justify-center">
          <h1 className="my-6 text-8xl font-medium tracking-tighter tabular-nums">
            404
          </h1>

          <Button variant="default" render={<Link to="/" />}>
            Go to Home
            <ArrowRightIcon />
          </Button>
        </div>
      </Section>
    </main>
  )
}
