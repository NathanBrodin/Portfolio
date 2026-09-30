import '@takumi-rs/helpers/jsx'
import type { ReactNode } from 'react'

import type { ResumeData } from '../schema'

function formatDates(start: string, end: string, current: boolean): string {
  if (current) return `${start} – Present`
  if (end) return `${start} – ${end}`
  return start
}

function shortLinkLabel(url: string): string {
  return url
    .replace(/^https?:\/\//, '')
    .replace(/^mailto:/, '')
    .replace(/\/$/, '')
}

function ContactLine({ data }: { data: ResumeData }) {
  const basics = data.basics
  const parts: Array<ReactNode> = []

  if (basics.email) {
    parts.push(
      <a key="email" href={`mailto:${basics.email}`} tw="text-primary no-underline">
        {basics.email}
      </a>,
    )
  }
  if (basics.location) {
    parts.push(<span key="location">{basics.location}</span>)
  }
  if (basics.linkedin) {
    parts.push(
      <a key="linkedin" href={basics.linkedin} tw="text-primary no-underline">
        {shortLinkLabel(basics.linkedin)}
      </a>,
    )
  }
  if (basics.github) {
    parts.push(
      <a key="github" href={basics.github} tw="text-primary no-underline">
        {shortLinkLabel(basics.github)}
      </a>,
    )
  }
  if (basics.websiteUrl) {
    parts.push(
      <a key="website" href={basics.websiteUrl} tw="text-primary no-underline">
        {basics.websiteLabel || shortLinkLabel(basics.websiteUrl)}
      </a>,
    )
  }

  if (parts.length === 0) return null

  return (
    <p tw="text-center text-[10px] text-muted-foreground">
      {parts.map((part, index) => (
        <span key={index}>
          {index > 0 ? '  ·  ' : ''}
          {part}
        </span>
      ))}
    </p>
  )
}

function Bullets({ items }: { items: Array<string> }) {
  const lines = items.map((item) => item.trim()).filter(Boolean)
  if (lines.length === 0) return null
  return (
    <div tw="flex flex-col">
      {lines.map((line, index) => (
        <div key={index} tw="flex flex-row gap-[6px]">
          <span tw="shrink-0">•</span>
          <span>{line}</span>
        </div>
      ))}
    </div>
  )
}

function SkillsLine({ items }: { items: Array<string> }) {
  const text = items
    .map((item) => item.trim())
    .filter(Boolean)
    .join(' · ')
  if (!text) return null
  return <p tw="text-[10px] text-muted-foreground">{text}</p>
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 tw="mb-[8px] mt-[14px] border-b border-border pb-1 text-center font-display text-[13px] font-bold text-primary">
      {children}
    </h2>
  )
}

export function ResumePdfDocument({ data }: { data: ResumeData }) {
  return (
    <div tw="flex flex-col bg-background px-10 py-8 font-sans text-[11px] leading-[1.5] text-foreground">
      <h1 tw="text-center font-display text-[27px] font-bold leading-[1.15] tracking-[-0.02em] text-primary">
        {data.basics.name}
      </h1>
      {data.basics.headline ? (
        <p tw="mt-1 text-center text-[12px] text-muted-foreground">{data.basics.headline}</p>
      ) : null}
      <div tw="mt-1.5">
        <ContactLine data={data} />
      </div>

      {data.summary
        ? data.summary.split('\n\n').map((paragraph, index) => (
            <p key={index} tw="mt-2">
              {paragraph}
            </p>
          ))
        : null}

      {data.experience.length > 0 ? (
        <div>
          <SectionTitle>Experience</SectionTitle>
          <div tw="flex flex-col gap-[9px]">
            {data.experience.map((job) => (
              <div key={job.id}>
                <div tw="flex flex-row items-baseline justify-between gap-4">
                  <p tw="text-[12px] font-bold">{job.role}</p>
                  <p tw="shrink-0 text-[10px] text-muted-foreground">
                    {formatDates(job.start, job.end, job.current)}
                  </p>
                </div>
                {job.company || job.location ? (
                  <p>
                    {job.company}
                    {job.company && job.location ? (
                      <span tw="text-muted-foreground"> · {job.location}</span>
                    ) : null}
                    {!job.company && job.location ? job.location : null}
                  </p>
                ) : null}
                <SkillsLine items={job.skills} />
                <Bullets items={job.bullets} />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {data.projects.length > 0 ? (
        <div>
          <SectionTitle>Projects</SectionTitle>
          <div tw="flex flex-col gap-[9px]">
            {data.projects.map((project) => (
              <div key={project.id}>
                <div tw="flex flex-row items-baseline justify-between gap-4">
                  <p tw="text-[12px] font-bold">{project.name}</p>
                  {project.link ? (
                    <a href={project.link} tw="shrink-0 text-[10px] text-primary no-underline">
                      {shortLinkLabel(project.link)}
                    </a>
                  ) : null}
                </div>
                <SkillsLine items={project.skills} />
                <Bullets items={project.bullets} />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {data.skills.length > 0 ? (
        <div>
          <SectionTitle>Skills</SectionTitle>
          <div tw="flex flex-col gap-[3px]">
            {data.skills.map((group) => (
              <div key={group.id} tw="flex flex-row gap-3">
                <p tw="w-[130px] shrink-0 font-bold">{group.category}</p>
                <p>
                  {group.items
                    .map((item) => item.trim())
                    .filter(Boolean)
                    .join(', ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {data.education.length > 0 ? (
        <div>
          <SectionTitle>Education</SectionTitle>
          <div tw="flex flex-col gap-[9px]">
            {data.education.map((entry) => (
              <div key={entry.id}>
                <div tw="flex flex-row items-baseline justify-between gap-4">
                  <p tw="text-[12px] font-bold">{entry.school}</p>
                  <p tw="shrink-0 text-[10px] text-muted-foreground">
                    {formatDates(entry.start, entry.end, false)}
                  </p>
                </div>
                {entry.degree || entry.location ? (
                  <p>
                    {entry.degree}
                    {entry.degree && entry.location ? (
                      <span tw="text-muted-foreground"> · {entry.location}</span>
                    ) : null}
                    {!entry.degree && entry.location ? entry.location : null}
                  </p>
                ) : null}
                {entry.details ? <p>{entry.details}</p> : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
