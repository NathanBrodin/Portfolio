import { createElement } from 'react'
import { measure, PdfRenderer } from 'takumi-pdf'

import type { ResumeData } from '../schema'

import { ResumePdfDocument } from './template'

// A4 portrait in CSS px at 96dpi. Fixed viewport: the resume is always
// exactly one page; content past the height is clipped (see fitsOnePage).
// No fonts, no CSS: the built-in fallback covers the content.
const VIEWPORT = { width: 794, height: 1123 }

const renderer = new PdfRenderer()

function element(data: ResumeData) {
  return createElement(ResumePdfDocument, { data })
}

export async function renderResume(data: ResumeData): Promise<Uint8Array> {
  return renderer.render(element(data), {
    viewport: VIEWPORT,
    lang: 'en',
    outline: true,
    metadata: {
      title: `${data.basics.name} – Resume`,
      description: data.basics.headline || undefined,
      authors: [data.basics.name],
      keywords: ['resume'],
      creator: 'brodin.dev resume builder',
    },
  })
}

// Viewport renders clip, so the UI warns instead of silently dropping content.
export async function fitsOnePage(data: ResumeData): Promise<boolean> {
  const size = await measure(element(data), { viewport: VIEWPORT })
  return size.height <= VIEWPORT.height
}
