import { setUpTests } from 'react-native-reanimated'
import '@testing-library/react-native/extend-expect'
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock'

setUpTests()

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
)

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext)

jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon')
