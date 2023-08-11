import styled from 'styled-components/native'

export const Container = styled.View`
  padding: 0 23px;
  padding-top: 70px;
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`

export const Header = styled.View`
  width: 100%;
  /* height: 40px; */
  flex-direction: row;
`

export const Logo = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 14px;
  margin-right: 10px;
`

export const Image = styled.Image`
  width: 430px;
  height: 430px;
  bottom: 35px;
  left: -130px;
  z-index: -10;
`

export const Title = styled.Text`
  font-size: 25px;
  font-family: Roboto;
  font-weight: 700;
  color: ${(props) => props.theme.colors.secondary900};
`

export const Subtitle = styled.Text`
  font-size: 18px;
  align-self: flex-start;
  font-family: Roboto;
  font-weight: 200;
  color: ${(props) => props.theme.colors.secondary900};
`

export const Body = styled.ScrollView`
  width: 100%;
  flex-grow: 1;
  margin-top: 18px;
`

export const Card = styled.TouchableOpacity`
  width: 100%;
  height: 105px;
  background-color: ${(props) => props.theme.colors.background300};
  border-radius: 20px;
  overflow: hidden;
  flex-direction: row;
  margin-bottom: 12px;
  align-items: center;
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

export const GateText = styled.Text`
  font: 700 17px Roboto;
  width: 80%;
  color: ${(props) => props.theme.colors.text};
`

export const City = styled.Text`
  margin-top: 3px;
  margin-bottom: 6px;
  color: ${(props) => props.theme.colors.text};
`

export const ContainerState = styled.View`
  flex-direction: row;
  align-items: center;
`

export const StateCircle = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 10px;
  margin-right: 5px;
`

export const State = styled.Text`
  margin-right: 7px;
  color: ${(props) => props.theme.colors.text};
`

export const DateCard = styled.Text`
  font: 500 12px Roboto;
  color: ${(props) => props.theme.colors.background400};
`

export const ColorThemeContainer = styled.View`
  flex-grow: 1;
  align-items: flex-end;
  justify-content: center;
  box-sizing: border-box;
  padding-right: 10px;
  min-width: 50px;
`
