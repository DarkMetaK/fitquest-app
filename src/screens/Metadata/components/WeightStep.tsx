import { saveUserMetadata } from '@/libs/async-storage/metadata'

import { Step } from './Step'

interface WeightStepProps {
  onChangeStep: () => void
}

const WEIGHT_OPTIONS = Array.from({ length: 200 - 40 + 1 }, (_, i) =>
  (i + 40).toString(),
)

export function WeightStep({ onChangeStep }: WeightStepProps) {
  async function handleConfirmWeight(weight: number) {
    await saveUserMetadata({ weight })
    onChangeStep()
  }

  return (
    <Step
      title="Qual seu peso?"
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      options={WEIGHT_OPTIONS}
      label="kg"
      initialSelectedIndex={WEIGHT_OPTIONS.indexOf('60')}
      onConfirm={handleConfirmWeight}
    />
  )
}
