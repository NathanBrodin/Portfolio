import { useHotkey } from '@tanstack/react-hotkeys'
import { Link, useNavigate, useParams } from '@tanstack/react-router'
import { allBlogPosts } from 'content-collections'
import { ArrowLeftIcon, ArrowRightIcon, LinkIcon, ShareIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { Kbd } from '@/components/ui/kbd'
import { Menu, MenuItem, MenuPopup, MenuSeparator, MenuTrigger } from '@/components/ui/menu'
import { Section } from '@/components/ui/section'
import { toastManager } from '@/components/ui/toast'
import { Tooltip, TooltipPopup, TooltipTrigger } from '@/components/ui/tooltip'
import { siteConfig } from '@/config/site'

const publishedPosts = allBlogPosts
  .filter((post) => post.published)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export function BlogNavigation() {
  const { slug } = useParams({ from: '/blog/$slug' })
  const navigate = useNavigate()

  const currentIndex = publishedPosts.findIndex((post) => post.slug === slug)

  const previousPost = currentIndex >= 0 ? publishedPosts[currentIndex + 1] : undefined
  const nextPost = currentIndex >= 0 ? publishedPosts[currentIndex - 1] : undefined

  const currentUrl = `${siteConfig.url}/blog/${slug}`
  const urlEncoded = encodeURIComponent(currentUrl)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      toastManager.add({
        title: 'Link copied!',
        type: 'success',
      })
    } catch {
      toastManager.add({
        title: 'Failed to copy link',
        type: 'error',
      })
    }
  }

  useHotkey('ArrowLeft', (event) => {
    const target = event.target as HTMLElement | null
    if (
      target?.closest(
        'input, textarea, select, [contenteditable], pre, code, [role="dialog"], [role="menu"], [role="listbox"]',
      )
    ) {
      return
    }
    if (previousPost) {
      void navigate({ to: '/blog/$slug', params: { slug: previousPost.slug } })
    }
  })

  useHotkey('ArrowRight', (event) => {
    const target = event.target as HTMLElement | null
    if (
      target?.closest(
        'input, textarea, select, [contenteditable], pre, code, [role="dialog"], [role="menu"], [role="listbox"]',
      )
    ) {
      return
    }
    if (nextPost) {
      void navigate({ to: '/blog/$slug', params: { slug: nextPost.slug } })
    }
  })

  return (
    <Section variant="panel" size="sm" className="justify-between">
      <Link
        to="/blog"
        className="inline-flex items-center gap-1.5 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeftIcon className="size-3.5" />
        Back to blog
      </Link>
      <div className="flex gap-2">
        <Menu>
          <MenuTrigger openOnHover delay={0} render={<Button variant="secondary" size="sm" />}>
            <ShareIcon className="size-3.5" />
            Share
          </MenuTrigger>
          <MenuPopup align="end">
            <MenuItem onClick={handleCopyLink}>
              <LinkIcon />
              Copy Link
            </MenuItem>
            <MenuSeparator />
            <MenuItem
              render={
                <a
                  href={`https://x.com/intent/tweet?url=${urlEncoded}`}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <Icons.x />
              Share on Twitter<span className="sr-only"> (opens in new tab)</span>
            </MenuItem>
            <MenuItem
              render={
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${urlEncoded}`}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <Icons.linkedin />
              Share on Linkedin<span className="sr-only"> (opens in new tab)</span>
            </MenuItem>
            <MenuSeparator />
            <MenuItem render={<a href={`/blog/${slug}.md`} />}>
              <Icons.markdown />
              View as Markdown
            </MenuItem>
          </MenuPopup>
        </Menu>

        <div className="flex gap-1">
          {previousPost !== undefined && (
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="secondary"
                    size="icon-sm"
                    aria-label={`Previous post: ${previousPost.title}`}
                    render={<Link to="/blog/$slug" params={{ slug: previousPost.slug }} />}
                  />
                }
              >
                <ArrowLeftIcon />
              </TooltipTrigger>
              <TooltipPopup side="bottom">
                <div className="flex shrink-0 items-center justify-center gap-2">
                  Previous Post
                  <Kbd>
                    <ArrowLeftIcon />
                  </Kbd>
                </div>
              </TooltipPopup>
            </Tooltip>
          )}
          {nextPost !== undefined && (
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="secondary"
                    size="icon-sm"
                    aria-label={`Next post: ${nextPost.title}`}
                    render={<Link to="/blog/$slug" params={{ slug: nextPost.slug }} />}
                  />
                }
              >
                <ArrowRightIcon />
              </TooltipTrigger>
              <TooltipPopup side="bottom">
                <div className="flex shrink-0 items-center justify-center gap-2">
                  Next Post
                  <Kbd>
                    <ArrowRightIcon />
                  </Kbd>
                </div>
              </TooltipPopup>
            </Tooltip>
          )}
        </div>
      </div>
    </Section>
  )
}
