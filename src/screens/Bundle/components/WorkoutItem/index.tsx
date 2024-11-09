import Material from '@expo/vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { Pressable, Text, View } from 'react-native'

import { Crystal } from '@/components/Icon'
import themes from '@/themes'

import { styles } from './styles'

interface WorkoutItemProps {
  id: string
  title: string
  availableCurrency: number
  exercisesAmount: number
  isFinished?: boolean
}

export function WorkoutItem({
  id,
  title,
  availableCurrency,
  exercisesAmount,
  isFinished = false,
}: WorkoutItemProps) {
  const navigation = useNavigation()

  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        navigation.navigate('stack', {
          screen: 'workout',
          params: { id, isFinished },
        })
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
        <Text style={styles.infoText}>{exercisesAmount} Exercícios</Text>

        <View style={styles.currency}>
          <Crystal
            color={isFinished ? themes.COLORS.GRAY_8 : themes.COLORS.BLUE_6}
            size={16}
          />
          <Text
            style={[
              styles.currencyText,
              isFinished && {
                color: themes.COLORS.GRAY_8,
                textDecorationLine: 'line-through',
              },
            ]}
          >
            {availableCurrency}
          </Text>
        </View>
      </View>
    </Pressable>
  )
}
