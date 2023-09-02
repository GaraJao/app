import React, { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert, Platform } from 'react-native'
import * as ExpoDevice from 'expo-device'

import push_token from '../utils/permissions-handlers/notification'
import { api } from '../services/api'
import { User } from '../models/UserModel'
import { Device } from '../models/DeviceModel'

export interface AuthData {
  user: User
  token: string
}

interface AuthContext {
  authData: AuthData
  signIn: (login: string, password: string, device: Device) => Promise<void>
  signOut: (device: Device, authData: AuthData) => Promise<void>
  isLoading: boolean
  device: Device
}

export const AuthContext = createContext<AuthContext>({} as AuthContext)

export const AuthProvider: React.FC = ({ children }: any) => {
  const [authData, setAuthData] = useState<AuthData>()
  const [isLoading, setisLoading] = useState(true)
  const [device, setDevice] = useState<Device>({} as Device)

  useEffect(() => {
    loadStorageData()
    getPushToken()
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

  async function signIn(login: string, password: string, device: Device) {
    try {
      const authData = await api.signIn(login, password)

      setPushToken(device, authData)
      setAuthData(authData)
      AsyncStorage.setItem('@AuthData', JSON.stringify(authData))
    } catch (error: any) {
      Alert.alert('Atenção', error.response.data.message)
    }
  }

  async function signOut(device: Device, authData: AuthData) {
    try {
      const findDevices = await api.findDevicesByPushToken(
        device.push_token,
        authData.token,
      )

      const checkRelations = findDevices.find(
        (user_device) => user_device.user.id === authData.user.id,
      )
      if (checkRelations) await api.deleteDevice(checkRelations, authData.token)
    } catch (error: any) {
      console.log(error.response.data.message)
    }

    setAuthData(undefined)
    AsyncStorage.removeItem('@AuthData')
  }

  async function getPushToken() {
    setDevice({
      os: Platform.OS,
      model: ExpoDevice.modelName,
      name: ExpoDevice.deviceName,
      push_token: await push_token(),
    } as Device)
  }

  async function setPushToken(device: Device, authData: AuthData) {
    try {
      const findDevices = await api.findDevicesByPushToken(
        device.push_token,
        authData.token,
      )

      if (findDevices) {
        findDevices.map(async (user_device) => {
          if (user_device.user.id === authData.user.id) {
            if (user_device.deleted_at)
              await api.restoreDevice(user_device, authData.token)
          } else {
            if (!user_device.deleted_at)
              await api.deleteDevice(user_device, authData.token)
          }
        })

        const checkRelations = findDevices.find(
          (user_device) => user_device.user.id === authData.user.id,
        )

        if (!checkRelations)
          await api.createDevice(
            { ...device, user: authData.user },
            authData.token,
          )
      }
    } catch (error: any) {
      console.log(error.response.data.message)

      await api.createDevice({ ...device, user: authData.user }, authData.token)
    }
  }

  return (
    <AuthContext.Provider
      value={{ authData, signIn, signOut, isLoading, device }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContext {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }

  return context
}
