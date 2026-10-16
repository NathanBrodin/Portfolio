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
import { getBlogPreview, getGithubContributions } from '@/lib/functions'

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
    const [contributions, blogPreview] = await Promise.all([
      getGithubContributions({
        data: { user: siteConfig.githubHandle },
      }),
      getBlogPreview(),
    ])
    return { contributions, blogPreview }
  },
  staleTime: 60_000,
})

function App() {
  const { contributions, blogPreview } = Route.useLoaderData()

  return (
    <Page>
      <PageHeader>
        <PageTitle>{siteConfig.name}</PageTitle>
        <PageDescription>{siteConfig.description}</PageDescription>
      </PageHeader>
      <SectionDivider />
      <About />
      <FancySectionDivider />
      <SocialLinks />
      <SectionDivider />
      <GithubContributions contributions={contributions} />
      <SectionDivider />
      <TechStack />
      <FancySectionDivider />
      <Experiences />
      <FancySectionDivider />
      <Projects />
      <FancySectionDivider />
      <Certifications />
      <FancySectionDivider />
      <BlogPreview posts={blogPreview} />
      <SectionDivider />
      <Section className="h-16" />
    </Page>
  )
}
