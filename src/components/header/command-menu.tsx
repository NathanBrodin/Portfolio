import {
  ArrowDownIcon,
  ArrowUpIcon,
  CornerDownLeftIcon,
  MonitorIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
} from 'lucide-react'
import { Fragment, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

import { useNavigate } from '@tanstack/react-router'

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
  CommandSeparator,
} from '@/components/ui/command'
import { Kbd, KbdGroup } from '@/components/ui/kbd'
import type { LinkItem } from '@/config'
import { PORTFOLIO_LINKS } from '@/config/portfolio-links'
import { SOCIAL_LINKS } from '@/config/social-links'
import { useTheme } from '@/providers/theme'

export interface Group {
  value: string
  items: LinkItem[]
}

export const groupedItems: Group[] = [
  { items: PORTFOLIO_LINKS, value: 'Portfolio' },
  { items: SOCIAL_LINKS, value: 'Social Links' },
]

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

export function CommandMenu() {
  const { setTheme } = useTheme()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  function handleItemClick(item: LinkItem) {
    if (item.value.startsWith('http://') || item.value.startsWith('https://')) {
      window.open(item.value, '_blank', 'noopener,noreferrer')
    } else {
      navigate({ to: item.value })
    }
    setOpen(false)
  }

  function handleThemeChange(theme: 'light' | 'dark' | 'system') {
    setTheme(theme)
    setOpen(false)
  }

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
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </CommandDialogTrigger>
      <CommandDialogPopup>
        <Command items={groupedItems}>
          <CommandInput placeholder="Search for links and commands..." />
          <CommandPanel>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandList>
              {groupedItems.map((group, _index) => (
                <Fragment key={group.value}>
                  <CommandGroup items={group.items}>
                    <CommandGroupLabel>{group.value}</CommandGroupLabel>
                    <CommandCollection>
                      {(item: LinkItem) => {
                        const Icon = item.icon ?? Fragment
                        return (
                          <CommandItem
                            key={item.value}
                            onClick={() => handleItemClick(item)}
                            value={item.value}
                          >
                            {item.iconImage ? (
                              <img
                                src={item.iconImage}
                                width={16}
                                height={16}
                                className="mr-2"
                              />
                            ) : (
                              <Icon className="mr-2 size-4" />
                            )}
                            <span className="flex-1">{item.label}</span>
                          </CommandItem>
                        )
                      }}
                    </CommandCollection>
                  </CommandGroup>
                  <CommandSeparator />
                </Fragment>
              ))}
              <CommandGroup items={THEME_ITEMS}>
                <CommandGroupLabel>Theme</CommandGroupLabel>
                <CommandCollection>
                  {(item: (typeof THEME_ITEMS)[0]) => {
                    const Icon = item.icon
                    return (
                      <CommandItem
                        key={item.value}
                        onClick={() => handleThemeChange(item.value)}
                        value={item.value}
                      >
                        <Icon className="mr-2 size-4" />
                        <span className="flex-1">{item.label}</span>
                      </CommandItem>
                    )
                  }}
                </CommandCollection>
              </CommandGroup>
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
