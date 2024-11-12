import Material from '@expo/vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'
import { Text, TouchableOpacity, View } from 'react-native'

import themes from '@/themes'

import { Crystal } from '../Icon'
import { styles } from './styles'
interface PurchasedItemProps {
  id: string
  title: string
  date: Date
  price: number
}

export function PurchasedItem({ id, title, date, price }: PurchasedItemProps) {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('stack', { screen: 'receipt', params: { id } })
      }
      style={styles.container}
    >
      <Text numberOfLines={1}>Cupom sorteio &quot;{title}&quot;</Text>

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
          <Text style={styles.priceText}>-{price}</Text>
          <Crystal size={16} color={themes.COLORS.RED_3} />
        </View>
      </View>
    </TouchableOpacity>
  )
}
