import Material from '@expo/vector-icons/MaterialIcons'
import { Text, TouchableOpacity, View } from 'react-native'

import themes from '@/themes'

import { styles } from './styles'

interface CounterProps {
  value: number
  max?: number
  onIncrement: () => void
  onDecrement: () => void
}

export function Counter({
  value,
  max,
  onIncrement,
  onDecrement,
}: CounterProps) {
  const hasReachedMax = max !== undefined && value >= max

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={value === 0 ? { opacity: 0.5 } : {}}
        onPress={onDecrement}
        disabled={value === 0}
      >
        <Material name="remove" size={24} color={themes.COLORS.GREEN_6} />
      </TouchableOpacity>

      <Text style={styles.value}>{value}</Text>

      <TouchableOpacity
        style={hasReachedMax ? { opacity: 0.5 } : {}}
        onPress={onIncrement}
        disabled={hasReachedMax}
      >
        <Material name="add" size={24} color={themes.COLORS.GREEN_6} />
      </TouchableOpacity>
    </View>
  )
}
