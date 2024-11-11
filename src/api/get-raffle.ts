import { api } from '@/libs/axios'

interface GetRaffleRequest {
  raffleId: string
}

interface GetRaffleResponse {
  raffle: {
    id: string
    name: string
    description: string
    bannerUrl: string
    price: number
    isPremium: boolean
    expiresAt: Date
    createdAt: Date
  }
}

export async function getRaffle({
  raffleId,
}: GetRaffleRequest): Promise<GetRaffleResponse> {
  const response = await api.get<GetRaffleResponse>(`/raffles/${raffleId}`)

  return response.data
}
