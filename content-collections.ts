import { defineCollection, defineConfig } from '@content-collections/core'
import { z } from 'zod'

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
    icon: z
      .enum(['code', 'design', 'education', 'business', 'idea'])
      .optional(),
    skills: z.array(z.string()).default([]),
    isExpanded: z.boolean().default(false),

    // Ordering
    order: z.number(),
  }),
  transform: (doc) => ({
    ...doc,
    category: doc._meta.path.startsWith('work/')
      ? ('work' as const)
      : ('education' as const),
    description: doc.content,
  }),
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
    startDate: z.string(),
    endDate: z.string().optional(),
    skills: z.array(z.string()).default([]),
    isExpanded: z.boolean().default(false),

    // Ordering
    order: z.number(),
  }),
})

export default defineConfig({
  collections: [experiences, projects],
})
