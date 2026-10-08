import { PlusIcon, XIcon } from 'lucide-react'
import { useId, useState } from 'react'

import { TechIcon } from '@/components/tech-stack/tech-icon'
import {
  Autocomplete,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  useAutocompleteFilter,
} from '@/components/ui/autocomplete'
import { Button } from '@/components/ui/button'
import { Card, CardPanel } from '@/components/ui/card'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import { TECH_STACK } from '@/config/tech-stack'

import { formatDateRange } from './dates'
import { useResumeBuilder } from './store'

const HEADLINE_MAX_LENGTH = 200

const techByTitle = new Map(TECH_STACK.map((tech) => [tech.title, tech]))

const techGroups = Object.entries(
  TECH_STACK.reduce<Record<string, string[]>>((acc, tech) => {
    ;(acc[tech.category] ??= []).push(tech.title)
    return acc
  }, {}),
).map(([label, items]) => ({ label, items }))

function EditorSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-medium">{title}</h2>
      {children}
    </section>
  )
}

function HeadlineEditor() {
  const { data, updateBasics } = useResumeBuilder()
  const headline = data.basics.headline

  return (
    <EditorSection title="Headline">
      <Field>
        <FieldLabel>Headline</FieldLabel>
        <Textarea
          value={headline}
          maxLength={HEADLINE_MAX_LENGTH}
          placeholder="One line under your name"
          onChange={(event) => updateBasics({ headline: event.target.value })}
        />
        <FieldDescription>
          <span className="tabular-nums">{HEADLINE_MAX_LENGTH - headline.length}</span> characters
          left
        </FieldDescription>
      </Field>
    </EditorSection>
  )
}

function BulletField({
  value,
  label,
  removable,
  onChange,
  onRemove,
}: {
  value: string
  label: string
  removable: boolean
  onChange: (value: string) => void
  onRemove: () => void
}) {
  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      <div className="flex w-full items-start gap-1.5">
        <Textarea
          size="sm"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="flex-1"
        />
        <Button
          aria-label={`Remove ${label.toLowerCase()}`}
          size="icon-sm"
          variant="ghost"
          disabled={!removable}
          noSound
          onClick={onRemove}
        >
          <XIcon />
        </Button>
      </div>
    </Field>
  )
}

function ExperienceEditor() {
  const { data, updateExperience } = useResumeBuilder()

  return (
    <EditorSection title="Experience">
      {data.experience.map((job) => (
        <div key={job.id} className="flex flex-col gap-3 rounded-lg border p-3">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-sm font-medium">{job.company}</span>
            <span className="shrink-0 text-xs text-muted-foreground">{job.location}</span>
          </div>
          {job.positions.map((position, positionIndex) => {
            const updatePosition = (patch: Partial<typeof position>) =>
              updateExperience(job.id, {
                positions: job.positions.map((item, index) =>
                  index === positionIndex ? { ...item, ...patch } : item,
                ),
              })

            return (
              <div
                key={positionIndex}
                className="flex flex-col gap-2 border-t border-border pt-3 first:border-none first:pt-0"
              >
                <div className="flex items-baseline justify-between gap-2 text-xs text-muted-foreground">
                  <span>{position.role}</span>
                  <span className="shrink-0 font-mono tabular-nums">
                    {formatDateRange(position.start, position.end)}
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  {position.bullets.map((bullet, bulletIndex) => (
                    <BulletField
                      key={bulletIndex}
                      label={`Bullet ${bulletIndex + 1}`}
                      value={bullet}
                      removable={position.bullets.length > 1}
                      onChange={(value) =>
                        updatePosition({
                          bullets: position.bullets.map((item, index) =>
                            index === bulletIndex ? value : item,
                          ),
                        })
                      }
                      onRemove={() =>
                        updatePosition({
                          bullets: position.bullets.filter((_, index) => index !== bulletIndex),
                        })
                      }
                    />
                  ))}
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="self-start"
                  onClick={() => updatePosition({ bullets: [...position.bullets, ''] })}
                >
                  <PlusIcon />
                  Add bullet
                </Button>
              </div>
            )
          })}
        </div>
      ))}
    </EditorSection>
  )
}

function EducationEditor() {
  const { data, updateEducation } = useResumeBuilder()

  return (
    <EditorSection title="Education">
      {data.education.map((entry) => (
        <div key={entry.id} className="flex flex-col gap-3 rounded-lg border p-3">
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-sm font-medium">{entry.school}</span>
              <span className="shrink-0 text-xs text-muted-foreground">{entry.location}</span>
            </div>
            <div className="flex items-baseline justify-between gap-2 text-xs text-muted-foreground">
              <span>{entry.degree}</span>
              <span className="shrink-0 font-mono tabular-nums">
                {formatDateRange(entry.start, entry.end)}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3 border-t border-border pt-3">
            {entry.bullets.map((bullet, bulletIndex) => (
              <BulletField
                key={bulletIndex}
                label={`Bullet ${bulletIndex + 1}`}
                value={bullet}
                removable={entry.bullets.length > 1}
                onChange={(value) =>
                  updateEducation(entry.id, {
                    bullets: entry.bullets.map((item, index) =>
                      index === bulletIndex ? value : item,
                    ),
                  })
                }
                onRemove={() =>
                  updateEducation(entry.id, {
                    bullets: entry.bullets.filter((_, index) => index !== bulletIndex),
                  })
                }
              />
            ))}
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="self-start"
            onClick={() => updateEducation(entry.id, { bullets: [...entry.bullets, ''] })}
          >
            <PlusIcon />
            Add bullet
          </Button>
        </div>
      ))}
    </EditorSection>
  )
}

function ProjectsEditor() {
  const { data, updateProject } = useResumeBuilder()

  return (
    <EditorSection title="Projects">
      {data.projects.map((project) => (
        <div key={project.id} className="flex flex-col gap-3 rounded-lg border p-3">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-sm font-medium">{project.name}</span>
            <span className="min-w-0 truncate font-mono text-xs text-muted-foreground">
              {project.link}
            </span>
          </div>
          <Field>
            <FieldLabel>Description</FieldLabel>
            <Textarea
              size="sm"
              value={project.description}
              onChange={(event) => updateProject(project.id, { description: event.target.value })}
            />
          </Field>
        </div>
      ))}
    </EditorSection>
  )
}

function SkillGroupEditor({
  category,
  items,
  onChange,
}: {
  category: string
  items: string[]
  onChange: (items: string[]) => void
}) {
  const [query, setQuery] = useState('')
  const inputId = useId()
  const filter = useAutocompleteFilter()

  const availableGroups = techGroups.flatMap((group) => {
    const available = group.items.filter((title) => !items.includes(title))
    return available.length > 0 ? [{ label: group.label, items: available }] : []
  })

  const commit = (value: string) => {
    const trimmed = value.trim()
    setQuery('')
    if (!trimmed || items.includes(trimmed)) return
    onChange([...items, trimmed])
  }

  const hasTechMatch = (value: string) =>
    availableGroups.some((group) => group.items.some((title) => filter.contains(title, value)))

  return (
    <Field>
      <FieldLabel htmlFor={inputId}>{category}</FieldLabel>
      <div className="flex min-h-9 w-full flex-wrap items-center gap-1 rounded-lg border border-input bg-background p-[calc(--spacing(1)-1px)] shadow-xs/5 transition-shadow focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/24">
        {items.map((item) => {
          const tech = techByTitle.get(item)
          return (
            <span
              key={item}
              className="flex h-7 items-center gap-1 rounded-[calc(var(--radius-md)-1px)] bg-accent ps-2 pe-1 font-mono text-xs font-medium text-accent-foreground [&_img]:size-3.5 [&_img]:shrink-0"
            >
              {tech && <TechIcon tech={tech} />}
              <span className="py-0.5">{item}</span>
              <button
                type="button"
                aria-label={`Remove ${item}`}
                onClick={() => onChange(items.filter((current) => current !== item))}
                className="h-full cursor-pointer px-1.5 opacity-80 outline-none hover:opacity-100 [&_svg]:pointer-events-none [&_svg]:size-3.5"
              >
                <XIcon />
              </button>
            </span>
          )
        })}
        <Autocomplete
          items={availableGroups}
          value={query}
          autoHighlight="always"
          openOnInputClick
          onValueChange={(value, eventDetails) => {
            if (eventDetails.reason === 'item-press') {
              commit(value)
            } else {
              setQuery(value)
            }
          }}
        >
          <AutocompleteInput
            id={inputId}
            aria-label={`Add a skill to ${category}`}
            placeholder={items.length === 0 ? 'Type to add a skill…' : undefined}
            render={
              <input className="h-7 w-full flex-1 px-1 font-mono text-xs outline-none placeholder:text-muted-foreground" />
            }
            onKeyDown={(event) => {
              if (event.key !== 'Enter') return
              const value = query.trim()
              if (!value || hasTechMatch(value)) return
              commit(value)
            }}
            onBlur={() => {
              const value = query.trim()
              if (value) commit(value)
            }}
          />
          <AutocompletePopup>
            <AutocompleteList>
              {(group: { label: string; items: string[] }) => (
                <AutocompleteGroup key={group.label}>
                  <AutocompleteGroupLabel>{group.label}</AutocompleteGroupLabel>
                  {group.items.map((title) => {
                    const tech = techByTitle.get(title)
                    return (
                      <AutocompleteItem key={title} value={title}>
                        {tech && (
                          <span className="flex size-4 shrink-0 items-center justify-center [&_img]:size-3.5">
                            <TechIcon tech={tech} />
                          </span>
                        )}
                        {title}
                      </AutocompleteItem>
                    )
                  })}
                </AutocompleteGroup>
              )}
            </AutocompleteList>
            {query.trim() !== '' && (
              <AutocompleteEmpty>Press Enter to add “{query.trim()}”</AutocompleteEmpty>
            )}
          </AutocompletePopup>
        </Autocomplete>
      </div>
    </Field>
  )
}

function SkillsEditor() {
  const { data, updateSkillGroup } = useResumeBuilder()

  return (
    <EditorSection title="Skills">
      {data.skills.map((group) => (
        <SkillGroupEditor
          key={group.id}
          category={group.category}
          items={group.items}
          onChange={(items) => updateSkillGroup(group.id, { items })}
        />
      ))}
    </EditorSection>
  )
}

export function BuilderEditors() {
  return (
    <Card>
      <CardPanel>
        <div className="flex flex-col gap-5">
          <HeadlineEditor />
          <ExperienceEditor />
          <EducationEditor />
          <ProjectsEditor />
          <SkillsEditor />
        </div>
      </CardPanel>
    </Card>
  )
}
