import Material from '@expo/vector-icons/MaterialIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigatorScreenParams } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { AllBundles } from '@/screens/AllBundles'
import { Bundle } from '@/screens/Bundle'
import { Exercise } from '@/screens/Exercise'
import { FinishedWorkout } from '@/screens/FinishedWorkout'
import { Home } from '@/screens/Home'
import { Market } from '@/screens/Market'
import { Metrics } from '@/screens/Metrics'
import { Premium } from '@/screens/Premium'
import { Profile } from '@/screens/Profile'
import { Raffle } from '@/screens/Raffle'
import { Receipt } from '@/screens/Receipt'
import { Workout } from '@/screens/Workout'
import themes from '@/themes'

type TabRoutes = {
  home: undefined
  market: undefined
  metrics: undefined
  profile: undefined
}

type NoTabRoutes = {
  allBundles: undefined
  bundle: {
    id: string
  }
  workout: {
    id: string
    description?: string
    isFinished: boolean
  }
  exercise: undefined
  finishedWorkout: undefined
  raffle: {
    id: string
  }
  receipt: {
    id: string
  }
  premium: undefined
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
        name="market"
        component={Market}
        options={{
          tabBarIcon: ({ color }) => (
            <Material name="currency-exchange" size={24} color={color} />
          ),
          tabBarLabel: 'Pontos',
        }}
      />

      <TabNavigation.Screen
        name="metrics"
        component={Metrics}
        options={{
          tabBarIcon: ({ color }) => (
            <Material name="calendar-month" size={24} color={color} />
          ),
          tabBarLabel: 'Métricas',
        }}
      />

      <TabNavigation.Screen
        name="profile"
        component={Profile}
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
      <NoTabNavigation.Screen name="allBundles" component={AllBundles} />
      <NoTabNavigation.Screen name="bundle" component={Bundle} />
      <NoTabNavigation.Screen name="workout" component={Workout} />
      <NoTabNavigation.Screen name="exercise" component={Exercise} />
      <NoTabNavigation.Screen
        name="finishedWorkout"
        component={FinishedWorkout}
      />
      <NoTabNavigation.Screen name="raffle" component={Raffle} />
      <NoTabNavigation.Screen name="receipt" component={Receipt} />
      <NoTabNavigation.Screen name="premium" component={Premium} />
    </NoTabNavigation.Navigator>
  )
}
