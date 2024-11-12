import { api } from '@/libs/axios'

import { ChallengeDTO } from './dtos/challengeDTO'

interface FetchActiveChallengesResponse {
  challenges: ChallengeDTO[]
}

export async function fetchActiveChallenges(): Promise<FetchActiveChallengesResponse> {
  const response = await api.get<FetchActiveChallengesResponse>('/challenges')

  return response.data
}
