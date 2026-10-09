import type { Project as ContentProject } from 'content-collections'

import { PlusIcon, ReplaceIcon, XIcon } from 'lucide-react'
import { useRef } from 'react'

import { Button } from '@/components/ui/button'
import {
  Combobox,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxTrigger,
} from '@/components/ui/combobox'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipPopup, TooltipTrigger } from '@/components/ui/tooltip'
import { getSortedProjects } from '@/lib/projects'

import { EditorSection, EditorSectionTitle } from '.'
import { useResumeBuilder } from '../store'

const projects = getSortedProjects()

// Content excerpts are Markdown; strip the rendered HTML down to the plain
// text shown in the PDF description. Runs on demand, client-only route.
function plainTextFromMarkup(markup: string): string {
  if (!markup) return ''
  return new DOMParser().parseFromString(markup, 'text/html').documentElement.textContent ?? ''
}

function ProjectPicker({
  onPick,
  trigger,
  ariaLabel,
  tooltip,
}: {
  onPick: (project: ContentProject) => void
  trigger: React.ReactElement
  ariaLabel?: string
  tooltip?: string
}) {
  const anchorRef = useRef<HTMLSpanElement>(null)

  const triggerNode = <ComboboxTrigger aria-label={ariaLabel} render={trigger} />

  return (
    <Combobox<ContentProject>
      items={projects}
      value={null}
      itemToStringValue={(project) => project.title}
      onValueChange={(value) => {
        if (value) onPick(value)
      }}
    >
      <span ref={anchorRef} className="inline-flex">
        {tooltip ? (
          <Tooltip>
            <TooltipTrigger render={triggerNode} />
            <TooltipPopup side="bottom">{tooltip}</TooltipPopup>
          </Tooltip>
        ) : (
          triggerNode
        )}
      </span>
      <ComboboxPopup anchor={anchorRef} className="min-w-52">
        <ComboboxList>
          {(project: ContentProject) => (
            <ComboboxItem key={project.id} value={project}>
              {project.title}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  )
}
export function ProjectsEditor() {
  const { data, addProject, removeProject, updateProject } = useResumeBuilder()

  return (
    <EditorSection>
      <EditorSectionTitle>Projects</EditorSectionTitle>
      <div className="flex flex-col gap-4">
        {data.projects.map((project) => (
          <div key={project.id} className="flex flex-col gap-1">
            <div className="flex items-baseline justify-between gap-2">
              <span className="shrink-0 text-sm font-medium ">{project.name}</span>
              <span className="flex min-w-0 items-center gap-1">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener"
                    className="truncate text-xs break-all text-ellipsis text-muted-foreground"
                  >
                    {project.link}
                  </a>
                )}
                <ProjectPicker
                  ariaLabel="Pick a project"
                  tooltip="Pick a project"
                  onPick={(content) =>
                    updateProject(project.id, {
                      name: content.title,
                      link: content.link ?? '',
                      description: plainTextFromMarkup(content.markup),
                    })
                  }
                  trigger={
                    <Button size="icon-xs" variant="ghost">
                      <ReplaceIcon />
                    </Button>
                  }
                />
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Button
                        aria-label={`Remove ${project.name || 'project'}`}
                        size="icon-xs"
                        variant="ghost"
                        noSound
                        onClick={() => removeProject(project.id)}
                      />
                    }
                  >
                    <XIcon />
                  </TooltipTrigger>
                  <TooltipPopup side="bottom">Remove project</TooltipPopup>
                </Tooltip>
              </span>
            </div>
            <Textarea
              size="sm"
              aria-label={`${project.name || 'Project'} description`}
              value={project.description}
              onChange={(event) => updateProject(project.id, { description: event.target.value })}
              className="flex-1"
            />
          </div>
        ))}
        <div className="self-start">
          <ProjectPicker
            onPick={(content) =>
              addProject({
                id: crypto.randomUUID(),
                name: content.title,
                link: content.link ?? '',
                description: plainTextFromMarkup(content.markup),
              })
            }
            trigger={
              <Button size="xs" variant="ghost">
                <PlusIcon />
                Add project
              </Button>
            }
          />
        </div>
      </div>
    </EditorSection>
  )
}
