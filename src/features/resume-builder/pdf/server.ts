import { createServerFn } from '@tanstack/react-start'

import { resumeSchema } from '../schema'
import { fitsOnePage, renderResume } from './render'

export const renderResumePdf = createServerFn({ method: 'POST' })
  .inputValidator(resumeSchema)
  .handler(async ({ data }) => {
    const pdf = await renderResume(data)
    return new Response(new Uint8Array(pdf), {
      headers: { 'Content-Type': 'application/pdf' },
    })
  })

export const checkResumeFits = createServerFn({ method: 'POST' })
  .inputValidator(resumeSchema)
  .handler(async ({ data }) => fitsOnePage(data))
