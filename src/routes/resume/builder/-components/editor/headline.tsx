import { Field } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'

import { useResumeBuilder } from '../store'

export function HeadlineEditor() {
  const { data, updateBasics } = useResumeBuilder()
  const headline = data.basics.headline

  return (
    <div className="pb-2">
      <Field>
        <Textarea
          aria-label="Headline"
          value={headline}
          placeholder="One line under your name"
          onChange={(event) => updateBasics({ headline: event.target.value })}
        />
      </Field>
    </div>
  )
}
