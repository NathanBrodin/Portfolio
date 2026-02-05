import type { LucideProps } from 'lucide-react'

export type LinkItem = {
  label: string
  value: string
  description?: string
  icon?: React.ComponentType<LucideProps>
  iconImage?: string
}

export type MenuItem = LinkItem
