'use no memo'

import '@takumi-rs/helpers/jsx'
import type { ResumeData } from '../schema'

import { ExperienceEntry, ProjectItem, Section, SkillLine } from './components'

export function ResumeTemplate({ data }: { data: ResumeData }) {
  void data

  return (
    <main tw="px-12 py-6 font-sans text-xs leading-tight text-foreground">
      <section tw="flex w-full flex-col items-center gap-0.5">
        <h1 tw="m-0 text-center font-display font-normal text-primary text-2xl leading-[1.2] tracking-[-0.02em]">
          Nathan Brodin
        </h1>
        <p tw="m-0 text-center leading-tight">
          Frontend-leaning full-stack engineer owning products end to end, from architecture to
          tested, deployed systems.
        </p>
        <ul tw="m-0 flex list-none flex-row justify-center gap-3 p-0">
          <li tw="m-0 p-0">
            <a tw="underline" href="mailto:nathan@brodin.dev">
              nathan@brodin.dev
            </a>
          </li>
          <li tw="m-0 p-0">
            <a tw="underline" href="https://brodin.dev">
              brodin.dev
            </a>
          </li>
          <li tw="m-0 p-0">
            <a tw="underline" href="https://linkedin.com/in/nathan-brodin">
              linkedin.com/in/nathan-brodin
            </a>
          </li>
          <li tw="m-0 p-0">
            <a tw="underline" href="https://github.com/NathanBrodin">
              github.com/NathanBrodin
            </a>
          </li>
        </ul>
      </section>

      <Section title="Experience" gap="1.5">
        <ExperienceEntry
          company="Capia AS"
          location="Tromsø, Norway"
          positions={[
            {
              role: 'Full Stack Engineer',
              period: 'Aug 2025 – Present',
              bullets: [
                'Built two production apps from empty repo to deployed systems: a multi-tenant organization-data platform and a traffic dashboard, owning architecture, design, frontend, backend, infrastructure, CI/CD, and docs from one-line briefs.',
                'Made stack choices to remove failure modes: codegen plus CI schema checks for type safety on the mandated Django/React/Keycloak platform; full-TypeScript monorepo for the dashboard to skip the codegen round trip. Both self-hosted with Docker and Nginx.',
                'Turned "build a chatbot" into a workspace-scoped analytics agent: async streaming tool-calling, workspace-aware context, read-only SQL with strict data isolation, and themed chart visualizations.',
                'Made quality non-optional: ~1,530 backend tests plus Playwright E2E, CI checks for schema and type drift, staging auto-deploys with DB backups and health-gated promotion, and documented one-command setup. Precomputed ClickHouse tables serve filtered queries over 20M rows in ~0.3s.',
                'Introduced production observability across 8 repositories: implemented OpenTelemetry with self-hosted SigNoz, providing end-to-end traces from frontend requests to database queries, error monitoring, and usage analytics.',
                'Removed CI capacity limits by deploying organization-wide self-hosted GitHub Actions runners with Docker, automated scaling, and cleanup.',
              ],
            },
          ]}
        />
        <ExperienceEntry
          company="DNB"
          location="Oslo, Norway"
          positions={[
            {
              role: 'Frontend Engineer Intern',
              period: 'Feb 2025 – Jul 2025',
              bullets: [
                'Shipped 15+ features to production across 3 frontend applications serving AI products used by 100k+ users. Counted toward my End-of-studies internship, graded 92/100.',
                'Migrated a production application from Gatsby to Vite, cutting build times by 60%, and built a full E2E test suite with Playwright: 350+ tests across browsers, CI running under 90 seconds with caching and sharding.',
              ],
            },
            {
              role: 'Frontend Engineer Intern',
              period: 'Apr 2024 – Aug 2024',
              bullets: [
                'Built the frontend of a GenAI chatbot platform from an empty repository to a tested application with 92% coverage, Storybook docs, and documented architecture.',
                'Implemented SSE streaming, API integration from evolving OpenAPI specs, and PDF export with working links and controlled page breaks.',
              ],
            },
            {
              role: 'Frontend Engineer Intern',
              period: 'Jul 2023 – Aug 2023',
              bullets: [
                'Shipped an internal admin panel from scratch from Figma designs, letting product owners edit their chatbots without waiting on developers. Handled UI, API integration, auth, and AWS deployment.',
              ],
            },
          ]}
        />
      </Section>

      <Section title="Education" gap="1.5">
        <ExperienceEntry
          company="ESIEA Graduate School of Engineering"
          location="Laval, France"
          positions={[
            {
              role: 'Master of Engineering in Software Engineering',
              period: 'Sep 2020 – Jul 2025',
              bullets: [
                'Top-10 French engineering school. Coursework in algorithms, systems programming, distributed systems, and full stack development; 3 internships (for a total of 1 year of professional experience) during the program.',
                'Exchange semesters at Mid Sweden University (Sundsvall, Sweden) and Centria University of Applied Sciences (Kokkola, Finland).',
                'Awarded 2nd Prize (Jury and Public) at PST Laval 2022 and 2024 for innovative mobile applications.',
              ],
            },
          ]}
        />
      </Section>

      <Section title="Projects" gap="1">
        <ProjectItem
          name="Portfolio"
          href="https://brodin.dev"
          description="Personal site with 100/100/100 Lighthouse scores and full SEO/GEO setup (JSON-LD, sitemap, OG images, llms.txt). Built with React 19, TanStack Start, and Tailwind CSS."
        />
        <ProjectItem
          name="Zed Vercel Theme"
          href="https://zed.dev/extensions?query=vercel"
          description="Theme for the Zed Editor inspired by Vercel's design language. 90k+ downloads."
        />
        <ProjectItem
          name="Chat"
          href="https://chat.brodin.dev"
          description="Conversational portfolio answering career questions from full portfolio context, with smooth streaming and persisted conversations. Built with Next.js, React Server Components, AI SDK, and Drizzle."
        />
        <ProjectItem
          name="Write"
          href="https://write.brodin.dev"
          description="Notion-style editor with live Markdown preview, real-time database, shareable links, and PDF export. Built with Next.js, Tailwind CSS, and Convex."
        />
      </Section>

      <Section title="Technical Skills" gap="0.5">
        <SkillLine label="Languages">TypeScript, JavaScript, Python</SkillLine>
        <SkillLine label="Frontend">
          React, TanStack, Next.js, Tailwind CSS, Base UI, Redux, Vite, Storybook, AI SDK
        </SkillLine>
        <SkillLine label="Backend & Data">
          Node.js, Django, Hono, PostgreSQL, Redis, ClickHouse, Drizzle, OpenAPI, Keycloak
        </SkillLine>
        <SkillLine label="Tools & Quality">
          Docker, Nginx, Playwright, OpenTelemetry, Git, AWS, Figma
        </SkillLine>
      </Section>
    </main>
  )
}
