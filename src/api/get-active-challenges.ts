import { api } from '@/libs/axios'

interface GetActiveChallengesResponse {
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

export async function getActiveChallenges(): Promise<GetActiveChallengesResponse> {
  const response = await api.get<GetActiveChallengesResponse>('/challenges')

  return response.data
}
