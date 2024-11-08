import { api } from '@/libs/axios'

interface Workout {
  id: string
  name: string
  availableExperience: number
  availableCurrency: number
  stepsAmount: number
}

export interface FetchBundlesResponse {
  bundles: {
    id: string
    name: string
    description?: string | null
    bannerUrl: string
    isPremium: boolean
    workouts: Workout[]
  }[]
}

export async function fetchBundles(): Promise<FetchBundlesResponse> {
  const response = await api.get<FetchBundlesResponse>('/bundles')

  return response.data
}
