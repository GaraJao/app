import styled from 'styled-components/native'

// import theme from '../../styles/themes/light'

export const Container = styled.View`
  padding: 0 23px;
  padding-top: 60px;
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`

export const Logo = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 20px;
`

export const Image = styled.Image`
  width: 430px;
  height: 430px;
  bottom: 35px;
  left: -130px;
  z-index: -10;
`

export const Title = styled.Text`
  margin-top: 20px;
  font-size: 45px;
  font-family: Roboto;
  font-weight: 700;
  color: ${(props) => props.theme.colors.secondary900};
`

export const Subtitle = styled.Text`
  font-size: 18px;
  font-family: Roboto;
  font-weight: 200;
  color: ${(props) => props.theme.colors.secondary900};
`

export const Input = styled.TextInput.attrs((theme) => ({
  placeholderTextColor: theme.theme.colors.shimmer300,
}))`
  margin-top: 15px;
  padding: 5px 10px;
  width: 100%;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.text};
  border: 1px solid ${(props) => props.theme.colors.shimmer};
  background-color: ${(props) => props.theme.colors.background};
`

export const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.secondary700};
  flex-direction: row;
  align-self: flex-end;
  border-radius: 8px;
  width: 130px;
  height: 38px;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
`

export const ButtonText = styled.Text`
  font-size: 14px;
  font-family: Roboto;
  font-weight: 700;
  color: ${(props) => props.theme.colors.fontColorButton};
`

export const Loading = styled.ActivityIndicator.attrs((theme) => ({
  color: theme.theme.colors.fontColorButton,
}))``
