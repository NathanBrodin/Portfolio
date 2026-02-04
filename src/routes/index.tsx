import { createFileRoute } from '@tanstack/react-router'

import { Section } from '@/components/ui/section'
import { SectionDivider } from '@/components/ui/section-divider'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <main className="flex h-full flex-1 flex-col items-center px-4">
      <Section className="py-12">
        <div className="flex flex-col">
          <h1 className="font-display text-primary scroll-mt-24 text-center font-normal text-balance">
            Nathan Brodin
          </h1>
          <p className="text-muted-foreground text-sm text-balance">
            Frontend Engineer
          </p>
        </div>
      </Section>
      <SectionDivider />
      <Section className="h-full flex-1">
        Map of the world should go here
      </Section>
    </main>
  )
}
