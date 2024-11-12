import { api } from '@/libs/axios'

import { BundleDTO } from './dtos/bundleDTO'

export interface CustomerActiveBundle extends BundleDTO {
  finishedWorkoutsIds: string[]
}

export interface GetCustomerActiveBundleResponse {
  activeBundle: CustomerActiveBundle | null
}

export async function getCustomerActiveBundle(): Promise<GetCustomerActiveBundleResponse> {
  const response = await api.get<GetCustomerActiveBundleResponse>(
    '/bundles/in-progress',
  )

  return response.data
}
