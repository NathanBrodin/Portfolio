import type { Resume } from './schema'

export interface ResumePdfResult {
  blob: Blob
  fits: boolean
}

export async function exportResumePdf(data: Resume): Promise<ResumePdfResult> {
  // Dynamically imported so the renderer (and its WASM init) only ever loads
  // in the browser, never in a server bundle.
  const { fitsOnePage, renderResume } = await import('./pdf/render')
  const [pdf, fits] = await Promise.all([renderResume(data), fitsOnePage(data)])
  const blob = new Blob([new Uint8Array(pdf)], { type: 'application/pdf' })
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
