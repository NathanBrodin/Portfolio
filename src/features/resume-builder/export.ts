import { createElement } from 'react'

import type { ResumeData } from './schema'

// Heavy modules (@react-pdf/renderer + template) are dynamically imported so
// the builder shell (editors, toolbar) stays interactive while they load.
export async function exportResumePdf(data: ResumeData): Promise<Blob> {
  const [{ pdf }, { ResumeDocument }] = await Promise.all([
    import('@react-pdf/renderer'),
    import('./document'),
  ])
  const document = createElement(ResumeDocument, { data }) as Parameters<typeof pdf>[0]
  return pdf(document).toBlob()
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  setTimeout(() => URL.revokeObjectURL(url), 60_000)
}

export function resumeFilename(name: string, ext: string): string {
  const slug =
    name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'resume'
  return `${slug}.${ext}`
}

export function downloadResumeJson(data: ResumeData): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  downloadBlob(blob, resumeFilename(data.basics.name, 'json'))
}
