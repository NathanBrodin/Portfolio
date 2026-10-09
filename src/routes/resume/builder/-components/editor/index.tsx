import { XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipPopup, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

import { useResumeBuilder } from '../store'
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

export function EditorSection({ className, ...props }: React.ComponentProps<'section'>) {
  return (
    <section
      className={cn('flex flex-col gap-2', className)}
      {...props}
      data-slot="editor-section"
    />
  )
}

export function EditorSectionTitle({ className, ...props }: React.ComponentProps<'h2'>) {
  return (
    <h2
      className={cn(
        'border-b border-border font-display text-balance text-base font-medium text-primary',
        className,
      )}
      {...props}
      data-slot="editor-section-title"
    />
  )
}

export function BuilderEditors() {
  const { commit } = useResumeBuilder()

  return (
    <div className="relative flex flex-col gap-2 p-4" onBlurCapture={commit}>
      <p className="text-center font-display text-xl text-balance text-primary">Resume Builder</p>
      <HeadlineEditor />
      <ExperienceEditor />
      <EducationEditor />
      <ProjectsEditor />
      <SkillsEditor />
    </div>
  )
}
