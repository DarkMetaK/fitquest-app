import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'

import { Welcome } from '@/screens/Welcome'

type AuthRoutes = {
  welcome: undefined
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>()

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="welcome" component={Welcome} />
      {/* <Screen name="metadata" component={PreRegistration} /> */}
    </Navigator>
  )
}
