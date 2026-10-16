import type { CssInput } from '@takumi-rs/helpers'
import type { FontLoader, ImageLoader } from '@takumi-rs/helpers/renderer'

import { createFileRoute } from '@tanstack/react-router'
import { createElement } from 'react'
import z from 'zod'

import { OgImage } from '@/components/og-image'

const ogSearchSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
})

const namedHtmlEntities = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
} as const

function decodeHtmlEntities(value: string | undefined) {
  if (!value) return

  return value.replace(/&(#(?:x[a-f\d]+|\d+)|[a-z]+);/gi, (entity, body: string) => {
    if (body.startsWith('#')) {
      const isHex = body[1]?.toLowerCase() === 'x'
      const rawCodePoint = body.slice(isHex ? 2 : 1)
      const codePoint = Number.parseInt(rawCodePoint, isHex ? 16 : 10)

      if (Number.isNaN(codePoint)) {
        return entity
      }

      try {
        return String.fromCodePoint(codePoint)
      } catch {
        return entity
      }
    }

    const namedEntity = namedHtmlEntities[body.toLowerCase() as keyof typeof namedHtmlEntities]

    return namedEntity ?? entity
  })
}

export const Route = createFileRoute('/og')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { ImageResponse } = await import('takumi-js/response')

        const url = new URL(request.url)
        const rawParams = Object.fromEntries(url.searchParams.entries())

        const parsed = ogSearchSchema.safeParse(rawParams)

        if (!parsed.success) {
          return new Response('Invalid search parameters', { status: 400 })
        }

        const title = decodeHtmlEntities(parsed.data.title)
        const description = decodeHtmlEntities(parsed.data.description)
        const { fonts, images } = await loadOgAssets(url.origin)

        return new ImageResponse(createElement(OgImage, { title, description }), {
          width: 1200,
          height: 630,
          fonts,
          images,
          fontFamilies: ['Writer', 'Lora'],
          css: OG_CSS,
          headers: {
            'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
          },
        })
      },
    },
  },
})

// Flat values from the dark theme in src/styles.css: Takumi does not resolve var() inside custom property values.
const OG_CSS: CssInput[] = [
  '@import "tailwindcss";',
  {
    selector: ':root',
    style: {
      '--font-sans': "'Writer'",
      '--font-display': "'Lora'",
      '--color-background': 'color-mix(in srgb, #0a0a0a 99%, white)',
      '--color-foreground': '#f5f5f5',
      '--color-primary': '#ccfbf1',
      '--color-muted-foreground': 'color-mix(in srgb, #737373 90%, white)',
      '--color-border': 'color-mix(in srgb, white 6%, transparent)',
    },
  },
]

async function fetchBytes(origin: string, path: string): Promise<ArrayBuffer> {
  const response = await fetch(new URL(path, origin))
  if (!response.ok) {
    throw new Error(`OG asset request failed: ${response.status} ${path}`)
  }
  return response.arrayBuffer()
}

type OgAssets = {
  fonts: FontLoader[]
  images: ImageLoader[]
}

// Resolved once per server instance; the bytes are identical across origins.
let cachedAssets: Promise<OgAssets> | null = null

function loadOgAssets(origin: string): Promise<OgAssets> {
  cachedAssets ??= Promise.all([
    fetchBytes(origin, '/fonts/iAWriterQuattroV.woff2'),
    fetchBytes(origin, '/fonts/Lora-latin.woff2'),
    fetchBytes(origin, '/fonts/Lora-latin-ext.woff2'),
    fetchBytes(origin, '/assets/dither-dark.webp'),
  ])
    .then(([writer, latin, latinExt, dither]): OgAssets => {
      return {
        fonts: [
          { name: 'Writer', data: writer },
          { name: 'Lora latin', subsetOf: 'Lora', subsetRank: 0, data: latin },
          { name: 'Lora latin-ext', subsetOf: 'Lora', subsetRank: 1, data: latinExt },
        ],
        images: [{ src: 'dither-dark', data: dither }],
      }
    })
    .catch((error: unknown) => {
      cachedAssets = null
      throw error
    })
  return cachedAssets
}
