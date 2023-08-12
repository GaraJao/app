import styled from 'styled-components/native'

export const Card = styled.View`
  width: 100%;
  height: 80px;
  /* border-radius: 20px;
    overflow: hidden; */
  flex-direction: row;
  margin: 6px 0;
  /* margin-bottom: 12px; */
`

export const ContainerImage = styled.View`
  width: 70px;
  height: 100%;
  justify-content: center;
  align-items: center;
`

export const CardImage = styled.Image`
  /* width: 70px;
    height: 70px; */
  border-radius: 40px;
  background-color: #d3cfcc;
`

export const CardBody = styled.View`
  flex-grow: 1;
  height: 100%;
  justify-content: center;
  box-sizing: border-box;
`

export const CardDelete = styled.View`
  height: 100%;
  justify-content: center;
  align-items: flex-start;
  box-sizing: border-box;
  width: 55px;
`

export const GateText = styled.View`
  width: 45%;
  height: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.shimmer};
`

export const City = styled.Text`
  width: 80%;
  height: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.shimmer};
  /* margin-bottom: 6px; */
`

export const ContainerState = styled.View`
  flex-direction: row;
  align-items: center;
`

export const State = styled.Text`
  margin-right: 7px;
`

export const DateCard = styled.Text`
  margin-top: 6px;
  margin-bottom: 10px;
  width: 50%;
  height: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.shimmer};
`

export const AddressContainer = styled.View`
  margin-left: 3px;
`

export const Address = styled.Text`
  font: 500 15px Roboto;
`

export const GateContainer = styled.View`
  flex-direction: row;
`
