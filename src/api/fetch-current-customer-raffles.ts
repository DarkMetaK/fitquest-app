import { api } from '@/libs/axios'

import { TicketDTO } from './dtos/ticketDTO'

interface FetchCurrentCustomerRafflesRequest {
  raffleId?: string
}

export interface FetchCurrentCustomerRafflesResponse {
  tickets: TicketDTO[]
}

export async function fetchCurrentCustomerRaffles({
  raffleId,
}: FetchCurrentCustomerRafflesRequest): Promise<FetchCurrentCustomerRafflesResponse> {
  const response = await api.get<FetchCurrentCustomerRafflesResponse>(
    '/raffles/customer',
    {
      params: {
        raffleId,
      },
    },
  )

  return response.data
}
