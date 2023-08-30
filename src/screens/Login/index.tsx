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

  const { signIn, device } = useAuth()

  const onChangeLoginHandler = (login: string) => {
    setLogin(login)
  }

  const onChangePasswordHandler = (password: string) => {
    setPassword(password)
  }

  async function handleSignIn() {
    setLoading(true)
    await signIn(login, password, device)
    setLoading(false)
  }

  return (
    <Container>
      <Logo source={require('../../assets/logo.png')} />
      <Title>Bem-vindo,</Title>
      <Subtitle>
        faça login com suas credenciais para acessar a área de segurança
      </Subtitle>
      <Input
        onChangeText={onChangeLoginHandler}
        placeholder="Digite o seu login"
      />
      <Input
        onChangeText={onChangePasswordHandler}
        placeholder="Digite a sua senha"
        secureTextEntry={true}
      />
      <Button onPress={() => handleSignIn()}>
        {loading ? <Loading /> : <ButtonText>ENTRAR</ButtonText>}
      </Button>
      <Image source={require('../../assets/garajao.png')} alt="logo" />
    </Container>
  )
}
