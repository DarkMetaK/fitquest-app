import { api } from '@/libs/axios'

interface FetchAvailableRafflesResponse {
  raffles: {
    id: string
    name: string
    bannerUrl: string
    price: number
    isPremium: boolean
    expiresAt: Date
    createdAt: Date
  }[]
}

export async function fetchAvailableRaffles(): Promise<FetchAvailableRafflesResponse> {
  const response =
    await api.get<FetchAvailableRafflesResponse>('/raffles/active')

  return response.data
}
