import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { ProgressBar } from '@/components/ProgressBar'
import { useWorkout } from '@/hooks/useWorkout'

import { ActiveExercise } from './components/ActiveExercise'
import { Interval } from './components/Interval'
import { styles } from './styles'

export function Exercise() {
  const insets = useSafeAreaInsets()
  const { intervalDuration, currentExercise } = useWorkout()

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.headerText}>Exercise 1/11</Text>
        <ProgressBar totalSteps={11} currentStep={1} onBackPress={() => {}} />
      </View>

      {intervalDuration ? (
        <Interval />
      ) : (
        currentExercise && (
          <ActiveExercise
            name={currentExercise.name}
            duration={currentExercise.duration}
            demonstrationUrl={currentExercise.demonstrationUrl}
          />
        )
      )}
    </View>
  )
}
