import { Diamond } from '@/components/ui/diamond'
import { Section } from '@/components/ui/section'
import { SectionDivider } from '@/components/ui/section-divider'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <main className="px-4 flex flex-col items-center ">
      <Section className="py-12">
        <div className="flex flex-col">
          <h1 className="font-display text-balance scroll-mt-24 text-primary font-normal text-center ">
            Nathan Brodin
          </h1>
          <p className="text-muted-foreground text-sm text-balance">
            Frontend Engineer
          </p>
        </div>
      </Section>
      <SectionDivider />
      <Section className="h-[300px]">Map of the world should go here</Section>
    </main>
  )
}
