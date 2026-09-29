import { useEffect, useRef, useState } from 'react'

import { Skeleton } from '@/components/ui/skeleton'

import { exportResumePdf } from './export'
import { useResumeBuilder } from './store'

// Lazy-loaded by the route: @react-pdf/renderer never enters the main bundle.
export default function ResumePreview() {
  const { data } = useResumeBuilder()
  const [url, setUrl] = useState<string | null>(null)
  const [failed, setFailed] = useState(false)
  const latestUrl = useRef<string | null>(null)
  const sequence = useRef(0)

  useEffect(() => {
    const current = sequence.current + 1
    sequence.current = current

    const timer = setTimeout(() => {
      setFailed(false)
      exportResumePdf(data)
        .then((blob) => {
          if (sequence.current !== current) return
          if (latestUrl.current) URL.revokeObjectURL(latestUrl.current)
          const objectUrl = URL.createObjectURL(blob)
          latestUrl.current = objectUrl
          setUrl(objectUrl)
        })
        .catch(() => {
          if (sequence.current === current) setFailed(true)
        })
    }, 300)

    return () => clearTimeout(timer)
  }, [data])

  useEffect(() => {
    const previous = latestUrl.current
    return () => {
      if (previous) URL.revokeObjectURL(previous)
    }
  }, [])

  if (failed) {
    return (
      <div className="flex h-full min-h-96 items-center justify-center rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
        Could not generate the preview. Check the console and try again.
      </div>
    )
  }

  if (!url) {
    return <Skeleton className="h-full min-h-96 w-full rounded-lg" />
  }

  return (
    <iframe
      title="Resume preview"
      src={`${url}#toolbar=0&navpanes=0`}
      className="h-[80vh] w-full rounded-lg border bg-white lg:h-[calc(100svh-2rem)]"
    />
  )
}
