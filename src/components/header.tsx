import { GitHubStars } from './github-stars'
import { ThemeToggle } from './theme-toggle'

export function Header() {
  return (
    <header className="sticky top-0 z-50 max-w-screen bg-background px-2 flex item-center justify-between">
      <span>Nathan</span>
      <div className="relative flex gap-1 items-center">
        <GitHubStars repo="NathanBrodin/portfolio" stargazersCount={0} />
        <ThemeToggle />
      </div>
    </header>
  )
}
