import { createFileRoute } from '@tanstack/react-router'

import { Experiences } from '@/components/experiences'
import { GithubContributions } from '@/components/github-contributions'
import { MyWorldMap } from '@/components/my-world-map'
import { Projects } from '@/components/projects'
import { SocialLinks } from '@/components/social-links'
import { TechStack } from '@/components/tech-stack'
import { Grid } from '@/components/ui/backgrounds/grid'
import { Noise } from '@/components/ui/backgrounds/noise'
import { Section } from '@/components/ui/section'
import { SectionDivider } from '@/components/ui/section-divider'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <main className="relative flex h-full flex-1 flex-col items-center overflow-x-hidden px-4">
      <Noise />
      <Section className="relative p-4 py-8 sm:p-16">
        <div className="flex flex-col">
          <h1 className="font-display text-primary scroll-mt-24 font-normal">
            Nathan Brodin
          </h1>
          <p className="text-muted-foreground max-w-md text-sm">
            A software engineer with a passion for web development, design, and
            user experience.
          </p>
        </div>
        <Grid />
      </Section>
      <SectionDivider />
      <MyWorldMap />
      <SectionDivider />
      <SocialLinks />
      <SectionDivider />
      <GithubContributions />
      <SectionDivider />
      <TechStack />
      <SectionDivider />
      <Experiences />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Section className="h-16" />
    </main>
  )
}
