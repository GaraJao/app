import { useState } from 'react'

import {
  Logo,
  ButtonText,
  Image,
  Title,
  Subtitle,
  Container,
  Input,
  Button,
  Loading,
} from './styles'
import { useAuth } from '../../hooks/auth'

export function Login() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const { signIn } = useAuth()

  const onChangeLoginHandler = (login: string) => {
    setLogin(login)
  }

  const onChangePasswordHandler = (password: string) => {
    setPassword(password)
  }

  async function handleLogin() {
    setLoading(true)
    await signIn(login, password)
    setLoading(false)
  }

  return (
    <Container>
      <Logo source={require('../../assets/logo.png')} />
      <Title>Welcome,</Title>
      <Subtitle>
        log in with your credentials to access the security area
      </Subtitle>
      <Input
        onChangeText={onChangeLoginHandler}
        placeholder="Enter your username"
      />
      <Input
        onChangeText={onChangePasswordHandler}
        placeholder="Enter your password"
        secureTextEntry={true}
      />
      <Button onPress={() => handleLogin()}>
        {loading ? <Loading /> : <ButtonText>LOGIN</ButtonText>}
      </Button>
      <Image source={require('../../assets/garajao.png')} alt="logo" />
    </Container>
  )
}
