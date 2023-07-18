import React, { useState, useContext } from 'react';

import { Logo, ButtonText, Image, Title, Subtitle, Container, Input, Button } from './styles';
import { AuthContext } from '../../contexts/auth';

export function Login() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const { signIn } = useContext(AuthContext);

    const onChangeLoginHandler = (login: string) => {
        setLogin(login);
    };

    const onChangePasswordHandler = (password: string) => {
        setPassword(password);
    };

    function handleLogin() {
        signIn(login, password);
    }

    return (
        <Container>
            <Logo source={require('../../assets/logo.png')} />
            <Title>Welcome,</Title>
            <Subtitle>log in with your credentials to access the security area</Subtitle>
            <Input onChangeText={onChangeLoginHandler} placeholder="Enter your username" />
            <Input onChangeText={onChangePasswordHandler} placeholder="Enter your password" secureTextEntry={true} />
            <Button onPress={() => handleLogin()}>
                <ButtonText>LOGIN</ButtonText>
            </Button>
            <Image source={require('../../assets/garajao.png')} />
        </Container>
    );
}