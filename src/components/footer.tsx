import { RssIcon } from 'lucide-react'

import { SOCIAL_LINKS } from '@/config/social-links'

import { Diamond } from './ui/diamond'
import { Icons } from './ui/icons'
import { Separator } from './ui/separator'

export function Footer() {
  const twitterLink = SOCIAL_LINKS.find((link) => link.label === 'Twitter')
  const githubLink = SOCIAL_LINKS.find((link) => link.label === 'GitHub')
  const linkedinLink = SOCIAL_LINKS.find((link) => link.label === 'LinkedIn')

  return (
    <footer className="item-center flex justify-center border-t px-4">
      <div className="item-center relative flex w-full max-w-5xl flex-col justify-between border-x px-4 sm:flex-row">
        <p className="text-muted-foreground py-2 text-sm">
          Built by{' '}
          <a
            className="link"
            href="https://brodin.dev"
            target="_blank"
            rel="noopener"
          >
            Nathan Brodin
          </a>
        </p>
        <div className="bg-background mx-auto flex items-center justify-center gap-3 border-x px-4">
          <a
            className="text-muted-foreground hover:text-foreground flex items-center transition-colors"
            href={twitterLink?.value}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icons.x className="size-4" />
            <span className="sr-only">Twitter</span>
          </a>
          <Separator orientation="vertical" />
          <a
            className="text-muted-foreground hover:text-foreground flex items-center transition-colors"
            href={githubLink?.value}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icons.github className="size-4" />
            <span className="sr-only">GitHub</span>
          </a>
          <Separator orientation="vertical" />
          <a
            className="text-muted-foreground hover:text-foreground flex items-center transition-colors"
            href={linkedinLink?.value}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icons.linkedin className="size-4" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <Separator orientation="vertical" />
          <a
            className="text-muted-foreground hover:text-foreground flex items-center transition-colors"
            href="/blog/rss"
          >
            <RssIcon className="size-4" />
            <span className="sr-only">RSS Feed</span>
          </a>
        </div>
        <p className="text-muted-foreground py-2 text-sm">
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
