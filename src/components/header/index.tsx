import { allBlogPosts } from 'content-collections'
import { TextAlignStartIcon } from 'lucide-react'

import type { MenuItem } from '@/config'

import { GitHubStars } from '@/components/github-stars'
import { ThemeToggle } from '@/components/theme-toggle'
import { Diamond } from '@/components/ui/diamond'
import { OTHER_LINKS, PORTFOLIO_LINKS } from '@/config/portfolio-links'
import { SOCIAL_LINKS } from '@/config/social-links'

import { CommandMenu } from './command-menu'
import { Nav } from './nav'

export interface Group {
  value: string
  items: MenuItem[]
}

export function Header() {
  const posts = allBlogPosts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

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
    <header className="item-center sticky top-0 z-50 flex justify-center border-b bg-background px-4">
      <div className="item-center relative flex w-full max-w-5xl justify-between border-x px-4 py-1">
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
