---
title: 'The SEO Setup Behind a TanStack Start Portfolio'
description: "The exact set of SEO things I actually ship on brodin.dev: per-route meta via TanStack Router's head(), three layers of JSON-LD, a sitemap and RSS feed served as live route handlers, and an llms.txt for the LLM crawlers."
date: '2026-07-03'
tags: ['web-development', 'seo', 'tanstack']
published: false
---

A portfolio that nobody can find isn't a portfolio. The problem with React-ecosystem SEO advice is that 90% of it is generic noise copied between blogs: "add meta tags," "use a sitemap," "think about Core Web Vitals." Useful in 2015. Not a complete answer in 2026.

Here is the exact set of SEO things I actually ship on [brodin.dev](https://brodin.dev). Everything is [open source](https://github.com/NathanBrodin/Portfolio), so I'll link the files.

## Meta tags, in the root route

Most React SEO guides tell you to put your meta tags in an `app/` directory or a layout file. TanStack Start does it on the root route, in the `head()` of `__root.tsx`:

```tsx
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { title: siteConfig.title },
      ...
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: siteConfig.title },
      ...
      { property: 'og:locale', content: 'en_US' },
      { name: 'twitter:title', content: siteConfig.title },
      ...
    ],
    links: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'manifest', href: '/manifest.json' },
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: 'Blog | Nathan Brodin',
        href: `${siteConfig.url}/blog/rss`,
      },
    ],
  }),
})
```

The root route is the right place for the site-wide defaults because it wraps every route. Anything I set here applies site-wide unless a child route overrides it. Which is exactly what the child routes do.

## Per-route overrides, via `head()`

Each route can extend or override the root meta. The blog post route does this in [`src/routes/blog/$slug/index.tsx`](https://github.com/NathanBrodin/Portfolio/blob/main/src/routes/blog/$slug/index.tsx):

```tsx
head: ({ loaderData }) => {
  const { post } = loaderData
  const url = `${siteConfig.url}/blog/${post.slug}`
  const ogImage = `${siteConfig.url}/og/blog/${post.slug}.png`
  const title =
    post.title.length > 53 ? `${post.title.slice(0, 53)}... | NB` : `${post.title} | Nathan Brodin`
  const description = post.description.slice(0, 160)

  return {
    meta: [
      { title },
      ...{ property: 'og:title', content: post.title },
      ...{ name: 'twitter:title', content: post.title },
      ...{ property: 'article:published_time', content: post.date },
      ...post.tags.map((tag) => ({ property: 'article:tag', content: tag })),
    ],
    links: [{ rel: 'canonical', href: url }],
  }
}
```

Two non-obvious bits worth flagging:

- **The title is truncated to 53 characters with a `... | NB` suffix.** SERP titles get cut around 50-60 chars. Truncating in code means the brand suffix always fits.
- **`description` is sliced to 160.** Same reason: meta descriptions max out around 155-160 in the SERP. Slice here so I see the truncation in the source, not in Google's render.

The `og:image` for every post points to `/og/blog/<slug>.png`. Those images are generated from a sibling OG route by a Puppeteer script at build time. I wrote a [whole other post about that](/blog/og-images-without-an-image-cdn).

## Three layers of JSON-LD

Structured data is where most React sites under-ship. I inject three nested schemas:

**1. Site-wide** in the root route, defined as a `Graph` in [`src/config/site.tsx`](https://github.com/NathanBrodin/Portfolio/blob/main/src/config/site.tsx) and injected from `__root.tsx`.

The `Graph` contains a `Person` (with `@id`, `jobTitle`, `knowsAbout`, `alumniOf`, `worksFor`, `address`), a `WebSite`, and a `ProfilePage` that links them. The `@id`s are stable URLs (`https://brodin.dev/#person`, `#website`, `#profilepage`) so the other schemas can reference them.

**2. The blog listing** declares a `Blog` with its 10 most-recent posts as `blogPost[]` references ([`src/routes/blog/index.tsx`](https://github.com/NathanBrodin/Portfolio/blob/main/src/routes/blog/index.tsx)). This is what makes Google consider the blog a real content feed rather than a loose pile of pages.

**3. Each post** declares a `BlogPosting` with `headline`, `datePublished`, `image`, `author` (`@id` referencing the Person), `mainEntityOfPage`, `keywords` from the post's tags, and `isPartOf` referencing the `Blog` ([`src/routes/blog/$slug/index.tsx`](https://github.com/NathanBrodin/Portfolio/blob/main/src/routes/blog/$slug/index.tsx)). The `image` matches the `og:image` exactly, so the structured data and the Open Graph preview show the same thing.

You can verify all three with Google's [Rich Results Test](https://search.google.com/test/rich-results). I run it after every new post.

## Sitemap as a live route, not a build plugin

Most setup articles tell you to install a sitemap plugin that emits a `sitemap.xml` at build time. I serve it as a route handler instead, in [`src/routes/sitemap[.]xml.ts`](https://github.com/NathanBrodin/Portfolio/blob/main/src/routes/sitemap[.]xml.ts).

See it for yourself: [brodin.dev/sitemap.xml](https://brodin.dev/sitemap.xml).

The advantage over a build-time plugin: a new post gets picked up on the next deploy, no separate build step, no forgotten plugin invocation. The `Cache-Control` header lets Vercel's edge serve the cached version for a day and refresh it in the background after a week. The `lastmod` for the index pages is the most-recent post's date, so crawlers see "this changed when I last published."

## RSS, the same way

The RSS feed is a sibling route handler in [`src/routes/blog/rss/route.tsx`](https://github.com/NathanBrodin/Portfolio/blob/main/src/routes/blog/rss/route.tsx). Same shape: read `allBlogPosts`, hand-build the XML string, return it with `Content-Type: application/rss+xml`. Same `Cache-Control`. See it at [brodin.dev/blog/rss](https://brodin.dev/blog/rss).

RSS readers are a tiny share of the audience but a _very_ specific one: the people who care enough about reading to install an RSS reader in 2026. Those are the readers I want. The route exists for them.

## `llms.txt` and per-post markdown

This is the forward-looking one. [`src/routes/llms[.]txt.ts`](https://github.com/NathanBrodin/Portfolio/blob/main/src/routes/llms[.]txt.ts) serves a markdown file describing me, my stack, my experiences, projects, certifications, and the latest four blog posts. It's at [brodin.dev/llms.txt](https://brodin.dev/llms.txt) if you want to see it.

Each blog post also has a markdown sibling at `/blog/<slug>/post.md` ([`src/routes/blog/$slug/post[.md]/route.tsx`](https://github.com/NathanBrodin/Portfolio/blob/main/src/routes/blog/$slug/post[.md]/route.tsx)). The `llms.txt` file links to those routes. So my blog is fully readable as plain markdown to any LLM crawler that respects the convention, resulting hopefully in no HTML scraping, no `<script>` noise, no main-tag heuristics.

The honest pitch: this is a bet. `llms.txt` is a young convention. It might become table stakes, it might be forgotten. I shipped it because I run a separate [Nathan's AI](https://chat.brodin.dev) project that consumes my own content, and serving clean markdown to LLMs (including future me) costs me nothing. Worst case, the route sits there unused.

## The boring five-minute wins

Listed for completeness, in [`public/`](https://github.com/NathanBrodin/Portfolio/tree/main/public):

- `robots.txt` — six lines, allows everything, points at the sitemap.
- `manifest.json` — short name, name, a single SVG icon, standalone display, theme color.
- `favicon.svg` — one vector file, infinitely scalable, no PNG generator array.

Each one is small enough that I could have skipped it. Together they're the differentiator between "this site exists" and "this site is indexed correctly and installs like an app."

## The verification loop

Two tools, run after each new post:

- **`pnpm lh`** runs [Unlighthouse](https://unlighthouse.dev/) against the local build. My config samples each route three times on throttled mobile. This is what tells me the SEO score is 100 and not simple vibes.
- **Google Search Console + the [Rich Results Test](https://search.google.com/test/rich-results)** for the structured-data side. Search Console for the field data (impressions, index coverage, sitemap submission state), Rich Results for "is this JSON-LD actually valid for a result type."

## The honest "what I did not do"

- **No hreflang.** I publish in one language. Hreflang would be cargo-culting.
- **No breadcrumb schema.** My site is two levels deep. Breadcrumbs would add noise instead of signal.
- **No image sitemap.** My images are OG previews and tech icons, not a photo library. The image sitemap would list files Google already finds by crawling the pages.
- **No `og:image:width` / `og:image:height`.** I considered it for CLS-prevention on link unfurls, but the OG route renders at exactly `1200 × 630` and the screenshot is a pixel-perfect crop, so unfurl CLS isn't a real failure mode here.
- **No dynamic schema injection from a CMS.** The content lives in Markdown frontmatter, so every schema property is set from typed code. A CMS would need a validation layer to do the same and I'd lose the type safety I went out of my way to keep.

I could add all of the above in an afternoon. The reason I don't is that none of them would move my search ranking. They'd just make the repo noisier.

---

If you cloned the repo, the only files you need to touch to make this yours are `src/config/site.tsx` (the `siteConfig` object and the `siteJsonLd` Graph) and `public/robots.txt` (the sitemap URL). Everything else falls out of those.

- My Portfolio: [brodin.dev](https://brodin.dev)
- Source code: [github.com/NathanBrodin/Portfolio](https://github.com/NathanBrodin/Portfolio)
- TanStack Router `head()` API: [tanstack.com/router/latest/docs/reference/head-api](https://tanstack.com/router/latest/docs/reference/head-api)
- `llms.txt` proposal: [llmstxt.org](https://llmstxt.org/)
- Google Rich Results Test: [search.google.com/test/rich-results](https://search.google.com/test/rich-results)
- Unlighthouse: [unlighthouse.dev](https://unlighthouse.dev/)
