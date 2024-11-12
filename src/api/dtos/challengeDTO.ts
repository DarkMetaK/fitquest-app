export interface ChallengeDTO {
  id: string
  name: string
  availableExperience: number
  availableCurrency: number
  bannerUrl: string
  type: 'CHALLENGE'
  stepsAmount: number
  expiresAt: Date
}
