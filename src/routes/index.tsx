import { createFileRoute } from '@tanstack/react-router'

import { Experiences } from '@/components/experiences'
import { Projects } from '@/components/projects'
import { SocialLinks } from '@/components/social-links'
import { Grid } from '@/components/ui/backgrounds/grid'
import { Noise } from '@/components/ui/backgrounds/noise'
import { Section } from '@/components/ui/section'
import { SectionDivider } from '@/components/ui/section-divider'
import { siteConfig } from '@/config/site'

export const Route = createFileRoute('/')({
  component: App,
  head: () => ({
    meta: [
      { title: siteConfig.title },
      { name: 'description', content: siteConfig.description },
      { name: 'creator', content: siteConfig.name },
      // Open Graph
      { property: 'og:title', content: siteConfig.title },
      { property: 'og:description', content: siteConfig.description },
      { property: 'og:image', content: siteConfig.og },
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: siteConfig.title },
      { name: 'twitter:description', content: siteConfig.title },
      { name: 'twitter:image', content: siteConfig.og },
    ],
  }),
})

function App() {
  return (
    <main className="relative flex h-full flex-1 flex-col items-center px-4">
      <Noise />
      <Section className="relative px-4 py-12">
        <div className="flex flex-col">
          <h1 className="font-display text-primary scroll-mt-24 text-center font-normal text-balance">
            Nathan Brodin
          </h1>
          <p className="text-muted-foreground text-sm text-balance">
            Frontend Engineer
          </p>
        </div>
        <Grid />
      </Section>
      <SectionDivider />
      <SocialLinks />
      <SectionDivider />
      <Experiences />
      <SectionDivider />
      <Projects />
      {/*<SectionclassName="h-fit px-0 py-0">
        <WorldMap
          dots={[
            {
              start: {
                lat: 64.2008,
                lng: -149.4937,
              }, // Alaska (Fairbanks)
              end: {
                lat: 34.0522,
                lng: -118.2437,
              }, // Los Angeles
            },
            {
              start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
              end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
            },
            {
              start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
              end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
            },
            {
              start: { lat: 51.5074, lng: -0.1278 }, // London
              end: { lat: 28.6139, lng: 77.209 }, // New Delhi
            },
            {
              start: { lat: 28.6139, lng: 77.209 }, // New Delhi
              end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
            },
            {
              start: { lat: 28.6139, lng: 77.209 }, // New Delhi
              end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
            },
          ]}
        />
      </Section>
      <SectionDivider />
      <Section className="h-full flex-1">Other section</Section>*/}
    </main>
  )
}
