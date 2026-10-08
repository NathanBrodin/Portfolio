import type { Resume } from './schema'

export const baseResume: Resume = {
  basics: {
    name: 'Nathan Brodin',
    headline:
      'Frontend-leaning full-stack engineer owning products end to end, from architecture to tested, deployed systems.',
    links: [
      { label: 'nathan@brodin.dev', href: 'mailto:nathan@brodin.dev' },
      { label: 'brodin.dev', href: 'https://brodin.dev' },
      { label: 'linkedin.com/in/nathan-brodin', href: 'https://linkedin.com/in/nathan-brodin' },
      { label: 'github.com/NathanBrodin', href: 'https://github.com/NathanBrodin' },
    ],
  },
  experience: [
    {
      id: 'capia',
      company: 'Capia AS',
      location: 'Tromsø, Norway',
      positions: [
        {
          role: 'Full Stack Engineer',
          start: '2025-08',
          bullets: [
            'Built two production apps from empty repo to deployed systems: a multi-tenant organization-data platform and a traffic dashboard, owning architecture, design, frontend, backend, infrastructure, CI/CD, and docs from one-line briefs.',
            'Made stack choices to remove failure modes: codegen plus CI schema checks for type safety on the mandated Django/React/Keycloak platform; full-TypeScript monorepo for the dashboard to skip the codegen round trip. Both self-hosted with Docker and Nginx.',
            'Turned "build a chatbot" into a workspace-scoped analytics agent: async streaming tool-calling, workspace-aware context, read-only SQL with strict data isolation, and themed chart visualizations.',
            'Made quality non-optional: ~1,530 backend tests plus Playwright E2E, CI checks for schema and type drift, staging auto-deploys with DB backups and health-gated promotion, and documented one-command setup. Precomputed ClickHouse tables serve filtered queries over 20M rows in ~0.3s.',
            'Introduced production observability across 8 repositories: implemented OpenTelemetry with self-hosted SigNoz, providing end-to-end traces from frontend requests to database queries, error monitoring, and usage analytics.',
            'Removed CI capacity limits by deploying organization-wide self-hosted GitHub Actions runners with Docker, automated scaling, and cleanup.',
          ],
        },
      ],
    },
    {
      id: 'dnb',
      company: 'DNB',
      location: 'Oslo, Norway',
      positions: [
        {
          role: 'Frontend Engineer Intern',
          start: '2025-02',
          end: '2025-07',
          bullets: [
            'Shipped 15+ features to production across 3 frontend applications serving AI products used by 100k+ users. Counted toward my End-of-studies internship, graded 92/100.',
            'Migrated a production application from Gatsby to Vite, cutting build times by 60%, and built a full E2E test suite with Playwright: 350+ tests across browsers, CI running under 90 seconds with caching and sharding.',
          ],
        },
        {
          role: 'Frontend Engineer Intern',
          start: '2024-04',
          end: '2024-08',
          bullets: [
            'Built the frontend of a GenAI chatbot platform from an empty repository to a tested application with 92% coverage, Storybook docs, and documented architecture.',
            'Implemented SSE streaming, API integration from evolving OpenAPI specs, and PDF export with working links and controlled page breaks.',
          ],
        },
        {
          role: 'Frontend Engineer Intern',
          start: '2023-07',
          end: '2023-08',
          bullets: [
            'Shipped an internal admin panel from scratch from Figma designs, letting product owners edit their chatbots without waiting on developers. Handled UI, API integration, auth, and AWS deployment.',
          ],
        },
      ],
    },
  ],
  education: [
    {
      id: 'esiea',
      school: 'ESIEA Graduate School of Engineering',
      degree: 'Master of Engineering in Software Engineering',
      location: 'Laval, France',
      start: '2020-09',
      end: '2025-07',
      bullets: [
        'Top-10 French engineering school. Coursework in algorithms, systems programming, distributed systems, and full stack development; 3 internships (for a total of 1 year of professional experience) during the program.',
        'Exchange semesters at Mid Sweden University (Sundsvall, Sweden) and Centria University of Applied Sciences (Kokkola, Finland).',
        'Awarded 2nd Prize (Jury and Public) at PST Laval 2022 and 2024 for innovative mobile applications.',
      ],
    },
  ],
  projects: [
    {
      id: 'portfolio',
      name: 'Portfolio',
      link: 'https://brodin.dev',
      description:
        'Personal site with 100/100/100 Lighthouse scores and full SEO/GEO setup (JSON-LD, sitemap, OG images, llms.txt). Built with React 19, TanStack Start, and Tailwind CSS.',
    },
    {
      id: 'zed-vercel-theme',
      name: 'Zed Vercel Theme',
      link: 'https://zed.dev/extensions?query=vercel',
      description: "Theme for the Zed Editor inspired by Vercel's design language. 90k+ downloads.",
    },
    {
      id: 'chat',
      name: 'Chat',
      link: 'https://chat.brodin.dev',
      description:
        'Conversational portfolio answering career questions from full portfolio context, with smooth streaming and persisted conversations. Built with Next.js, React Server Components, AI SDK, and Drizzle.',
    },
    {
      id: 'write',
      name: 'Write',
      link: 'https://write.brodin.dev',
      description:
        'Notion-style editor with live Markdown preview, real-time database, shareable links, and PDF export. Built with Next.js, Tailwind CSS, and Convex.',
    },
  ],
  skills: [
    {
      id: 'languages',
      category: 'Languages',
      items: ['TypeScript', 'JavaScript', 'Python'],
    },
    {
      id: 'frontend',
      category: 'Frontend',
      items: [
        'React',
        'TanStack',
        'Next.js',
        'Tailwind CSS',
        'Base UI',
        'Redux',
        'Vite',
        'Storybook',
        'AI SDK',
      ],
    },
    {
      id: 'backend',
      category: 'Backend & Data',
      items: [
        'Node.js',
        'Django',
        'Hono',
        'PostgreSQL',
        'Redis',
        'ClickHouse',
        'Drizzle',
        'OpenAPI',
        'Keycloak',
      ],
    },
    {
      id: 'tools',
      category: 'Tools & Quality',
      items: ['Docker', 'Nginx', 'Playwright', 'OpenTelemetry', 'Git', 'AWS', 'Figma'],
    },
  ],
}
