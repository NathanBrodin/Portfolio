import type { Project } from 'content-collections'

import { GraduationCapIcon, InfinityIcon, LinkIcon } from 'lucide-react'

import { Markdown } from '@/components/markdown'
import {
  CollapsibleChevronsIcon,
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleWithContext,
} from '@/components/ui/collapsible'
import { Tag } from '@/components/ui/tag'
import { Prose } from '@/components/ui/typography'
import { formatDate } from '@/lib/date'
import { cn } from '@/lib/utils'

import { Button } from '../ui/button'
import { Tooltip, TooltipPopup, TooltipTrigger } from '../ui/tooltip'
import { ProjectIcon } from './project-icon'

export function ProjectItem({ className, project }: { className?: string; project: Project }) {
  const isOngoing = !project.endDate
  const isSinglePeriod = project.endDate === project.startDate
  const hasPeriod = Boolean(project.startDate)

  return (
    <CollapsibleWithContext defaultOpen={project.isExpanded} render={<div className={className} />}>
      <div className="flex w-full items-center gap-2 p-2 hover:bg-muted/50">
        <CollapsibleTrigger className="flex flex-1 items-center gap-2 text-left">
          {project.logo ? (
            <img
              src={project.logo}
              alt=""
              width={32}
              height={32}
              className="mx-4 flex size-6 shrink-0 select-none dark:grayscale"
              aria-hidden="true"
            />
          ) : (
            <div
              className={cn(
                'mx-4',
                'flex size-6 shrink-0 items-center justify-center rounded-lg',
                'bg-muted text-muted-foreground',
                'border-muted-foreground/15 ring-border ring-offset-background border ring-1 ring-offset-1',
              )}
              aria-hidden="true"
            >
              <ProjectIcon icon={project.icon} className="size-4" />
            </div>
          )}
          <div className="flex-1">
            <h3 className="mb-1 leading-snug font-medium text-balance">{project.title}</h3>

            <dl className="text-sm text-muted-foreground">
              <dt className="sr-only" aria-hidden="true">
                Period
              </dt>
              {hasPeriod && project.startDate && (
                <dd className="flex items-center gap-0.5">
                  <time dateTime={project.startDate}>{formatDate(project.startDate)}</time>
                  {!isSinglePeriod && (
                    <>
                      <span className="font-mono" aria-hidden="true">
                        —
                      </span>
                      <span className="sr-only"> to </span>
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
                  {project.type === 'school' && (
                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <span className="ml-1 inline-flex cursor-help items-center text-muted-foreground/60" />
                        }
                      >
                        <GraduationCapIcon className="size-3.5" aria-hidden />
                        <span className="sr-only">School project</span>
                      </TooltipTrigger>
                      <TooltipPopup>School project</TooltipPopup>
                    </Tooltip>
                  )}
                </dd>
              )}
            </dl>
          </div>
          <div className="mr-2 shrink-0 text-muted-foreground [&_svg]:size-4" aria-hidden>
            <CollapsibleChevronsIcon />
          </div>
        </CollapsibleTrigger>
        {project.link && (
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Visit ${project.title}`}
                  render={<a href={project.link} target="_blank" rel="noopener" />}
                />
              }
            >
              <LinkIcon className="size-4" />
              <span className="sr-only">Visit {project.title}</span>
            </TooltipTrigger>
            <TooltipPopup>Visit Project</TooltipPopup>
          </Tooltip>
        )}
      </div>
      <CollapsibleContent hiddenUntilFound>
        <div className="space-y-2 px-4 py-2">
          {project.markup && (
            <Prose className="sm:prose-sm">
              <Markdown content={project.markup} />
            </Prose>
          )}

          {(project.skills.length > 0 || (project.hasDetail && project.detailMarkup)) && (
            <CollapsibleWithContext render={<div className="contents" />}>
              <ul className="flex flex-wrap items-center gap-1.5">
                {project.skills.map((skill, index) => (
                  <li key={index} className="flex">
                    <Tag>{skill}</Tag>
                  </li>
                ))}
                {project.hasDetail && project.detailMarkup && (
                  <li className="flex">
                    <CollapsibleTrigger
                      aria-label={`Learn more about ${project.title}`}
                      title="Learn more"
                      className="inline-flex size-6 items-center justify-center rounded-md text-transparent transition-colors hover:bg-muted hover:text-foreground [&_svg]:size-4"
                    >
                      <span aria-hidden>
                        <CollapsibleChevronsIcon />
                      </span>
                    </CollapsibleTrigger>
                  </li>
                )}
              </ul>
              {project.hasDetail && project.detailMarkup && (
                <CollapsibleContent hiddenUntilFound>
                  <Prose className="pt-2 sm:prose-sm">
                    <Markdown content={project.detailMarkup} />
                  </Prose>
                </CollapsibleContent>
              )}
            </CollapsibleWithContext>
          )}
        </div>
      </CollapsibleContent>
    </CollapsibleWithContext>
  )
}
