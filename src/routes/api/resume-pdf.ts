import { createFileRoute } from '@tanstack/react-router'

import { fitsOnePage, renderResume } from '@/features/resume-builder/pdf/render'
import { resumeSchema } from '@/features/resume-builder/schema'

export const Route = createFileRoute('/api/resume-pdf')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown
        try {
          body = await request.json()
        } catch {
          return Response.json({ error: 'Invalid JSON body.' }, { status: 400 })
        }

        const parsed = resumeSchema.safeParse((body as { data?: unknown })?.data ?? body)
        if (!parsed.success) {
          return Response.json({ error: 'Invalid resume data.' }, { status: 400 })
        }

        const [pdf, fits] = await Promise.all([renderResume(parsed.data), fitsOnePage(parsed.data)])

        return new Response(new Uint8Array(pdf), {
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'inline',
            'x-resume-fits': fits ? 'true' : 'false',
          },
        })
      },
    },
  },
})
