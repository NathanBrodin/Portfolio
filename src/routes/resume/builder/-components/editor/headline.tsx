import { Field } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'

import { useResumeBuilder } from '../store'

export function HeadlineEditor() {
  const { data, updateBasics } = useResumeBuilder()
  const headline = data.basics.headline

  return (
    <Field>
      <Textarea
        aria-label="Headline"
        value={headline}
        onChange={(event) => updateBasics({ headline: event.target.value })}
      />
    </Field>
  )
}
