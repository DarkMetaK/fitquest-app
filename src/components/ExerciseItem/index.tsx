import { Image, Text, View } from 'react-native'

import { styles } from './styles'

interface ExerciseItemProps {
  name: string
  duration: string
  imageURL: string
}

export function ExerciseItem({ name, duration, imageURL }: ExerciseItemProps) {
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
        <Text style={styles.subtitle}>{duration}</Text>
      </View>
    </View>
  )
}
