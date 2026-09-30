import type { ResumeData } from './schema'

import { renderResumePdf } from './pdf/server'

export async function exportResumePdf(data: ResumeData): Promise<Blob> {
  const response = await renderResumePdf({ data })
  if (!response.ok) throw new Error(`PDF render failed: ${response.status}`)
  return response.blob()
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
