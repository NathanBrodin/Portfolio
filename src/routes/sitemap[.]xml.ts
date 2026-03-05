import { allBlogPosts } from 'content-collections'

import { createFileRoute } from '@tanstack/react-router'

import { siteConfig } from '@/config/site'

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: () => {
        const publishedPosts = allBlogPosts
          .filter((post) => post.published)
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          )

        const formatDate = (date: string | Date) => {
          return new Date(date).toISOString().split('T')[0]
        }

        const latestPostDate =
          publishedPosts.length > 0
            ? formatDate(publishedPosts[0].date)
            : undefined

        const staticPages = [
          {
            loc: `${siteConfig.url}/`,
            lastmod: latestPostDate,
            changefreq: 'weekly',
            priority: '1.0',
          },
          {
            loc: `${siteConfig.url}/blog`,
            lastmod: latestPostDate,
            changefreq: 'weekly',
            priority: '0.8',
          },
        ]

        const postPages = publishedPosts.map((post) => ({
          loc: `${siteConfig.url}/blog/${post.slug}`,
          lastmod: post.date,
          changefreq: 'monthly',
          priority: '0.6',
        }))

        const allPages = [...staticPages, ...postPages]

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map((page) =>
    [
      '  <url>',
      `    <loc>${page.loc}</loc>`,
      'lastmod' in page ? `    <lastmod>${page.lastmod}</lastmod>` : '',
      `    <changefreq>${page.changefreq}</changefreq>`,
      `    <priority>${page.priority}</priority>`,
      '  </url>',
    ]
      .filter(Boolean)
      .join('\n'),
  )
  .join('\n')}
</urlset>`

        return new Response(sitemap, {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control':
              'public, s-maxage=86400, stale-while-revalidate=604800',
          },
        })
      },
    },
  },
})
