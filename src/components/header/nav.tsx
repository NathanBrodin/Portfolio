import { Link } from '@tanstack/react-router'
import { ExternalLinkIcon } from 'lucide-react'
import { Fragment, useState } from 'react'

import type { Group } from '.'

import { Button } from '../ui/button'
import { Logo } from '../ui/icons/logo'
import { Sheet, SheetPopup, SheetTrigger } from '../ui/sheet'

export function Nav({ items }: { items: Group[] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex items-center">
      <Button size="icon" variant="ghost" render={<Link to="/" />}>
        <span className="sr-only">Go to home</span>
        <Logo className="mr-2 text-primary" size={16} />
      </Button>
      <Sheet onOpenChange={setOpen} open={open}>
        <SheetTrigger
          render={
            <Button className="sm:hidden" variant="ghost">
              Menu
            </Button>
          }
        />
        <SheetPopup side="left">
          <div className="flex flex-col gap-6 overflow-auto p-6 pt-8">
            {items.map((groupedItem) => (
              <div key={groupedItem.value} className="flex flex-col gap-3">
                <div className="text-md font-display font-medium text-primary">
                  {groupedItem.value}
                </div>
                <div className="flex flex-col gap-1">
                  {groupedItem.items.map((item) => {
                    const Icon = item.icon ?? Fragment

                    const isExternal =
                      item.value.startsWith('http') || item.value.startsWith('mailto')

                    return (
                      <a
                        key={item.value}
                        href={item.value}
                        className="flex items-center py-1"
                        onClick={() => setOpen(false)}
                      >
                        {item.iconImage ? (
                          <img
                            src={item.iconImage}
                            alt={item.label}
                            width={16}
                            height={16}
                            loading="lazy"
                            className="mr-2 shrink-0 rounded-sm corner-squircle supports-corner-shape:rounded-[50%]"
                          />
                        ) : (
                          <Icon className="mr-2 size-4 text-muted-foreground opacity-80" />
                        )}
                        <span className="line-clamp-1 flex-1">{item.label}</span>
                        {isExternal && (
                          <ExternalLinkIcon className="size-4 text-muted-foreground" />
                        )}
                      </a>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </SheetPopup>
      </Sheet>
    </div>
  )
}
