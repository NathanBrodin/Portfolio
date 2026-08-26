import { createFileRoute, notFound } from '@tanstack/react-router'
import { allBlogPosts } from 'content-collections'

export const Route = createFileRoute('/blog/{$slug}.md')({
  server: {
    handlers: {
      GET: ({ params }) => {
        const post = allBlogPosts.find((p) => p.slug === params.slug && p.published)

        if (!post) throw notFound()

        const content = `# ${post.title}

> ${post.description}

---

${post.content}

---

Published on ${post.date}
          `

        return new Response(content, {
          headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=604800',
          },
        })
      },
    },
  },
})
