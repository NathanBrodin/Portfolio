import { Link } from '@tanstack/react-router'

import { GitHubStars } from '@/components/github-stars'
import { ThemeToggle } from '@/components/theme-toggle'

import { Button } from '../ui/button'
import { Diamond } from '../ui/diamond'
import { Logo } from '../ui/icons/logo'
import { CommandMenu } from './command-menu'
import { Nav } from './nav'

export function Header() {
  return (
    <header className="bg-background item-center sticky top-0 z-50 flex justify-center border-b px-4">
      <div className="item-center relative flex w-full max-w-5xl justify-between border-x px-4 py-1">
        <div className="flex items-center">
          <Button size="icon" variant="ghost" render={<Link to="/" />}>
            <Logo className="text-primary mr-2" size={16} />
          </Button>
          <Nav />
        </div>
        <div className="relative flex items-center *:first:mr-4">
          <CommandMenu />
          <GitHubStars repo="NathanBrodin/Portfolio" />
          <span className="bg-border mx-2 flex h-4 w-px" />
          <ThemeToggle />
        </div>
        <Diamond bottom left />
        <Diamond bottom right />
      </div>
    </header>
  )
}
