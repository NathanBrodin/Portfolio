import { getEducation, getWorkExperiences } from '@/lib/experiences'

import { Section, SectionTitle } from '../ui/section'
import { SubSectionDivider } from '../ui/section-divider'
import { ExperienceItem } from './item'

export function Experiences() {
  const workExperiences = getWorkExperiences()
  const education = getEducation()

  return (
    <Section id="experience" className="flex flex-col">
      <SectionTitle>Experiences</SectionTitle>
      <div>
        {workExperiences.map((experience) => (
          <ExperienceItem key={experience.id} experience={experience} />
        ))}
      </div>
      <SubSectionDivider />
      <h2 className="sr-only" id="education">
        Education
      </h2>
      <div>
        {education.map((experience) => (
          <ExperienceItem key={experience.id} experience={experience} />
        ))}
      </div>
    </Section>
  )
}
