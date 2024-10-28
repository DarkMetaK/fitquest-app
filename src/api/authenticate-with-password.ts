import { api } from '@/libs/axios'

interface AuthenticateWithPasswordRequest {
  email: string
  password: string
}

interface AuthenticateWithPasswordResponse {
  access_token: string
  hasFinishedRegistration: boolean
}

export async function authenticateWithPassword({
  email,
  password,
}: AuthenticateWithPasswordRequest): Promise<AuthenticateWithPasswordResponse> {
  const response = await api.post<AuthenticateWithPasswordResponse>(
    '/sessions/password',
    {
      email,
      password,
    },
  )

  return response.data
}
