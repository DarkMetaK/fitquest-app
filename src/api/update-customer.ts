import { api } from '@/libs/axios'

interface CreateCustomerRequest {
  name: string
  email: string
  password: string
}

export async function createCustomer({
  name,
  email,
  password,
}: CreateCustomerRequest) {
  await api.post('/customers', {
    name,
    email,
    password,
  })
}
