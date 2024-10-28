import { NavigationContainer } from '@react-navigation/native'
import { View } from 'react-native'

import { Loading } from '@/components/Loading'
import { useAuth } from '@/hooks/useAuth'
import themes from '@/themes'

import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'

export function Routes() {
  const { authIsLoading, user } = useAuth()

  return (
    <View style={{ flex: 1, backgroundColor: themes.COLORS.GRAY_1 }}>
      <NavigationContainer>
        {authIsLoading ? <Loading /> : user ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </View>
  )
}
