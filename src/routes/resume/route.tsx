import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/resume')({
  server: {
    handlers: {
      GET: ({ request }) => Response.redirect(new URL('/nathan-brodin.pdf', request.url), 308),
    },
  },
})
