import { createElement } from 'react'
import { measure, PdfRenderer } from 'takumi-pdf'

import type { ResumeData } from '../schema'

import { resumeFonts } from './fonts'
import { ResumePdfDocument } from './template'
import { resumeThemeCss } from './theme'

// A4 portrait in CSS px at 96dpi. Fixed viewport: the resume is always
// exactly one page; content past the height is clipped (see fitsOnePage).
const VIEWPORT = { width: 794, height: 1123 }

// Shared across renders: registered fonts are deduplicated, so Lora subsets
// and the Writer bytes load once per server instance.
const renderer = new PdfRenderer()
const fontsPromise = resumeFonts()

function element(data: ResumeData) {
  return createElement(ResumePdfDocument, { data })
}

async function options() {
  return {
    viewport: VIEWPORT,
    fonts: await fontsPromise,
    fontFamilies: ['Writer', 'Lora', 'serif'],
    css: resumeThemeCss,
  }
}

export async function renderResume(data: ResumeData): Promise<Uint8Array> {
  return renderer.render(element(data), {
    ...(await options()),
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
  const size = await measure(element(data), await options())
  return size.height <= VIEWPORT.height
}
