import { TriangleAlertIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Alert, AlertTitle } from '@/components/ui/alert'

import { exportResumePdf } from './export'
import { useResumeBuilder } from './store'

// Lazy-loaded by the route: rendering happens server-side, the client only
// receives PDF bytes for the iframe preview.
export default function ResumePreview() {
  const { data } = useResumeBuilder()
  const [url, setUrl] = useState<string | null>(null)
  const [failed, setFailed] = useState(false)
  const [overflows, setOverflows] = useState(false)
  const latestUrl = useRef<string | null>(null)
  const sequence = useRef(0)

  useEffect(() => {
    const current = sequence.current + 1
    sequence.current = current

    const timer = setTimeout(() => {
      setFailed(false)
      exportResumePdf(data)
        .then(({ blob, fits }) => {
          if (sequence.current !== current) return
          if (latestUrl.current) URL.revokeObjectURL(latestUrl.current)
          const objectUrl = URL.createObjectURL(blob)
          latestUrl.current = objectUrl
          setUrl(objectUrl)
          setOverflows(!fits)
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
    return null
  }

  return (
    <div className="flex flex-col gap-2">
      {overflows && (
        <Alert variant="warning">
          <TriangleAlertIcon />
          <AlertTitle>This resume no longer fits on one page, trim some entries.</AlertTitle>
        </Alert>
      )}
      <iframe
        title="Resume preview"
        src={url}
        className="h-[80vh] w-full rounded-lg lg:h-[calc(100svh-2rem)]"
      />
    </div>
  )
}
