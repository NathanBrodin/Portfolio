---
title: 'Building a Hub and Spoke Content Strategy for Developers'
description: 'How I built a self-hosted blog as the canonical source for cross-posted content on Dev.to, Hashnode, and Medium.'
date: '2026-03-04'
tags: ['seo', 'content-strategy', 'web-development']
published: true
---

As developers, we spend a lot of time writing content across multiple platforms. Dev.to, Hashnode, Medium -- each has its own audience, but spreading content across them without a strategy leads to diluted SEO value and fragmented analytics.

## The Problem with Cross-Posting

When you publish the same article on three platforms, search engines see three competing versions. Without a canonical URL pointing back to your own domain, you're essentially donating your SEO authority to those platforms.

## The Hub and Spoke Model

The solution is simple: **own your content**. Your personal site becomes the "hub" -- the canonical source of truth. Each platform where you cross-post becomes a "spoke" that links back to your site.

Here's how it works:

1. **Publish first on your own blog** with full SEO metadata
2. **Cross-post to platforms** like Dev.to, Hashnode, and Medium
3. **Set the canonical URL** on each platform to point back to your blog
4. **Search engines consolidate** ranking signals to your domain

## Technical Implementation

The blog infrastructure uses a few key pieces:

- **Content Collections** for type-safe markdown with frontmatter validation
- **Dynamic meta tags** generated from frontmatter (title, description, Open Graph, Twitter Cards)
- **Self-referencing canonical tags** on every post (`<link rel="canonical" href="https://brodin.dev/blog/..." />`)
- **JSON-LD structured data** using the `BlogPosting` schema for rich search results

### Frontmatter Schema

Each post defines metadata that drives both the UI and SEO:

```yaml
title: 'Your Post Title'
description: 'A concise summary for search engines and social cards.'
date: '2026-03-04'
tags: ['seo', 'web-development']
published: true
```

The `description` field serves triple duty: it populates `<meta name="description">`, `og:description`, and the post excerpt on the listing page.

### Canonical Tags

The self-referencing canonical tag is the most important piece. It tells search engines: "This is the original. Everything else is a copy."

```html
<link rel="canonical" href="https://brodin.dev/blog/hello-world" />
```

When Dev.to or Medium also set their canonical to this URL, all ranking signals flow back to your domain.

## Results

With this setup, you get the best of both worlds: reach through established platforms, and authority concentrated on your own domain. Your blog becomes a living portfolio piece that compounds in value over time.
