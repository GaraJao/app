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
  return (
    <Card>
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
    </Card>
  )
}
