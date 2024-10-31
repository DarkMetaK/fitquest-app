import { useQueryClient } from '@tanstack/react-query'
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { authenticateWithPassword } from '@/api/authenticate-with-password'
import { getCurrentCustomer } from '@/api/get-current-customer'
import { registerMetadata } from '@/api/register-metadata'
import {
  getAuthToken,
  removeAuthToken,
  saveAuthToken,
} from '@/libs/async-storage/auth-token'
import { getUserMetadata } from '@/libs/async-storage/metadata'
import {
  getUser,
  removeUser,
  saveUser,
  UserProps,
} from '@/libs/async-storage/user'
import { api } from '@/libs/axios'

interface AuthContextProps {
  authIsLoading: boolean
  token: string | null
  user: UserProps | null
  handleSignIn: (
    email: string,
    password: string,
    onMetadataError?: () => void,
  ) => Promise<void>
  handleSignOut: () => Promise<void>
  handleCompleteRegistration: () => Promise<void>
}

interface AuthContextProviderProps {
  children: ReactNode
}

export const authContext = createContext({} as AuthContextProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [authIsLoading, setAuthIsLoading] = useState(true)
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<UserProps | null>(null)
  const queryClient = useQueryClient()

  useEffect(() => {
    async function loadUserData() {
      setAuthIsLoading(true)

      try {
        const currentUser = await getUser()
        const token = await getAuthToken()

        if (token?.access_token) {
          setToken(token.access_token)
          api.defaults.headers.common.Authorization = `Bearer ${token.access_token}`
        }

        if (currentUser?.id) {
          setUser(currentUser)
        }
      } catch (error) {
        throw error
      } finally {
        setAuthIsLoading(false)
      }
    }
    loadUserData()
  }, [])

  async function handleSignIn(
    email: string,
    password: string,
    onMetadataError?: () => void,
  ) {
    try {
      const { access_token, hasFinishedRegistration } =
        await authenticateWithPassword({
          email,
          password,
        })

      if (access_token) {
        await updateAuthorizationToken(access_token)
        setToken(access_token)

        if (hasFinishedRegistration) {
          const { customer } = await getCurrentCustomer()

          await saveUser(customer)
          setUser(customer)
        } else {
          onMetadataError?.()
        }
      }
    } catch (error) {
      throw error
    }
  }

  const handleSignOut = useCallback(async () => {
    setAuthIsLoading(true)

    setUser(null)
    setToken(null)

    await removeAuthToken()
    await removeUser()

    api.defaults.headers.common.Authorization = null

    queryClient.invalidateQueries()

    setAuthIsLoading(false)
  }, [queryClient])

  useEffect(() => {
    api.registerInterceptTokenManager(handleSignOut)
  }, [handleSignOut])

  async function handleCompleteRegistration() {
    try {
      const metadata = await getUserMetadata()

      await registerMetadata({
        phone: metadata.phone!,
        age: metadata.age!,
        weight: metadata.weight!,
        height: metadata.height!,
        goal: metadata.goal!,
        weeklyGoal: metadata.weeklyGoal!,
      })

      const { customer } = await getCurrentCustomer()

      await saveUser(customer)
      setUser(customer)
    } catch (error) {
      throw error
    }
  }

  async function updateAuthorizationToken(access_token: string) {
    await saveAuthToken({ access_token })
    setToken(access_token)

    api.defaults.headers.common.Authorization = `Bearer ${access_token}`
  }

  return (
    <authContext.Provider
      value={{
        user,
        token,
        authIsLoading,
        handleSignIn,
        handleSignOut,
        handleCompleteRegistration,
      }}
    >
      {children}
    </authContext.Provider>
  )
}
