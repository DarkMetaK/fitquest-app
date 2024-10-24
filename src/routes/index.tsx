import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import themes from '@/themes'

import { AuthRoutes } from './auth.routes'

export function Routes() {
  return (
    <View style={{ flex: 1, backgroundColor: themes.COLORS.GRAY_1 }}>
      <NavigationContainer>
        <AuthRoutes />
      </NavigationContainer>
    </View>
  )
}
