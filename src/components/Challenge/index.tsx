import Material from '@expo/vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'

import themes from '@/themes'

import { Crystal } from '../Icon'
import { styles } from './styles'

interface BundleProps {
  title: string
  bannerUrl: string
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced'
  estimatedTime: number
  availableCurrency: number
  premiumCurrency: number
}

const DIFFICULTY = {
  Beginner: 'Iniciante',
  Intermediate: 'Intermediário',
  Advanced: 'Avançado',
}

export function Challenge({
  title,
  bannerUrl,
  difficulty = 'Beginner',
  estimatedTime,
  availableCurrency,
  premiumCurrency,
}: BundleProps) {
  const navigation = useNavigation()

  function handleShowPremiumInfo() {
    Dialog.show({
      type: ALERT_TYPE.INFO,
      title: 'Recompensa Premium',
      textBody: 'Usuários premium ganham mais cristais ao completar desafios.',
      button: 'Fechar',
    })
  }

  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate('workout', { id: 'any' })}
    >
      <Image
        source={{ uri: bannerUrl }}
        style={styles.bannerImg}
        resizeMode="cover"
        alt=""
      />

      <View style={styles.content}>
        <View style={styles.text}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>

          <View style={styles.info}>
            <Text style={styles.infoText}>{DIFFICULTY[difficulty]}</Text>
            <Text style={styles.infoText}>
              {` • `} {estimatedTime} min
            </Text>
          </View>
        </View>

        <View>
          <View style={styles.currency}>
            <Crystal color={themes.COLORS.BLUE_6} size={16} />
            <Text style={styles.currencyText}>{availableCurrency}</Text>
          </View>

          <TouchableOpacity
            style={styles.premium}
            onPress={handleShowPremiumInfo}
          >
            <View style={styles.currency}>
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
    </Pressable>
  )
}
