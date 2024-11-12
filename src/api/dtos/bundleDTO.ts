interface BundleWorkout {
  id: string
  name: string
  availableExperience: number
  availableCurrency: number
  stepsAmount: number
}

export interface BundleDTO {
  id: string
  name: string
  description?: string | null
  bannerUrl: string
  isPremium: boolean
  workouts: BundleWorkout[]
}
