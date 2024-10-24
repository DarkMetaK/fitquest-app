import { StatusBar } from 'expo-status-bar'
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import '@/libs/dayjs'
// import { AuthContextProvider } from '@/contexts/AuthContext'
import { Loading } from '@/components/Loading'
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

      {fontsLoaded ? <Routes /> : <Loading />}
    </SafeAreaProvider>
  )
}
