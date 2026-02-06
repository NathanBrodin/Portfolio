import { allProjects } from 'content-collections'

import { CollapsibleList } from '../ui/collapsible-list'
import { Section, SectionTitle } from '../ui/section'
import { ProjectItem } from './item'

export function Projects() {
  const projects = [...allProjects].sort((a, b) => a.order - b.order)

  return (
    <Section id="projects" className="flex flex-col">
      <SectionTitle>Projects</SectionTitle>
      <CollapsibleList
        items={projects}
        max={4}
        renderItem={(item) => <ProjectItem project={item} />}
      />
    </Section>
  )
}
