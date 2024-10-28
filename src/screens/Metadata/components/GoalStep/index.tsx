import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { Button } from '@/components/Button'
import {
  BalanceWeight,
  Heart,
  IconProps,
  Muscle,
  Stretching,
} from '@/components/Icon'
import { saveUserMetadata } from '@/libs/async-storage/metadata'
import themes from '@/themes'

import { styles } from './styles'

interface GoalStepProps {
  onChangeStep: () => void
}

const GOAL_OPTIONS = {
  LOSE_WEIGHT: [
    'Perder peso',
    (props: IconProps) => <BalanceWeight {...props} />,
  ],
  GAIN_MUSCLE_MASS: [
    'Ganhar músculos',
    (props: IconProps) => <Muscle {...props} />,
  ],
  ENHANCE_HEALTH: [
    'Melhorar saúde',
    (props: IconProps) => <Heart {...props} />,
  ],
  INCREASE_FLEXIBILITY: [
    'Melhorar flexibilidade',
    (props: IconProps) => <Stretching {...props} />,
  ],
} as const

export function GoalStep({ onChangeStep }: GoalStepProps) {
  const [selectedGoal, setSelectedGoal] =
    useState<keyof typeof GOAL_OPTIONS>('LOSE_WEIGHT')

  async function handleConfirmGoal() {
    await saveUserMetadata({ goal: selectedGoal })
    onChangeStep()
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Qual é seu principal objetivo?</Text>
          <Text style={styles.subtitle}>
            Conhecer seus objetivos nos ajudará a montar um plano personalizado.
          </Text>
        </View>
      </View>

      <View style={styles.form}>
        {Object.keys(GOAL_OPTIONS).map((key) => {
          const goal = key as keyof typeof GOAL_OPTIONS
          const isSelected = selectedGoal === goal

          return (
            <TouchableOpacity
              key={goal}
              style={[
                styles.option,
                isSelected && {
                  borderColor: themes.COLORS.GREEN_8,
                },
              ]}
              onPress={() => setSelectedGoal(goal)}
            >
              {GOAL_OPTIONS[goal][1]({
                color: isSelected
                  ? themes.COLORS.GREEN_8
                  : themes.COLORS.GRAY_6,
              })}
              <Text
                style={[
                  styles.optionText,
                  isSelected && {
                    color: themes.COLORS.GREEN_8,
                  },
                ]}
              >
                {GOAL_OPTIONS[goal][0]}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>

      <Button title="Continuar" onPress={handleConfirmGoal} />
    </>
  )
}
