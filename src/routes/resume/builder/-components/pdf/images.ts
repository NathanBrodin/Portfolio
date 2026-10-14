import type { ImageLoader } from '@takumi-rs/helpers/renderer'

export const RESUME_HEADER_SRC = '/assets/resume-header-dither.png'
export const RESUME_NOISE_SRC = '/assets/noise.webp'

async function load(src: string): Promise<ImageLoader> {
  const res = await fetch(src)
  if (!res.ok) throw new Error(`Image request failed: ${res.status} ${src}`)
  const data = new Uint8Array(await res.arrayBuffer())
  return { src, data }
}

let cached: Promise<ImageLoader[]> | null = null

export function loadPdfImages(): Promise<ImageLoader[]> {
  cached ??= Promise.all([load(RESUME_HEADER_SRC), load(RESUME_NOISE_SRC)]).then(
    (images) => images,
    (error: unknown) => {
      cached = null
      throw error
    },
  )
  return cached
}
