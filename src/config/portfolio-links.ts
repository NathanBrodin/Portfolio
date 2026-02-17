import {
  BoxIcon,
  BriefcaseBusinessIcon,
  LayersIcon,
  TextInitialIcon,
} from 'lucide-react'

import type { LinkItem } from '.'

export const PORTFOLIO_LINKS: LinkItem[] = [
  {
    label: 'About',
    value: '/',
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
]
