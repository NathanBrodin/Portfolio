import type { LucideProps } from 'lucide-react'

export type LinkItem = {
  label: string
  value: string
  description?: string
  icon?: React.ComponentType<LucideProps>
  iconImage?: string
}

export type ThemeItem = {
  label: string
  value: 'light' | 'dark' | 'system'
  icon: React.ComponentType<LucideProps>
}

export type MenuItem = LinkItem | ThemeItem
