import { getSortedProjects } from '@/lib/projects'

import { CollapsibleList } from '../ui/collapsible-list'
import { Section, SectionTitle } from '../ui/section'
import { ProjectItem } from './item'

export function Projects() {
  const projects = getSortedProjects().filter((p) => p.display !== false)

  return (
    <Section id="projects" className="flex flex-col">
      <SectionTitle>Projects</SectionTitle>
      <CollapsibleList
        items={projects}
        max={5}
        renderItem={(item) => <ProjectItem project={item} />}
      />
    </Section>
  )
}
