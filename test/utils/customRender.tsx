import { ReactElement, ReactNode } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { render, RenderOptions } from '@testing-library/react-native'
import { NavigationContainer } from '@react-navigation/native'

import { AuthContextProvider } from '@/contexts/AuthContext'

function Providers({ children }: { children: ReactNode }) {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthContextProvider>{children}</AuthContextProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: Providers, ...options })

export * from '@testing-library/react-native'
export { customRender as render, Providers }
