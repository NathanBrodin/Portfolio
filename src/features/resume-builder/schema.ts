import { z } from 'zod'

export const basicsSchema = z.object({
  name: z.string(),
  headline: z.string(),
  email: z.string(),
  location: z.string(),
  linkedin: z.string(),
  github: z.string(),
  websiteUrl: z.string(),
  websiteLabel: z.string(),
})

export const experienceSchema = z.object({
  id: z.string(),
  company: z.string(),
  role: z.string(),
  location: z.string(),
  start: z.string(),
  end: z.string(),
  current: z.boolean(),
  skills: z.array(z.string()),
  bullets: z.array(z.string()),
})

export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  link: z.string(),
  skills: z.array(z.string()),
  bullets: z.array(z.string()),
})

export const educationSchema = z.object({
  id: z.string(),
  school: z.string(),
  degree: z.string(),
  location: z.string(),
  start: z.string(),
  end: z.string(),
  details: z.string(),
})

export const skillGroupSchema = z.object({
  id: z.string(),
  category: z.string(),
  items: z.array(z.string()),
})

export const resumeSchema = z.object({
  basics: basicsSchema,
  summary: z.string(),
  experience: z.array(experienceSchema),
  projects: z.array(projectSchema),
  education: z.array(educationSchema),
  skills: z.array(skillGroupSchema),
})

export type ResumeData = z.infer<typeof resumeSchema>
export type Basics = z.infer<typeof basicsSchema>
export type Experience = z.infer<typeof experienceSchema>
export type Project = z.infer<typeof projectSchema>
export type Education = z.infer<typeof educationSchema>
export type SkillGroup = z.infer<typeof skillGroupSchema>

export function safeParseResumeData(data: unknown): ResumeData | null {
  const result = resumeSchema.safeParse(data)
  return result.success ? result.data : null
}
