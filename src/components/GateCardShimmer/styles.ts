import styled from 'styled-components/native'

export const Card = styled.TouchableOpacity`
  width: 100%;
  height: 105px;
  background-color: ${(props) => props.theme.colors.background300};
  border-radius: 20px;
  overflow: hidden;
  flex-direction: row;
  margin-bottom: 12px;
`

export const ContainerImage = styled.View`
  width: 90px;
  height: 100%;
  justify-content: center;
  align-items: center;
`

export const CardImage = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 40px;
  background-color: ${(props) => props.theme.colors.shimmer};
`

export const CardBody = styled.View`
  flex-grow: 1;
  height: 100%;
  justify-content: center;
  box-sizing: border-box;
`

export const GateText = styled.View`
  font: 700 17px Roboto;
  width: 65%;
  height: 12px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.shimmer};
`

export const City = styled.View`
  margin: 11px 0;
  width: 45%;
  height: 12px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.shimmer};
`

export const ContainerState = styled.View`
  flex-direction: row;
  align-items: center;
`

export const StateCircle = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  margin-right: 5px;
  background-color: ${(props) => props.theme.colors.shimmer};
`

export const State = styled.View`
  margin-right: 7px;
  width: 70%;
  height: 12px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.shimmer};
`
