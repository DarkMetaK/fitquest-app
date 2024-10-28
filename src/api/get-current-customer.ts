import { api } from '@/libs/axios'

interface GetCurrentCustomerResponse {
  customer: {
    id: string
    name: string
    email: string
  }
}

export async function getCurrentCustomer(): Promise<GetCurrentCustomerResponse> {
  const response = await api.get<GetCurrentCustomerResponse>('/me')

  return response.data
}
