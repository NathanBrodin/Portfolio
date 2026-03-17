import { ExternalLinkIcon } from 'lucide-react'
import { Fragment, useState } from 'react'

import { Link } from '@tanstack/react-router'

import { Group } from '.'
import { Button } from '../ui/button'
import { Logo } from '../ui/icons/logo'
import { Sheet, SheetPopup, SheetTrigger } from '../ui/sheet'

export function Nav({ items }: { items: Group[] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex items-center">
      <Button size="icon" variant="ghost" render={<Link to="/" />}>
        <span className="sr-only">Go to home</span>
        <Logo className="text-primary mr-2" size={16} />
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
                <div className="font-display text-primary text-md font-medium">
                  {groupedItem.value}
                </div>
                <div className="flex flex-col gap-1">
                  {groupedItem.items.map((item) => {
                    const Icon = item.icon ?? Fragment

                    const isExternal =
                      item.value.startsWith('http') ||
                      item.value.startsWith('mailto')

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
                            className="corner-squircle mr-2 shrink-0 rounded-sm supports-corner-shape:rounded-[50%]"
                          />
                        ) : (
                          <Icon className="text-muted-foreground mr-2 size-4 opacity-80" />
                        )}
                        <span className="line-clamp-1 flex-1">
                          {item.label}
                        </span>
                        {isExternal && (
                          <ExternalLinkIcon className="text-muted-foreground size-4" />
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
