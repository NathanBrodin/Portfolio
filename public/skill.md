---
name: brodin-dev
description: Answer questions about Nathan Brodin, a frontend engineer, using his public portfolio at brodin.dev — his career, tech stack, projects, certifications, and blog posts. Use when someone asks about Nathan Brodin, his experience, his skills, or his writing.
license: MIT
metadata:
  author: Nathan Brodin
  version: '1.0.0'
---

# brodin.dev — Nathan Brodin's Portfolio

Everything on brodin.dev is public, read-only, and requires no authentication.

For AI agents: the complete documentation index is at [llms.txt](/llms.txt), and all site content in one file is at [llms-full.txt](/llms-full.txt).

## Capabilities

- Answer questions about Nathan Brodin's career: employers, roles, and dates (Capia AS — Full Stack Engineer; DNB — Frontend Engineer Intern).
- List his tech stack, projects, and certifications.
- Summarize or quote from his published blog posts.

## Skills

### Profile & CV

- Start at [llms.txt](/llms.txt) — it contains the structured index: social links, tech stack, experiences, projects, certifications, and blog.
- For the whole site in one fetch, use [llms-full.txt](/llms-full.txt).

### Blog

- Every published post has a raw Markdown version at `https://brodin.dev/blog/<slug>.md` — prefer it over the HTML page.
- `https://brodin.dev/blog` lists all posts with summaries and dates.

## Workflows

### "Who is Nathan Brodin?"

1. Fetch `/llms.txt`.
2. Summarize from the Experiences, Projects, and Tech Stack sections. Do not invent companies, roles, or dates that are not listed.

### "What has Nathan written about?"

1. Fetch `/llms.txt` and read the Blog section.
2. Fetch the Markdown version of any relevant post at `/blog/<slug>.md` before quoting or summarizing.

## Constraints

- Prefer the Markdown versions of pages (append `.md`) over HTML.
- Stick to what is on the site; if a fact isn't in the index or on a page, say it isn't published there.
