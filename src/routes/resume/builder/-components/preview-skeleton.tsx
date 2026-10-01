import { Skeleton } from '@/components/ui/skeleton'

export function EditorSkeleton() {
  return <Skeleton className="h-screen w-full rounded-xl" />
}

export function PreviewSkeleton() {
  return <Skeleton className="h-screen w-full rounded-lg" />
}
