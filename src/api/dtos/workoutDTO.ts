export interface WorkoutDTO {
  name: string
  availableExperience: string
  availableCurrency: string
  bannerUrl: string
  type: 'STANDARD' | 'CHALLENGE'
  steps: {
    order: number
    exerciseId: string
    name: string
    targetedRegions: string[]
    estimatedCalories: number
    demonstrationUrl: string
    instructions?: string | null
    previewUrl?: string | null
    videoUrl?: string | null
    audioUrl?: string | null
    repetitions?: number | null
    duration?: number | null
  }[]
  estimatedCalories: number
  estimatedTime: number
  expiresAt?: Date
}
