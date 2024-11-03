import { api } from '@/libs/axios'

interface GetWorkoutRequest {
  id: string
}

interface GetWorkoutResponse {
  workout: {
    name: string
    availableExperience: string
    availableCurrency: string
    bannerUrl: string
    type: 'STANDARD' | 'CHALLENGE'
    steps: {
      order: number
      exerciseId: string
      name: string
      targetedRegions: string[]
      estimatedCalories: number
      demonstrationUrl: string
      instructions?: string | null
      previewUrl?: string | null
      videoUrl?: string | null
      audioUrl?: string | null
      repetitions?: number | null
      duration?: number | null
    }[]
    estimatedCalories: number
    estimatedTime: number
    expiresAt?: Date
  }
}

export async function getWorkout({
  id,
}: GetWorkoutRequest): Promise<GetWorkoutResponse> {
  const response = await api.get<GetWorkoutResponse>(`/workouts/${id}`)

  return response.data
}
