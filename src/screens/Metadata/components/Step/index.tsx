import { useState } from 'react'
import { Text, View } from 'react-native'

import { Button } from '@/components/Button'
import { WheelPicker } from '@/components/WheelPicker'

import { styles } from './styles'

interface StepProps {
  title: string
  subtitle: string
  options: string[]
  label?: string
  initialSelectedIndex: number
  onConfirm: (selectedValue: number) => Promise<void>
}

export function Step({
  title,
  subtitle,
  options,
  label,
  initialSelectedIndex,
  onConfirm,
}: StepProps) {
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex)

  async function handleConfirm() {
    const selectedValue = Number(options[selectedIndex])
    await onConfirm(selectedValue)
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        <WheelPicker
          options={options}
          selectedIndex={selectedIndex}
          label={label}
          onChange={setSelectedIndex}
        />
      </View>

      <Button title="Continuar" onPress={handleConfirm} />
    </>
  )
}
