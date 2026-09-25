import { allBlogPosts, allCertifications } from 'content-collections'

import type { TechStack } from '@/config/tech-stack'

import { siteConfig } from '@/config/site'
import { SOCIAL_LINKS } from '@/config/social-links'
import { TECH_STACK } from '@/config/tech-stack'
import { getEducation, getWorkExperiences } from '@/lib/experiences'
import { getSortedProjects } from '@/lib/projects'

function generateTechStackMarkdown(stack: TechStack[]): string {
  const groupedStack = stack.reduce(
    (acc, tech) => {
      const { category } = tech
      acc[category] ??= []
      acc[category].push(tech)
      return acc
    },
    {} as Record<string, TechStack[]>,
  )

  const orderedCategories = Object.keys(groupedStack)

  const markdownLines = orderedCategories.map((category) => {
    const techItems = groupedStack[category].map((tech) => tech.title).join(', ')

    return `- **${category}**: ${techItems}`
  })

  return markdownLines.join('\n')
}

function formatDateRange(start?: string, end?: string): string {
  if (!start) return 'No date'
  if (start === end) return start
  return end ? `${start} - ${end}` : `${start} - Present`
}

function fullContent(excerpt: string, detail: string): string {
  if (!excerpt) return detail
  if (!detail) return excerpt
  return `${excerpt}\n\n${detail}`
}

function generateExperiencesMarkdown(full: boolean): string {
  const workExperiences = getWorkExperiences()
  const education = getEducation()

  const lines: string[] = []

  for (const exp of workExperiences) {
    const companyHeader = exp.companyWebsite
      ? `### [${exp.companyName}](${exp.companyWebsite})`
      : `### ${exp.companyName}`
    lines.push(companyHeader)
    lines.push('')

    for (const position of exp.positions) {
      lines.push(
        `#### ${position.title} | ${formatDateRange(position.employmentPeriod.start, position.employmentPeriod.end)}`,
      )
      lines.push('')
      lines.push(full ? fullContent(position.excerpt, position.detail) : position.excerpt)

      if (position.skills.length > 0) {
        lines.push('')
        lines.push(`*Skills: ${position.skills.join(', ')}*`)
      }

      lines.push('')
    }
  }

  for (const edu of education) {
    lines.push(`### ${edu.companyName}`)
    lines.push('')

    for (const position of edu.positions) {
      lines.push(
        `#### ${position.title} | ${formatDateRange(position.employmentPeriod.start, position.employmentPeriod.end)}`,
      )

      lines.push('')
      lines.push(full ? fullContent(position.excerpt, position.detail) : position.excerpt)

      lines.push('')
    }
  }

  return lines.join('\n')
}

function generateProjectsMarkdown(full: boolean): string {
  const projects = getSortedProjects()

  const lines: string[] = []

  for (const project of projects) {
    const title = project.link ? `[${project.title}](${project.link})` : project.title
    const type = project.type === 'school' ? ' · School project' : ''
    lines.push(`### ${title} | ${formatDateRange(project.startDate, project.endDate)}${type}`)
    lines.push('')
    lines.push(full ? fullContent(project.excerpt, project.detail) : project.excerpt)

    if (project.skills.length > 0) {
      lines.push('')
      lines.push(`*Skills: ${project.skills.join(', ')}*`)
    }

    lines.push('')
  }

  return lines.join('\n')
}

function generateCertificationsMarkdown(): string {
  const certifications = [...allCertifications].sort((a, b) =>
    b.issueDate.localeCompare(a.issueDate),
  )

  const lines: string[] = []

  for (const certification of certifications) {
    lines.push(
      `- [${certification.issuer} - ${certification.title}](${certification.credentialUrl}) | ${certification.issueDate}`,
    )
  }

  return lines.join('\n')
}

export function generateBlogMarkdown(full: boolean): string {
  const posts = allBlogPosts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, full ? undefined : 4)

  const lines: string[] = []

  lines.push(`> Articles on development, design and ideas.\n`)

  for (const post of posts) {
    lines.push(
      `- [${post.title}](${siteConfig.url}/blog/${post.slug}.md) - ${post.description} | ${post.date}`,
    )
  }

  if (!full) {
    lines.push(`\nFull list available at ${siteConfig.url}/blog.md`)
  }

  return lines.join('\n')
}

export function buildLlmsContent(full: boolean): string {
  return `# Nathan Brodin

> ${siteConfig.description}

${siteConfig.about}

---

## Social Links

${SOCIAL_LINKS.map((link) => `- [${link.label}](${link.value})`).join('\n')}

---

## Tech Stack

${generateTechStackMarkdown(TECH_STACK)}

---

## Experiences

${generateExperiencesMarkdown(full)}
---

## Projects

${generateProjectsMarkdown(full)}
---

## Certifications

${generateCertificationsMarkdown()}

---

## Blog

${generateBlogMarkdown(full)}
`
}
