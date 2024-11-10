import Material from '@expo/vector-icons/MaterialIcons'
import { Text, TouchableOpacity, View } from 'react-native'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'

import themes from '@/themes'

import { Crystal } from '../Icon'
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
  function handleShowPremiumInfo() {
    Dialog.show({
      type: ALERT_TYPE.WARNING,
      showIndicator: false,
      title: 'Recompensa Premium',
      textBody: 'Usuários premium ganham mais cristais ao completar desafios.',
      button: 'Fechar',
    })
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
        <Text style={styles.progressText}>{`3000/${stepsGoal} passos`}</Text>

        <ProgressBar
          totalSteps={stepsGoal / 1000}
          currentStep={stepsGoal / 1000 / 2}
          icon="footsteps"
        />
      </View>
    </View>
  )
}
