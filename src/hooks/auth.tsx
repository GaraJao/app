import React, { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'

import { api } from '../services/api'
import { User } from '../models/UserModel'

export interface AuthData {
  user: User
  token: string
}

interface AuthContext {
  authData: AuthData
  signIn: (login: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  isLoading: boolean
}

export const AuthContext = createContext<AuthContext>({} as AuthContext)

export const AuthProvider: React.FC = ({ children }: any) => {
  const [authData, setAuthData] = useState<AuthData>()
  const [isLoading, setisLoading] = useState(true)

  useEffect(() => {
    loadStorageData()
  }, [])

  async function loadStorageData(): Promise<void> {
    try {
      const authDataSerialized = await AsyncStorage.getItem('@AuthData')
      if (authDataSerialized) {
        const _authData: AuthData = JSON.parse(authDataSerialized)
        setAuthData(_authData)
      }
    } catch (error) {
    } finally {
      setisLoading(false)
    }
  }

  async function signIn(login: string, password: string) {
    try {
      const authData = await api.signIn(login, password)

      setAuthData(authData)
      AsyncStorage.setItem('@AuthData', JSON.stringify(authData))
    } catch (error: any) {
      Alert.alert('Attention', error.response.data.message)
    }
  }

  async function signOut() {
    setAuthData(undefined)
    AsyncStorage.removeItem('@AuthData')
  }

  return (
    <AuthContext.Provider value={{ authData, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContext {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
