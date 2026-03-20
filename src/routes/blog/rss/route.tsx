import { createFileRoute } from '@tanstack/react-router'
import { allBlogPosts } from 'content-collections'

import { siteConfig } from '@/config/site'

function toRFC822(dateStr: string): string {
  return new Date(dateStr).toUTCString()
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export const Route = createFileRoute('/blog/rss')({
  server: {
    handlers: {
      GET: () => {
        const publishedPosts = allBlogPosts
          .filter((post) => post.published)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

        const feedUrl = `${siteConfig.url}/blog/rss`
        const blogUrl = `${siteConfig.url}/blog`

        const items = publishedPosts
          .map((post) => {
            const postUrl = `${siteConfig.url}/blog/${post.slug}`
            const categories = post.tags
              .map((tag) => `    <category>${escapeXml(tag)}</category>`)
              .join('\n')

            return [
              '  <item>',
              `    <title>${escapeXml(post.title)}</title>`,
              `    <link>${postUrl}</link>`,
              `    <guid isPermaLink="true">${postUrl}</guid>`,
              `    <description>${escapeXml(post.description)}</description>`,
              `    <pubDate>${toRFC822(post.date)}</pubDate>`,
              categories,
              '  </item>',
            ]
              .filter(Boolean)
              .join('\n')
          })
          .join('\n')

        const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml('Blog | Nathan Brodin')}</title>
    <link>${blogUrl}</link>
    <description>${escapeXml('Articles on development, design and ideas by Nathan Brodin.')}</description>
    <language>en-US</language>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <lastBuildDate>${publishedPosts.length > 0 ? toRFC822(publishedPosts[0].date) : new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`

        return new Response(rss, {
          headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
            'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
          },
        })
      },
    },
  },
})
