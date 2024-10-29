import Material from '@expo/vector-icons/MaterialIcons'
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Bundle } from '@/screens/Bundle'
import { Home } from '@/screens/Home'
import { Workout } from '@/screens/Workout'
import themes from '@/themes'

export type AppRoutes = {
  home: undefined
  exchange: undefined
  metrics: undefined
  profile: undefined
  bundle: {
    id: string
  }
  workout: {
    id: string
  }
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  const insets = useSafeAreaInsets()

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: themes.COLORS.GREEN_6,
        tabBarInactiveTintColor: themes.COLORS.GRAY_7,
        tabBarStyle: {
          height: 72 + insets.bottom,
          borderTopWidth: 2,
          borderColor: themes.COLORS.GRAY_2,
          backgroundColor: themes.COLORS.WHITE,
        },
        tabBarIconStyle: {
          paddingVertical: 0,
        },
        tabBarLabelStyle: {
          paddingBottom: 12,
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Material name="home" size={24} color={color} />
          ),
          tabBarLabel: 'Início',
        }}
      />

      <Screen
        name="exchange"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Material name="currency-exchange" size={24} color={color} />
          ),
          tabBarLabel: 'Pontos',
        }}
      />

      <Screen
        name="metrics"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Material name="calendar-month" size={24} color={color} />
          ),
          tabBarLabel: 'Métricas',
        }}
      />

      <Screen
        name="profile"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Material name="person" size={24} color={color} />
          ),
          tabBarLabel: 'Perfil',
        }}
      />

      <Screen
        name="bundle"
        component={Bundle}
        options={{
          tabBarButton: () => null,
          tabBarStyle: {
            display: 'none',
          },
        }}
      />

      <Screen
        name="workout"
        component={Workout}
        options={{
          tabBarButton: () => null,
          tabBarStyle: {
            display: 'none',
          },
        }}
      />
    </Navigator>
  )
}
