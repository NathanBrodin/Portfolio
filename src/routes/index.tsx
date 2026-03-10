import { lazy, Suspense } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import { About } from '@/components/about'
import { SocialLinks } from '@/components/social-links'
import { TechStack } from '@/components/tech-stack'
import { Dither } from '@/components/ui/backgrounds/dither'
import {
  Page,
  PageDescription,
  PageHeader,
  PageTitle,
} from '@/components/ui/page'
import { Section } from '@/components/ui/section'
import { SectionDivider } from '@/components/ui/section-divider'
import { siteConfig } from '@/config/site'
import { getGithubContributions, getStargazersCount } from '@/lib/functions'

const LazyGithubContributions = lazy(() =>
  import('@/components/github-contributions').then((mod) => ({
    default: mod.GithubContributions,
  })),
)

const LazyExperiences = lazy(() =>
  import('@/components/experiences').then((mod) => ({
    default: mod.Experiences,
  })),
)

const LazyProjects = lazy(() =>
  import('@/components/projects').then((mod) => ({
    default: mod.Projects,
  })),
)

const LazyCertifications = lazy(() =>
  import('@/components/certifications').then((mod) => ({
    default: mod.Certifications,
  })),
)

const LazyBlogPreview = lazy(() =>
  import('@/components/blog-preview').then((mod) => ({
    default: mod.BlogPreview,
  })),
)

export const Route = createFileRoute('/')({
  component: App,
  head: () => ({
    links: [{ rel: 'canonical', href: siteConfig.url }],
  }),
  headers: () => ({
    'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
  }),
  loader: async () => {
    const [contributions, stargazersCount] = await Promise.all([
      getGithubContributions({ data: { user: siteConfig.githubHandle } }),
      getStargazersCount({ data: { repo: 'NathanBrodin/Portfolio' } }),
    ])
    return { contributions, stargazersCount }
  },
  staleTime: 60_000,
})

function App() {
  const { contributions } = Route.useLoaderData()

  return (
    <Page>
      <PageHeader>
        <PageTitle>Nathan Brodin</PageTitle>
        <PageDescription>
          A software engineer with a passion for web development, design, and
          user experience.
        </PageDescription>
      </PageHeader>
      <SectionDivider />
      <About />
      <SectionDivider />
      <SocialLinks />
      <SectionDivider />
      <Suspense>
        <LazyGithubContributions contributions={contributions} />
      </Suspense>
      <SectionDivider />
      <TechStack />
      <SectionDivider />
      <Suspense>
        <LazyExperiences />
      </Suspense>
      <SectionDivider />
      <Section className="h-25">
        <Dither offset={0.4} />
      </Section>
      <SectionDivider />
      <Suspense>
        <LazyProjects />
      </Suspense>
      <SectionDivider />
      <Section className="h-25">
        <Dither offset={-0.3} />
      </Section>
      <SectionDivider />
      <Suspense>
        <LazyCertifications />
      </Suspense>
      <SectionDivider />
      <Section className="h-25">
        <Dither offset={-0.3} />
      </Section>
      <SectionDivider />
      <Suspense>
        <LazyBlogPreview />
      </Suspense>
      <SectionDivider />
      <Section className="h-16" />
    </Page>
  )
}
