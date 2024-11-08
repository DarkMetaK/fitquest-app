import '@/libs/dayjs'

import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins'
import { NavigationContainer } from '@react-navigation/native'
import { QueryClientProvider } from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import { AlertNotificationRoot } from 'react-native-alert-notification'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { Loading } from '@/components/Loading'
import { AuthContextProvider } from '@/contexts/AuthContext'
import { WorkoutContextProvider } from '@/contexts/WorkoutContext'
import { queryClient } from '@/libs/react-query'
import { Routes } from '@/routes'

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  })

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" backgroundColor="transparent" translucent />

      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <AuthContextProvider>
            <WorkoutContextProvider>
              <AlertNotificationRoot>
                {fontsLoaded ? <Routes /> : <Loading />}
              </AlertNotificationRoot>
            </WorkoutContextProvider>
          </AuthContextProvider>
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  )
}
