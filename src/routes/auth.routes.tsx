import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'

import { Welcome } from '@/screens/Welcome'
import { SignUp } from '@/screens/SignUp'
import { SignIn } from '@/screens/SignIn'

type AuthRoutes = {
  welcome: undefined
  'sign-up': undefined
  'sign-in': undefined
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>()

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="welcome" component={Welcome} />
      <Screen name="sign-up" component={SignUp} />
      <Screen name="sign-in" component={SignIn} />
      {/* <Screen name="metadata" component={PreRegistration} /> */}
    </Navigator>
  )
}
