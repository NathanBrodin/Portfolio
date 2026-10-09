import { PlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { BulletField, EditorSection, EditorSectionTitle } from '.'
import { formatDateRange } from '../dates'
import { useResumeBuilder } from '../store'

export function ExperienceEditor() {
  const { data, updateExperience } = useResumeBuilder()

  return (
    <EditorSection>
      <EditorSectionTitle>Experience</EditorSectionTitle>
      <div>
        {data.experience.map((job) => (
          <div key={job.id} className="flex flex-col pb-2">
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
                <div key={positionIndex} className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between gap-2 pb-2 text-xs text-muted-foreground">
                    <span>{position.role}</span>
                    <span className="shrink-0 font-mono tabular-nums">
                      {formatDateRange(position.start, position.end)}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
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
                    size="xs"
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
      </div>
    </EditorSection>
  )
}
