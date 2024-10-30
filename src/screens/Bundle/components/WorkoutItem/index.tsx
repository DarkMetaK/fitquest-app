import Material from '@expo/vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { Pressable, Text, View } from 'react-native'

import { Crystal } from '@/components/Icon'
import themes from '@/themes'

import { styles } from './styles'

interface WorkoutItemProps {
  title: string
  estimatedTime: number
  availableCurrency: number
  exercisesAmount: number
}

export function WorkoutItem({
  title,
  availableCurrency,
  estimatedTime,
  exercisesAmount,
}: WorkoutItemProps) {
  const navigation = useNavigation()

  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        navigation.navigate('stack', { screen: 'workout', params: { id: '1' } })
      }
    >
      <View style={styles.row}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        <Material
          name="arrow-circle-right"
          size={24}
          color={themes.COLORS.GREEN_6}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.infoText}>
          {estimatedTime} min {` • `} {exercisesAmount} exercícios
        </Text>

        <View style={styles.currency}>
          <Crystal color={themes.COLORS.BLUE_6} size={16} />
          <Text style={styles.currencyText}>{availableCurrency}</Text>
        </View>
      </View>
    </Pressable>
  )
}
