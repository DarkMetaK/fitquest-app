import Material from '@expo/vector-icons/MaterialIcons'
import dayjs from 'dayjs'
import { Text, View } from 'react-native'

import themes from '@/themes'

import { Crystal } from '../Icon'
import { styles } from './styles'
interface PurchasedItemProps {
  id: string
  title: string
  date: Date
  price: number
  amount: number
  type?: string
}

export function PurchasedItem({
  title,
  date,
  price,
  amount,
  type,
}: PurchasedItemProps) {
  const formattedTitle =
    type === 'raffle'
      ? `${amount} número(s) na rifa "${title}"`
      : type === 'discount'
        ? `${amount} cupom(ns) de desconto "${title}"`
        : title

  const totalPrice = price * amount

  return (
    <View style={styles.container}>
      <Text numberOfLines={1}>{formattedTitle}</Text>

      <View style={styles.footer}>
        <View style={styles.row}>
          <Material
            name="calendar-month"
            size={16}
            color={themes.COLORS.GRAY_8}
          />

          <Text style={styles.dateText}>
            {dayjs(date).format('DD/MM/YYYY')}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.priceText}>-{totalPrice}</Text>
          <Crystal size={16} color={themes.COLORS.RED_3} />
        </View>
      </View>
    </View>
  )
}
