import { Collapsible as CollapsiblePrimitive } from '@base-ui/react/collapsible'
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

import type { ChevronsDownUpIconHandle } from '@/components/ui/icons/chevrons-down-up-icon'

import { ChevronsDownUpIcon } from '@/components/ui/icons/chevrons-down-up-icon'
import { playSound } from '@/lib/play-sound'
import { cn } from '@/lib/utils'
import { switchOffSound } from '@/sounds/switch-off'
import { switchOnSound } from '@/sounds/switch-on'

function Collapsible({ ...props }: CollapsiblePrimitive.Root.Props) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

function CollapsibleTrigger({ className, ...props }: CollapsiblePrimitive.Trigger.Props) {
  return (
    <CollapsiblePrimitive.Trigger
      className={cn('cursor-pointer', className)}
      data-slot="collapsible-trigger"
      {...props}
    />
  )
}

function CollapsiblePanel({ className, ...props }: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel
      className={cn(
        'h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 data-ending-style:h-0 data-starting-style:h-0',
        className,
      )}
      data-slot="collapsible-panel"
      {...props}
    />
  )
}

type CollapsibleContextType = {
  open: boolean
}

const CollapsibleContext = createContext<CollapsibleContextType | null>(null)

const useCollapsible = () => {
  const context = useContext(CollapsibleContext)

  if (!context) {
    throw new Error('Collapsible components must be used within a CollapsibleWithContext')
  }

  return context
}

function CollapsibleWithContext({
  defaultOpen,
  noSound,
  ...props
}: React.ComponentProps<typeof Collapsible> & { noSound?: boolean }) {
  const [open, setOpen] = useState(defaultOpen ?? false)

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!noSound) {
        playSound(nextOpen ? switchOnSound : switchOffSound)
      }
      setOpen(nextOpen)
    },
    [noSound],
  )

  return (
    <CollapsibleContext.Provider value={{ open }}>
      <Collapsible open={open} onOpenChange={handleOpenChange} {...props} />
    </CollapsibleContext.Provider>
  )
}

function CollapsibleChevronsIcon() {
  const { open } = useCollapsible()

  const ref = useRef<ChevronsDownUpIconHandle>(null)

  useEffect(() => {
    const controls = ref.current
    if (!controls) return

    if (open) {
      controls.startAnimation()
    } else {
      controls.stopAnimation()
    }
  }, [open])

  return <ChevronsDownUpIcon ref={ref} />
}

export {
  Collapsible,
  CollapsibleTrigger,
  CollapsiblePanel,
  CollapsiblePanel as CollapsibleContent,
  CollapsibleWithContext,
  CollapsibleChevronsIcon,
}
