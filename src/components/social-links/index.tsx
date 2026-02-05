import { SOCIAL_LINKS } from '@/config/social-links'

import { Lines } from '../ui/backgrounds/lines'
import { Section } from '../ui/section'
import { SocialLinkItem } from './item'

export function SocialLinks() {
  return (
    <Section className="relative flex flex-col px-16 py-0">
      <h2 className="sr-only">Social Links</h2>
      <Lines className="opacity-5 select-none dark:opacity-2" />
      <div className="relative">
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          {SOCIAL_LINKS.map((link, index) => {
            return <SocialLinkItem key={index} {...link} />
          })}
        </div>
      </div>
    </Section>
  )
}
