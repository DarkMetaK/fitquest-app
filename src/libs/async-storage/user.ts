import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = '@fitquest:user'

export interface UserProps {
  id: string
  name: string
  email: string
}

export async function saveUser({ id, name, email }: UserProps) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ id, name, email }))
  } catch (error) {
    console.log('Failed to save user:', error)
  }
}

export async function getUser() {
  try {
    const response = await AsyncStorage.getItem(STORAGE_KEY)

    const { id, name, email }: UserProps = response ? JSON.parse(response) : {}

    return { id, name, email }
  } catch (error) {
    console.log('Failed to get auth token:', error)
  }
}

export async function removeUser() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.log('Failed to remove user:', error)
  }
}
