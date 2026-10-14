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
          <p tw="m-0 text-center leading-tight">
            {data.basics.links.map((link, index) => (
              <Fragment key={link.href}>
                {index > 0 && <span tw="text-muted-foreground">{' · '}</span>}
                <a
                  tw="underline decoration-0 text-muted-foreground decoration-muted-foreground"
                  href={link.href}
                >
                  {link.label}
                </a>
              </Fragment>
            ))}
          </p>
        </div>
      </section>
      <div tw="relative px-12 pb-8">
        <section tw="mt-3">
          <h2 tw={headingTw}>Experience</h2>
          <div tw="mt-1 flex flex-col gap-1">
            {data.experience.map((job) => (
              <div key={job.id}>
                <p tw="m-0 flex flex-row justify-between">
                  <span tw="font-medium">{job.company}</span>
                  <span tw="text-muted-foreground">{job.location}</span>
                </p>
                {job.positions.map((position, index) => (
                  <Fragment key={index}>
                    <p
                      tw={
                        index === 0
                          ? 'm-0 flex flex-row justify-between'
                          : 'm-0 mt-1 flex flex-row justify-between'
                      }
                    >
                      <span tw="text-muted-foreground">{position.role}</span>
                      <span tw="text-muted-foreground">
                        {formatDateRange(position.start, position.end)}
                      </span>
                    </p>
                    <div tw="mt-1">
                      {position.bullets.map((bullet) => (
                        <p key={bullet} tw="m-0 pl-5" style={{ textIndent: '-12px' }}>
                          {`• ${bullet}`}
                        </p>
                      ))}
                    </div>
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
                <p tw="m-0 flex flex-row justify-between">
                  <span tw="font-medium">{entry.school}</span>
                  <span tw="text-muted-foreground">{entry.location}</span>
                </p>
                <p tw="m-0 flex flex-row justify-between">
                  <span tw="text-muted-foreground">{entry.degree}</span>
                  <span tw="text-muted-foreground">{formatDateRange(entry.start, entry.end)}</span>
                </p>
                <div tw="mt-1">
                  {entry.bullets.map((bullet) => (
                    <p key={bullet} tw="m-0 pl-5" style={{ textIndent: '-12px' }}>
                      {`• ${bullet}`}
                    </p>
                  ))}
                </div>
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
