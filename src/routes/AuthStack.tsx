import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Login } from '../screens/Login'

const { Screen, Navigator } = createNativeStackNavigator()

export function AuthStack() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Screen name="Login" component={Login} />
    </Navigator>
  )
}
