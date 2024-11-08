import { api } from '@/libs/axios'

export interface GetCustomerActiveBundleResponse {
  activeBundle: {
    id: string
    name: string
    description?: string | null
    bannerUrl: string
    isPremium: boolean
    workouts: {
      id: string
      name: string
      availableExperience: number
      availableCurrency: number
      stepsAmount: number
    }[]
  } | null
}

export async function getCustomerActiveBundle(): Promise<GetCustomerActiveBundleResponse> {
  const response = await api.get<GetCustomerActiveBundleResponse>(
    '/bundles/in-progress',
  )

  return response.data
}
