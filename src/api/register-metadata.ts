import { api } from '@/libs/axios'

interface RegisterMetadataRequest {
  phone: string
  age: number
  weight: number
  height: number
  goal: string
  weeklyGoal: number
}

export async function registerMetadata({
  phone,
  age,
  weight,
  height,
  goal,
  weeklyGoal,
}: RegisterMetadataRequest) {
  await api.post('/customers/metadata', {
    phone,
    age,
    weight,
    height,
    goal,
    weeklyGoal,
  })
}
