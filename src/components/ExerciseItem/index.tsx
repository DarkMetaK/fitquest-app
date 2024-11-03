import Material from '@expo/vector-icons/MaterialIcons'
import { Image, Text, View } from 'react-native'

import themes from '@/themes'
import { convertSecondsToTime } from '@/utils/time-converter'

import { styles } from './styles'

interface ExerciseItemProps {
  name: string
  duration: number
  repetitions?: number | null
  imageURL: string
}

export function ExerciseItem({
  name,
  duration,
  repetitions,
  imageURL,
}: ExerciseItemProps) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageURL }}
        alt=""
        resizeMode="cover"
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {name}
        </Text>

        <View style={styles.details}>
          {repetitions ? (
            <>
              <Text style={styles.subtitle}>{repetitions}</Text>
              <Material name="loop" size={14} color={themes.COLORS.GREEN_6} />
            </>
          ) : (
            <>
              <Text style={styles.subtitle}>
                {convertSecondsToTime(duration)}
              </Text>
              <Material
                name="access-time"
                size={14}
                color={themes.COLORS.GREEN_6}
              />
            </>
          )}
        </View>
      </View>
    </View>
  )
}
