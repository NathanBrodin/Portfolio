import { XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipPopup, TooltipTrigger } from '@/components/ui/tooltip'

import { EducationEditor } from './education'
import { ExperienceEditor } from './experience'
import { HeadlineEditor } from './headline'
import { ProjectsEditor } from './projects'
import { SkillsEditor } from './skills'

export function BulletField({
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
      <div className="flex w-full items-start gap-1.5">
        <span aria-hidden="true">•</span>
        <Textarea
          size="sm"
          aria-label={label}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="flex-1"
        />
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                aria-label={`Remove ${label.toLowerCase()}`}
                size="icon-xs"
                variant="ghost"
                disabled={!removable}
                noSound
                onClick={onRemove}
              />
            }
          >
            <XIcon />
          </TooltipTrigger>
          <TooltipPopup side="bottom">Remove bullet</TooltipPopup>
        </Tooltip>
      </div>
    </Field>
  )
}

export function BuilderEditors() {
  return (
    <div>
      <HeadlineEditor />
      <ExperienceEditor />
      <EducationEditor />
      <ProjectsEditor />
      <SkillsEditor />
    </div>
  )
}
