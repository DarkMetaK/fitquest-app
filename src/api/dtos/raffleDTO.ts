export interface RaffleDTO {
  id: string
  name: string
  description: string
  bannerUrl: string
  price: number
  isPremium: boolean
  freeTierQuota: number
  expiresAt: Date
  createdAt: Date
}
