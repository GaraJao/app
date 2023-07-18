import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Alert, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from "axios";

import { CardDelete, GateContainer, AddressContainer, Address, DateCard, City, Gate, CardBody, Body, Card, ContainerImage, Header, Logo, Title, Subtitle, Container } from './styles'

import { AuthContext } from '../../contexts/auth';

export function Solicitations({ route }: { route: any }) {
    const { gate } = route.params;

    const { user, token } = useContext(AuthContext);

    async function switchGate() {
        await axios.post(
            "https://garajao-dev.vercel.app/api/solicitations/" + gate.id + "/gate",
            { message: 3, user_id: user.user.id },
            { headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token.token } },
        ).catch((error) => {
            if (error.response)
                Alert.alert("Attention", error.response.data.message);
        });
    }

    async function deleteSolicitation(solicitation: any) {
        await axios.delete(
            "https://garajao-dev.vercel.app/api/solicitations/" + solicitation,
            { headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token.token } },
        ).catch((error) => {
            if (error.response)
                Alert.alert("Attention", error.response.data.message);
        });
    }

    let { data } = useQuery("solicitations", async () => {
        const res = await fetch("https://garajao-dev.vercel.app/api/gates/" + gate.id + "/solicitations?limit=10&offset=0", {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token.token },
        });
        return res.json();
    }, { refetchInterval: 2000 });

    if (gate.open) {
        gate.fera = "CLOSE";
        gate.color = "#C84D4D";
    } else {
        gate.fera = "OPEN";
        gate.color = "#5CBE53";
    }

    if (data)
        data.map((solicitation: any) => {
            // solicitation.fera = "teste";
            if (solicitation.gate.open) {
                gate.fera = "CLOSE";
                gate.color = "#C84D4D";
            } else {
                gate.fera = "OPEN";
                gate.color = "#5CBE53";
            }
            solicitation.date = new Date(solicitation.updated_at).toLocaleString("pt-br");
            solicitation.opacity = solicitation.valid ? 1 : 0.4;

            // solicitation.message = solicitation.valid ? solicitation.message : "Carregando...";

            if (solicitation.user)
                solicitation.placeholder = "User: " + solicitation.user.name;
            else
                solicitation.placeholder = "Code: " + solicitation.code;

            solicitation.icon = !solicitation.code ? "smartphone" : "settings-remote";

            if (solicitation.gate.id == "f96652a1-b288-47f2-ae7d-f67b96995f86")
                solicitation.image = require("../../assets/gates/f96652a1-b288-47f2-ae7d-f67b96995f86.jpg");
            else if (solicitation.gate.id == "ace9f0ff-1b73-41a5-952e-3b5a3154b611")
                solicitation.image = require("../../assets/gates/ace9f0ff-1b73-41a5-952e-3b5a3154b611.jpg");
            else
                solicitation.image = require("../../assets/logo.png");
        });
    else {
        data = [];
    }

    return (
        <Container>
            <Header>
                <GateContainer>
                    <Logo source={gate.image} />
                    <View style={{ "width": "80%" }}>
                        <Title>{gate.name}</Title>
                        <TouchableOpacity onPress={() => switchGate()}>
                            <Subtitle style={{ "backgroundColor": gate.color }}>{gate.fera}</Subtitle>
                        </TouchableOpacity>
                    </View>
                </GateContainer>
                <AddressContainer>
                    <Address>{gate.address} • {gate.number} • {gate.complement}</Address>
                    <Address>{gate.city} • {gate.uf}</Address>
                </AddressContainer>
            </Header>
            <Body>
                {data.map((solicitation: any) => (
                    <Card key={solicitation.id}>
                        <ContainerImage style={{ "opacity": solicitation.opacity }}>
                            <MaterialIcons name={solicitation.icon} size={32} color="#D58453" />
                        </ContainerImage>
                        <CardBody style={{ "opacity": solicitation.opacity }}>
                            <Gate numberOfLines={1}>{solicitation.message.description}</Gate>
                            <DateCard>{solicitation.date}</DateCard>
                            <City numberOfLines={1}>{solicitation.placeholder}</City>
                        </CardBody>
                        {(() => {
                            if (!solicitation.valid) {
                                return (
                                    <CardDelete>
                                        <MaterialIcons name="clear" size={32} color="#db9b72" onPress={()=>deleteSolicitation(solicitation.id)} />
                                    </CardDelete>
                                )
                            }

                            return;
                        })()}
                    </Card>
                ))}
            </Body>
        </Container>
    );
}