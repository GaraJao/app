import React, { ReactNode, createContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Alert } from 'react-native'

import { api } from '../services/api'
import { Login } from '../models/LoginModel'

type AuthContext = {
  signIn: (login: string, password: string) => void
  login: Login
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContext>({} as AuthContext)

export default function AuthProvider({ children }: AuthProviderProps) {
  const [login, setLogin] = useState<Login>({} as Login)

  const navigation = useNavigation()

  async function signIn(login: string, password: string) {
    await api.axiosInstance
      .post(`/users/login`, { login, password })
      .then((response) => {
        const login = response.data as Login
        setLogin(login)

        navigation.reset({
          index: 1,
          routes: [{ name: 'Home' }],
        })
      })
      .catch((error) => {
        if (error.response)
          Alert.alert('Attention', error.response.data.message)
      })
  }

  return (
    <AuthContext.Provider value={{ signIn, login }}>
      {children}
    </AuthContext.Provider>
  )
}
