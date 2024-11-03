import { api } from '@/libs/axios'

interface GetCustomerActiveBundleResponse {
  activeBundle: {
    id: string
    name: string
    description?: string
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
