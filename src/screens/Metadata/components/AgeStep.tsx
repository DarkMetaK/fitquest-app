import { saveUserMetadata } from '@/libs/async-storage/metadata'

import { Step } from './Step'

interface AgeStepProps {
  onChangeStep: () => void
}

const AGE_OPTIONS = Array.from({ length: 100 - 13 + 1 }, (_, i) =>
  (i + 13).toString(),
)

export function AgeStep({ onChangeStep }: AgeStepProps) {
  async function handleConfirmAge(age: number) {
    await saveUserMetadata({ age })
    onChangeStep()
  }

  return (
    <Step
      title="Qual sua idade?"
      subtitle="Isso nos ajudará a atender da melhor forma possível seu grupo etário."
      options={AGE_OPTIONS}
      label="Anos"
      initialSelectedIndex={AGE_OPTIONS.indexOf('45')}
      onConfirm={handleConfirmAge}
    />
  )
}
