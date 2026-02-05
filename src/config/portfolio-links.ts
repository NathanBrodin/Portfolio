import {
  AwardIcon,
  BoxIcon,
  BriefcaseBusinessIcon,
  CircleCheckBigIcon,
  LayersIcon,
  TextInitialIcon,
} from 'lucide-react'

import { LinkItem } from '.'

export const PORTFOLIO_LINKS: LinkItem[] = [
  {
    label: 'About',
    value: '/#about',
    icon: TextInitialIcon,
  },
  {
    label: 'Tech Stack',
    value: '/#stack',
    icon: LayersIcon,
  },
  {
    label: 'Experience',
    value: '/#experience',
    icon: BriefcaseBusinessIcon,
  },
  {
    label: 'Projects',
    value: '/#projects',
    icon: BoxIcon,
  },
  {
    label: 'Honors & Awards',
    value: '/#awards',
    icon: AwardIcon,
  },
  {
    label: 'Certifications',
    value: '/#certs',
    icon: CircleCheckBigIcon,
  },
]
