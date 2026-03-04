import { useTheme } from '@lonik/themer'
import { Dithering } from '@paper-design/shaders-react'
import { allBlogPosts } from 'content-collections'

import { createFileRoute, notFound } from '@tanstack/react-router'

import { Grid } from '@/components/ui/backgrounds/grid'
import { Page, PageDescription, PageTitle } from '@/components/ui/page'
import { Section } from '@/components/ui/section'
import { SectionDivider } from '@/components/ui/section-divider'

function findPost(slug: string) {
  return allBlogPosts.find((post) => post.slug === slug && post.published)
}

export const Route = createFileRoute('/blog/$slug/og/')({
  loader: ({ params }) => {
    const post = findPost(params.slug)
    if (!post) {
      throw notFound()
    }
    return { post }
  },
  component: RouteComponent,
})

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function RouteComponent() {
  const { post } = Route.useLoaderData()
  const { resolvedTheme } = useTheme()

  return (
    <Page>
      <div
        id="og"
        className="relative mt-2 flex flex-col items-center overflow-hidden border"
        style={{ width: 1200, height: 630 }}
      >
        <Section className="h-full border-none p-8">
          <span className="text-muted-foreground font-display text-4xl font-medium text-balance">
            Nathan Brodin
          </span>
        </Section>
        <Section className="flex h-fit flex-col border-none py-24">
          <PageTitle className="text-7xl">{post.title}</PageTitle>
          <PageDescription className="text-muted-foreground mt-2 font-mono text-xl">
            {formatDate(post.date)}
          </PageDescription>
        </Section>
        <Section className="h-full border-none"></Section>
        <div className="pointer-events-none absolute inset-0 -z-1 h-full w-full overflow-hidden opacity-10">
          <Dithering
            width={1200}
            height={630}
            colorBack={resolvedTheme === 'dark' ? '#000000' : '#FFFFFF'}
            colorFront={resolvedTheme === 'dark' ? '#cbfbf1' : '#00786f'}
            shape="warp"
            type="4x4"
            size={1.0}
            speed={0}
            scale={1.84}
            offsetX={1.4}
          />
        </div>
        <Grid />
      </div>
    </Page>
  )
}
