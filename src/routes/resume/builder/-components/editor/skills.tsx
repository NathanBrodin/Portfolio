import { XIcon } from 'lucide-react'
import { useState } from 'react'

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
import { Tooltip, TooltipPopup, TooltipTrigger } from '@/components/ui/tooltip'
import { TECH_STACK } from '@/config/tech-stack'

import { EditorSection, EditorSectionTitle } from '.'
import { useResumeBuilder } from '../store'

const techByTitle = new Map(TECH_STACK.map((tech) => [tech.title, tech]))

const techGroups = Object.entries(
  TECH_STACK.reduce<Record<string, string[]>>((acc, tech) => {
    ;(acc[tech.category] ??= []).push(tech.title)
    return acc
  }, {}),
).map(([label, items]) => ({ label, items }))

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
    <div className="flex min-h-9 w-full flex-wrap items-center gap-1 rounded-lg border border-input bg-background p-[calc(--spacing(1)-1px)] shadow-xs/5 transition-shadow focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/24">
      <span className="shrink-0 px-1 text-xs text-muted-foreground">{category}:</span>
      {items.map((item) => {
        const tech = techByTitle.get(item)
        return (
          <span
            key={item}
            className="flex h-7 items-center gap-1 rounded-[calc(var(--radius-md)-1px)] bg-accent ps-2 pe-1 font-mono text-xs font-medium text-accent-foreground [&_img]:size-3.5 [&_img]:shrink-0"
          >
            {tech && <TechIcon tech={tech} />}
            <span className="py-0.5">{item}</span>
            <Tooltip>
              <TooltipTrigger
                render={
                  <button
                    type="button"
                    aria-label={`Remove ${item}`}
                    onClick={() => onChange(items.filter((current) => current !== item))}
                    className="h-full cursor-pointer px-1.5 opacity-80 outline-none hover:opacity-100 [&_svg]:pointer-events-none [&_svg]:size-3.5"
                  />
                }
              >
                <XIcon />
              </TooltipTrigger>
              <TooltipPopup side="bottom">Remove {item}</TooltipPopup>
            </Tooltip>
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
  )
}

export function SkillsEditor() {
  const { data, updateSkillGroup } = useResumeBuilder()

  return (
    <EditorSection>
      <EditorSectionTitle>Technical Skills</EditorSectionTitle>
      <div className="flex flex-col gap-2">
        {data.skills.map((group) => (
          <SkillGroupEditor
            key={group.id}
            category={group.category}
            items={group.items}
            onChange={(items) => updateSkillGroup(group.id, { items })}
          />
        ))}
      </div>
    </EditorSection>
  )
}
