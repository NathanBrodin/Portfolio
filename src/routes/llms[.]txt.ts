import { createFileRoute } from '@tanstack/react-router'
import { allBlogPosts, allCertifications, allProjects } from 'content-collections'

import type { TechStack } from '@/config/tech-stack'

import { siteConfig } from '@/config/site'
import { SOCIAL_LINKS } from '@/config/social-links'
import { TECH_STACK } from '@/config/tech-stack'
import { getEducation, getWorkExperiences } from '@/lib/experiences'

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

  const sortedCategories = Object.keys(groupedStack).sort()

  const markdownLines = sortedCategories.map((category) => {
    const techItems = groupedStack[category].map((tech) => tech.title).join(', ')

    return `- **${category}**: ${techItems}`
  })

  return markdownLines.join('\n')
}

function formatDateRange(start: string, end?: string): string {
  if (start === end) return start
  return end ? `${start} - ${end}` : `${start} - Present`
}

function generateExperiencesMarkdown(): string {
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
      lines.push(position.content)

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
      lines.push(position.content)

      lines.push('')
    }
  }

  return lines.join('\n')
}

function generateProjectsMarkdown(): string {
  const projects = [...allProjects].sort((a, b) => b.startDate.localeCompare(a.startDate))

  const lines: string[] = []

  for (const project of projects) {
    lines.push(
      `### [${project.title}](${project.link}) | ${formatDateRange(project.startDate, project.endDate)}`,
    )
    lines.push('')
    lines.push(project.content)

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

function generateBlogMarkdown(): string {
  const posts = allBlogPosts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4)

  const lines: string[] = []

  for (const post of posts) {
    lines.push(
      `- [${post.title}](${siteConfig.url}/blog/${post.slug}.md) - ${post.description} | ${post.date}`,
    )
  }

  return lines.join('\n')
}

export const Route = createFileRoute('/llms.txt')({
  server: {
    handlers: {
      GET: () => {
        const content = `# Nathan Brodin

> ${siteConfig.description}

---

## Social Links

${SOCIAL_LINKS.map((link) => `- [${link.label}](${link.value})`).join('\n')}

---

## Tech Stack

${generateTechStackMarkdown(TECH_STACK)}

---

## Experiences

${generateExperiencesMarkdown()}
---

## Projects

${generateProjectsMarkdown()}
---

## Certifications

${generateCertificationsMarkdown()}

---

## Blog

${generateBlogMarkdown()}
`

        return new Response(content, {
          headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
          },
        })
      },
    },
  },
})
