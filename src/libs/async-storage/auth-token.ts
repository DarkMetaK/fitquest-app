import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = '@fitquest:auth-token'

interface AuthTokenProps {
  access_token: string
}

export async function saveAuthToken({ access_token }: AuthTokenProps) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ access_token }))
  } catch (error) {
    console.log('Failed to save auth token:', error)
  }
}

export async function getAuthToken() {
  try {
    const response = await AsyncStorage.getItem(STORAGE_KEY)

    const { access_token }: AuthTokenProps = response
      ? JSON.parse(response)
      : {}

    return { access_token }
  } catch (error) {
    console.log('Failed to get auth token:', error)
  }
}

export async function removeAuthToken() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.log('Failed to remove auth token:', error)
  }
}
