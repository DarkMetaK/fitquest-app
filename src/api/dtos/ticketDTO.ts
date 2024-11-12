export interface TicketDTO {
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
}
