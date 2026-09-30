import type { FontLoader } from 'takumi-pdf'

import { googleFonts } from '@takumi-rs/helpers'

import writerDataUri from './fonts/iAWriterQuattroV.woff2?inline'

// Body font. Bundled copy of `public/fonts/iAWriterQuattroV.woff2` (iA Writer
// is not on Google Fonts): inlining embeds the bytes in the server bundle, so
// rendering needs no runtime file read and works on serverless targets.
function decodeDataUri(uri: string): Uint8Array {
  const base64 = uri.slice(uri.indexOf(',') + 1)
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let index = 0; index < binary.length; index++) {
    bytes[index] = binary.charCodeAt(index)
  }
  return bytes
}

const writerFont: FontLoader = { name: 'Writer', data: decodeDataUri(writerDataUri) }

// Heading font from Google Fonts. Subset files download lazily, so only the
// weights/styles the document uses are fetched; latin-ext covers æøå.
const loraFontsPromise = googleFonts([
  { name: 'Lora', weight: [400, 700], style: ['normal', 'italic'] },
])

export async function resumeFonts(): Promise<Array<FontLoader>> {
  const lora = await loraFontsPromise
  return [writerFont, ...lora]
}
