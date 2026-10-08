import type { Resume } from './schema'

export const baseResume: Resume = {
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
    'Frontend-leaning full-stack engineer. I build fast, accessible, polished web apps — owning features end to end, from architecture to deployed systems.',
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
        'Built two production apps from empty repo to deployed: a multi-tenant data platform and a traffic dashboard.',
        'Own everything end to end: architecture, design, frontend, backend, infra, CI/CD, docs.',
        'Type-safe end to end with OpenAPI-generated types; OpenTelemetry across 8 repos into self-hosted SigNoz.',
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
        'Three summers on design-system-driven web apps; shipped accessible, tested UI with designers and engineers.',
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
        'Statically pre-rendered personal portfolio: 100s on Lighthouse performance, accessibility, SEO.',
        'Full SEO setup: JSON-LD, sitemap, OG images, llms.txt, Markdown-rendered posts.',
      ],
    },
    {
      id: 'ui',
      name: 'UI component library',
      link: 'https://ui.brodin.dev',
      skills: ['TypeScript', 'React', 'Tailwind CSS', 'Base UI'],
      bullets: [
        'Personal shadcn/ui registry and docs site with a Zed-inspired theme.',
        'Reusable, accessible components on Base UI primitives.',
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
        'Top-10 French engineering school. Algorithms, systems, and full-stack coursework, three internships, two exchange semesters.',
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
