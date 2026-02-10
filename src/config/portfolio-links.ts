import {
  AwardIcon,
  BoxIcon,
  BriefcaseBusinessIcon,
  CircleCheckBigIcon,
  LayersIcon,
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
]
