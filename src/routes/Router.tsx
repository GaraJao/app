import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar, StatusBarStyle } from 'expo-status-bar'
import { useTheme } from 'styled-components'

import { AppStack } from './AppStack'
import { AuthStack } from './AuthStack'
import { useAuth } from '../hooks/auth'

export function Router() {
  const { authData, isLoading } = useAuth()
  const { colors } = useTheme()

  if (isLoading) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: colors.primary,
        }}
      >
        <ActivityIndicator size="large" color={colors.fontColorButton} />
      </View>
    )
  }
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={colors.background}
        style={colors.statusBar as StatusBarStyle}
      />
      {authData ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}
