import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Login } from '../screens/Login'
import { Home } from '../screens/Home'
import { Solicitations } from '../screens/Solicitations'

const { Screen, Navigator } = createNativeStackNavigator()

export function StackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Screen name="Login" component={Login} />
      <Screen name="Home" component={Home} />
      <Screen name="Solicitations" component={Solicitations} />
    </Navigator>
  )
}
