import { allCertifications } from 'content-collections'

import { CollapsibleList } from '../ui/collapsible-list'
import { Section, SectionTitle } from '../ui/section'
import { CertificationItem } from './item'

export function Certifications() {
  const certifications = [...allCertifications].sort((a, b) => a.order - b.order)

  return (
    <Section id="certifications" className="flex flex-col">
      <SectionTitle>Certifications</SectionTitle>
      <CollapsibleList
        items={certifications}
        max={4}
        renderItem={(item) => <CertificationItem certification={item} />}
      />
    </Section>
  )
}
