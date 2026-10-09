import { PlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { BulletField, EditorSection, EditorSectionTitle } from '.'
import { formatDateRange } from '../dates'
import { useResumeBuilder } from '../store'

export function EducationEditor() {
  const { data, updateEducation } = useResumeBuilder()

  return (
    <EditorSection>
      <EditorSectionTitle>Education</EditorSectionTitle>
      <div>
        {data.education.map((entry) => (
          <div key={entry.id} className="flex flex-col pb-2">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-sm font-medium">{entry.school}</span>
              <span className="shrink-0 text-xs text-muted-foreground">{entry.location}</span>
            </div>
            <div className="flex items-baseline justify-between gap-2 pb-2 text-xs text-muted-foreground">
              <span>{entry.degree}</span>
              <span className="shrink-0 font-mono tabular-nums">
                {formatDateRange(entry.start, entry.end)}
              </span>
            </div>
            <div className="flex flex-col gap-2">
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
              size="xs"
              variant="ghost"
              className="self-start"
              onClick={() => updateEducation(entry.id, { bullets: [...entry.bullets, ''] })}
            >
              <PlusIcon />
              Add bullet
            </Button>
          </div>
        ))}
      </div>
    </EditorSection>
  )
}
