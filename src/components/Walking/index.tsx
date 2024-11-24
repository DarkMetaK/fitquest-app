import Material from '@expo/vector-icons/MaterialIcons'
import { Pedometer } from 'expo-sensors'
import { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'

import themes from '@/themes'

import { Button } from '../Button'
import { Crystal } from '../Icon'
import { Loading } from '../Loading'
import { ProgressBar } from '../ProgressBar'
import { styles } from './styles'

interface WalkingProps {
  stepsGoal: number
  availableCurrency: number
  premiumCurrency: number
}

export function Walking({
  stepsGoal,
  availableCurrency,
  premiumCurrency,
}: WalkingProps) {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking')
  const [currentStepCount, setCurrentStepCount] = useState(0)

  async function subscribePedometer() {
    const isAvailable = await Pedometer.isAvailableAsync()
    setIsPedometerAvailable(String(isAvailable))

    if (isAvailable) {
      return Pedometer.watchStepCount((result) => {
        setCurrentStepCount(result.steps)
      })
    }
  }

  async function askForPermission() {
    const permission = await Pedometer.requestPermissionsAsync()

    if (!permission.granted) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        showIndicator: false,
        title: 'Pedômetro não disponível',
        textBody: 'Permissão negada para acessar o pedômetro.',
        button: 'Fechar',
      })
    }
  }

  useEffect(() => {
    let subscription: { remove?: () => void } | undefined

    const setupSubscription = async () => {
      subscription = await subscribePedometer()
    }

    setupSubscription()

    return () => {
      if (subscription?.remove) {
        subscription.remove()
      }
    }
  }, [])

  function handleShowPremiumInfo() {
    Dialog.show({
      type: ALERT_TYPE.WARNING,
      showIndicator: false,
      title: 'Recompensa Premium',
      textBody: 'Usuários premium ganham mais cristais ao completar desafios.',
      button: 'Fechar',
    })
  }

  if (isPedometerAvailable === 'checking') {
    return (
      <View style={styles.container}>
        <Loading />
      </View>
    )
  }

  if (isPedometerAvailable === 'false') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Pedômetro não disponível</Text>
        <Text style={styles.text}>
          Forneça permissão para receber recompensas cumprindo metas diárias de
          caminhada!
        </Text>

        <Button
          title="Fornecer permissão"
          size="medium"
          variant="secondary"
          onPress={askForPermission}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>
          Caminhada
        </Text>

        <View style={styles.row}>
          <View style={styles.row}>
            <Crystal color={themes.COLORS.BLUE_6} size={16} />
            <Text style={styles.currencyText}>{availableCurrency}</Text>
          </View>

          <TouchableOpacity style={styles.row} onPress={handleShowPremiumInfo}>
            <View style={styles.row}>
              <Crystal color={themes.COLORS.YELLOW_6} size={16} />
              <Text
                style={[styles.currencyText, { color: themes.COLORS.YELLOW_6 }]}
              >
                {premiumCurrency}
              </Text>
            </View>

            <Material
              name="question-mark"
              size={12}
              color={themes.COLORS.GRAY_7}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.progress}>
        <Text
          style={styles.progressText}
        >{`${currentStepCount}/${stepsGoal} passos`}</Text>

        <ProgressBar
          totalSteps={stepsGoal / 1000}
          currentStep={stepsGoal / 1000 / 2}
          icon="footsteps"
        />
      </View>
    </View>
  )
}
