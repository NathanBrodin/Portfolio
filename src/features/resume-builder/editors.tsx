import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

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
    <Section title="Basics" description="Name, headline, and contact details">
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
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input
            type="email"
            value={basics.email}
            onChange={(event) => updateBasics({ email: event.target.value })}
          />
        </Field>
        <Field>
          <FieldLabel>Location</FieldLabel>
          <Input
            value={basics.location}
            onChange={(event) => updateBasics({ location: event.target.value })}
          />
        </Field>
        <Field>
          <FieldLabel>LinkedIn URL</FieldLabel>
          <Input
            type="url"
            value={basics.linkedin}
            onChange={(event) => updateBasics({ linkedin: event.target.value })}
          />
        </Field>
        <Field>
          <FieldLabel>GitHub URL</FieldLabel>
          <Input
            type="url"
            value={basics.github}
            onChange={(event) => updateBasics({ github: event.target.value })}
          />
        </Field>
        <Field>
          <FieldLabel>Website label</FieldLabel>
          <Input
            value={basics.websiteLabel}
            onChange={(event) => updateBasics({ websiteLabel: event.target.value })}
          />
        </Field>
        <Field>
          <FieldLabel>Website URL</FieldLabel>
          <Input
            type="url"
            value={basics.websiteUrl}
            onChange={(event) => updateBasics({ websiteUrl: event.target.value })}
          />
        </Field>
      </div>
    </Section>
  )
}

function SummaryEditor() {
  const { data, updateSummary } = useResumeBuilder()

  return (
    <Section title="Summary" description="Tailor this paragraph per job post">
      <Field>
        <FieldLabel>Summary</FieldLabel>
        <Textarea
          value={data.summary}
          onChange={(event) => updateSummary(event.target.value)}
          placeholder="Two or three sentences. Blank line starts a new paragraph."
        />
      </Field>
    </Section>
  )
}

function ExperienceEditor() {
  const { data, updateExperience } = useResumeBuilder()

  return (
    <Section title="Experience" description="Roles and bullets, one bullet per line">
      {data.experience.map((job) => (
        <div key={job.id} className="flex flex-col gap-3 rounded-lg border p-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field>
              <FieldLabel>Role</FieldLabel>
              <Input
                value={job.role}
                onChange={(event) => updateExperience(job.id, { role: event.target.value })}
              />
            </Field>
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
            <Field>
              <FieldLabel>Start</FieldLabel>
              <Input
                value={job.start}
                placeholder="2025-08"
                onChange={(event) => updateExperience(job.id, { start: event.target.value })}
              />
            </Field>
            <Field>
              <FieldLabel>End</FieldLabel>
              <Input
                value={job.end}
                placeholder="2026-01"
                disabled={job.current}
                onChange={(event) => updateExperience(job.id, { end: event.target.value })}
              />
            </Field>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              checked={job.current}
              onCheckedChange={(checked) => updateExperience(job.id, { current: checked === true })}
            />
            <Label>Current position</Label>
          </div>
          <Field>
            <FieldLabel>Skills (comma separated)</FieldLabel>
            <Input
              value={job.skills.join(', ')}
              onChange={(event) =>
                updateExperience(job.id, {
                  skills: event.target.value.split(',').map((skill) => skill.trim()),
                })
              }
            />
          </Field>
          <Field>
            <FieldLabel>Bullets (one per line)</FieldLabel>
            <Textarea
              value={job.bullets.join('\n')}
              onChange={(event) =>
                updateExperience(job.id, { bullets: event.target.value.split('\n') })
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
    <Section title="Projects" description="Side projects, one bullet per line">
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
            <FieldLabel>Skills (comma separated)</FieldLabel>
            <Input
              value={project.skills.join(', ')}
              onChange={(event) =>
                updateProject(project.id, {
                  skills: event.target.value.split(',').map((skill) => skill.trim()),
                })
              }
            />
          </Field>
          <Field>
            <FieldLabel>Bullets (one per line)</FieldLabel>
            <Textarea
              value={project.bullets.join('\n')}
              onChange={(event) =>
                updateProject(project.id, { bullets: event.target.value.split('\n') })
              }
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

function EducationEditor() {
  const { data, updateEducation } = useResumeBuilder()

  return (
    <Section title="Education" description="Degrees and schools">
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
            <FieldLabel>Details</FieldLabel>
            <Textarea
              value={entry.details}
              onChange={(event) => updateEducation(entry.id, { details: event.target.value })}
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
      <SummaryEditor />
      <ExperienceEditor />
      <ProjectsEditor />
      <SkillsEditor />
      <EducationEditor />
    </div>
  )
}
