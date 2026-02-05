import {
  ArrowDownIcon,
  ArrowUpIcon,
  CornerDownLeftIcon,
  ExternalLinkIcon,
  MonitorIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
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

export interface Group {
  value: string
  items: MenuItem[]
}

export const THEME_ITEMS = [
  {
    label: 'Light',
    value: 'light' as const,
    icon: SunIcon,
  },
  {
    label: 'Dark',
    value: 'dark' as const,
    icon: MoonIcon,
  },
  {
    label: 'System',
    value: 'system' as const,
    icon: MonitorIcon,
  },
]

export const groupedItems: Group[] = [
  { items: PORTFOLIO_LINKS, value: 'Portfolio' },
  { items: SOCIAL_LINKS, value: 'Social Links' },
]

export function CommandMenu() {
  const isMac = useIsMac()
  const [open, setOpen] = useState(false)

  useHotkeys('mod+k, slash', (e) => {
    e.preventDefault()

    setOpen((open) => {
      return !open
    })
  })

  return (
    <CommandDialog onOpenChange={setOpen} open={open}>
      <CommandDialogTrigger render={<Button variant="outline" />}>
        <SearchIcon />
        <span className="sr-only">Open Command Palette</span>
        <KbdGroup>
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

                      const isExternal = item.value.startsWith('http')
                      const externalLinkOptions = isExternal
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {}

                      return (
                        <CommandItem
                          className="flex w-full items-center"
                          key={item.value}
                          render={
                            <Link
                              to={item.value}
                              onClick={() => setOpen(false)}
                              {...externalLinkOptions}
                            />
                          }
                        >
                          {item.iconImage ? (
                            <img
                              src={item.iconImage}
                              alt={item.label}
                              width={16}
                              height={16}
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
