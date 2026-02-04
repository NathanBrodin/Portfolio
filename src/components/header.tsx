import { GitHubStars } from './github-stars'
import { ThemeToggle } from './theme-toggle'
import { Diamond } from './ui/diamond'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background px-4 border-b flex item-center justify-center">
      <div className="flex item-center justify-between border-x w-full px-4 py-1 max-w-5xl relative">
        <span className="font-display text-xl font-semibold">Nathan</span>
        <div className="relative flex items-center">
          <GitHubStars repo="NathanBrodin/portfolio" />
          <span className="mx-2 flex h-4 w-px bg-border" />
          <ThemeToggle />
        </div>
        <Diamond bottom left />
        <Diamond bottom right />
      </div>
    </header>
  )
}
