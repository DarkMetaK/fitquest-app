import { api } from '@/libs/axios'

import { TicketDTO } from './dtos/ticketDTO'

interface GetCustomerRaffleTicketRequest {
  ticketId: string
}

export interface GetCustomerRaffleTicketResponse {
  ticket: TicketDTO
}

export async function GetCustomerRaffleTicket({
  ticketId,
}: GetCustomerRaffleTicketRequest): Promise<GetCustomerRaffleTicketResponse> {
  const response = await api.get<GetCustomerRaffleTicketResponse>(
    `/raffles/tickets/${ticketId}`,
  )

  return response.data
}
