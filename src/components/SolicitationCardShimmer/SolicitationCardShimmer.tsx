import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import { useEffect } from 'react'

import {
  DateCard,
  City,
  GateText,
  CardBody,
  Card,
  ContainerImage,
} from './styles'

export function SolicitationCardShimmer() {
  const { colors } = useTheme()

  const sv = useSharedValue(1)

  useEffect(() => {
    sv.value = withRepeat(withTiming(0.5, { duration: 600 }), -1, true)
  }, [])

  const animatedStyles = useAnimatedStyle(() => {
    return { opacity: sv.value }
  })

  return (
    <Card>
      <ContainerImage>
        <Animated.View style={[animatedStyles]}>
          <MaterialIcons
            name={'hourglass-full'}
            size={32}
            color={colors.shimmer}
          />
        </Animated.View>
      </ContainerImage>
      <CardBody>
        <Animated.View style={[animatedStyles]}>
          <GateText></GateText>
          <DateCard></DateCard>
          <City></City>
        </Animated.View>
      </CardBody>
    </Card>
  )
}
