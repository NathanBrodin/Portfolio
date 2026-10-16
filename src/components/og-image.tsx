'use no memo'

import { siteConfig } from '@/config/site'
import '@takumi-rs/helpers/jsx'

export type OgImageProps = {
  title?: string
  description?: string
}

const GRID_LINE = 'rgba(204, 251, 241, 0.2)'

function hash01(input: string): number {
  let hash = 2156136461
  for (let index = 0; index < input.length; index++) {
    hash ^= input.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return (hash >>> 0) / 4294967295
}

function ditherPosition(seed: string): string {
  return `${Math.round(hash01(`x:${seed}`) * 100)}% ${Math.round(hash01(`y:${seed}`) * 100)}%`
}

export function OgImage({ title, description }: OgImageProps) {
  const heading = title ?? siteConfig.name
  const summary = description ?? siteConfig.description

  return (
    <div tw="relative flex h-full w-full flex-col justify-between overflow-hidden border border-border bg-background p-14">
      <div
        aria-hidden="true"
        tw="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'url(dither-dark)',
          backgroundPosition: ditherPosition(`${heading}\n${summary}`),
          backgroundSize: '184%',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div tw="relative flex w-full flex-row justify-between">
        <span tw="font-display text-4xl font-medium text-muted-foreground">{siteConfig.name}</span>
        <span tw="font-display text-4xl font-medium text-muted-foreground">
          {siteConfig.url.replace('https://', '')}
        </span>
      </div>
      <div tw="relative flex flex-col gap-2">
        <h1 tw="font-display text-7xl font-medium text-balance text-primary line-clamp-2">
          {heading}
        </h1>
        <p tw="max-w-3xl font-sans text-2xl text-foreground line-clamp-3">{summary}</p>
      </div>
      <div tw="relative" />
      <div
        aria-hidden="true"
        tw="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-gradient(${GRID_LINE} 1px, transparent 1px), linear-gradient(90deg, ${GRID_LINE} 1px, transparent 1px)`,
          backgroundSize: '10px 10px',
          maskImage: 'linear-gradient(to top, rgba(255, 255, 255, 0.68), transparent)',
        }}
      />
    </div>
  )
}
