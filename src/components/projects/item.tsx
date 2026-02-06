import type { Project } from 'content-collections'
import { BoxIcon, InfinityIcon, LinkIcon } from 'lucide-react'

import { Markdown } from '@/components/markdown'
import {
  CollapsibleChevronsIcon,
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleWithContext,
} from '@/components/ui/collapsible'
import { Tag } from '@/components/ui/tag'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ProseMono } from '@/components/ui/typography'

import { Button } from '../ui/button'

export function ProjectItem({
  className,
  project,
}: {
  className?: string
  project: Project
}) {
  const isOngoing = !project.endDate
  const isSinglePeriod = project.endDate === project.startDate

  return (
    <CollapsibleWithContext
      defaultOpen={project.isExpanded}
      render={<div className={className} />}
    >
      <CollapsibleTrigger className="hover:bg-muted/50 flex w-full items-center gap-2 px-4 py-2 pr-2 text-left">
        {project.logo ? (
          <img
            src={project.logo}
            alt={project.title}
            width={32}
            height={32}
            className="mx-4 flex size-6 shrink-0 select-none dark:grayscale"
            aria-hidden="true"
          />
        ) : (
          <div
            className="border-muted-foreground/15 bg-muted text-muted-foreground ring-edge ring-offset-background mx-4 flex size-6 shrink-0 items-center justify-center rounded-lg border ring-1 ring-offset-1 select-none"
            aria-hidden="true"
          >
            <BoxIcon className="size-4" />
          </div>
        )}
        <div className="flex-1">
          <h3 className="mb-1 leading-snug font-medium text-balance">
            {project.title}
          </h3>

          <dl className="text-muted-foreground text-sm">
            <dt className="sr-only">Period</dt>
            <dd className="flex items-center gap-0.5">
              <span>{project.startDate}</span>
              {!isSinglePeriod && (
                <>
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
                    <span>{project.endDate}</span>
                  )}
                </>
              )}
            </dd>
          </dl>
        </div>
        <Button
          variant="ghost"
          size="icon"
          render={<a href={project.link} target="_blank" rel="noopener" />}
        >
          <LinkIcon className="size-4" />
          <span className="sr-only">Open Project Link</span>
        </Button>
        <div
          className="text-muted-foreground mr-2 shrink-0 [&_svg]:size-4"
          aria-hidden
        >
          <CollapsibleChevronsIcon />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="space-y-2 px-4 py-2">
          {project.content && (
            <ProseMono>
              <Markdown content={project.content} />
            </ProseMono>
          )}

          {project.skills.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {project.skills.map((skill, index) => (
                <li key={index} className="flex">
                  <Tag>{skill}</Tag>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CollapsibleContent>
    </CollapsibleWithContext>
  )
}
