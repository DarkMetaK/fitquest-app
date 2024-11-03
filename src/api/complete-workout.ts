import { api } from '@/libs/axios'

interface CompleteWorkoutRequest {
  workoutId: string
}

export async function completeWorkout({ workoutId }: CompleteWorkoutRequest) {
  await api.post(`/workouts/${workoutId}/complete`)
}
