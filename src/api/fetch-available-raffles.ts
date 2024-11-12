import { api } from '@/libs/axios'

import { RaffleDTO } from './dtos/raffleDTO'

interface FetchAvailableRafflesResponse {
  raffles: RaffleDTO[]
}

export async function fetchAvailableRaffles(): Promise<FetchAvailableRafflesResponse> {
  const response =
    await api.get<FetchAvailableRafflesResponse>('/raffles/active')

  return response.data
}
