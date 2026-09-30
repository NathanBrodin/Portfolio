import { FileDown, FileUp, Redo2, RotateCcw, Undo2 } from 'lucide-react'
import { useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Group } from '@/components/ui/group'
import { Section } from '@/components/ui/section'
import { Tooltip, TooltipPopup, TooltipTrigger } from '@/components/ui/tooltip'
import { downloadBlob, exportResumePdf, resumeFilename } from '@/features/resume-builder/export'
import { useResumeBuilder } from '@/features/resume-builder/store'

export function BuilderToolbar() {
  const { data, canUndo, canRedo, undo, redo, resetToBase, importJson } = useResumeBuilder()
  const [downloading, setDownloading] = useState(false)
  const [_error, setError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleDownloadPdf = () => {
    setDownloading(true)
    setError(null)
    exportResumePdf(data)
      .then((blob) => downloadBlob(blob, resumeFilename(data.basics.name, 'pdf')))
      .catch(() => setError('Could not generate the PDF. Try again.'))
      .finally(() => setDownloading(false))
  }

  const handleImportFile = (file: File | undefined) => {
    if (!file) return
    setError(null)
    file
      .text()
      .then((text) => {
        let parsed: unknown
        try {
          parsed = JSON.parse(text)
        } catch {
          setError('That file is not valid JSON.')
          return
        }
        if (!importJson(parsed)) {
          setError('That JSON is not a resume exported from this builder.')
        }
      })
      .catch(() => setError('Could not read that file.'))
  }

  return (
    <Section className="flex-wrap justify-between gap-2 bg-background p-2">
      <Group>
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="secondary"
                size="icon-sm"
                onClick={undo}
                disabled={!canUndo}
                noSound
                aria-label="Undo"
              />
            }
          >
            <Undo2 />
          </TooltipTrigger>
          <TooltipPopup side="bottom">Undo</TooltipPopup>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="secondary"
                size="icon-sm"
                onClick={redo}
                disabled={!canRedo}
                noSound
                aria-label="Redo"
              />
            }
          >
            <Redo2 />
          </TooltipTrigger>
          <TooltipPopup side="bottom">Redo</TooltipPopup>
        </Tooltip>
      </Group>
      <div className="flex flex-wrap items-center justify-end gap-2">
        <Button size="sm" variant="secondary" onClick={resetToBase}>
          <RotateCcw />
          Reset
        </Button>
        <Button size="sm" variant="secondary" onClick={() => fileRef.current?.click()}>
          <FileUp />
          Import
        </Button>
        <Button size="sm" onClick={handleDownloadPdf} disabled={downloading}>
          <FileDown />
          Download PDF
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          className="hidden"
          aria-hidden="true"
          tabIndex={-1}
          onChange={(event) => {
            handleImportFile(event.target.files?.[0])
            event.target.value = ''
          }}
        />
      </div>
    </Section>
  )
}
