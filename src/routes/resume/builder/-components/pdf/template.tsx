'use no memo'

import '@takumi-rs/helpers/jsx'
import { Fragment } from 'react'

import type { Resume } from '../schema'

import { formatDateRange } from '../dates'
import { RESUME_HEADER_SRC, RESUME_NOISE_SRC } from './images'

const headingTw =
  'm-0 border-b border-border pb-0.5 font-display font-medium text-primary text-[0.9375rem] leading-tight tracking-[-0.005em]'

export function ResumeTemplate({ data }: { data: Resume }) {
  return (
    <main tw="relative font-sans text-xs leading-tight text-foreground">
      <div
        tw="absolute inset-0"
        style={{
          backgroundImage: `url(${RESUME_NOISE_SRC})`,
          backgroundSize: '180px',
          backgroundRepeat: 'repeat',
          opacity: 0.035,
        }}
        aria-hidden="true"
      />
      <section tw="relative flex w-full flex-col items-center gap-0.5 overflow-hidden px-8 py-4 border-b border-border">
        <img
          src={RESUME_HEADER_SRC}
          tw="absolute inset-0 h-full w-full object-cover opacity-10"
          alt=""
        />
        <div tw="relative flex w-full flex-col items-center gap-0.5">
          <h1 tw="m-0 text-center font-display font-normal text-primary text-2xl leading-[1.2] tracking-[-0.02em] mb-1">
            {data.basics.name}
          </h1>
          <p tw="m-0 text-center leading-tight">{data.basics.headline}</p>
          <ul tw="m-0 flex list-none flex-row justify-center gap-3 p-0">
            {data.basics.links.map((link) => (
              <li key={link.href} tw="m-0 p-0">
                <a
                  tw="underline decoration-0 text-muted-foreground decoration-muted-foreground"
                  href={link.href}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <div tw="relative px-12 pb-8">
        <section tw="mt-3">
          <h2 tw={headingTw}>Experience</h2>
          <div tw="mt-1 flex flex-col gap-1">
            {data.experience.map((job) => (
              <div key={job.id}>
                <div tw="flex flex-row justify-between">
                  <p tw="m-0 font-medium">{job.company}</p>
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

        <section tw="mt-3">
          <h2 tw={headingTw}>Education</h2>
          <div tw="mt-1 flex flex-col gap-1">
            {data.education.map((entry) => (
              <div key={entry.id}>
                <div tw="flex flex-row justify-between">
                  <p tw="m-0 font-medium">{entry.school}</p>
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

        <section tw="mt-3">
          <h2 tw={headingTw}>Projects</h2>
          <div tw="mt-1 flex flex-col gap-1">
            {data.projects.map((project) => (
              <p key={project.id} tw="m-0">
                <a href={project.link} tw="font-medium">
                  {project.name}
                </a>
                {` — ${project.description}`}
              </p>
            ))}
          </div>
        </section>

        <section tw="mt-3">
          <h2 tw={headingTw}>Technical Skills</h2>
          <div tw="mt-1 flex flex-col gap-0.5">
            {data.skills.map((group) => (
              <p key={group.id} tw="m-0">
                <span tw="font-medium">{group.category}: </span>
                {group.items.join(', ')}
              </p>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
