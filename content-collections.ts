import { defineCollection, defineConfig } from '@content-collections/core'
import { z } from 'zod'

import { renderMarkdown } from './src/lib/markdown'

const MORE_SEPARATOR = '<!-- more -->'

function splitContent(content: string): { excerpt: string; detail: string } {
  const index = content.indexOf(MORE_SEPARATOR)
  if (index === -1) {
    return { excerpt: content, detail: '' }
  }
  return {
    excerpt: content.slice(0, index).trim(),
    detail: content.slice(index + MORE_SEPARATOR.length).trim(),
  }
}

const experiences = defineCollection({
  name: 'experiences',
  directory: 'content/experiences',
  include: '**/*.md',
  schema: z.object({
    // Company info
    companyId: z.string(),
    companyName: z.string(),
    companyLogo: z.string().optional(),
    companyWebsite: z.url().optional(),
    isCurrentEmployer: z.boolean().default(false),

    // Position info
    title: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    employmentType: z.string().optional(),
    icon: z.enum(['code', 'design', 'education', 'business', 'idea']).optional(),
    skills: z.array(z.string()).default([]),
    isExpanded: z.boolean().default(false),
    content: z.string(),
    order: z.number(),
  }),
  transform: async (doc) => {
    const { excerpt, detail } = splitContent(doc.content)
    const { markup } = await renderMarkdown(excerpt)
    const { markup: detailMarkup } = await renderMarkdown(detail)
    return {
      ...doc,
      category: doc._meta.path.startsWith('work/') ? ('work' as const) : ('education' as const),
      excerpt,
      detail,
      hasDetail: detail.length > 0,
      markup,
      detailMarkup,
    }
  },
})

const projects = defineCollection({
  name: 'projects',
  directory: 'content/projects',
  include: '**/*.md',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    link: z.url().optional(),
    logo: z.string().optional(),
    icon: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    skills: z.array(z.string()).default([]),
    isExpanded: z.boolean().default(false),
    order: z.number().optional(),
    display: z.boolean().default(true),
    type: z.enum(['personal', 'school']).optional(),
    content: z.string(),
  }),
  transform: async (doc) => {
    const { excerpt, detail } = splitContent(doc.content)
    const { markup } = await renderMarkdown(excerpt)
    const { markup: detailMarkup } = await renderMarkdown(detail)
    return {
      ...doc,
      excerpt,
      detail,
      hasDetail: detail.length > 0,
      markup,
      detailMarkup,
    }
  },
})

const certifications = defineCollection({
  name: 'certifications',
  directory: 'content/certifications',
  include: '**/*.md',
  schema: z.object({
    title: z.string(),
    issuer: z.string(),
    issueDate: z.string(),
    credentialId: z.string(),
    credentialUrl: z.url(),
    issuerIconName: z.string().optional(),
    isExpanded: z.boolean().default(false),
    order: z.number(),
    content: z.string(),
  }),
  transform: async (doc) => {
    const { markup } = await renderMarkdown(doc.content)
    return {
      ...doc,
      markup,
    }
  },
})

const blogPosts = defineCollection({
  name: 'blogPosts',
  directory: 'content/blog',
  include: '**/*.md',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(), // ISO 8601: 'YYYY-MM-DD'
    tags: z.array(z.string()).default([]),
    published: z.boolean().default(true),
    content: z.string(),
  }),
  transform: async (doc) => {
    const { markup } = await renderMarkdown(doc.content)
    return {
      ...doc,
      slug: doc._meta.path,
      markup,
    }
  },
})

export default defineConfig({
  content: [experiences, projects, certifications, blogPosts],
})
