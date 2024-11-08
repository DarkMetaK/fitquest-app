import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = '@fitquest:metrics'

export interface Metrics {
  highestStreak: number
  currencyAmount: number
  experienceAmount: number
  totalCalories: number
  totalExercises: number
  totalWorkouts: number
  premiumExpiresAt: Date | null
}

export async function getMetrics() {
  try {
    const storage = await AsyncStorage.getItem(STORAGE_KEY)
    const response = storage ? (JSON.parse(storage) as Metrics) : null

    return response
  } catch (error) {
    console.log('Failed to get user metrics:', error)

    return null
  }
}

export async function saveMetrics(data: Metrics) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.log('Failed to save user metrics:', error)
  }
}
