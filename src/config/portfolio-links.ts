import {
  BoxIcon,
  BriefcaseBusinessIcon,
  CircleCheckBigIcon,
  LayersIcon,
  NewspaperIcon,
  TextInitialIcon,
} from 'lucide-react'

import type { LinkItem } from '.'

export const PORTFOLIO_LINKS: LinkItem[] = [
  {
    label: 'About',
    value: '/#about',
    icon: TextInitialIcon,
  },
  {
    label: 'Tech Stack',
    value: '/#tech-stack',
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
    label: 'Certifications',
    value: '/#certifications',
    icon: CircleCheckBigIcon,
  },
  {
    label: 'Blog',
    value: '/blog',
    icon: NewspaperIcon,
  },
]
