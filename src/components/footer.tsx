import posthog from 'posthog-js'

import { SOCIAL_LINKS } from '@/config/social-links'

import { Diamond } from './ui/diamond'
import { Icons } from './ui/icons'
import { Separator } from './ui/separator'

export function Footer() {
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
            onClick={() => {
              posthog.capture('footer_link_clicked', {
                label: 'Nathan Brodin',
                url: 'https://brodin.dev',
              })
            }}
          >
            Nathan Brodin
          </a>
        </p>
        <div className="bg-background mx-auto flex items-center justify-center gap-3 border-x px-4">
          <a
            className="text-muted-foreground hover:text-foreground flex items-center transition-colors"
            href={SOCIAL_LINKS[0].value}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              posthog.capture('footer_link_clicked', {
                label: 'Twitter',
                url: SOCIAL_LINKS[0].value,
              })
            }}
          >
            <Icons.x className="size-4" />
            <span className="sr-only">X</span>
          </a>
          <Separator orientation="vertical" />
          <a
            className="text-muted-foreground hover:text-foreground flex items-center transition-colors"
            href={SOCIAL_LINKS[1].value}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              posthog.capture('footer_link_clicked', {
                label: 'GitHub',
                url: SOCIAL_LINKS[1].value,
              })
            }}
          >
            <Icons.github className="size-4" />
            <span className="sr-only">GitHub</span>
          </a>
          <Separator orientation="vertical" />
          <a
            className="text-muted-foreground hover:text-foreground flex items-center transition-colors"
            href={SOCIAL_LINKS[2].value}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icons.linkedin className="size-4" />
            <span className="sr-only">LinkedIn</span>
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
