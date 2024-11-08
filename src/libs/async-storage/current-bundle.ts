import AsyncStorage from '@react-native-async-storage/async-storage'

import { CustomerActiveBundle } from '@/api/get-customer-active-bundle'

const STORAGE_KEY = '@fitquest:current-bundle'

export interface CurrentBundleInfo extends CustomerActiveBundle {
  finishedWorkoutsIds: string[]
}

export async function getCurrentBundleInfo() {
  try {
    const storage = await AsyncStorage.getItem(STORAGE_KEY)
    const response = storage ? (JSON.parse(storage) as CurrentBundleInfo) : null

    return response
  } catch (error) {
    console.log('Failed to get current bundle info:', error)

    return null
  }
}

export async function saveCurrentBundleInfo(data: CurrentBundleInfo) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.log('Failed to save current bundle info:', error)
  }
}
