import { api } from '@/libs/axios'

interface RegisterMetadataRequest {
  phone: string
  age: number
  weight: number
  height: number
  goal: string
  weeklyStreakGoal: number
}

export async function registerMetadata({
  phone,
  age,
  weight,
  height,
  goal,
  weeklyStreakGoal,
}: RegisterMetadataRequest) {
  await api.post('/customers/metadata', {
    phone,
    age,
    weight,
    height,
    goal,
    weeklyStreakGoal,
  })
}
