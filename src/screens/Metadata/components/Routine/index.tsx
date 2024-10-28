import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { Button } from '@/components/Button'
import { saveUserMetadata } from '@/libs/async-storage/metadata'
import themes from '@/themes'

import { styles } from './styles'

interface RoutineStepProps {
  onChangeStep: () => void
}

const ROUTINE_OPTIONS = {
  BEGINNER: ['Iniciante', 2],
  INTERMEDIATE: ['Intermediário', 3],
  ADVANCED: ['Avançado', 5],
} as const

export function RoutineStep({ onChangeStep }: RoutineStepProps) {
  const [selectedRoutine, setSelectedRoutine] =
    useState<keyof typeof ROUTINE_OPTIONS>('BEGINNER')

  async function handleConfirmRoutine() {
    await saveUserMetadata({ weeklyGoal: ROUTINE_OPTIONS[selectedRoutine][1] })
    onChangeStep()
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Escolha sua rotina de treino</Text>
          <Text style={styles.subtitle}>
            Conhecer seus objetivos nos ajudará a montar um plano personalizado.
          </Text>
        </View>
      </View>

      <View style={styles.form}>
        {Object.keys(ROUTINE_OPTIONS).map((key) => {
          const Routine = key as keyof typeof ROUTINE_OPTIONS
          const isSelected = selectedRoutine === Routine

          return (
            <TouchableOpacity
              key={Routine}
              style={[
                styles.option,
                isSelected && {
                  borderColor: themes.COLORS.GREEN_8,
                },
              ]}
              onPress={() => setSelectedRoutine(Routine)}
            >
              <Text
                style={[
                  styles.optionTitle,
                  isSelected && {
                    color: themes.COLORS.GREEN_8,
                  },
                ]}
              >
                {ROUTINE_OPTIONS[Routine][0]}
              </Text>
              <Text
                style={[
                  styles.optionText,
                  isSelected && {
                    color: themes.COLORS.GRAY_8,
                  },
                ]}
              >
                Meta de {ROUTINE_OPTIONS[Routine][1]} dias de treino por semana
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>

      <Button title="Continuar" onPress={handleConfirmRoutine} />
    </>
  )
}
