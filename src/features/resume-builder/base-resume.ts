import type { ResumeData } from './schema'

export const baseResume: ResumeData = {
  basics: {
    name: 'Nathan Brodin',
    headline: 'Frontend Engineer',
    email: 'nathan@brodin.dev',
    location: 'Tromsø, Norway',
    linkedin: 'https://linkedin.com/in/nathan-brodin',
    github: 'https://github.com/NathanBrodin',
    websiteUrl: 'https://brodin.dev',
    websiteLabel: 'brodin.dev',
  },
  summary:
    'Frontend-leaning full-stack engineer. I build things for the web that are fast, accessible, documented, and polished — owning features end to end, from architecture to deployed systems.',
  experience: [
    {
      id: 'capia',
      company: 'Capia AS',
      role: 'Full Stack Engineer',
      location: 'Tromsø, Norway',
      start: '2025-08',
      end: '',
      current: true,
      skills: ['TypeScript', 'React', 'TanStack', 'Tailwind CSS', 'Django', 'PostgreSQL'],
      bullets: [
        'Built two production apps from empty repo to deployed systems: a multi-tenant organization-data platform and a traffic dashboard.',
        'Own everything end to end: architecture, design, frontend, backend, infrastructure, CI/CD, and docs.',
        'Type safety end to end: frontend types generated from the backend OpenAPI schema, CI fails on drift.',
        'Set up OpenTelemetry across 8 repos into self-hosted SigNoz, from frontend API calls down to DB queries.',
      ],
    },
    {
      id: 'dnb',
      company: 'DNB',
      role: 'Frontend Developer Intern',
      location: 'Oslo, Norway',
      start: '2023-06',
      end: '2025-12',
      current: false,
      skills: ['TypeScript', 'React', 'Design Systems'],
      bullets: [
        'Frontend intern across three summers, working on design-system-driven web applications.',
        'Shipped accessible, tested UI in close collaboration with designers and engineers.',
      ],
    },
  ],
  projects: [
    {
      id: 'portfolio',
      name: 'Portfolio',
      link: 'https://brodin.dev',
      skills: ['TypeScript', 'React', 'TanStack Start', 'Tailwind CSS', 'SEO'],
      bullets: [
        'Personal portfolio with static pre-rendering, 100 Lighthouse scores on performance, accessibility, and SEO.',
        'Full SEO setup: JSON-LD, sitemap, per-route OG images, llms.txt, and Markdown rendering of every post.',
      ],
    },
    {
      id: 'ui',
      name: 'UI component library',
      link: 'https://ui.brodin.dev',
      skills: ['TypeScript', 'React', 'Tailwind CSS', 'Base UI'],
      bullets: [
        'Personal shadcn/ui registry and documentation site with a Zed-inspired theme.',
        'Migrated toward Base UI primitives with reusable, accessible form and table components.',
      ],
    },
  ],
  education: [
    {
      id: 'esiea',
      school: 'ESIEA Graduate School of Engineering',
      degree: 'Master of Engineering, Software Engineering',
      location: 'Paris, France',
      start: '2020-09',
      end: '2025-07',
      details:
        'Top-10 French engineering school. Coursework across algorithms, systems programming, and full-stack development, plus three internships and two exchange semesters.',
    },
  ],
  skills: [
    {
      id: 'frontend',
      category: 'Frontend',
      items: ['TypeScript', 'React', 'TanStack Router', 'Tailwind CSS', 'Base UI'],
    },
    {
      id: 'backend',
      category: 'Backend & Infra',
      items: ['Node.js', 'Hono', 'PostgreSQL', 'Docker', 'Nginx'],
    },
    {
      id: 'quality',
      category: 'Quality',
      items: ['Playwright', 'Vitest', 'CI/CD', 'OpenTelemetry'],
    },
  ],
}
