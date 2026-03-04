import { allBlogPosts } from 'content-collections'
import { ArrowUpRightIcon, RssIcon } from 'lucide-react'

import { createFileRoute, Link } from '@tanstack/react-router'

import {
  Page,
  PageDescription,
  PageHeader,
  PageTitle,
} from '@/components/ui/page'
import { Section } from '@/components/ui/section'
import { SectionDivider } from '@/components/ui/section-divider'
import { Separator } from '@/components/ui/separator'
import { Tag } from '@/components/ui/tag'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

const publishedPosts = allBlogPosts
  .filter((post) => post.published)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export const Route = createFileRoute('/blog/')({
  head: () => ({
    meta: [
      { title: 'Blog | Nathan Brodin' },
      {
        name: 'description',
        content: 'Articles on development, design and ideas by Nathan Brodin.',
      },
      // Open Graph
      { property: 'og:title', content: 'Blog | Nathan Brodin' },
      {
        property: 'og:description',
        content: 'Articles on development, design and ideas by Nathan Brodin.',
      },
      { property: 'og:url', content: `${siteConfig.url}/blog` },
      { property: 'og:type', content: 'website' },
      // Twitter Card
      { name: 'twitter:title', content: 'Blog | Nathan Brodin' },
      {
        name: 'twitter:description',
        content: 'Articles on development, design and ideas by Nathan Brodin.',
      },
    ],
    links: [{ rel: 'canonical', href: `${siteConfig.url}/blog` }],
  }),
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
  return (
    <>
      <Page>
        <PageHeader>
          <PageTitle>Blog</PageTitle>
          <PageDescription>
            Articles on development, design and ideas.
          </PageDescription>
        </PageHeader>
        <SectionDivider />
        <Section>
          {publishedPosts.map((post) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="group hover:bg-muted/50 flex w-full items-center gap-3 p-3"
            >
              <div
                className={cn(
                  'mx-4 flex size-6 shrink-0 items-center justify-center rounded-lg select-none',
                  'border-muted-foreground/15 ring-edge ring-offset-background border ring-1 ring-offset-1',
                  'bg-muted text-muted-foreground [&_svg]:size-4',
                )}
                aria-hidden
              >
                <RssIcon />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="mb-1 line-clamp-2 leading-snug font-medium text-balance">
                  {post.title}
                </h3>
                <div className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                  <dl>
                    <dt className="sr-only">Published</dt>
                    <dd>
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </dd>
                  </dl>
                  <Separator
                    className="data-[orientation=vertical]:h-4"
                    orientation="vertical"
                  />
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
                className="text-muted-foreground size-4 transition-[rotate] duration-300 group-hover:rotate-45"
                aria-hidden
              />
            </Link>
          ))}
        </Section>
        <SectionDivider />
        <Section className="h-16" />
      </Page>
    </>
  )
}
