import { Experience } from '.'

export const WORK_EXPERIENCES: Experience[] = [
  {
    id: 'capia',
    companyName: 'Capia AS',
    companyLogo:
      'https://images.squarespace-cdn.com/content/v1/5f27c912c34e3f4a2e5060b8/1597067506482-PKOV0OB9KXSE9IWDRNRV/logo.png?format=1500w',
    companyWebsite: 'https://capia.no/',
    positions: [
      {
        id: 'aaabbbccc',
        title: 'Full Stack Engineer',
        employmentPeriod: {
          start: '08.2025',
        },
        employmentType: 'Full-time',
        icon: 'code',
        description: `Built a production-grade web platform from scratch with full ownership over frontend, backend, and infrastructure.


      - Designed and implemented the full architecture with long-term scalability in mind
      - Implemented full RBAC, admin tooling, and resource management
      - Established end-to-end type safety using OpenAPI (drf-spectacular) and Orval-generated TanStack Query hooks
      - Built a modern frontend stack: React 19 (Compiler), Vite, TypeScript, TanStack Router/Query/Table/Pacer, Tailwind, shadcn/ui and coss ui, Base UI
      - Developed backend services with Django REST Framework, Redis caching, external ClickHouse integration, and PostgreSQL
      - Containerized the entire system with Docker and deployed via nginx on self-managed servers
      - Built optimized CI pipelines covering linting, builds, schema generation, and automated testing (~700 backend tests, ~100 Playwright E2E) with full caching and sharding
      - Wrote extensive documentation, DX tooling, DB seeding, and Makefile commands enabling full setup in a few commands`,
        skills: [
          'TypeScript',
          'React.js',
          'Tailwind CSS',
          'Tanstack',
          'Django',
          'Docker',
          'NGINX',
          'UI/UX Design',
          'Design System',
        ],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: 'dnb',
    companyName: 'DNB',
    companyLogo:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIA4kiHiaJvUAa97zmIfNwIIIg8tcTaXHrvw&s',
    companyWebsite: 'https://dnb.no',
    positions: [
      {
        id: 'zzzyyyxxx',
        title: 'Frontend Engineer Intern',
        employmentPeriod: {
          start: '02.2025',
          end: '07.2025',
        },
        employmentType: 'Internship',
        icon: 'code',
        description: `Worked across multiple AI products used by 100k+ users. Pushed production code weekly.

        - Built full E2E test suite (350+ tests across browsers) with Playwright, optimized CI to run in under 90s with caching and sharding
        - Refactored styling architecture, improving scalability and consistency
        - Led theming and dark mode implementation for DNB’s public chatbot UI (1.5M+ conversations/year)
        - Shipped 15+ features across all team projects
        - Migrated a production app from Gatsby to Vite, reducing build times by 60% and improving DX
        - Contributed to DNB's open-source design system (Eufemia)
        - Wrote technical documentation, analysis reports, and improved the overall DX for the team

        Went beyond dev work to bridge design and engineering, helping transform rough concepts into polished, scalable UI. Final internship credited toward my Master’s degree, graded 92/100 for technical depth and delivery.`,
        skills: ['TypeScript', 'React.js', 'CSS'],
      },
      {
        id: 'alskdjflksjlnklrkgsg',
        title: 'Frontend Engineer Intern',
        employmentPeriod: {
          start: '04.2024',
          end: '08.2024',
        },
        employmentType: 'Internship',
        icon: 'code',
        description: `Built a GenAI chatbot platform used by 100+ users. From blank repo to well-tested app (92% coverage, Storybook, documented architecture). Focused on developer experience: clean code, consistent styling, and full test setup. A step up in product impact and engineering quality.`,
        skills: [
          'TypeScript',
          'React.js',
          'CSS',
          'Redux',
          'Playwright',
          'Storybook',
        ],
      },
      {
        id: 'lkfdjglskngkrkewtjlkjvkljv',
        title: 'Frontend Engineer Intern',
        employmentPeriod: {
          start: '07.2023',
          end: '08.2023',
        },
        employmentType: 'Internship',
        icon: 'code',
        description: `Shipped an internal admin panel from scratch used by 10+ users, based on Figma designs. Small project with basic tech (CRA + JS), but good foundations. I handled everything from UI, API integration, auth, and deployment. My first production app.`,
        skills: ['JavaScript', 'React.js', 'CSS', 'Redux'],
      },
    ],
  },
]

export const EDUCATION: Experience[] = [
  {
    id: 'education',
    companyName: 'Education',
    positions: [
      {
        id: 'c47f5903-88ae-4512-8a50-0b91b0cf99b6',
        title: 'ESIEA Graduate School of Engineering',
        employmentType: 'Master of Engineering',
        employmentPeriod: {
          start: '09.2020',
          end: '07.2025',
        },
        icon: 'education',
        description: `Completed with exchange semesters in Finland, Sweden, and internships in Norway. Graduated with 92/100.`,
        skills: [
          'C',
          'Python',
          'JavaScript',
          'Full Stack Development',
          'Application Design',
          'Algorithms',
          'Systems Programming',
          'Distributed Systems',
        ],
      },
      {
        id: '70131ed8-36d9-4e54-8c78-eaed18240eca',
        title: 'Mid Sweden University',
        employmentType: 'Exchange Semester',
        employmentPeriod: {
          start: '09.2024',
          end: '01.2025',
        },
        icon: 'education',
        description: `Exchange Semester in Sundsvall, Sweden. Applying systems concepts both on paper and on the ski slopes.`,
        skills: [
          'IoT',
          'Advanced Networking',
          'Distributed Systems',
          'Algorithms',
        ],
      },
      {
        id: '36c4c6fb-02d0-48c0-8947-fda6e9a24af7',
        title: 'Centria University of Applied Sciences',
        employmentType: 'Exchange Semester',
        employmentPeriod: {
          start: '09.2022',
          end: '12.2022',
        },
        icon: 'education',
        description: `Exchange Semester in Kokkola, Finland. Enjoying the Northern Lights and the snow (and sometimes studying).`,
        skills: ['Python', 'C#', 'Object-Oriented Modeling', 'OS', 'SQL'],
      },
    ],
  },
]
