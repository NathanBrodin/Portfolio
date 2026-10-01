import { useQuery } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import { TextAlignStartIcon } from 'lucide-react'

import type { MenuItem } from '@/config'

import { GitHubStars } from '@/components/github-stars'
import { ThemeToggle } from '@/components/theme-toggle'
import { Diamond } from '@/components/ui/diamond'
import { OTHER_LINKS, PORTFOLIO_LINKS } from '@/config/portfolio-links'
import { SOCIAL_LINKS } from '@/config/social-links'
import { getBlogNav as getServerBlogNav } from '@/lib/functions'

import { CommandMenu } from './command-menu'
import { Nav } from './nav'

export interface Group {
  value: string
  items: MenuItem[]
}

export function Header() {
  const getBlogNav = useServerFn(getServerBlogNav)
  // Blog index loads after mount inside the (hidden) menus, so the full
  // post collection never ships in the critical client bundle and can't
  // shift the header layout when it resolves.
  const { data: blogNav } = useQuery({
    queryKey: ['blog-nav'],
    queryFn: () => getBlogNav(),
    staleTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
  })

  const posts = blogNav ?? []

  const items: Group[] = [
    { items: PORTFOLIO_LINKS, value: 'Menu' },
    { items: SOCIAL_LINKS, value: 'Social Links' },
    {
      value: 'Blog posts',
      items: posts.map((post) => ({
        value: `/blog/${post.slug}`,
        label: post.title,
        icon: TextAlignStartIcon,
      })),
    },
    { items: OTHER_LINKS, value: 'Others' },
  ]
  return (
    <header className="sticky top-0 z-50 flex items-center justify-center border-b bg-background px-4 pt-[env(safe-area-inset-top)]">
      <div className="relative flex w-full max-w-5xl items-center justify-between border-x px-4 py-1">
        <Nav items={items} />
        <div className="relative flex items-center *:first:mr-4">
          <CommandMenu items={items} />
          <GitHubStars repo="NathanBrodin/Portfolio" />
          <span className="mx-2 flex h-4 w-px bg-border" />
          <ThemeToggle />
        </div>
        <Diamond bottom left />
        <Diamond bottom right />
      </div>
    </header>
  )
}
