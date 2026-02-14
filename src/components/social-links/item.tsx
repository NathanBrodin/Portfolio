import { ArrowUpRightIcon } from 'lucide-react'
import posthog from 'posthog-js'

import type { LinkItem } from '@/config'
import { cn } from '@/lib/utils'

export function SocialLinkItem({
  iconImage,
  label,
  description,
  value,
}: LinkItem) {
  return (
    <a
      className={cn(
        'group hover:bg-accent/50 bg-background flex cursor-pointer items-center gap-4 p-4 pr-2 transition-[background-color] ease-out',
        'first:border-x first:border-b',
        'nth-2:border-x nth-2:border-t nth-2:border-b sm:nth-2:border-t-0',
        'nth-3:border-x nth-3:border-t nth-3:border-b sm:nth-3:border-b-0',
        'last:border-x last:border-t',
      )}
      href={value}
      target="_blank"
      rel="noopener"
      onClick={() => {
        posthog.capture('social_link_clicked', { label, url: value })
      }}
    >
      <div className="relative size-12 shrink-0">
        <img
          className="corner-squircle rounded-xl select-none supports-corner-shape:rounded-[50%]"
          src={iconImage}
          alt={label}
          width={48}
          height={48}
          loading="lazy"
        />
        <div className="corner-squircle pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/10 ring-inset supports-corner-shape:rounded-[50%] dark:ring-white/15" />
      </div>

      <div className="flex-1">
        <h3 className="flex items-center font-medium underline-offset-4 group-hover:underline">
          {label}
        </h3>

        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </div>

      <ArrowUpRightIcon className="text-muted-foreground size-4 transition-[rotate] duration-300 group-hover:rotate-45" />
    </a>
  )
}
