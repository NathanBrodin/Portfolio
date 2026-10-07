import type { FontLoader } from 'takumi-pdf'

async function load(path: string): Promise<ArrayBuffer> {
  const res = await fetch(path)
  if (!res.ok) throw new Error(`Font request failed: ${res.status} ${path}`)
  return res.arrayBuffer()
}

// Fetched once per page load; render + measure share the result.
let cached: Promise<FontLoader[]> | null = null

export function loadPdfFonts(): Promise<FontLoader[]> {
  cached ??= Promise.all([
    load('/fonts/iAWriterQuattroV.woff2'),
    load('/fonts/Lora-latin.woff2'),
    load('/fonts/Lora-latin-ext.woff2'),
  ]).then(
    ([writer, latin, latinExt]): FontLoader[] => [
      { name: 'Writer', data: writer },
      { name: 'Lora latin', subsetOf: 'Lora', subsetRank: 0, data: latin },
      { name: 'Lora latin-ext', subsetOf: 'Lora', subsetRank: 1, data: latinExt },
    ],
    (error: unknown) => {
      cached = null
      throw error
    },
  )
  return cached
}
