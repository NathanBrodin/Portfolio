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
  category: string
  /** If true, use theme-specific icons for dark/light mode. */
  theme?: boolean
}

export const TECH_STACK: TechStack[] = [
  {
    key: 'typescript',
    title: 'TypeScript',
    href: 'https://www.typescriptlang.org/',
    category: 'Languages',
  },
  {
    key: 'js',
    title: 'JavaScript',
    href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    category: 'Languages',
  },
  {
    key: 'python',
    title: 'Python',
    href: 'https://www.python.org/',
    category: 'Languages',
  },
  {
    key: 'django',
    title: 'Django',
    href: 'https://www.django-rest-framework.org/',
    category: 'Backend',
  },
  {
    key: 'nodejs',
    title: 'Node.js',
    href: 'https://nodejs.org/',
    category: 'Backend',
  },
  {
    key: 'bun',
    title: 'Bun',
    href: 'https://bun.sh/',
    category: 'Backend',
  },
  {
    key: 'react',
    title: 'React',
    href: 'https://react.dev/',
    category: 'Frontend',
  },
  {
    key: 'nextjs2',
    title: 'Next.js',
    href: 'https://nextjs.org/',
    category: 'Frontend',
    theme: true,
  },
  {
    key: 'tailwindcss',
    title: 'Tailwind CSS',
    href: 'https://tailwindcss.com/',
    category: 'Frontend',
  },
  {
    key: 'shadcn-ui',
    title: 'shadcn/ui',
    href: 'https://ui.shadcn.com/',
    category: 'Frontend',
    theme: true,
  },
  {
    key: 'radixui',
    title: 'Radix UI',
    href: 'https://www.radix-ui.com/',
    category: 'Frontend',
    theme: true,
  },
  {
    key: 'base-ui',
    title: 'Base UI',
    href: 'https://base-ui.com/',
    category: 'Frontend',
    theme: true,
  },
  {
    key: 'motion',
    title: 'Motion',
    href: 'https://motion.dev/',
    category: 'Frontend',
  },
  {
    key: 'tanstack',
    title: 'TanStack',
    href: 'https://tanstack.com/',
    category: 'Frontend',
    theme: true,
  },
  {
    key: 'redux',
    title: 'Redux',
    href: 'https://redux.js.org/',
    category: 'Frontend',
  },
  {
    key: 'react-router',
    title: 'React Router',
    href: 'https://reactrouter.com/',
    category: 'Frontend',
    theme: true,
  },
  {
    key: 'playwright',
    title: 'Playwright',
    href: 'https://playwright.dev/',
    category: 'Tools',
  },
  {
    key: 'git',
    title: 'Git',
    href: 'https://git-scm.com/',
    category: 'Tools',
  },
  {
    key: 'docker',
    title: 'Docker',
    href: 'https://www.docker.com/',
    category: 'Infrastructure',
  },
  {
    key: 'nginx',
    title: 'Nginx',
    href: 'https://nginx.org/',
    category: 'Infrastructure',
  },
  {
    key: 'vercel',
    title: 'Vercel',
    href: 'https://vercel.com/',
    category: 'Infrastructure',
    theme: true,
  },
  {
    key: 'postgresql',
    title: 'PostgreSQL',
    href: 'https://www.postgresql.org/',
    category: 'Database',
  },
  {
    key: 'redis',
    title: 'Redis',
    href: 'https://redis.io/',
    category: 'Database',
  },
  {
    key: 'figma',
    title: 'Figma',
    href: 'https://www.figma.com/',
    category: 'Tools',
  },
  {
    key: 'vim',
    title: 'I use VIM btw',
    href: 'https://vim.org/',
    category: 'Tools',
  },
  {
    key: 'linux',
    title: 'Linux',
    href: 'https://www.linux.org/',
    category: 'Infrastructure',
  },
]
