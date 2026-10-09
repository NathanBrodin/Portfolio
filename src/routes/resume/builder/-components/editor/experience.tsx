import { PlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { BulletField } from '.'
import { formatDateRange } from '../dates'
import { useResumeBuilder } from '../store'

export function ExperienceEditor() {
  const { data, updateExperience } = useResumeBuilder()

  return (
    <section className="flex flex-col gap-3 py-2">
      <h2 className="border-b border-border pb-0.5 font-display text-[0.9375rem] leading-tight font-medium tracking-[-0.005em] text-primary">
        Experience
      </h2>
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
    </section>
  )
}
