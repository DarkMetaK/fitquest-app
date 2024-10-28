import { api } from '@/libs/axios'

interface CreateCustomerRequest {
  phone: string
}

export async function verifyPhoneAvailability({
  phone,
}: CreateCustomerRequest) {
  await api.post('/phone/status', {
    phone,
  })
}
