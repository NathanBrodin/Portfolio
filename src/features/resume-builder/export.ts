import type { ResumeData } from './schema'

export interface ResumePdfResult {
  blob: Blob
  fits: boolean
}

export async function exportResumePdf(data: ResumeData): Promise<ResumePdfResult> {
  const response = await fetch('/api/resume-pdf', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data }),
  })
  if (!response.ok) throw new Error(`PDF render failed: ${response.status}`)
  const blob = await response.blob()
  const fits = response.headers.get('x-resume-fits') !== 'false'
  return { blob, fits }
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
