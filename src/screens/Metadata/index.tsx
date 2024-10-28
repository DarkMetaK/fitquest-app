import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { BackHandler } from 'react-native'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ProgressBar } from '@/components/ProgressBar'
import { useAuth } from '@/hooks/useAuth'
import { AppError } from '@/utils/AppError'

import { AgeStep } from './components/AgeStep'
import { GoalStep } from './components/GoalStep'
import { HeightStep } from './components/HeightStep'
import { PhoneStep } from './components/PhoneStep'
import { RoutineStep } from './components/Routine'
import { WeightStep } from './components/WeightStep'
import { styles } from './styles'

export function Metadata() {
  const [currentStep, setCurrentStep] = useState(1)
  const navigation = useNavigation()
  const { handleCompleteRegistration } = useAuth()

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    )

    return () => backHandler.remove()
  }, [handleBackPress])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleBackPress() {
    if (currentStep > 1) {
      handleDecreaseStep()
    } else {
      navigation.navigate('welcome')
    }

    return true
  }

  function handleIncreaseStep() {
    setCurrentStep((state) => state + 1)
  }

  function handleDecreaseStep() {
    if (currentStep > 0) {
      setCurrentStep((state) => state - 1)
    }
  }

  async function handleFinish() {
    try {
      await handleCompleteRegistration()
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Erro no servidor, tente novamente mais tarde.'

      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Erro',
        textBody: title,
        button: 'Fechar',
      })

      console.log(error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ProgressBar
        totalSteps={6}
        currentStep={currentStep}
        onBackPress={handleBackPress}
      />

      {currentStep === 1 && <PhoneStep onChangeStep={handleIncreaseStep} />}
      {currentStep === 2 && <GoalStep onChangeStep={handleIncreaseStep} />}
      {currentStep === 3 && <AgeStep onChangeStep={handleIncreaseStep} />}
      {currentStep === 4 && <WeightStep onChangeStep={handleIncreaseStep} />}
      {currentStep === 5 && <HeightStep onChangeStep={handleIncreaseStep} />}
      {currentStep === 6 && <RoutineStep onChangeStep={handleFinish} />}
    </SafeAreaView>
  )
}
