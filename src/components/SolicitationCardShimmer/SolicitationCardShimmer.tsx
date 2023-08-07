import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native'

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

  return (
    <Card>
      <ContainerImage>
        <MaterialIcons
          name={'hourglass-full'}
          size={32}
          color={colors.shimmer}
        />
      </ContainerImage>
      <CardBody>
        <GateText></GateText>
        <DateCard></DateCard>
        <City></City>
      </CardBody>
    </Card>
  )
}
