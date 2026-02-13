import { InfinityIcon } from 'lucide-react'

import {
  CollapsibleChevronsIcon,
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleWithContext,
} from '@/components/ui/collapsible'
import { Separator } from '@/components/ui/separator'
import type { ExperiencePosition } from '@/lib/experiences'
import { calculateEmploymentDuration, cn } from '@/lib/utils'

import { Markdown } from '../markdown'
import { Tag } from '../ui/tag'
import { ProseMono } from '../ui/typography'
import { ExperienceIcon } from './position-icon'

export function ExperiencePositionItem({
  position,
}: {
  position: ExperiencePosition
}) {
  const { start, end } = position.employmentPeriod
  const isOngoing = !end
  const duration = calculateEmploymentDuration(start, end)

  return (
    <CollapsibleWithContext
      defaultOpen={position.isExpanded}
      render={
        <div className="last:before:bg-background relative last:before:absolute last:before:left-3 last:before:h-full last:before:w-px" />
      }
    >
      <CollapsibleTrigger
        className={cn(
          'block w-full text-left',
          'hover:before:bg-muted/50 relative before:absolute before:-top-1 before:-right-1 before:-bottom-1.5 before:left-7 before:-z-1 before:rounded-lg before:transition-[background-color] before:ease-out',
        )}
      >
        <div className="relative z-1 mb-1 flex items-center gap-3">
          <div
            className={cn(
              'flex size-6 shrink-0 items-center justify-center rounded-lg',
              'bg-muted text-muted-foreground',
              'border-muted-foreground/15 ring-border ring-offset-background border ring-1 ring-offset-1',
            )}
            aria-hidden
          >
            <ExperienceIcon className="size-4" icon={position.icon} />
          </div>

          <h4 className="flex-1 font-medium text-balance">{position.title}</h4>

          <div
            className="text-muted-foreground shrink-0 [&_svg]:size-4"
            aria-hidden
          >
            <CollapsibleChevronsIcon />
          </div>
        </div>

        <div className="text-muted-foreground flex items-center gap-2 pl-9 text-sm">
          {position.employmentType && (
            <>
              <dl>
                <dt className="sr-only">Employment Type</dt>
                <dd>{position.employmentType}</dd>
              </dl>

              <Separator
                className="data-[orientation=vertical]:h-4"
                orientation="vertical"
              />
            </>
          )}

          <dl>
            <dt className="sr-only">Employment Period</dt>
            <dd className="flex items-center gap-0.5">
              <span>{start}</span>
              <span className="font-mono">—</span>
              {isOngoing ? (
                <>
                  <InfinityIcon
                    className="size-4.5 translate-y-[0.5px]"
                    aria-hidden
                  />
                  <span className="sr-only">Present</span>
                </>
              ) : (
                <span>{end}</span>
              )}
              ({duration})
            </dd>
          </dl>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent>
        {position.description && (
          <ProseMono className="pt-2 pl-9">
            <Markdown content={position.description} />
          </ProseMono>
        )}
      </CollapsibleContent>

      {Array.isArray(position.skills) && position.skills.length > 0 && (
        <ul className="flex flex-wrap gap-1.5 pt-3 pl-9">
          {position.skills.map((skill, index) => (
            <li key={index} className="flex">
              <Tag>{skill}</Tag>
            </li>
          ))}
        </ul>
      )}
    </CollapsibleWithContext>
  )
}
