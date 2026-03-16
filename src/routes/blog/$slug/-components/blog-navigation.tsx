import { allBlogPosts } from 'content-collections'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  LinkIcon,
  ShareIcon,
} from 'lucide-react'
import { useHotkeys } from 'react-hotkeys-hook'

import { Link, useNavigate, useParams } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { Kbd } from '@/components/ui/kbd'
import {
  Menu,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuTrigger,
} from '@/components/ui/menu'
import { Section } from '@/components/ui/section'
import { toastManager } from '@/components/ui/toast'
import { Tooltip, TooltipPopup, TooltipTrigger } from '@/components/ui/tooltip'
import { siteConfig } from '@/config/site'

const publishedPosts = allBlogPosts
  .filter((post) => post.published)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export function BlogNavigation() {
  const { slug } = useParams({ from: '/blog/$slug/' })
  const navigate = useNavigate()

  const currentIndex = publishedPosts.findIndex((post) => post.slug === slug)

  const previousPost =
    currentIndex >= 0 ? publishedPosts[currentIndex + 1] : undefined
  const nextPost =
    currentIndex >= 0 ? publishedPosts[currentIndex - 1] : undefined

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

  useHotkeys('left', (e) => {
    e.preventDefault()
    if (previousPost) {
      navigate({ to: '/blog/$slug', params: { slug: previousPost.slug } })
    }
  })

  useHotkeys('right', (e) => {
    e.preventDefault()
    if (nextPost) {
      navigate({ to: '/blog/$slug', params: { slug: nextPost.slug } })
    }
  })

  return (
    <Section className="bg-background justify-between p-2">
      <Link
        to="/blog"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 font-mono text-sm transition-colors"
      >
        <ArrowLeftIcon className="size-3.5" />
        Back to blog
      </Link>
      <div className="flex gap-2">
        <Menu>
          <MenuTrigger
            openOnHover
            render={<Button variant="secondary" size="sm" />}
          >
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
              Share on Twitter
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
              Share on Linkedin
            </MenuItem>
            <MenuSeparator />
            <MenuItem render={<a href={`/blog/${slug}/post.md`} />}>
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
                    render={
                      <Link
                        to="/blog/$slug"
                        params={{ slug: previousPost.slug }}
                      />
                    }
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
                    render={
                      <Link to="/blog/$slug" params={{ slug: nextPost.slug }} />
                    }
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
