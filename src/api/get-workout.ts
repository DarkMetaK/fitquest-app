import { api } from '@/libs/axios'

import { WorkoutDTO } from './dtos/workoutDTO'

interface GetWorkoutRequest {
  id: string
}

interface GetWorkoutResponse {
  workout: WorkoutDTO
}

export async function getWorkout({
  id,
}: GetWorkoutRequest): Promise<GetWorkoutResponse> {
  const response = await api.get<GetWorkoutResponse>(`/workouts/${id}`)

  return response.data
}
