import Material from '@expo/vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'
import { Image, Pressable, Text, View } from 'react-native'

import themes from '@/themes'

import { styles } from './styles'

interface RaffleProps {
  id: string
  title: string
  bannerUrl: string
  expiresAt: Date
  isPremium?: boolean
}

export function RaffleItem({
  id,
  title,
  bannerUrl,
  expiresAt,
  isPremium = false,
}: RaffleProps) {
  const navigation = useNavigation()

  const diffInDays = dayjs(expiresAt).diff(new Date(), 'days')
  const diffInHours = dayjs(expiresAt).diff(new Date(), 'hours')
  const diffInMinutes = dayjs(expiresAt).diff(new Date(), 'minutes')

  const timeUntilExpiration =
    diffInDays > 0
      ? `${diffInDays} dias`
      : diffInHours > 0
        ? `${diffInHours} horas`
        : `${diffInMinutes} minutos`

  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        navigation.navigate('stack', { screen: 'workout', params: { id } })
      }
    >
      <Image
        source={{ uri: bannerUrl }}
        style={styles.bannerImg}
        resizeMode="cover"
        alt=""
      />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        <View style={styles.expiration}>
          <Material
            name="access-time"
            size={16}
            color={themes.COLORS.GREEN_8}
          />

          <Text style={styles.expirationDate}>
            {diffInMinutes < 0
              ? 'Expirado'
              : `Expira em ${timeUntilExpiration}`}
          </Text>
        </View>
      </View>

      {isPremium && (
        <View style={styles.premiumTag}>
          <Text style={styles.premiumTagText}>Premium</Text>
        </View>
      )}
    </Pressable>
  )
}
