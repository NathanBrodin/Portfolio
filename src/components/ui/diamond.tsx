import { cn } from '@/lib/utils'

type DiamondProps = {
  top?: boolean
  right?: boolean
  bottom?: boolean
  left?: boolean
  className?: string
}

export function Diamond({ top, right, bottom, left, className }: DiamondProps) {
  return (
    <div
      className={cn(
        'border-grid absolute z-10 size-2 rotate-45 rounded-[1px] border bg-white dark:bg-black',
        top && 'top-[-4.5px]',
        right && 'right-[-4.5px]',
        bottom && 'bottom-[-4.5px]',
        left && 'left-[-4.5px]',
        className,
      )}
    />
  )
}
