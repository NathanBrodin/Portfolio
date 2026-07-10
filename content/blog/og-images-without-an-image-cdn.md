---
title: 'OG Images Without an Image CDN'
description: 'I render Open Graph previews as real React routes and screenshot them with Puppeteer in a build script, so my link previews reuse the same components as the site.'
date: '2026-07-10'
tags: ['web-development', 'react', 'seo']
published: true
---

Link previews are the first thing anyone sees of a blog post. They're also the last thing most people think about. The usual answers are a Figma file you forget to update, or `@vercel/og`, or an image-CDN pipeline you stand up once and never touch again.

I do something dumber and more fun: my OG images are just screenshots of my own React routes.

Every page that needs an OG has a sibling route that renders the actual preview. The screenshot is taken at build time with Puppeteer. The result looks like my site because it _is_ my site: same fonts, same dither shader, same Grid, same theme-aware icons.

## The trick: render the OG, don't design it

I have three OG routes, each a normal TanStack Router file route returning a normal React component:

- `/og` — the site-wide preview, used as default `og:image`.
- `/blog/og` — the blog listing preview ("Nathan's Blog").
- `/blog/$slug/og` — the per-post preview, with the post title, its date, and a small dither shader header.

You can even see it by yourself: e.g [brodin.dev/og](https://brodin.dev/og).

The component in each route is the same shape: a constrained `div` with `id="og"`, sized exactly `1200 × 630`, reusing my real UI primitives.

```tsx
<div
  id="og"
  className="relative mt-2 flex h-full flex-col items-center justify-between overflow-hidden border p-14"
  style={{ width: 1200, height: 630 }}
>
  {/* ...PageTitle, PageDescription, tech-stack icons... */}
  <div className="pointer-events-none absolute inset-0 -z-1 h-full w-full overflow-hidden opacity-10">
    <Dithering
      width={1200}
      height={630}
      colorBack={resolvedTheme === 'dark' ? '#000000' : '#FFFFFF'}
      colorFront={resolvedTheme === 'dark' ? '#cbfbf1' : '#00786f'}
      shape="warp"
      type="4x4"
      size={1.0}
      speed={0}
      scale={1.84}
    />
  </div>
  <Grid />
</div>
```

That [Paper Shaders](https://shaders.paper.design/) dither is the same one I use on my section dividers. The `PageTitle`is the same component that renders the H1 on every real page. The Grid is the same`Grid` from my home page. There is no separate design system for OG. The OG _is_ the design system, just constrained to a poster.

Because the per-post route is a real route with a real loader, it pulls the post title and date from Content Collections just like the actual blog post page does. No drift. Update the post, the OG regenerates on the next build.

## The screenshot script

[`scripts/generate-og.ts`](https://github.com/NathanBrodin/Portfolio/blob/main/scripts/generate-og.ts) does the work:

```ts
async function captureOg(page: Page, url: string, outputPath: string) {
  await page.goto(url, { waitUntil: 'domcontentloaded' })
  await page.waitForSelector('#og', { timeout: 30_000 })
  const og = await page.$('#og')
  if (!og) {
    throw new Error(`OG element (#og) not found at ${url}`)
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  await og.screenshot({ path: outputPath, type: 'png' })

  const stats = fs.statSync(outputPath)
  const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2)
  if (stats.size > MAX_FILE_SIZE) {
    throw new Error(`OG file size (${fileSizeMB}MB) exceeds 8MB limit: ${outputPath}`)
  }

  console.log(`  ${outputPath} (${fileSizeMB}MB)`)
}
```

Two details matter here. First, `waitUntil: 'domcontentloaded'` instead of `'networkidle'`. `networkidle` waits for _quiet_, which fonts and async chunks can delay by seconds. I don't need quiet. I need the `#og` element to be painted, so I `waitForSelector('#og', { timeout: 30000 })`. It's faster and more reliable than waiting for the network to settle.

Second, I screenshot the `#og` element, not the viewport. The Puppeteer page is set to `1920 × 1080`, but the captured image is the element at exactly `1200 × 630`. That means the OG box can live anywhere in the layout and I still get a clean crop. No pixel-counting in the script.

## One image per blog post, automatically

The script crawls `content/blog/*.md` and screenshots each post's OG route, writing `public/og/blog/<slug>.png`:

```ts
function getBlogSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_BLOG_DIR, { recursive: true })
    .filter((file) => String(file).endsWith('.md'))
    .map((file) => String(file).replace(/\.md$/, ''))
}
```

New post in `content/blog/`, run `pnpm generate:og`, get one new image. No manual step, no Figma export.

The blog post route then wires that image into its `head()`:

```ts
const ogImage = `${siteConfig.url}/og/blog/${post.slug}.png`
// ...
{ property: 'og:image', content: ogImage },
{ name: 'twitter:image', content: ogImage },
```

So updating a post title or date updates the OG on the next build. The link preview always matches the post.

## The 8 MB guardrail

After every capture, the script stats the output file and throws if it exceeds 8 MB. A single bloated OG would silently tank sharing-time LCP the moment a link gets pasted somewhere busy. I'd rather have the build fail. It's six lines of code and the cheapest insurance I ship.

## Theme-aware icons, for free

The site-wide OG includes my tech-stack icons. Each one has light and dark variants, swapped with Tailwind's `dark:` variants:

```tsx
<img
  src={`/tech-stack-icons/${tech.key}-light.svg`}
  alt={`${tech.title} light icon`}
  className="block dark:hidden"
/>
<img
  src={`/tech-stack-icons/${tech.key}-dark.svg`}
  alt={`${tech.title} dark icon`}
  className="hidden dark:block"
/>
```

The dither shader does the same thing at the color level: `colorBack` and `colorFront` switch on `resolvedTheme`. So a dark-mode screenshot and a light-mode screenshot look like genuinely different posters, not the same image with inverted colors. I run the script under whichever theme I want; usually dark, since that's my brand default.

## The honest downsides

- **Build-time, not on-demand.** New content needs a redeploy and a script run. If I wanted to ship a post and have its OG live in under a minute, I would reach for `@vercel/og`.
- **Puppeteer is heavy.** It pulls Chromium into your CI. It adds seconds-per-image to the build. For a portfolio with a handful of routes it's a non-issue, but if I had thousands of pages I'd reconsider.
- **Single captures.** One theme per run. If I wanted dark _and_ light OGs I'd have to render the route twice. Right now I don't.

`@vercel/og` is the right answer once you have a real scale problem. The reason I don't use it here isn't that it's bad: it's that I don't have that problem, and `og.screenshot()` lets my OG reuse the components I've already built.

---

The OG route components, side by side, are in [`/src/routes/og/`](https://github.com/NathanBrodin/Portfolio/tree/main/src/routes/og), [`/src/routes/blog/og/`](https://github.com/NathanBrodin/Portfolio/tree/main/src/routes/blog/og), and [`/src/routes/blog/$slug/og/`](https://github.com/NathanBrodin/Portfolio/tree/main/src/routes/blog/$slug/og). Worth reading in order: the per-post one is where most of the logic lives.

---

- My Portfolio: [brodin.dev](https://brodin.dev)
- Source code: [github.com/NathanBrodin/Portfolio](https://github.com/NathanBrodin/Portfolio)
- `@vercel/og` (when you _do_ have the scale problem): [vercel.com/docs/functions/og-image-generation](https://vercel.com/docs/functions/og-image-generation)
- Paper Shaders (for the dither ones): [shaders.paper.design](https://shaders.paper.design/)
