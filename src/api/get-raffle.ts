import { api } from '@/libs/axios'

import { RaffleDTO } from './dtos/raffleDTO'

interface GetRaffleRequest {
  raffleId: string
}

interface GetRaffleResponse {
  raffle: RaffleDTO
}

export async function getRaffle({
  raffleId,
}: GetRaffleRequest): Promise<GetRaffleResponse> {
  const response = await api.get<GetRaffleResponse>(`/raffles/${raffleId}`)

  return response.data
}
