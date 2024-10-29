import { Image, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Button } from '@/components/Button'

import { styles } from './styles'

export function Interval() {
  const insets = useSafeAreaInsets()

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={styles.demonstration}
            alt=""
          />

          <View>
            <Text style={styles.nextTitle}>Próximo</Text>
            <Text style={styles.nextExercise}>
              Postura do gato e da vaca sentada
            </Text>
          </View>
        </View>

        <View style={styles.main}>
          <Text style={styles.rest}>Descanso</Text>
          <Text style={styles.timer}>00:45</Text>
        </View>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <Button title="+20s" variant="secondary" style={{ flex: 1 }} />
        <Button title="Pular" style={{ flex: 1 }} />
      </View>
    </View>
  )
}
