import { Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import themes from '@/themes'

import { Crown, Crystal } from '../Icon'
import { styles } from './styles'

export function Header() {
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingTop: 16 + insets.top }]}>
      <View style={styles.item}>
        <Crystal color={themes.COLORS.BLUE_6} />
        <Text style={styles.currency}>32</Text>
      </View>

      <TouchableOpacity style={styles.item}>
        <Crown color={themes.COLORS.YELLOW_6} />
        <Text style={styles.premium}>Premium</Text>
      </TouchableOpacity>
    </View>
  )
}
