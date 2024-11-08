import { api } from '@/libs/axios'

interface SubscribeBundleRequest {
  bundleId: string
}

export async function subscribeBundle({ bundleId }: SubscribeBundleRequest) {
  await api.post(`/bundles/${bundleId}/subscribe`)
}
