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
import { ProseMono } from '@/components/ui/typography'
import { formatDate } from '@/lib/date'

import { Button } from '../ui/button'

export function ProjectItem({ className, project }: { className?: string; project: Project }) {
  const isOngoing = !project.endDate
  const isSinglePeriod = project.endDate === project.startDate

  return (
    <CollapsibleWithContext defaultOpen={project.isExpanded} render={<div className={className} />}>
      <CollapsibleTrigger className="flex w-full items-center gap-2 p-2 text-left hover:bg-muted/50">
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
            className="ring-edge mx-4 flex size-6 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-offset-1 ring-offset-background select-none"
            aria-hidden="true"
          >
            <BoxIcon className="size-4" />
          </div>
        )}
        <div className="flex-1">
          <h3 className="mb-1 leading-snug font-medium text-balance">{project.title}</h3>

          <dl className="text-sm text-muted-foreground">
            <dt className="sr-only">Period</dt>
            <dd className="flex items-center gap-0.5">
              <time dateTime={project.startDate}>{formatDate(project.startDate)}</time>
              {!isSinglePeriod && (
                <>
                  <span className="font-mono">—</span>
                  {isOngoing ? (
                    <>
                      <InfinityIcon className="size-4.5 translate-y-[0.5px]" aria-hidden />
                      <span className="sr-only">Present</span>
                    </>
                  ) : (
                    <time dateTime={project.endDate}>
                      {project.endDate && formatDate(project.endDate)}
                    </time>
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
        <div className="mr-2 shrink-0 text-muted-foreground [&_svg]:size-4" aria-hidden>
          <CollapsibleChevronsIcon />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent hiddenUntilFound>
        <div className="space-y-2 px-4 py-2">
          {project.markup && (
            <ProseMono>
              <Markdown content={project.markup} />
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
