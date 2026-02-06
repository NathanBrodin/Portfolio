import type { Experience as ContentExperience } from 'content-collections'
import { allExperiences } from 'content-collections'

export type ExperiencePositionIcon =
  | 'code'
  | 'design'
  | 'education'
  | 'business'
  | 'idea'

export type ExperiencePosition = {
  id: string
  title: string
  employmentPeriod: {
    start: string
    end?: string
  }
  employmentType?: string
  description?: string
  icon?: ExperiencePositionIcon
  skills: string[]
  isExpanded: boolean
}

export type Experience = {
  id: string
  companyName: string
  companyLogo?: string
  companyWebsite?: string
  isCurrentEmployer: boolean
  positions: ExperiencePosition[]
}

type ExperienceCategory = 'work' | 'education'

export function getExperiencesByCategory(
  category: ExperienceCategory,
): Experience[] {
  const filtered = allExperiences
    .filter((exp) => exp.category === category)
    .sort((a, b) => a.order - b.order)

  const grouped = new Map<string, Experience>()

  for (const exp of filtered) {
    if (!grouped.has(exp.companyId)) {
      grouped.set(exp.companyId, {
        id: exp.companyId,
        companyName: exp.companyName,
        companyLogo: exp.companyLogo,
        companyWebsite: exp.companyWebsite,
        isCurrentEmployer: exp.isCurrentEmployer,
        positions: [],
      })
    }

    grouped.get(exp.companyId)!.positions.push({
      id: exp._meta.path,
      title: exp.title,
      employmentPeriod: {
        start: exp.startDate,
        end: exp.endDate,
      },
      employmentType: exp.employmentType,
      description: exp.description,
      icon: exp.icon,
      skills: exp.skills,
      isExpanded: exp.isExpanded,
    })
  }

  return Array.from(grouped.values())
}

export function getWorkExperiences(): Experience[] {
  return getExperiencesByCategory('work')
}

export function getEducation(): Experience[] {
  return getExperiencesByCategory('education')
}

export type { ContentExperience }
