import { GitHubStars } from './github-stars'
import { ThemeToggle } from './theme-toggle'
import { Diamond } from './ui/diamond'

export function Header() {
  return (
    <header className="bg-background item-center sticky top-0 z-50 flex justify-center border-b px-4">
      <div className="item-center relative flex w-full max-w-5xl justify-between border-x px-4 py-1">
        <span className="font-display text-xl font-semibold">Portfolio</span>
        <div className="relative flex items-center">
          <GitHubStars repo="NathanBrodin/portfolio" />
          <span className="bg-border mx-2 flex h-4 w-px" />
          <ThemeToggle />
        </div>
        <Diamond bottom left />
        <Diamond bottom right />
      </div>
    </header>
  )
}
