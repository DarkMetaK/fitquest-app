import Material from '@expo/vector-icons/MaterialIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigatorScreenParams } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Bundle } from '@/screens/Bundle'
import { Exercise } from '@/screens/Exercise'
import { Home } from '@/screens/Home'
import { Workout } from '@/screens/Workout'
import themes from '@/themes'

type TabRoutes = {
  home: undefined
  exchange: undefined
  metrics: undefined
  profile: undefined
}

type NoTabRoutes = {
  bundle: {
    id: string
  }
  workout: {
    id: string
  }
  exercise: undefined
}

export type AppRoutes = {
  tabs: NavigatorScreenParams<TabRoutes>
  stack: NavigatorScreenParams<NoTabRoutes>
}

const AppNavigation = createNativeStackNavigator()
const TabNavigation = createBottomTabNavigator<TabRoutes>()
const NoTabNavigation = createNativeStackNavigator<NoTabRoutes>()

export function AppRoutes() {
  return (
    <AppNavigation.Navigator screenOptions={{ headerShown: false }}>
      <AppNavigation.Screen name="tabs" component={TabRoutes} />
      <AppNavigation.Screen name="stack" component={NoTabRoutes} />
    </AppNavigation.Navigator>
  )
}

function TabRoutes() {
  const insets = useSafeAreaInsets()

  return (
    <TabNavigation.Navigator
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
      <TabNavigation.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Material name="home" size={24} color={color} />
          ),
          tabBarLabel: 'Início',
        }}
      />

      <TabNavigation.Screen
        name="exchange"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Material name="currency-exchange" size={24} color={color} />
          ),
          tabBarLabel: 'Pontos',
        }}
      />

      <TabNavigation.Screen
        name="metrics"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Material name="calendar-month" size={24} color={color} />
          ),
          tabBarLabel: 'Métricas',
        }}
      />

      <TabNavigation.Screen
        name="profile"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Material name="person" size={24} color={color} />
          ),
          tabBarLabel: 'Perfil',
        }}
      />
    </TabNavigation.Navigator>
  )
}

function NoTabRoutes() {
  return (
    <NoTabNavigation.Navigator screenOptions={{ headerShown: false }}>
      <NoTabNavigation.Screen name="bundle" component={Bundle} />
      <NoTabNavigation.Screen name="workout" component={Workout} />
      <NoTabNavigation.Screen name="exercise" component={Exercise} />
    </NoTabNavigation.Navigator>
  )
}
