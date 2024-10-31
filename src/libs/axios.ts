import axios, { AxiosInstance } from 'axios'

import { AppError } from '@/utils/AppError'

interface AxiosInstanceWithInterceptor extends AxiosInstance {
  registerInterceptTokenManager: (signOut: () => void) => void
}

export const api: AxiosInstanceWithInterceptor = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
}) as AxiosInstanceWithInterceptor

api.registerInterceptTokenManager = (signOut: () => void) => {
  api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      // Token error
      if (
        requestError.response?.status === 401 &&
        requestError.response?.data?.message ===
          'Invalid or expired token provided.'
      ) {
        signOut()
        return Promise.reject(requestError)
      }

      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message))
      } else {
        return Promise.reject(requestError)
      }
    },
  )
}
