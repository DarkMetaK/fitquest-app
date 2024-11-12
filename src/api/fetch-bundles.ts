import { api } from '@/libs/axios'

import { BundleDTO } from './dtos/bundleDTO'

export interface FetchBundlesResponse {
  bundles: BundleDTO[]
}

export async function fetchBundles(): Promise<FetchBundlesResponse> {
  const response = await api.get<FetchBundlesResponse>('/bundles')

  return response.data
}
