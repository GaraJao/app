import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { View, BackHandler, Alert } from 'react-native';

import { DateCard, State, StateCircle, ContainerState, City, Gate, CardBody, Body, Card, ContainerImage, CardImage, Header, Logo, Image, Title, Subtitle, Container } from './styles'
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../contexts/auth';

export function Home() {
    const { user, token } = useContext(AuthContext);
    const navigation = useNavigation();

    const [test, setTest] = useState(0);

    const backAction = () => {
        if (navigation.isFocused()) {
            Alert.alert("Attention", "Do you really want to exit the App?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        }
    };

    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
    );

    let { data } = useQuery("gates", async () => {
        const res = await fetch("https://garajao-dev.vercel.app/api/gates/" + user.user.id + "/user", {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token.token },
        });
        return res.json();
    }, { refetchInterval: 1000 });

    if (data) {
        data.map((gate: any) => {
            if (gate.open) {
                gate.status = "OPENED"
                gate.color = "#5CBE53";
            } else {
                gate.status = "CLOSED"
                gate.color = "#C84D4D";
            }
            gate.date = new Date(gate.updated_at).toLocaleString("pt-br");

            if (gate.id == "f96652a1-b288-47f2-ae7d-f67b96995f86")
                gate.image = require("../../assets/gates/f96652a1-b288-47f2-ae7d-f67b96995f86.jpg");
            else if (gate.id == "ace9f0ff-1b73-41a5-952e-3b5a3154b611")
                gate.image = require("../../assets/gates/ace9f0ff-1b73-41a5-952e-3b5a3154b611.jpg");
            else
                gate.image = require("../../assets/logo.png");
        });
    } else
        data = [];

    return (
        <Container>
            <Header>
                <Logo source={require('../../assets/logo.png')} />
                <View>
                    <Title>{user.user.name.split(" ")[0]}</Title>
                    <Subtitle onPress={() => navigation.reset({ index: 1, routes: [{ name: 'Login' }] })}>sign out</Subtitle>
                </View>
            </Header>
            <Body>
                {data.map((gate: any) => (
                    <Card onPress={() => navigation.navigate('Solicitations', { gate: gate })} key={gate.id}>
                        <ContainerImage>
                            <CardImage source={gate.image}></CardImage>
                        </ContainerImage>
                        <CardBody>
                            <Gate numberOfLines={1}>{gate.name}</Gate>
                            <City>{gate.city} • {gate.uf}</City>
                            <ContainerState>
                                <StateCircle style={{ backgroundColor: gate.color }} />
                                <State>{gate.status}</State>
                                <DateCard>{gate.date}</DateCard>
                            </ContainerState>
                        </CardBody>
                    </Card>
                ))}
            </Body>
        </Container>
    );
}