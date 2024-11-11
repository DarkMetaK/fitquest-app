import { api } from '@/libs/axios'

interface FetchCurrentCustomerRafflesResponse {
  raffles: {
    id: string
    raffleId: string
    hasWon: boolean | null
    name: string
    description: string
    bannerUrl: string
    price: number
    isPremium: boolean
    expiresAt: Date
    purchasedAt: Date
  }[]
}

export async function fetchCurrentCustomerRaffles(): Promise<FetchCurrentCustomerRafflesResponse> {
  const response =
    await api.get<FetchCurrentCustomerRafflesResponse>('/raffles/customer')

  return response.data
}
