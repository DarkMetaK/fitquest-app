import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = '@fitquest:bundle'

export interface UserBundleInfo {
  subscribedBundleId?: string
}

export async function getUserBundleInfo() {
  try {
    const storage = await AsyncStorage.getItem(STORAGE_KEY)
    const response = storage ? JSON.parse(storage) : {}

    return response as UserBundleInfo
  } catch (error) {
    console.log('Failed to get user bundle info:', error)

    return {} as UserBundleInfo
  }
}

export async function saveUserBundleInfo(data: UserBundleInfo) {
  try {
    const storage = await getUserBundleInfo()

    if (data.subscribedBundleId) {
      storage.subscribedBundleId = data.subscribedBundleId
    }

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(storage))
  } catch (error) {
    console.log('Failed to save user bundle info:', error)
  }
}
