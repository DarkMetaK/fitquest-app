import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = '@fitquest:pending-finished-workout'

interface PendingFinishedWorkoutsProps {
  workoutId: string
  finishedAt: Date
}

export async function savePendingFinishedWorkout({
  workoutId,
}: Pick<PendingFinishedWorkoutsProps, 'workoutId'>) {
  try {
    const response = await AsyncStorage.getItem(STORAGE_KEY)

    const workouts: PendingFinishedWorkoutsProps[] = response
      ? JSON.parse(response)
      : []

    const newWorkout = {
      workoutId,
      finishedAt: new Date(),
    }

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([...workouts, newWorkout]),
    )
  } catch (error) {
    console.log('Failed to save finished workout:', error)
  }
}

export async function getPendingFinishedWorkouts() {
  try {
    const response = await AsyncStorage.getItem(STORAGE_KEY)

    const workouts: PendingFinishedWorkoutsProps[] = response
      ? JSON.parse(response)
      : []

    return workouts
  } catch (error) {
    console.log('Failed to get finished workouts:', error)
  }
}
