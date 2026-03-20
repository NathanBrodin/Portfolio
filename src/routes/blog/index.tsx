import type { Blog, WithContext } from 'schema-dts'

import { createFileRoute, Link } from '@tanstack/react-router'
import { allBlogPosts } from 'content-collections'
import { ArrowUpRightIcon, RssIcon } from 'lucide-react'

import { Page, PageDescription, PageHeader, PageTitle } from '@/components/ui/page'
import { Section } from '@/components/ui/section'
import { SectionDivider } from '@/components/ui/section-divider'
import { Separator } from '@/components/ui/separator'
import { Tag } from '@/components/ui/tag'
import { siteConfig } from '@/config/site'
import { formatFullDate } from '@/lib/date'
import { cn } from '@/lib/utils'

const publishedPosts = allBlogPosts
  .filter((post) => post.published)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export const Route = createFileRoute('/blog/')({
  head: () => {
    const url = `${siteConfig.url}/blog`
    const blogDescription = 'Articles on development, design and ideas by Nathan Brodin.'

    const jsonLd: WithContext<Blog> = {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Blog | Nathan Brodin',
      description: blogDescription,
      url,
      image: `${siteConfig.url}/og/blog.png`,
      author: {
        '@id': `${siteConfig.url}/#person`,
      },
      publisher: {
        '@id': `${siteConfig.url}/#person`,
      },
      inLanguage: 'en-US',
      isPartOf: {
        '@id': `${siteConfig.url}/#website`,
      },
      blogPost: publishedPosts.slice(0, 10).map((post) => ({
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        url: `${siteConfig.url}/blog/${post.slug}`,
        image: `${siteConfig.url}/og/blog/${post.slug}.png`,
        author: {
          '@id': `${siteConfig.url}/#person`,
        },
      })),
    }

    return {
      meta: [
        { title: 'Blog | Nathan Brodin' },
        {
          name: 'description',
          content: blogDescription,
        },
        // Open Graph
        { property: 'og:title', content: 'Blog | Nathan Brodin' },
        {
          property: 'og:description',
          content: blogDescription,
        },
        { property: 'og:url', content: url },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: `${siteConfig.url}/og/blog.png` },
        // Twitter Card
        { name: 'twitter:title', content: 'Blog | Nathan Brodin' },
        {
          name: 'twitter:description',
          content: blogDescription,
        },
        { name: 'twitter:image', content: `${siteConfig.url}/og/blog.png` },
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
})

function RouteComponent() {
  return (
    <Page>
      <PageHeader>
        <PageTitle>Blog</PageTitle>
        <PageDescription>Articles on development, design and ideas.</PageDescription>
      </PageHeader>
      <SectionDivider />
      <Section className="min-h-max flex-1 items-start">
        <div className="grid w-full grid-cols-1">
          {publishedPosts.map((post) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="group flex w-full items-center gap-3 border-b p-2 hover:bg-muted/50 sm:p-3"
            >
              <div
                className={cn(
                  'hidden size-6 shrink-0 items-center justify-center rounded-lg select-none sm:mx-4 sm:flex',
                  'border-muted-foreground/15 ring-edge ring-offset-background border ring-1 ring-offset-1',
                  'bg-muted text-muted-foreground [&_svg]:size-4',
                )}
                aria-hidden
              >
                <RssIcon />
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <h3 className="mb-1 line-clamp-2 leading-snug font-medium">{post.title}</h3>
                <div className="flex flex-nowrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                  <dl className="shrink-0">
                    <dt className="sr-only">Published</dt>
                    <dd>
                      <time dateTime={post.date}>{formatFullDate(post.date)}</time>
                    </dd>
                  </dl>
                  <Separator className="data-[orientation=vertical]:h-4" orientation="vertical" />
                  {post.tags.length > 0 && (
                    <div className="flex flex-nowrap gap-1.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      {post.tags.map((tag) => (
                        <div key={tag} className="shrink-0">
                          <Tag>{tag}</Tag>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <ArrowUpRightIcon
                className="size-4 text-muted-foreground transition-[rotate] duration-300 group-hover:rotate-45"
                aria-hidden
              />
            </Link>
          ))}
        </div>
      </Section>
      <SectionDivider />
      <Section className="h-16" />
    </Page>
  )
}
