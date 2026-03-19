import { URLSearchParams } from 'url'

import {
  BoxIcon,
  BrainIcon,
  BriefcaseBusinessIcon,
  CircleCheckBigIcon,
  FileTextIcon,
  LayersIcon,
  NewspaperIcon,
  RssIcon,
  TextInitialIcon,
} from 'lucide-react'

import { Icons } from '@/components/ui/icons'

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

export const OTHER_LINKS: LinkItem[] = [
  { label: 'llms.txt', value: '/llms.txt', icon: FileTextIcon },
  { label: 'RSS Feed', value: '/blog/rss', icon: RssIcon },
  {
    label: 'Open in Claude',
    value:
      'https://claude.ai/new?q=Read+https%3A%2F%2Fbrodin.dev%2Fllms.txt%2C+I+want+to+ask+questions+about+it.',
    icon: Icons.claude,
  },
]
