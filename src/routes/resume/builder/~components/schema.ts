import { z } from 'zod'

export const linkSchema = z.object({
  label: z.string(),
  href: z.string(),
})

export const basicsSchema = z.object({
  name: z.string(),
  headline: z.string(),
  links: z.array(linkSchema),
})

export const positionSchema = z.object({
  role: z.string(),
  start: z.string(), // 'YYYY-MM'
  end: z.string().optional(), // undefined = Present
  bullets: z.array(z.string()),
})

export const experienceSchema = z.object({
  id: z.string(),
  company: z.string(),
  location: z.string(),
  positions: z.array(positionSchema),
})

export const educationSchema = z.object({
  id: z.string(),
  school: z.string(),
  degree: z.string(),
  location: z.string(),
  start: z.string(),
  end: z.string(),
  bullets: z.array(z.string()),
})

export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  link: z.string(),
  description: z.string(),
})

export const skillGroupSchema = z.object({
  id: z.string(),
  category: z.string(),
  items: z.array(z.string()),
})

export const resumeSchema = z.object({
  basics: basicsSchema,
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  projects: z.array(projectSchema),
  skills: z.array(skillGroupSchema),
})

export type Resume = z.infer<typeof resumeSchema>
export type Basics = z.infer<typeof basicsSchema>
export type Link = z.infer<typeof linkSchema>
export type Experience = z.infer<typeof experienceSchema>
export type Position = z.infer<typeof positionSchema>
export type Project = z.infer<typeof projectSchema>
export type Education = z.infer<typeof educationSchema>
export type SkillGroup = z.infer<typeof skillGroupSchema>

export function safeParseResumeData(data: unknown): Resume | null {
  const result = resumeSchema.safeParse(data)
  return result.success ? result.data : null
}
