'use no memo'

import '@takumi-rs/helpers/jsx'
import type { ReactNode } from 'react'

// Reusable building blocks for the resume PDF, mirroring the small composable
// components in src/components/ui — but styled through the `tw` prop.

interface SectionProps {
  title: string
  /** Spacing-scale suffix for the gap between children (e.g. "1.5"). */
  gap?: string
  children: ReactNode
}

export function Section({ title, gap, children }: SectionProps) {
  return (
    <section tw="mt-3.5">
      <h2 tw="m-0 border-b border-border pb-0.5 font-display font-medium text-primary text-[0.9375rem] leading-tight tracking-[-0.005em]">
        {title}
      </h2>
      <div tw={gap ? `mt-1 flex flex-col gap-${gap}` : 'mt-1 flex flex-col'}>{children}</div>
    </section>
  )
}

interface RowProps {
  left: string
  right: string
  /** Mute the left side too; the right side is always muted meta. */
  muted?: boolean
}

export function Row({ left, right, muted }: RowProps) {
  return (
    <div tw="flex flex-row justify-between">
      <p tw={muted ? 'm-0 text-muted-foreground' : 'm-0'}>{left}</p>
      <p tw="m-0 text-muted-foreground">{right}</p>
    </div>
  )
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul tw="m-0 mt-1 list-disc pl-5">
      {items.map((item, index) => (
        <li tw="m-0" key={index}>
          {item}
        </li>
      ))}
    </ul>
  )
}

interface Position {
  role: string
  period: string
  bullets: string[]
}

interface ExperienceEntryProps {
  company: string
  location: string
  positions: Position[]
}

export function ExperienceEntry({ company, location, positions }: ExperienceEntryProps) {
  return (
    <div>
      <Row left={company} right={location} />
      {positions.map((position, index) => (
        <div tw={index > 0 ? 'mt-1' : undefined} key={position.period}>
          <Row left={position.role} right={position.period} muted />
          <Bullets items={position.bullets} />
        </div>
      ))}
    </div>
  )
}

interface ProjectItemProps {
  name: string
  href: string
  description: string
}

export function ProjectItem({ name, href, description }: ProjectItemProps) {
  return (
    <p tw="m-0">
      <a tw="" href={href}>
        {name}
      </a>{' '}
      — {description}
    </p>
  )
}

interface SkillLineProps {
  label: string
  children: string
}

export function SkillLine({ label, children }: SkillLineProps) {
  return (
    <p tw="m-0">
      <span tw="text-muted-foreground">{label}: </span>
      {children}
    </p>
  )
}
