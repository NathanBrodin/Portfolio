import { EDUCATION, WORK_EXPERIENCES } from '@/config/experiences'

import { Section, SectionTitle } from '../ui/section'
import { SubSectionDivider } from '../ui/section-divider'
import { ExperienceItem } from './item'

export function Experiences() {
  return (
    <Section id="experience" className="flex flex-col">
      <SectionTitle>Experiences</SectionTitle>
      <div>
        {WORK_EXPERIENCES.map((experience) => (
          <ExperienceItem key={experience.id} experience={experience} />
        ))}
      </div>
      <SubSectionDivider />
      <h2 className="sr-only" id="education">
        Education
      </h2>
      <div>
        {EDUCATION.map((experience) => (
          <ExperienceItem key={experience.id} experience={experience} />
        ))}
      </div>
    </Section>
  )
}
