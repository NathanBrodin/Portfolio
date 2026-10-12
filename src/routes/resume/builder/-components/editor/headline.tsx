import { useId } from 'react'

import { Field } from '@/components/ui/field'
import { InputGroup, InputGroupTextarea } from '@/components/ui/input-group'

import { EditorSection, EditorSectionTitle } from '.'
import { useResumeBuilder } from '../store'
import { LineMeter } from './line-meter'

export function HeadlineEditor() {
  const { data, updateBasics } = useResumeBuilder()
  const headline = data.basics.headline
  const detailId = useId()

  return (
    <EditorSection>
      <EditorSectionTitle>Headline</EditorSectionTitle>
      <Field>
        <InputGroup>
          <InputGroupTextarea
            aria-label="Headline"
            aria-describedby={detailId}
            value={headline}
            onChange={(event) => updateBasics({ headline: event.target.value })}
          />
          <LineMeter id={detailId} text={headline} variant="headline" />
        </InputGroup>
      </Field>
    </EditorSection>
  )
}
