import { Field } from '@/components/ui/field'
import { InputGroup, InputGroupTextarea } from '@/components/ui/input-group'

import { useResumeBuilder } from '../store'
import { LineMeter } from './line-meter'

export function HeadlineEditor() {
  const { data, updateBasics } = useResumeBuilder()
  const headline = data.basics.headline

  return (
    <Field>
      <InputGroup>
        <InputGroupTextarea
          aria-label="Headline"
          value={headline}
          onChange={(event) => updateBasics({ headline: event.target.value })}
        />
        <LineMeter text={headline} variant="headline" />
      </InputGroup>
    </Field>
  )
}
