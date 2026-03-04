import { allBlogPosts } from 'content-collections'
import { ArrowLeftIcon } from 'lucide-react'
import type { BlogPosting, WithContext } from 'schema-dts'

import { createFileRoute, Link, notFound } from '@tanstack/react-router'

import { Markdown } from '@/components/markdown'
import { NotFound } from '@/components/not-found'
import {
  Page,
  PageDescription,
  PageHeader,
  PageTitle,
} from '@/components/ui/page'
import { Section } from '@/components/ui/section'
import { SectionDivider } from '@/components/ui/section-divider'
import { Prose } from '@/components/ui/typography'
import { siteConfig } from '@/config/site'

function findPost(slug: string) {
  return allBlogPosts.find((post) => post.slug === slug && post.published)
}

export const Route = createFileRoute('/blog/$slug/')({
  loader: ({ params }) => {
    const post = findPost(params.slug)
    if (!post) {
      throw notFound()
    }
    return { post }
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {}
    }

    const { post } = loaderData
    const url = `${siteConfig.url}/blog/${post.slug}`
    const title =
      post.title.length > 53
        ? `${post.title.slice(0, 53)}... | NB`
        : `${post.title} | Nathan Brodin`
    const description = post.description.slice(0, 160)

    const jsonLd: WithContext<BlogPosting> = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      url,
      image: siteConfig.og,
      author: {
        '@id': `${siteConfig.url}/#person`,
      },
      publisher: {
        '@id': `${siteConfig.url}/#person`,
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url,
      },
      keywords: post.tags,
      inLanguage: 'en-US',
      isPartOf: {
        '@id': `${siteConfig.url}/#website`,
      },
    }

    return {
      meta: [
        { title },
        { name: 'description', content: description },
        // Open Graph
        { property: 'og:title', content: post.title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: url },
        { property: 'og:type', content: 'article' },
        { property: 'og:image', content: siteConfig.og },
        // Twitter Card
        { name: 'twitter:title', content: post.title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: siteConfig.og },
        // Article metadata
        { property: 'article:published_time', content: post.date },
        ...post.tags.map((tag: string) => ({
          property: 'article:tag',
          content: tag,
        })),
      ],
      links: [{ rel: 'canonical', href: url }],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(jsonLd),
        },
      ],
    }
  },
  component: RouteComponent,
  notFoundComponent: () => <NotFound />,
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

  return (
    <Page>
      <PageHeader>
        <Link
          to="/blog"
          className="text-muted-foreground hover:text-foreground absolute top-4 left-4 inline-flex items-center gap-1.5 font-mono text-sm transition-colors"
        >
          <ArrowLeftIcon className="size-3.5" />
          Back to blog
        </Link>
        <PageTitle>{post.title}</PageTitle>
        <PageDescription>
          <time
            dateTime={post.date}
            className="text-muted-foreground font-mono text-sm"
          >
            {formatDate(post.date)}
          </time>
        </PageDescription>
      </PageHeader>
      <SectionDivider />
      <Section className="bg-background p-4">
        <article>
          <Prose>
            <Markdown content={post.markup} />
          </Prose>
        </article>
      </Section>
      <SectionDivider />
      <Section className="h-16" />
    </Page>
  )
}
