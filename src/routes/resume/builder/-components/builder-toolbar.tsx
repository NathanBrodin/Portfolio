import { useHotkey } from '@tanstack/react-hotkeys'
import { Link } from '@tanstack/react-router'
import { ArrowLeftIcon, FileDown, FileUp, Redo2, RotateCcw, Undo2 } from 'lucide-react'
import { useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Group } from '@/components/ui/group'
import { Kbd, KbdGroup } from '@/components/ui/kbd'
import { Section } from '@/components/ui/section'
import { anchoredToastManager } from '@/components/ui/toast'
import { Tooltip, TooltipPopup, TooltipTrigger } from '@/components/ui/tooltip'
import { downloadBlob, exportResumePdf, resumeFilename } from '@/features/resume-builder/export'
import { useResumeBuilder } from '@/features/resume-builder/store'

function useAnchoredErrorToast(id: string) {
  const anchorRef = useRef<HTMLButtonElement>(null)

  const show = (title: string) => {
    if (!anchorRef.current) return
    anchoredToastManager.add({
      id,
      positionerProps: {
        anchor: anchorRef.current,
        sideOffset: 6,
      },
      timeout: 2000,
      title,
      type: 'error',
    })
  }

  return [anchorRef, show] as const
}

export function BuilderToolbar() {
  const { data, canUndo, canRedo, undo, redo, resetToBase, importJson } = useResumeBuilder()

  useHotkey('Mod+Z', () => {
    undo()
  })

  useHotkey('Mod+Shift+Z', () => {
    redo()
  })

  const [downloading, setDownloading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const [downloadButtonRef, showDownloadError] = useAnchoredErrorToast(
    'resume-builder-download-error-toast',
  )
  const [importButtonRef, showImportError] = useAnchoredErrorToast(
    'resume-builder-import-error-toast',
  )

  const handleDownloadPdf = async () => {
    setDownloading(true)
    try {
      const blob = await exportResumePdf(data)
      downloadBlob(blob, resumeFilename(data.basics.name, 'pdf'))
    } catch {
      showDownloadError('Could not generate the PDF. Try again.')
    } finally {
      setDownloading(false)
    }
  }

  const handleImportFile = async (file: File | undefined) => {
    if (!file) return
    try {
      const text = await file.text()
      let parsed: unknown
      try {
        parsed = JSON.parse(text)
      } catch {
        showImportError('That file is not valid JSON.')
        return
      }
      if (!importJson(parsed)) {
        showImportError('That JSON is not a resume exported from this builder.')
      }
    } catch {
      showImportError('Could not read that file.')
    }
  }

  return (
    <Section variant="panel" size="sm" className="justify-between gap-2 max-sm:flex-col">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeftIcon className="size-3.5" />
        Back to home
      </Link>
      <div className="flex gap-2">
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
                  aria-keyshortcuts="Control+Z Meta+Z"
                />
              }
            >
              <Undo2 />
            </TooltipTrigger>
            <TooltipPopup side="bottom">
              <div className="flex shrink-0 items-center justify-center gap-2">
                Undo
                <KbdGroup>
                  <Kbd>
                    <span className="os os-mac">⌘</span>
                    <span className="os os-other">Ctrl</span>
                  </Kbd>
                  <Kbd>Z</Kbd>
                </KbdGroup>
              </div>
            </TooltipPopup>
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
                  aria-keyshortcuts="Control+Shift+Z Meta+Shift+Z"
                />
              }
            >
              <Redo2 />
            </TooltipTrigger>
            <TooltipPopup side="bottom">
              <div className="flex shrink-0 items-center justify-center gap-2">
                Redo
                <KbdGroup>
                  <Kbd>
                    <span className="os os-mac">⌘</span>
                    <span className="os os-other">Ctrl</span>
                  </Kbd>
                  <Kbd>⇧</Kbd>
                  <Kbd>Z</Kbd>
                </KbdGroup>
              </div>
            </TooltipPopup>
          </Tooltip>
        </Group>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <Button size="sm" variant="secondary" onClick={resetToBase}>
            <RotateCcw />
            <span className="max-sm:sr-only">Reset</span>
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => fileRef.current?.click()}
            ref={importButtonRef}
          >
            <FileUp />
            <span className="max-sm:sr-only">Import</span>
          </Button>
          <Button
            size="sm"
            onClick={handleDownloadPdf}
            disabled={downloading}
            ref={downloadButtonRef}
          >
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
              void handleImportFile(event.target.files?.[0])
              event.target.value = ''
            }}
          />
        </div>
      </div>
    </Section>
  )
}
