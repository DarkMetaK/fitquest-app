import { api } from '@/libs/axios'

interface FetchActiveChallengesResponse {
  challenges: {
    id: string
    name: string
    availableExperience: number
    availableCurrency: number
    bannerUrl: string
    type: 'CHALLENGE'
    stepsAmount: number
    expiresAt: Date
  }[]
}

export async function fetchActiveChallenges(): Promise<FetchActiveChallengesResponse> {
  const response = await api.get<FetchActiveChallengesResponse>('/challenges')

  return response.data
}
