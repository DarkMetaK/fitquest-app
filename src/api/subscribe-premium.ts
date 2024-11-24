import { api } from '@/libs/axios'

export async function subscribePremium() {
  await api.post(`/premium/subscribe`)
}
