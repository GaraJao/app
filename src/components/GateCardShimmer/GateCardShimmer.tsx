import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import { useEffect } from 'react'

import {
  State,
  StateCircle,
  ContainerState,
  City,
  GateText,
  CardBody,
  Card,
  ContainerImage,
  CardImage,
} from './styles'

export function GateCardShimmer() {
  const sv = useSharedValue(1)

  useEffect(() => {
    sv.value = withRepeat(withTiming(0.5, { duration: 600 }), -1, true)
  }, [])

  const animatedStyles = useAnimatedStyle(() => {
    return { opacity: sv.value }
  })

  return (
    <Card>
      <Animated.View style={[{ flexDirection: 'row' }, animatedStyles]}>
        <ContainerImage>
          <CardImage></CardImage>
        </ContainerImage>
        <CardBody>
          <GateText></GateText>
          <City></City>
          <ContainerState>
            <StateCircle />
            <State></State>
          </ContainerState>
        </CardBody>
      </Animated.View>
    </Card>
  )
}
