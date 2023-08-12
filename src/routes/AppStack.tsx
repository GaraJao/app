import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from '../screens/Home'
import { Solicitations } from '../screens/Solicitations'

const { Screen, Navigator } = createNativeStackNavigator()

export function AppStack() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Screen name="Home" component={Home} />
      <Screen name="Solicitations" component={Solicitations} />
    </Navigator>
  )
}
