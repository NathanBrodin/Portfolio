import { Diamond } from './ui/diamond'
import { Icons } from './ui/icons'
import { Separator } from './ui/separator'

export function Footer() {
  return (
    <footer className="px-4 border-t flex item-center justify-center ">
      <div className="flex item-center justify-between border-x w-full px-4  max-w-5xl relative">
        <p className="text-muted-foreground text-sm py-2">
          Built by{' '}
          <a
            className="link"
            href="https://brodin.dev"
            target="_blank"
            rel="noopener"
          >
            Nathan
          </a>
        </p>
        <div className="mx-auto flex items-center justify-center gap-3 border-x border-edge bg-background px-4">
          <a
            className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
            href="https://x.com/nathan-brodin?utm_source=brodin.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icons.x className="size-4" />
            <span className="sr-only">X</span>
          </a>
          <Separator orientation="vertical" />
          <a
            className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
            href="https://github.com/NathanBrodin?utm_source=brodin-dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icons.github className="size-4" />
            <span className="sr-only">GitHub</span>
          </a>
          <Separator orientation="vertical" />
          <a
            className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
            href="https://www.linkedin.com/in/nathan-brodin?utm_source=brodin.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icons.linkedin className="size-4" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
        <p className="text-muted-foreground text-sm py-2">
          Inspired by{' '}
          <a
            className="link"
            href="https://chanhdai.com/"
            target="_blank"
            rel="noopener"
          >
            Chanhdai
          </a>{' '}
          and{' '}
          <a
            className="link"
            href="https://zed.dev/"
            target="_blank"
            rel="noopener"
          >
            Zed
          </a>
        </p>
        <Diamond top left />
        <Diamond top right />
      </div>
    </footer>
  )
}
