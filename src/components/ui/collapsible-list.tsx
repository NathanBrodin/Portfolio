import { ChevronDownIcon } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

export function CollapsibleList<T>({
  items,
  max = 3,

  keyExtractor,
  renderItem,
}: {
  items: T[]
  max?: number

  keyExtractor?: (item: T) => string
  renderItem: (item: T) => React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      {items.slice(0, max).map((award, index) => (
        <div
          key={typeof keyExtractor === 'function' ? keyExtractor(award) : index}
          className="border-edge border-b"
        >
          {renderItem(award)}
        </div>
      ))}

      <CollapsibleContent>
        {items.slice(max).map((award, index) => (
          <div
            key={
              typeof keyExtractor === 'function'
                ? keyExtractor(award)
                : max + index
            }
            className="border-edge border-b"
          >
            {renderItem(award)}
          </div>
        ))}
      </CollapsibleContent>

      {items.length > max && (
        <div className="flex h-12 items-center justify-center pb-px">
          <CollapsibleTrigger
            render={
              <Button
                className="group/collapsible-trigger flex px-3"
                variant="secondary"
              />
            }
          >
            <span className={open ? 'hidden' : ''}>Show More</span>
            <span className={open ? '' : 'hidden'}>Show Less</span>

            <ChevronDownIcon
              aria-hidden
              className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            />
          </CollapsibleTrigger>
        </div>
      )}
    </Collapsible>
  )
}
