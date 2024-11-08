import { api } from '@/libs/axios'

export interface GetCustomerDetailsResponse {
  customer: {
    id: string
    phone: string
    age: number
    weight: number
    height: number
    goal: string
    weeklyStreakGoal: number
    experienceAmount: number
    currencyAmount: number
    totalWorkouts: number
    totalExercises: number
    totalCalories: number
    highestStreak: number
    premiumExpiresAt: Date | null
  }
}

export async function getCustomerDetails(): Promise<GetCustomerDetailsResponse> {
  const response = await api.get<GetCustomerDetailsResponse>('/me/metadata')

  return response.data
}
