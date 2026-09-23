---
id: portfolio
title: Portfolio
icon: user
link: https://brodin.dev
type: personal
startDate: '2026-02'
skills:
  - TypeScript
  - React
  - TanStack Start
  - Tailwind CSS
---

My newest portfolio, built with TanStack Start (static pre-rendering) and Content Collections for content in Markdown, with a borderline-obsessive focus on performance, accessibility, and SEO.

<!-- more -->

I finally moved away from Next.js and went with [TanStack Start](https://tanstack.com/start/latest) instead. Also using [coss ui](https://coss.com/ui) over shadcn/ui, it looks so nice.

Full SEO (JSON-LD, sitemap, OG image generation, llms.txt, RSS feed), sound design, and lots of tiny details in the UI/UX as well as in the code. I've spent a lot of time working on performance, accessibility and SEO.

Accessibility means a 100 Lighthouse score, but also a fully cleaned accessibility tree which is entirely readable and free of decoration noise. Icon buttons with descriptive tooltips, contrasts, element focus, and everything else.

Performance means a 100 Lighthouse score on desktop, but also ~95 on slow mobile 4G which is the one that matters for Google. It also means optimized font loading, image loading and formats, GPU-friendly animations. Powered with static pre-rendering, which still correctly renders the first paint with the correct theme and the correct keyboard shortcut key (⌘/Ctrl) with no layout shift. The dotted world map on the homepage is even precomputed at build time to avoid ~1000ms of main-thread work.

SEO means a 100 Lighthouse score, but also fully defined meta tags, with per-route OG image generation (Puppeteer screenshots), canonical URLs and Twitter cards. It also means Structured Data (JSON-LD) across key routes, including Person, Blog and BlogPosting schemas, plus a sitemap and robots.txt. SEO also means GEO (Generative Engine Optimization), with an llms.txt and llms-full.txt, every blog post readable as raw Markdown at `/blog/<slug>.md`, and a skill.md for AI agents.
