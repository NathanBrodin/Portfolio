'use no memo'

import '@takumi-rs/helpers/jsx'
import { Fragment } from 'react'

import type { Resume } from '../schema'

import { formatDateRange } from '../dates'

const headingTw =
  'm-0 border-b border-border pb-0.5 font-display font-medium text-primary text-[0.9375rem] leading-tight tracking-[-0.005em]'

export function ResumeTemplate({ data }: { data: Resume }) {
  return (
    <main tw="px-12 py-6 font-sans text-xs leading-tight text-foreground">
      <section tw="flex w-full flex-col items-center gap-0.5">
        <h1 tw="m-0 text-center font-display font-normal text-primary text-2xl leading-[1.2] tracking-[-0.02em]">
          {data.basics.name}
        </h1>
        <p tw="m-0 text-center leading-tight">{data.basics.headline}</p>
        <ul tw="m-0 flex list-none flex-row justify-center gap-3 p-0">
          {data.basics.links.map((link) => (
            <li key={link.href} tw="m-0 p-0">
              <a tw="underline" href={link.href}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section tw="mt-3.5">
        <h2 tw={headingTw}>Experience</h2>
        <div tw="mt-1 flex flex-col gap-1.5">
          {data.experience.map((job) => (
            <div key={job.id}>
              <div tw="flex flex-row justify-between">
                <p tw="m-0">{job.company}</p>
                <p tw="m-0 text-muted-foreground">{job.location}</p>
              </div>
              {job.positions.map((position, index) => (
                <Fragment key={index}>
                  <div
                    tw={
                      index === 0
                        ? 'flex flex-row justify-between'
                        : 'mt-1 flex flex-row justify-between'
                    }
                  >
                    <p tw="m-0 text-muted-foreground">{position.role}</p>
                    <p tw="m-0 text-muted-foreground">
                      {formatDateRange(position.start, position.end)}
                    </p>
                  </div>
                  <ul tw="m-0 mt-1 list-disc pl-5">
                    {position.bullets.map((bullet) => (
                      <li key={bullet} tw="m-0">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </Fragment>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section tw="mt-3.5">
        <h2 tw={headingTw}>Education</h2>
        <div tw="mt-1 flex flex-col gap-1.5">
          {data.education.map((entry) => (
            <div key={entry.id}>
              <div tw="flex flex-row justify-between">
                <p tw="m-0">{entry.school}</p>
                <p tw="m-0 text-muted-foreground">{entry.location}</p>
              </div>
              <div tw="flex flex-row justify-between">
                <p tw="m-0 text-muted-foreground">{entry.degree}</p>
                <p tw="m-0 text-muted-foreground">{formatDateRange(entry.start, entry.end)}</p>
              </div>
              <ul tw="m-0 mt-1 list-disc pl-5">
                {entry.bullets.map((bullet) => (
                  <li key={bullet} tw="m-0">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section tw="mt-3.5">
        <h2 tw={headingTw}>Projects</h2>
        <div tw="mt-1 flex flex-col gap-1">
          {data.projects.map((project) => (
            <p key={project.id} tw="m-0">
              <a href={project.link}>{project.name}</a>
              {` — ${project.description}`}
            </p>
          ))}
        </div>
      </section>

      <section tw="mt-3.5">
        <h2 tw={headingTw}>Technical Skills</h2>
        <div tw="mt-1 flex flex-col gap-0.5">
          {data.skills.map((group) => (
            <p key={group.id} tw="m-0">
              <span tw="text-muted-foreground">{group.category}: </span>
              {group.items.join(', ')}
            </p>
          ))}
        </div>
      </section>
    </main>
  )
}
