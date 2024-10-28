import { ActivityIndicator, View } from 'react-native'

import themes from '@/themes'

import { styles } from './styles'

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={themes.COLORS.GREEN_6} />
    </View>
  )
}
