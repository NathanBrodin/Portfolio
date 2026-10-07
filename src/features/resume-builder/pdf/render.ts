import { createElement } from 'react'
import init, { measure, render } from 'takumi-pdf/no-init'
import wasmUrl from 'takumi-pdf/wasm-url'

import { siteConfig } from '@/config/site'

import type { ResumeData } from '../schema'

import { ResumePdfDocument } from './template'

// A4 portrait in CSS px at 96dpi.
const VIEWPORT = { width: 794, height: 1123 }

// Initialized once per page load; reset on failure so a later edit retries.
// Browser init per https://takumi.kane.tw/docs/pdf#in-the-browser
let ready: Promise<void> | null = null

function ensureInit(): Promise<void> {
  ready ??= init({ module_or_path: wasmUrl }).then(
    () => undefined,
    (error: unknown) => {
      ready = null
      throw error
    },
  )
  return ready
}

function element(data: ResumeData) {
  return createElement(ResumePdfDocument, { data })
}

export async function renderResume(data: ResumeData): Promise<Uint8Array> {
  await ensureInit()
  return render(element(data), {
    viewport: VIEWPORT,
    lang: 'en',
    outline: true,
    metadata: {
      title: `${siteConfig.name} | Resume`,
      description: siteConfig.description,
      authors: [siteConfig.name],
      // Mirrors visible content only: every keyword appears in the document body.
      keywords: [
        'Nathan Brodin',
        'Resume',
        'Software Engineer',
        'Full Stack Engineer',
        'Frontend Engineer',
        'React',
        'TypeScript',
        'TanStack',
        'Next.js',
        'Django',
        'PostgreSQL',
        'Redis',
        'ClickHouse',
        'Docker',
        'NGINX',
        'Playwright',
        'Tailwind CSS',
        'Redux',
        'Capia AS',
        'DNB',
        'ESIEA',
      ],
      creator: 'brodin.dev/resume/builder',
      creationDate: new Date().toISOString().slice(0, 10),
    },
  })
}

// Viewport renders clip, so the UI warns instead of silently dropping content.
export async function fitsOnePage(data: ResumeData): Promise<boolean> {
  await ensureInit()
  const size = await measure(element(data), { viewport: VIEWPORT })
  return size.height <= VIEWPORT.height
}
