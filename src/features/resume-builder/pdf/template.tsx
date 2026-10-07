'use no memo'

import '@takumi-rs/helpers/jsx'
import type { ResumeData } from '../schema'

export function ResumePdfDocument({ data }: { data: ResumeData }) {
  void data

  return (
    <main tw="px-12 py-6 text-xs leading-tight">
      <section tw="flex w-full flex-col items-center gap-0.5">
        <h1 tw="m-0 text-center text-2xl font-bold leading-none">Nathan Brodin</h1>
        <p tw="m-0 text-center text-sm leading-tight">Software Engineer</p>
        <ul tw="m-0 flex list-none flex-row justify-center gap-3 p-0">
          <li tw="m-0 p-0">
            <a href="mailto:nathan@brodin.dev">nathan@brodin.dev</a>
          </li>
          <li tw="m-0 p-0">
            <a href="https://brodin.dev">brodin.dev</a>
          </li>
          <li tw="m-0 p-0">
            <a href="https://linkedin.com/in/nathan-brodin">linkedin.com/in/nathan-brodin</a>
          </li>
          <li tw="m-0 p-0">
            <a href="https://github.com/NathanBrodin">github.com/NathanBrodin</a>
          </li>
        </ul>
      </section>

      <section tw="mt-4">
        <h2 tw="m-0 border-b pb-0.5 text-sm font-bold uppercase leading-tight">Experience</h2>
        <div tw="mt-1">
          <div tw="flex flex-row justify-between">
            <p tw="m-0">
              <strong>Capia AS</strong>
            </p>
            <p tw="m-0">Tromsø, Norway</p>
          </div>
          <div tw="flex flex-row justify-between">
            <p tw="m-0">
              <em>Full Stack Engineer</em>
            </p>
            <p tw="m-0">
              <em>Aug 2025 – Present</em>
            </p>
          </div>
          <ul tw="m-0 list-disc pl-5 mt-1">
            <li tw="m-0">
              Built a production-grade web application from scratch: React 19 frontend with TanStack
              Router/Query, Django REST Framework backend with PostgreSQL, Redis, and ClickHouse,
              deployed via Docker and NGINX on self-managed servers.
            </li>
            <li tw="m-0">
              Implemented full end-to-end type safety using OpenAPI schema generation and
              auto-generated TanStack Query hooks, along with RBAC, admin tooling, and resource
              management features.
            </li>
            <li tw="m-0">
              Set up CI pipelines covering linting, builds, schema generation, and automated testing
              (~700 backend tests, ~100 Playwright E2E tests) with caching and sharding. Wrote full
              documentation, DX tooling, and database seeding.
            </li>
            <li tw="m-0">
              Own features end to end from one-line briefs: set up OpenTelemetry tracing across 8
              repos into self-hosted SigNoz and moved CI to self-hosted runners.
            </li>
          </ul>
        </div>
        <div tw="mt-1.5">
          <div tw="flex flex-row justify-between">
            <p tw="m-0">
              <strong>DNB</strong>
            </p>
            <p tw="m-0">Oslo, Norway</p>
          </div>
          <div tw="flex flex-row justify-between">
            <p tw="m-0">
              <em>Frontend Engineer Intern</em>
            </p>
            <p tw="m-0">
              <em>Feb 2025 – Jul 2025</em>
            </p>
          </div>
          <ul tw="m-0 list-disc pl-5 mt-1">
            <li tw="m-0">
              Shipped 15+ features to production across 3 frontend applications serving AI products
              used by 100k+ users. End-of-studies internship graded 92/100.
            </li>
            <li tw="m-0">
              Migrated a production application from Gatsby to Vite, cutting build times by 60%, and
              built a full E2E test suite with Playwright: 350+ tests across browsers, CI running
              under 90 seconds with caching and sharding.
            </li>
          </ul>
        </div>
        <div tw="mt-1.5">
          <div tw="flex flex-row justify-between">
            <p tw="m-0">
              <strong>DNB</strong>
            </p>
            <p tw="m-0">Oslo, Norway</p>
          </div>
          <div tw="flex flex-row justify-between">
            <p tw="m-0">
              <em>Frontend Engineer Intern</em>
            </p>
            <p tw="m-0">
              <em>Apr 2024 – Aug 2024</em>
            </p>
          </div>
          <ul tw="m-0 list-disc pl-5 mt-1">
            <li tw="m-0">
              Built the frontend of a GenAI chatbot platform from blank repository to well-tested
              application with 92% test coverage and documented architecture.
            </li>
            <li tw="m-0">
              Established developer experience standards including Storybook component
              documentation, consistent styling conventions, and a comprehensive testing setup.
            </li>
          </ul>
        </div>
        <div tw="mt-1.5">
          <div tw="flex flex-row justify-between">
            <p tw="m-0">
              <strong>DNB</strong>
            </p>
            <p tw="m-0">Oslo, Norway</p>
          </div>
          <div tw="flex flex-row justify-between">
            <p tw="m-0">
              <em>Frontend Engineer Intern</em>
            </p>
            <p tw="m-0">
              <em>Jul 2023 – Aug 2023</em>
            </p>
          </div>
          <ul tw="m-0 list-disc pl-5 mt-1">
            <li tw="m-0">
              Shipped an internal admin panel from scratch based on Figma designs, used by 10+
              users.
            </li>
            <li tw="m-0">
              Handled end-to-end ownership: UI implementation, API integration, authentication, and
              deployment.
            </li>
          </ul>
        </div>
      </section>

      <section tw="mt-4">
        <h2 tw="m-0 border-b pb-0.5 text-sm font-bold uppercase leading-tight">Education</h2>
        <div tw="mt-1">
          <div tw="flex flex-row justify-between">
            <p tw="m-0">
              <strong>ESIEA Graduate School of Engineering</strong>
            </p>
            <p tw="m-0">Laval, France</p>
          </div>
          <div tw="flex flex-row justify-between">
            <p tw="m-0">
              <em>Master of Engineering in Software Engineering — Graduated 92/100</em>
            </p>
            <p tw="m-0">
              <em>Sep 2020 – Jul 2025</em>
            </p>
          </div>
          <ul tw="m-0 list-disc pl-5 mt-1">
            <li tw="m-0">
              Coursework in algorithms, systems programming, distributed systems, and full stack
              development. Completed 3 internships (1 year of professional experience) during the
              program.
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
        <h2 tw="m-0 border-b pb-0.5 text-sm font-bold uppercase leading-tight">Projects</h2>
        <div tw="mt-1 flex flex-col gap-1">
          <p tw="m-0">
            <strong>Chat</strong> — AI-powered conversational portfolio using React Server
            Components with streaming. Built with Next.js, Vercel AI SDK, Tailwind CSS, and Drizzle.
          </p>
          <p tw="m-0">
            <strong>Zed Vercel Theme</strong> — A theme for the Zed Editor inspired by Vercel&apos;s
            design language. Top 15 most downloaded with 52k+ downloads.
          </p>
          <p tw="m-0">
            <strong>Portfolio</strong> — Personal website built with React 19, TanStack Start, and
            Tailwind CSS. SSR, SEO-optimized, perfect Lighthouse score.
          </p>
          <p tw="m-0">
            <strong>Write</strong> — Notion-style markdown editor with real-time preview and PDF
            export. Built with Next.js, Tailwind CSS, and Convex.
          </p>
        </div>
      </section>

      <section tw="mt-4">
        <h2 tw="m-0 border-b pb-0.5 text-sm font-bold uppercase leading-tight">Technical Skills</h2>
        <div tw="mt-1 flex flex-col gap-0.5">
          <p tw="m-0">
            <strong>Languages: </strong>TypeScript, JavaScript, Python, C
          </p>
          <p tw="m-0">
            <strong>Frameworks &amp; Libraries: </strong>React, Next.js, Django, TanStack, Tailwind
            CSS, Redux, shadcn/ui, Base UI, Playwright
          </p>
          <p tw="m-0">
            <strong>Tools &amp; Infrastructure: </strong>Docker, NGINX, Git, Linux, Vercel, Figma
          </p>
          <p tw="m-0">
            <strong>Databases: </strong>PostgreSQL, Redis
          </p>
        </div>
      </section>
    </main>
  )
}
