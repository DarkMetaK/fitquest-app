import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'

import { Metadata } from '@/screens/Metadata'
import { SignIn } from '@/screens/SignIn'
import { SignUp } from '@/screens/SignUp'
import { Welcome } from '@/screens/Welcome'

export type AuthRoutes = {
  welcome: undefined
  'sign-up': undefined
  'sign-in': undefined
  'phone-validation': undefined
  metadata: undefined
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>()

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="welcome" component={Welcome} />
      <Screen name="sign-up" component={SignUp} />
      <Screen name="sign-in" component={SignIn} />
      <Screen name="metadata" component={Metadata} />
    </Navigator>
  )
}
