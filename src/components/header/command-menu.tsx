import { useHotkey } from '@tanstack/react-hotkeys'
import { Link, ScriptOnce } from '@tanstack/react-router'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CornerDownLeftIcon,
  ExternalLinkIcon,
  SearchIcon,
} from 'lucide-react'
import { Fragment, useState } from 'react'

import type { MenuItem } from '@/config'

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
import { OTHER_LINKS } from '@/config/portfolio-links'
import { IS_MAC_SCRIPT, useIsMac } from '@/hooks/use-is-mac'

import type { Group } from '.'

export function CommandMenu({ items }: { items: Group[] }) {
  const isMac = useIsMac()
  const [open, setOpen] = useState(false)

  useHotkey('Mod+K', () => {
    setOpen((open) => {
      return !open
    })
  })

  return (
    <CommandDialog onOpenChange={setOpen} open={open}>
      <CommandDialogTrigger
        aria-label="Open Command Palette"
        aria-keyshortcuts="Control+K Meta+K"
        render={<Button variant="secondary" size="sm" className="hidden sm:flex" />}
      >
        <SearchIcon aria-hidden="true" />
        <span className="sr-only">Open Command Palette</span>
        <span aria-hidden="true" className="hidden sm:flex">
          <KbdGroup className="hidden sm:flex">
            <Kbd data-platform-key suppressHydrationWarning>
              {isMac ? '⌘' : 'Ctrl'}
            </Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </span>
        <ScriptOnce>{IS_MAC_SCRIPT}</ScriptOnce>
      </CommandDialogTrigger>
      <CommandDialogPopup>
        <Command items={items}>
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
                        item.value.startsWith('http') || item.value.startsWith('mailto')
                      const isOther = OTHER_LINKS.some((link) => link.value === item.value)
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
                                {...externalLinkOptions}
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
                              alt=""
                              aria-hidden="true"
                              width={16}
                              height={16}
                              loading="lazy"
                              className="mr-2 rounded-sm corner-squircle supports-corner-shape:rounded-[50%]"
                            />
                          ) : (
                            <Icon className="mr-2 h-4 w-4 opacity-80" aria-hidden="true" />
                          )}
                          <span className="line-clamp-1 flex-1">{item.label}</span>
                          {isExternal && <ExternalLinkIcon className="size-4" aria-hidden="true" />}
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
