'use no memo'

import type { ReactNode } from 'react'

import type { ResumeData } from '../schema'

// Unstyled content template: semantic JSX only, no classes, no inline
// styles, no fonts. h1/h2 feed the PDF outline (bookmarks).

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
      <a key="email" href={`mailto:${basics.email}`}>
        {basics.email}
      </a>,
    )
  }
  if (basics.location) {
    parts.push(<span key="location">{basics.location}</span>)
  }
  if (basics.linkedin) {
    parts.push(
      <a key="linkedin" href={basics.linkedin}>
        {shortLinkLabel(basics.linkedin)}
      </a>,
    )
  }
  if (basics.github) {
    parts.push(
      <a key="github" href={basics.github}>
        {shortLinkLabel(basics.github)}
      </a>,
    )
  }
  if (basics.websiteUrl) {
    parts.push(
      <a key="website" href={basics.websiteUrl}>
        {basics.websiteLabel || shortLinkLabel(basics.websiteUrl)}
      </a>,
    )
  }

  if (parts.length === 0) return null

  return (
    <p>
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
    <ul>
      {lines.map((line, index) => (
        <li key={index}>{line}</li>
      ))}
    </ul>
  )
}

function SkillsLine({ items }: { items: Array<string> }) {
  const text = items
    .map((item) => item.trim())
    .filter(Boolean)
    .join(' · ')
  if (!text) return null
  return <p>{text}</p>
}

export function ResumePdfDocument({ data }: { data: ResumeData }) {
  // Padding is page margin (format), not content styling.
  return (
    <div style={{ paddingTop: 36, paddingRight: 48, paddingBottom: 36, paddingLeft: 48 }}>
      <h1>{data.basics.name}</h1>
      {data.basics.headline ? <p>{data.basics.headline}</p> : null}
      <ContactLine data={data} />

      {data.summary
        ? data.summary.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)
        : null}

      {data.experience.length > 0 ? (
        <section>
          <h2>Experience</h2>
          {data.experience.map((job) => (
            <article key={job.id}>
              <p>
                {job.role} — {formatDates(job.start, job.end, job.current)}
              </p>
              {job.company || job.location ? (
                <p>
                  {job.company}
                  {job.company && job.location ? ` · ${job.location}` : null}
                  {!job.company && job.location ? job.location : null}
                </p>
              ) : null}
              <SkillsLine items={job.skills} />
              <Bullets items={job.bullets} />
            </article>
          ))}
        </section>
      ) : null}

      {data.projects.length > 0 ? (
        <section>
          <h2>Projects</h2>
          {data.projects.map((project) => (
            <article key={project.id}>
              <p>
                {project.name}
                {project.link ? (
                  <>
                    {' — '}
                    <a href={project.link}>{shortLinkLabel(project.link)}</a>
                  </>
                ) : null}
              </p>
              <SkillsLine items={project.skills} />
              <Bullets items={project.bullets} />
            </article>
          ))}
        </section>
      ) : null}

      {data.skills.length > 0 ? (
        <section>
          <h2>Skills</h2>
          <ul>
            {data.skills.map((group) => (
              <li key={group.id}>
                {group.category}:{' '}
                {group.items
                  .map((item) => item.trim())
                  .filter(Boolean)
                  .join(', ')}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {data.education.length > 0 ? (
        <section>
          <h2>Education</h2>
          {data.education.map((entry) => (
            <article key={entry.id}>
              <p>
                {entry.school} — {formatDates(entry.start, entry.end, false)}
              </p>
              {entry.degree || entry.location ? (
                <p>
                  {entry.degree}
                  {entry.degree && entry.location ? ` · ${entry.location}` : null}
                  {!entry.degree && entry.location ? entry.location : null}
                </p>
              ) : null}
              {entry.details ? <p>{entry.details}</p> : null}
            </article>
          ))}
        </section>
      ) : null}
    </div>
  )
}
