import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { BackHandler, Text, View } from 'react-native'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { ProgressBar } from '@/components/ProgressBar'
import { useWorkout } from '@/hooks/useWorkout'

import { ActiveExercise } from './components/ActiveExercise'
import { Interval } from './components/Interval'
import { styles } from './styles'

export function Exercise() {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const {
    exercises,
    completedExercises,
    intervalDuration,
    currentExercise,
    clearWorkout,
  } = useWorkout()

  const totalExercises = exercises.length
  const totalCompletedExercises = completedExercises.length

  function handleStop() {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: 'Deseja parar o treino?',
      textBody: 'Se você parar o treino, não poderá continuar de onde parou.',
      button: 'Parar',
      onPressButton: () => {
        clearWorkout()
        navigation.goBack()
      },
      closeOnButtonTap: true,
    })

    return true
  }

  useFocusEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleStop,
    )

    return () => backHandler.remove()
  })

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.headerText}>
          Exercício {totalCompletedExercises}/{totalExercises}
        </Text>
        <ProgressBar
          totalSteps={totalExercises}
          currentStep={totalCompletedExercises}
          onBackPress={handleStop}
        />
      </View>

      {intervalDuration ? (
        <Interval />
      ) : (
        currentExercise && (
          <ActiveExercise
            name={currentExercise.name}
            duration={currentExercise.duration}
            repetitions={currentExercise.repetitions}
            demonstrationUrl={currentExercise.demonstrationUrl}
            videoUrl={currentExercise.videoUrl}
          />
        )
      )}
    </View>
  )
}
