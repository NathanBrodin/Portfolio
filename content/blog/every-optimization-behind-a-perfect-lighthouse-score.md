---
title: 'Every Optimization Behind a Perfect Lighthouse Score'
description: "The 100 on Lighthouse isn't luck or a clean stack. Here is every optimization I actually shipped to get brodin.dev to 100 locally and 100 in Vercel Real Experience Score."
date: '2026-07-03'
tags: ['web-development', 'performance', 'tanstack']
published: false
---

I run Lighthouse on [brodin.dev](https://brodin.dev) the way some people refresh their GitHub contribution graph. It currently lands at **100 on every local run**, and **100 in Vercel's Real Experience Score**. These performances don't come from a "performance checklist", but rather from moving work from the browser to the build, in places where every generic guide tells you to just "lazy-load it."

So here's the actual list: no `next/image` worship, no advice I didn't personally ship.

## 1. Static prerendering

The single biggest win. In `vite.config.ts`:

```ts
tanstackStart({
  prerender: {
    enabled: true,
    crawlLinks: true,
  },
})
```

`enabled: true` turns the whole site into static HTML at build time. `crawlLinks: true` means TanStack Start follows every internal link it finds and prerenders those routes too, so I never have a route that ships zero hydration cost "by accident" because I forgot to list it somewhere.

The small tradeoff some could argue about would be slower build times. But dor a content site that deploys a few times a month, that's a non-issue. For an app that ships 30 times a day, I'd think harder. But the payoff is that there's almost no JavaScript execution between "user hits Enter" and "user sees a painted page": the HTML is already there.

Next.js does offer the same feature, so modern React static apps can all benefit from it.

## 2. The 1000ms nobody talks about: my dotted world map

This is the one I'm proudest of, because it's a fix for a specific third-party library doing a specific expensive thing.

My home page has a dotted world map with markers for the places I've lived. The naive version uses the [`svg-dotted-map`](https://www.npmjs.com/package/svg-dotted-map) library's `createMap()` at runtime. That function parses GeoJSON and runs point-in-polygon sampling for ~5000 dots. On my machine, that blocks the main thread for **around 1000ms**. On a throttled mid-tier Android, multiply that. Lighthouse's "Reduce JavaScript execution time" audit doesn't even know what hit it: it's a synthetic main-thread cliff.

You can't lazy-load your way out of this. The data is intrinsic to the visual. So I moved the entire computation to build time in [`scripts/generate-map-data.ts`](https://github.com/NathanBrodin/Portfolio/blob/main/scripts/generate-map-data.ts). It runs `createMap()` once in Node and writes three things to a generated file:

1. **One SVG path string** for all 5000 dots, collapsed into a single `<path d="...">`. One paint operation instead of 5000 `<circle>` elements. The browser renders this basically for free.
2. **A linear longitude projection** (`x = LNG_ORIGIN_X + lng * LNG_SCALE_X`). Trivial, extracted from two sample points.
3. **A latitude interpolation lookup table.** This is the non-obvious one: the map uses a Mercator-like projection, so latitude → Y is non-linear. I sample every degree from -70 to 85 at build time, store the `[lat, y]` pairs, and at runtime do a binary search + linear interpolation between the two nearest entries.

The runtime file the browser loads is just a big string and two lookup tables. The browser does zero parsing, zero sampling, zero point-in-polygon. The ~1000ms became "an SVG path, rendered."

That's the kind of optimization that doesn't show up in a checklist. You only find it by profiling and asking, _"why is my main thread busy before I've even rendered anything?"_

## 3. Font preloading

Three `rel="preload"` declarations in the [root route's head](https://github.com/NathanBrodin/Portfolio/blob/main/src/routes/__root.tsx):

```tsx
{
  rel: 'preload',
  href: '/fonts/iAWriterQuattroV.woff2',
  as: 'font',
  type: 'font/woff2',
  crossOrigin: 'anonymous',
},
// ...and the same for Lora and iA Writer Mono
```

The gotcha that bit me once: if you self-host and forget `crossOrigin: 'anonymous'`, the browser silently double-fetches the font. It's the kind of thing that doesn't break anything visibly but quietly wrecks your preload and shows up as a longer LCP. Three fonts is enough fonts so I'm not preloading everything, just the three that render above-the-fold text.

## 4. One paint, not five thousand (and SMIL for the pulses)

This is the SVG sibling of the map story. Splitting the dots into one `<path>` instead of thousands of `<circle>` nodes collapses the DOM size and gives one paint op. For the animated marker pulses on the map, I use declarative SMIL `<animate>` instead of a JS rAF loop:

```tsx
<animate attributeName="r" from={String(markerSize)} to="2" dur="2s" repeatCount="indefinite" />
<animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
```

SMIL gets a bad rap sometimes, but for an always-on pulse it's cheaper than driving it from React state and triggering re-renders. The honest caveat: it's not prefetchable the way a JS animation sometimes is, and on very low-end devices SMIL can be inconsistently throttled. For a portfolio it's fine.

## 5. Animations that respect the GPU

I use `motion` (framer-motion's successor) for the curved path draw-ins on the map, but I keep it boring: `animate={{ pathLength: 1 }}` once on mount, with a small stagger. No scroll-gated choreography, no parallax, nothing that requires listening to the scroll position. The dither shaders on the section dividers run on the GPU through [`@paper-design/shaders-react`](https://shaders.paper.design/). And on the OG image route specifically, I set the dither's `speed={0}`, that one's actually about screenshot correctness (I capture it with Puppeteer), but it does mean the share-preview version of the shader is free.

The rule I follow: animate things the user can _see_, animate them once, and let the browser handle it on the compositor thread.

## 6. Vector where vector works

`favicon.svg`. Tech-stack icons as `.svg` with light/dark variants. The map dots are a single SVG path. The one raster I keep on the home page is the GitHub contribution screenshot, and that's `.webp`. Rasters are reserved for things that are genuinely photographic (a screenshot of an actual UI). If it's a logo or a shape, it's a vector. Less weight, infinitely scalable, no CLS from missing dimensions.

## 7. Build-time guardrails

Nothing runtime-clever here, just two cheap safety nets:

- My OG image generation script ([`scripts/generate-og.ts`](https://github.com/NathanBrodin/Portfolio/blob/main/scripts/generate-og.ts)) screenshots the OG routes with Puppeteer and throws if any captured image exceeds **8 MB**. A single bloated OG would silently tank sharing-time LCP once a link gets pasted somewhere busy. I'd rather have the build fail.
- `vp check` runs format, lint, and a real TypeScript typecheck on staged files. It won't catch every perf regression, but it catches the dumb ones: a fat dependency, a console-laden module, a mis-typed hot path, before they land in prod.

## The honest "what I did not do"

This is the part most perf posts skip, and it's the most useful.

- **No image CDN / `next/image`-equivalent.** I have one image that benefits from responsive sizing. One. A full image pipeline isn't worth the dependency.
- **No advanced code-splitting beyond route-level.** The site is small. Route-level chunks from TanStack Start are enough. Anything more is over-engineering.
- **There's still ~130 KiB of "unused JavaScript" on initial load.** That's framework runtime: React, TanStack, the small `motion` slice. It's the cost of SSR-with-hydration. On desktop it doesn't cost the score. On throttled mid-tier mobile, it's the ceiling I can't break without dropping the framework, and I'm not willing to do that for a portfolio.
- **A perfect Lighthouse score on a small site is a vanity metric.** I'm not going to pretend it matters as much as it would for a media site with a million visitors. The point isn't the 100. The point is the lesson underneath it: **measure, then move work to build time.**

If you want to see how all of this hangs together, [the source is open](https://github.com/NathanBrodin/Portfolio). Steal the map precompute especially: that one deserves to be more than a footnote in my repo.

---

- My Portfolio: [brodin.dev](https://brodin.dev)
- Source code: [github.com/NathanBrodin/Portfolio](https://github.com/NathanBrodin/Portfolio)
- TanStack Start prerendering: [tanstack.com/start](https://tanstack.com/start/latest)
- Paper Shaders (the dither ones): [shaders.paper.design](https://shaders.paper.design/)
