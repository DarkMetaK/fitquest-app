import { api } from '@/libs/axios'

import { TicketDTO } from './dtos/ticketDTO'

interface PurchaseRaffleTicketsRequest {
  raffleId: string
  amount?: number
}

interface PurchaseRaffleTicketsResponse {
  tickets: TicketDTO[]
}

export async function purchaseRaffleTickets({
  raffleId,
  amount,
}: PurchaseRaffleTicketsRequest): Promise<PurchaseRaffleTicketsResponse> {
  const response = await api.post<PurchaseRaffleTicketsResponse>(
    `/raffles/${raffleId}/purchase`,
    {},
    {
      params: { amount },
    },
  )

  return response.data
}
