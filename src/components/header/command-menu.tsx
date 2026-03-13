import { allBlogPosts } from 'content-collections'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CornerDownLeftIcon,
  ExternalLinkIcon,
  FileTextIcon,
  RssIcon,
  SearchIcon,
  TextAlignStartIcon,
} from 'lucide-react'
import { Fragment, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

import { Link } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandCollection,
  CommandDialog,
  CommandDialogPopup,
  CommandDialogTrigger,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandPanel,
} from '@/components/ui/command'
import { Kbd, KbdGroup } from '@/components/ui/kbd'
import type { MenuItem } from '@/config'
import { PORTFOLIO_LINKS } from '@/config/portfolio-links'
import { SOCIAL_LINKS } from '@/config/social-links'
import { useIsMac } from '@/hooks/use-is-mac'

const OTHERS_LINKS = [
  { label: 'llms.txt', value: '/llms.txt', icon: FileTextIcon },
  { label: 'RSS Feed', value: '/blog/rss', icon: RssIcon },
]

export interface Group {
  value: string
  items: MenuItem[]
}

export function CommandMenu() {
  const isMac = useIsMac()
  const [open, setOpen] = useState(false)

  useHotkeys('mod+k, slash', (e) => {
    e.preventDefault()

    setOpen((open) => {
      return !open
    })
  })

  const posts = allBlogPosts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const groupedItems: Group[] = [
    { items: PORTFOLIO_LINKS, value: 'Menu' },
    { items: SOCIAL_LINKS, value: 'Social Links' },
    {
      value: 'Blog posts',
      items: posts.map((post) => ({
        value: `blog/${post.slug}`,
        label: post.title,
        icon: TextAlignStartIcon,
      })),
    },
    { items: OTHERS_LINKS, value: 'Others' },
  ]

  return (
    <CommandDialog onOpenChange={setOpen} open={open}>
      <CommandDialogTrigger
        render={<Button variant="outline" className="hidden sm:flex" />}
      >
        <SearchIcon />
        <span className="sr-only">Open Command Palette</span>
        <KbdGroup className="hidden sm:flex">
          <Kbd>{isMac ? '⌘' : 'Ctrl'}</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </CommandDialogTrigger>
      <CommandDialogPopup>
        <Command items={groupedItems}>
          <CommandInput placeholder="Search for links and commands..." />
          <CommandPanel>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandList>
              {(group: Group) => (
                <CommandGroup items={group.items} key={group.value}>
                  <CommandGroupLabel>{group.value}</CommandGroupLabel>
                  <CommandCollection>
                    {(item: MenuItem) => {
                      const Icon = item.icon ?? Fragment

                      const isExternal =
                        item.value.startsWith('http') ||
                        item.value.startsWith('mailto')
                      const isOther = OTHERS_LINKS.some(
                        (link) => link.value === item.value,
                      )
                      const externalLinkOptions = isExternal
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {}

                      return (
                        <CommandItem
                          className="flex w-full items-center"
                          key={item.value}
                          render={
                            isOther || isExternal ? (
                              <a
                                href={item.value}
                                onClick={() => {
                                  setOpen(false)
                                }}
                              />
                            ) : (
                              <Link
                                to={item.value}
                                onClick={() => {
                                  setOpen(false)
                                }}
                                {...externalLinkOptions}
                              />
                            )
                          }
                        >
                          {item.iconImage ? (
                            <img
                              src={item.iconImage}
                              alt={item.label}
                              width={16}
                              height={16}
                              loading="lazy"
                              className="corner-squircle mr-2 rounded-sm supports-corner-shape:rounded-[50%]"
                            />
                          ) : (
                            <Icon className="mr-2 h-4 w-4 opacity-80" />
                          )}
                          <span className="flex-1">{item.label}</span>
                          {isExternal && (
                            <ExternalLinkIcon className="size-4" />
                          )}
                        </CommandItem>
                      )
                    }}
                  </CommandCollection>
                </CommandGroup>
              )}
            </CommandList>
          </CommandPanel>
          <CommandFooter>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <KbdGroup>
                  <Kbd>
                    <ArrowUpIcon />
                  </Kbd>
                  <Kbd>
                    <ArrowDownIcon />
                  </Kbd>
                </KbdGroup>
                <span>Navigate</span>
              </div>
              <div className="flex items-center gap-2">
                <Kbd>
                  <CornerDownLeftIcon />
                </Kbd>
                <span>Open</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Kbd>Esc</Kbd>
              <span>Close</span>
            </div>
          </CommandFooter>
        </Command>
      </CommandDialogPopup>
    </CommandDialog>
  )
}
