'use no memo'

import '@takumi-rs/helpers/jsx'
import type { ResumeData } from '../schema'

export function ResumeTemplate({ data }: { data: ResumeData }) {
  void data

  return (
    <main tw="px-12 py-6 font-sans text-xs leading-tight text-foreground">
      <section tw="flex w-full flex-col items-center gap-0.5">
        <h1 tw="m-0 text-center font-display text-primary text-2xl leading-none">Nathan Brodin</h1>
        <p tw="m-0 text-center leading-tight">
          Frontend-leaning full-stack engineer owning products end to end, from architecture to
          tested, deployed systems.
        </p>
        <ul tw="m-0 flex list-none flex-row justify-center gap-3 p-0">
          <li tw="m-0 p-0">
            <a tw="font-medium text-primary underline" href="mailto:nathan@brodin.dev">
              nathan@brodin.dev
            </a>
          </li>
          <li tw="m-0 p-0">
            <a tw="font-medium text-primary underline" href="https://brodin.dev">
              brodin.dev
            </a>
          </li>
          <li tw="m-0 p-0">
            <a tw="font-medium text-primary underline" href="https://linkedin.com/in/nathan-brodin">
              linkedin.com/in/nathan-brodin
            </a>
          </li>
          <li tw="m-0 p-0">
            <a tw="font-medium text-primary underline" href="https://github.com/NathanBrodin">
              github.com/NathanBrodin
            </a>
          </li>
        </ul>
      </section>

      <section tw="mt-4">
        <h2 tw="m-0 border-b border-border pb-0.5 font-display text-primary text-sm font-bold leading-tight">
          Experience
        </h2>
        <div tw="mt-1">
          <div tw="flex flex-row justify-between">
            <p tw="m-0">
              <strong>Capia AS</strong>
            </p>
            <p tw="m-0 text-muted-foreground">Tromsø, Norway</p>
          </div>
          <div tw="flex flex-row justify-between">
            <p tw="m-0">
              <span tw="text-muted-foreground">Full Stack Engineer</span>
            </p>
            <p tw="m-0">
              <span tw="text-muted-foreground">Aug 2025 – Present</span>
            </p>
          </div>
          <ul tw="m-0 mt-1 list-disc pl-5">
            <li tw="m-0">
              Built two production apps from empty repo to deployed systems: a multi-tenant
              organization-data platform and a traffic dashboard, owning architecture, design,
              frontend, backend, infrastructure, CI/CD, and docs from one-line briefs.
            </li>
            <li tw="m-0">
              Made stack choices to remove failure modes: codegen plus CI schema checks for type
              safety on the mandated Django/React/Keycloak platform; full-TypeScript monorepo for
              the dashboard to skip the codegen round trip. Both self-hosted with Docker and Nginx.
            </li>
            <li tw="m-0">
              Turned &quot;build a chatbot&quot; into a workspace-scoped analytics agent: async
              streaming tool-calling, workspace-aware context, read-only SQL with strict data
              isolation, and themed chart visualizations.
            </li>
            <li tw="m-0">
              Made quality non-optional: ~1,530 backend tests plus Playwright E2E, CI checks for
              schema and type drift, staging auto-deploys with DB backups and health-gated
              promotion, and documented one-command setup. Precomputed ClickHouse tables serve
              filtered queries over 20M rows in ~0.3s.
            </li>
            <li tw="m-0">
              Introduced production observability across 8 repositories: implemented OpenTelemetry
              with self-hosted SigNoz, providing end-to-end traces from frontend requests to
              database queries, error monitoring, and usage analytics.
            </li>
            <li tw="m-0">
              Removed CI capacity limits by deploying organization-wide self-hosted GitHub Actions
              runners with Docker, automated scaling, and cleanup.
            </li>
          </ul>
        </div>
        <div tw="mt-1.5">
          <div tw="flex flex-row justify-between">
            <p tw="m-0">
              <strong>DNB</strong>
            </p>
            <p tw="m-0 text-muted-foreground">Oslo, Norway</p>
          </div>
          <div tw="flex flex-row justify-between">
            <p tw="m-0">
              <span tw="text-muted-foreground">Frontend Engineer Intern</span>
            </p>
            <p tw="m-0">
              <span tw="text-muted-foreground">Feb 2025 – Jul 2025</span>
            </p>
          </div>
          <ul tw="m-0 list-disc pl-5 mt-1">
            <li tw="m-0">
              Shipped 15+ features to production across 3 frontend applications serving AI products
              used by 100k+ users. Counted toward my End-of-studies internship, graded 92/100.
            </li>
            <li tw="m-0">
              Migrated a production application from Gatsby to Vite, cutting build times by 60%, and
              built a full E2E test suite with Playwright: 350+ tests across browsers, CI running
              under 90 seconds with caching and sharding.
            </li>
          </ul>
          <div tw="flex flex-row justify-between mt-1">
            <p tw="m-0">
              <span tw="text-muted-foreground">Frontend Engineer Intern</span>
            </p>
            <p tw="m-0">
              <span tw="text-muted-foreground">Apr 2024 – Aug 2024</span>
            </p>
          </div>
          <ul tw="m-0 list-disc pl-5 mt-1">
            <li tw="m-0">
              Built the frontend of a GenAI chatbot platform from an empty repository to a tested
              application with 92% coverage, Storybook docs, and documented architecture.
            </li>
            <li tw="m-0">
              Implemented SSE streaming, API integration from evolving OpenAPI specs, and PDF export
              with working links and controlled page breaks.
            </li>
          </ul>
          <div tw="flex flex-row justify-between mt-1">
            <p tw="m-0">
              <span tw="text-muted-foreground">Frontend Engineer Intern</span>
            </p>
            <p tw="m-0">
              <span tw="text-muted-foreground">Jul 2023 – Aug 2023</span>
            </p>
          </div>
          <ul tw="m-0 list-disc pl-5 mt-1">
            <li tw="m-0">
              Shipped an internal admin panel from scratch from Figma designs, letting product
              owners edit their chatbots without waiting on developers. Handled UI, API integration,
              auth, and AWS deployment.
            </li>
          </ul>
        </div>
      </section>

      <section tw="mt-4">
        <h2 tw="m-0 border-b border-border pb-0.5 font-display text-primary text-sm font-bold leading-tight">
          Education
        </h2>
        <div tw="mt-1">
          <div tw="flex flex-row justify-between">
            <p tw="m-0">
              <strong>ESIEA Graduate School of Engineering</strong>
            </p>
            <p tw="m-0 text-muted-foreground">Laval, France</p>
          </div>
          <div tw="flex flex-row justify-between">
            <p tw="m-0">
              <span tw="text-muted-foreground">Master of Engineering in Software Engineering</span>
            </p>
            <p tw="m-0">
              <span tw="text-muted-foreground">Sep 2020 – Jul 2025</span>
            </p>
          </div>
          <ul tw="m-0 list-disc pl-5 mt-1">
            <li tw="m-0">
              Top-10 French engineering school. Coursework in algorithms, systems programming,
              distributed systems, and full stack development; 3 internships (for a total of 1 year
              of professional experience) during the program.
            </li>
            <li tw="m-0">
              Exchange semesters at Mid Sweden University (Sundsvall, Sweden) and Centria University
              of Applied Sciences (Kokkola, Finland).
            </li>
            <li tw="m-0">
              Awarded 2nd Prize (Jury and Public) at PST Laval 2022 and 2024 for innovative mobile
              applications.
            </li>
          </ul>
        </div>
      </section>

      <section tw="mt-4">
        <h2 tw="m-0 border-b border-border pb-0.5 font-display text-primary text-sm font-bold leading-tight">
          Projects
        </h2>
        <div tw="mt-1 flex flex-col gap-1">
          <p tw="m-0">
            <strong>
              <a tw="font-medium text-primary underline" href="https://brodin.dev">
                Portfolio
              </a>
            </strong>{' '}
            — Personal site with 100/100/100 Lighthouse scores and full SEO/GEO setup (JSON-LD,
            sitemap, OG images, llms.txt). Built with React 19, TanStack Start, and Tailwind CSS.
          </p>
          <p tw="m-0">
            <strong>
              <a
                tw="font-medium text-primary underline"
                href="https://zed.dev/extensions?query=vercel"
              >
                Zed Vercel Theme
              </a>
            </strong>{' '}
            — Theme for the Zed Editor inspired by Vercel&apos;s design language. 90k+ downloads.
          </p>
          <p tw="m-0">
            <strong>
              <a tw="font-medium text-primary underline" href="https://chat.brodin.dev">
                Chat
              </a>
            </strong>{' '}
            — Conversational portfolio answering career questions from full portfolio context, with
            smooth streaming and persisted conversations. Built with Next.js, React Server
            Components, AI SDK, and Drizzle.
          </p>
          <p tw="m-0">
            <strong>
              <a tw="font-medium text-primary underline" href="https://write.brodin.dev">
                Write
              </a>
            </strong>{' '}
            — Notion-style editor with live Markdown preview, real-time database, shareable links,
            and PDF export. Built with Next.js, Tailwind CSS, and Convex.
          </p>
        </div>
      </section>

      <section tw="mt-4">
        <h2 tw="m-0 border-b border-border pb-0.5 font-display text-primary text-sm font-bold leading-tight">
          Technical Skills
        </h2>
        <div tw="mt-1 flex flex-col gap-0.5">
          <p tw="m-0">
            <strong>Languages: </strong>TypeScript, JavaScript, Python
          </p>
          <p tw="m-0">
            <strong>Frontend: </strong>React, TanStack, Next.js, Tailwind CSS, Base UI, Redux, Vite,
            Storybook, AI SDK
          </p>
          <p tw="m-0">
            <strong>Backend &amp; Data: </strong>Node.js, Django, Hono, PostgreSQL, Redis,
            ClickHouse, Drizzle, OpenAPI, Keycloak
          </p>
          <p tw="m-0">
            <strong>Tools &amp; Quality: </strong>Docker, Nginx, Playwright, OpenTelemetry, Git,
            AWS, Figma
          </p>
        </div>
      </section>
    </main>
  )
}
