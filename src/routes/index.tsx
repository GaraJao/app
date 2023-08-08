import { NavigationContainer } from '@react-navigation/native'
import { StatusBar, StatusBarStyle } from 'expo-status-bar'
import { useTheme } from 'styled-components'

import { StackRoutes } from './stack.routes'
import AuthProvider from '../hooks/auth'

export function Routes() {
  const { colors } = useTheme()

  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={colors.background}
        style={colors.statusBar as StatusBarStyle}
      />
      <AuthProvider>
        <StackRoutes />
      </AuthProvider>
    </NavigationContainer>
  )
}
