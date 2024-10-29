import Material from '@expo/vector-icons/MaterialIcons'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import themes from '@/themes'

import { styles } from './styles'

export function ActiveExercise() {
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

          <View style={styles.demonstrationBtnContainer}>
            <TouchableOpacity style={styles.demonstrationButton}>
              <Material
                name="volume-up"
                size={20}
                color={themes.COLORS.WHITE}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.demonstrationButton}>
              <Material name="videocam" size={20} color={themes.COLORS.WHITE} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.main}>
          <Text style={styles.timer}>00:45</Text>
          <Text style={styles.title}>Postura do gato e da vaca sentada</Text>
        </View>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton}>
            <Material
              name="skip-previous"
              size={32}
              color={themes.COLORS.WHITE}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlButton}>
            <Material name="pause" size={32} color={themes.COLORS.WHITE} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlButton}>
            <Material name="skip-next" size={32} color={themes.COLORS.WHITE} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
