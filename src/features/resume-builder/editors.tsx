import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import type { Position } from './schema'

import { useResumeBuilder } from './store'

function Section({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-xl border bg-card p-4 text-card-foreground shadow-xs/5">
      <div className="flex flex-col gap-1 pb-4">
        <h2 className="block text-sm font-medium">{title}</h2>
        <p className="block text-xs text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  )
}

function BasicsEditor() {
  const { data, updateBasics } = useResumeBuilder()
  const basics = data.basics

  return (
    <Section title="Basics" description="Name, headline, and header links">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field>
          <FieldLabel>Name</FieldLabel>
          <Input
            value={basics.name}
            onChange={(event) => updateBasics({ name: event.target.value })}
          />
        </Field>
        <Field>
          <FieldLabel>Headline</FieldLabel>
          <Input
            value={basics.headline}
            onChange={(event) => updateBasics({ headline: event.target.value })}
          />
        </Field>
      </div>
      {basics.links.map((link, index) => (
        <div key={index} className="grid gap-3 sm:grid-cols-2">
          <Field>
            <FieldLabel>Link label</FieldLabel>
            <Input
              value={link.label}
              onChange={(event) =>
                updateBasics({
                  links: basics.links.map((item, i) =>
                    i === index ? { ...item, label: event.target.value } : item,
                  ),
                })
              }
            />
          </Field>
          <Field>
            <FieldLabel>Link URL</FieldLabel>
            <Input
              type="url"
              value={link.href}
              onChange={(event) =>
                updateBasics({
                  links: basics.links.map((item, i) =>
                    i === index ? { ...item, href: event.target.value } : item,
                  ),
                })
              }
            />
          </Field>
        </div>
      ))}
    </Section>
  )
}

function ExperienceEditor() {
  const { data, updateExperience } = useResumeBuilder()

  return (
    <Section title="Experience" description="Companies and positions, one bullet per line">
      {data.experience.map((job) => (
        <div key={job.id} className="flex flex-col gap-3 rounded-lg border p-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field>
              <FieldLabel>Company</FieldLabel>
              <Input
                value={job.company}
                onChange={(event) => updateExperience(job.id, { company: event.target.value })}
              />
            </Field>
            <Field>
              <FieldLabel>Location</FieldLabel>
              <Input
                value={job.location}
                onChange={(event) => updateExperience(job.id, { location: event.target.value })}
              />
            </Field>
          </div>
          {job.positions.map((position, positionIndex) => {
            const updatePosition = (patch: Partial<Position>) =>
              updateExperience(job.id, {
                positions: job.positions.map((item, index) =>
                  index === positionIndex ? { ...item, ...patch } : item,
                ),
              })

            return (
              <div key={positionIndex} className="flex flex-col gap-3 rounded-lg border p-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field>
                    <FieldLabel>Role</FieldLabel>
                    <Input
                      value={position.role}
                      onChange={(event) => updatePosition({ role: event.target.value })}
                    />
                  </Field>
                  <Field>
                    <FieldLabel>Start</FieldLabel>
                    <Input
                      value={position.start}
                      placeholder="2025-08"
                      onChange={(event) => updatePosition({ start: event.target.value })}
                    />
                  </Field>
                  <Field>
                    <FieldLabel>End (blank = Present)</FieldLabel>
                    <Input
                      value={position.end ?? ''}
                      placeholder="2026-01"
                      onChange={(event) => updatePosition({ end: event.target.value || undefined })}
                    />
                  </Field>
                </div>
                <Field>
                  <FieldLabel>Bullets (one per line)</FieldLabel>
                  <Textarea
                    value={position.bullets.join('\n')}
                    onChange={(event) =>
                      updatePosition({ bullets: event.target.value.split('\n') })
                    }
                  />
                </Field>
              </div>
            )
          })}
        </div>
      ))}
    </Section>
  )
}

function EducationEditor() {
  const { data, updateEducation } = useResumeBuilder()

  return (
    <Section title="Education" description="Degrees and schools, one bullet per line">
      {data.education.map((entry) => (
        <div key={entry.id} className="flex flex-col gap-3 rounded-lg border p-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field>
              <FieldLabel>School</FieldLabel>
              <Input
                value={entry.school}
                onChange={(event) => updateEducation(entry.id, { school: event.target.value })}
              />
            </Field>
            <Field>
              <FieldLabel>Degree</FieldLabel>
              <Input
                value={entry.degree}
                onChange={(event) => updateEducation(entry.id, { degree: event.target.value })}
              />
            </Field>
            <Field>
              <FieldLabel>Location</FieldLabel>
              <Input
                value={entry.location}
                onChange={(event) => updateEducation(entry.id, { location: event.target.value })}
              />
            </Field>
            <Field>
              <FieldLabel>Start</FieldLabel>
              <Input
                value={entry.start}
                onChange={(event) => updateEducation(entry.id, { start: event.target.value })}
              />
            </Field>
            <Field>
              <FieldLabel>End</FieldLabel>
              <Input
                value={entry.end}
                onChange={(event) => updateEducation(entry.id, { end: event.target.value })}
              />
            </Field>
          </div>
          <Field>
            <FieldLabel>Bullets (one per line)</FieldLabel>
            <Textarea
              value={entry.bullets.join('\n')}
              onChange={(event) =>
                updateEducation(entry.id, { bullets: event.target.value.split('\n') })
              }
            />
          </Field>
        </div>
      ))}
    </Section>
  )
}

function ProjectsEditor() {
  const { data, updateProject } = useResumeBuilder()

  return (
    <Section title="Projects" description="One line per project, shown after the link">
      {data.projects.map((project) => (
        <div key={project.id} className="flex flex-col gap-3 rounded-lg border p-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input
                value={project.name}
                onChange={(event) => updateProject(project.id, { name: event.target.value })}
              />
            </Field>
            <Field>
              <FieldLabel>Link</FieldLabel>
              <Input
                type="url"
                value={project.link}
                onChange={(event) => updateProject(project.id, { link: event.target.value })}
              />
            </Field>
          </div>
          <Field>
            <FieldLabel>Description</FieldLabel>
            <Textarea
              value={project.description}
              onChange={(event) => updateProject(project.id, { description: event.target.value })}
            />
          </Field>
        </div>
      ))}
    </Section>
  )
}

function SkillsEditor() {
  const { data, updateSkillGroup } = useResumeBuilder()

  return (
    <Section title="Skills" description="Grouped keywords">
      {data.skills.map((group) => (
        <div key={group.id} className="grid gap-3 sm:grid-cols-[140px_1fr]">
          <Field>
            <FieldLabel>Category</FieldLabel>
            <Input
              value={group.category}
              onChange={(event) => updateSkillGroup(group.id, { category: event.target.value })}
            />
          </Field>
          <Field>
            <FieldLabel>Items (comma separated)</FieldLabel>
            <Input
              value={group.items.join(', ')}
              onChange={(event) =>
                updateSkillGroup(group.id, {
                  items: event.target.value.split(',').map((item) => item.trim()),
                })
              }
            />
          </Field>
        </div>
      ))}
    </Section>
  )
}

export function BuilderEditors() {
  return (
    <div className="flex flex-col gap-3">
      <BasicsEditor />
      <ExperienceEditor />
      <EducationEditor />
      <ProjectsEditor />
      <SkillsEditor />
    </div>
  )
}
