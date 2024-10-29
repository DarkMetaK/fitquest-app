import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { ProgressBar } from '@/components/ProgressBar'

import { ActiveExercise } from './components/ActiveExercise'
import { styles } from './styles'
import { Interval } from './components/Interval'

export function Exercise() {
  const insets = useSafeAreaInsets()

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.headerText}>Exercise 1/11</Text>
        <ProgressBar totalSteps={11} currentStep={1} onBackPress={() => {}} />
      </View>

      <Interval />
    </View>
  )
}
