/**
 * A technology item displayed in the Tech Stack section.
 *
 * Icon file resolution:
 * - Default: /public/tech-stack-icons/[key].svg
 * - Themed (when `theme === true`):
 *   - Dark:  /public/tech-stack-icons/[key]-dark.svg
 *   - Light: /public/tech-stack-icons/[key]-light.svg
 */
export type TechStack = {
  /** Unique identifier used to resolve icon files. */
  key: string
  /** Display name of the technology. */
  title: string
  /** Official website URL. */
  href: string
  /** Category tags used for grouping/filtering. */
  categories: string[]
  /** If true, use theme-specific icons for dark/light mode. */
  theme?: boolean
}

export const TECH_STACK: TechStack[] = [
  {
    key: 'typescript',
    title: 'TypeScript',
    href: 'https://www.typescriptlang.org/',
    categories: ['Language'],
  },
  {
    key: 'js',
    title: 'JavaScript',
    href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    categories: ['Language'],
  },
  {
    key: 'python',
    title: 'Python',
    href: 'https://www.python.org/',
    categories: ['Language'],
  },
  {
    key: 'django',
    title: 'Django',
    href: 'https://www.django-rest-framework.org/',
    categories: ['Framework'],
  },
  {
    key: 'nodejs',
    title: 'Node.js',
    href: 'https://nodejs.org/',
    categories: ['Runtime Environment'],
  },
  {
    key: 'bun',
    title: 'Bun',
    href: 'https://bun.sh/',
    categories: ['Runtime Environment'],
  },
  {
    key: 'react',
    title: 'React',
    href: 'https://react.dev/',
    categories: ['Library', 'UI Library'],
  },
  {
    key: 'nextjs2',
    title: 'Next.js',
    href: 'https://nextjs.org/',
    categories: ['Framework'],
    theme: true,
  },
  {
    key: 'tailwindcss',
    title: 'Tailwind CSS',
    href: 'https://tailwindcss.com/',
    categories: ['Framework'],
  },
  {
    key: 'shadcn-ui',
    title: 'shadcn/ui',
    href: 'https://ui.shadcn.com/',
    categories: ['Library', 'Component Library'],
    theme: true,
  },
  {
    key: 'radixui',
    title: 'Radix UI',
    href: 'https://www.radix-ui.com/',
    categories: ['Library', 'Component Library'],
    theme: true,
  },
  {
    key: 'base-ui',
    title: 'Base UI',
    href: 'https://base-ui.com/',
    categories: ['Library', 'Component Library'],
    theme: true,
  },
  {
    key: 'motion',
    title: 'Motion',
    href: 'https://motion.dev/',
    categories: ['Library', 'Animation'],
  },
  {
    key: 'tanstack',
    title: 'TanStack',
    href: 'https://tanstack.com/',
    categories: ['Library'],
    theme: true,
  },
  {
    key: 'redux',
    title: 'Redux',
    href: 'https://redux.js.org/',
    categories: ['State Management'],
  },
  {
    key: 'react-router',
    title: 'React Router',
    href: 'https://reactrouter.com/',
    categories: ['Library', 'Navigation'],
    theme: true,
  },
  {
    key: 'playwright',
    title: 'Playwright',
    href: 'https://playwright.dev/',
    categories: ['Library'],
  },
  {
    key: 'git',
    title: 'Git',
    href: 'https://git-scm.com/',
    categories: ['Version Control'],
  },
  {
    key: 'docker',
    title: 'Docker',
    href: 'https://www.docker.com/',
    categories: ['Containerization'],
  },
  {
    key: 'nginx',
    title: 'Nginx',
    href: 'https://nginx.org/',
    categories: ['Server'],
  },
  {
    key: 'vercel',
    title: 'Vercel',
    href: 'https://vercel.com/',
    categories: ['Deployment'],
    theme: true,
  },
  {
    key: 'postgresql',
    title: 'PostgreSQL',
    href: 'https://www.postgresql.org/',
    categories: ['Database'],
  },
  {
    key: 'redis',
    title: 'Redis',
    href: 'https://redis.io/',
    categories: ['Database'],
  },
  {
    key: 'figma',
    title: 'Figma',
    href: 'https://www.figma.com/',
    categories: ['Tools', 'Design'],
  },
  {
    key: 'vim',
    title: 'I use VIM btw',
    href: 'https://vim.org/',
    categories: ['Tools'],
  },
  {
    key: 'linux',
    title: 'Linux',
    href: 'https://www.linux.org/',
    categories: ['Operating Systems'],
  },
]
