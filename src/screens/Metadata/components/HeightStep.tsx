import { saveUserMetadata } from '@/libs/async-storage/metadata'

import { Step } from './Step'

interface HeightStepProps {
  onChangeStep: () => void
}

const HEIGHT_OPTIONS = Array.from({ length: 220 - 140 + 1 }, (_, i) =>
  (i + 140).toString(),
)

export function HeightStep({ onChangeStep }: HeightStepProps) {
  async function handleConfirmHeight(height: number) {
    await saveUserMetadata({ height })
    onChangeStep()
  }

  return (
    <Step
      title="Qual sua altura?"
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      options={HEIGHT_OPTIONS}
      label="cm"
      initialSelectedIndex={HEIGHT_OPTIONS.indexOf('160')}
      onConfirm={handleConfirmHeight}
    />
  )
}
