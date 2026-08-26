import { createFileRoute } from '@tanstack/react-router'

import { About } from '@/components/about'
import { BlogPreview } from '@/components/blog-preview'
import { Certifications } from '@/components/certifications'
import { Experiences } from '@/components/experiences'
import { GithubContributions } from '@/components/github-contributions'
import { Projects } from '@/components/projects'
import { SocialLinks } from '@/components/social-links'
import { TechStack } from '@/components/tech-stack'
import { Page, PageDescription, PageHeader, PageTitle } from '@/components/ui/page'
import { Section } from '@/components/ui/section'
import { FancySectionDivider, SectionDivider } from '@/components/ui/section-divider'
import { siteConfig } from '@/config/site'
import { getGithubContributions, getStargazersCount } from '@/lib/functions'

export const Route = createFileRoute('/')({
  component: App,
  head: () => ({
    links: [
      { rel: 'canonical', href: siteConfig.url },
      { rel: 'alternate', type: 'text/markdown', href: `${siteConfig.url}/llms.txt` },
    ],
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
        <PageTitle>{siteConfig.name}</PageTitle>
        <PageDescription>{siteConfig.description}</PageDescription>
      </PageHeader>
      <SectionDivider />
      <About />
      <SectionDivider />
      <SocialLinks />
      <SectionDivider />
      <GithubContributions contributions={contributions} />
      <SectionDivider />
      <TechStack />
      <FancySectionDivider offset={-0.8} />
      <Experiences />
      <FancySectionDivider offset={0.4} />
      <Projects />
      <FancySectionDivider offset={-0.3} />
      <Certifications />
      <FancySectionDivider offset={1.2} />
      <BlogPreview />
      <SectionDivider />
      <Section className="h-16" />
    </Page>
  )
}
