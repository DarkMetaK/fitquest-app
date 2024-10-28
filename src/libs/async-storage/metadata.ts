import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = '@fitquest:metadata'

type GoalTypes =
  | 'LOSE_WEIGHT'
  | 'GAIN_MUSCLE_MASS'
  | 'ENHANCE_HEALTH'
  | 'INCREASE_FLEXIBILITY'

export interface MetadataProps {
  phone?: string
  age?: number
  weight?: number
  height?: number
  goal?: GoalTypes
  weeklyGoal?: number
}

export async function getUserMetadata() {
  try {
    const storage = await AsyncStorage.getItem(STORAGE_KEY)
    const response = storage ? JSON.parse(storage) : {}

    return response as MetadataProps
  } catch (error) {
    console.log('Failed to get user metadata:', error)

    return {} as MetadataProps
  }
}

export async function saveUserMetadata(data: MetadataProps) {
  try {
    const storage = await getUserMetadata()

    if (data.phone) {
      storage.phone = data.phone
    }

    if (data.age) {
      storage.age = data.age
    }

    if (data.height) {
      storage.height = data.height
    }

    if (data.weight) {
      storage.weight = data.weight
    }

    if (data.goal) {
      storage.goal = data.goal
    }

    if (data.weeklyGoal) {
      storage.weeklyGoal = data.weeklyGoal
    }

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(storage))
  } catch (error) {
    console.log('Failed to save user metadata:', error)
  }
}
