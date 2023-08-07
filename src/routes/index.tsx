import { NavigationContainer } from '@react-navigation/native'

import { StackRoutes } from './stack.routes'
import AuthProvider from '../hooks/auth'

export function Routes() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackRoutes />
      </AuthProvider>
    </NavigationContainer>
  )
}
