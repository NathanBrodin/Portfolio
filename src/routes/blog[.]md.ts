import { createFileRoute } from '@tanstack/react-router'

import { generateBlogMarkdown } from '@/lib/llms'

export const Route = createFileRoute('/blog.md')({
  server: {
    handlers: {
      GET: () => {
        const content = `# Blog

${generateBlogMarkdown(true)}
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
