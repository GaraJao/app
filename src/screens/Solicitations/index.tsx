import React, { useContext, useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Alert,
  View,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import uuid from 'react-native-uuid'
import { useTheme } from 'styled-components/native'

import {
  Text,
  CardDelete,
  GateContainer,
  AddressContainer,
  Address,
  DateCard,
  City,
  GateText,
  CardBody,
  Body,
  Card,
  ContainerImage,
  Header,
  Logo,
  Title,
  Subtitle,
  Container,
} from './styles'
import { AuthContext } from '../../hooks/auth'
import { api } from '../../services/api'
import { Solicitation } from '../../models/SolicitationModel'
import { Message } from '../../models/MessageModel'
import { Gate } from '../../models/GateModel'
import { SolicitationCardShimmer } from '../../components/SolicitationCardShimmer/SolicitationCardShimmer'

export function Solicitations({ route }: any) {
  const { login } = useContext(AuthContext)
  const { gateData } = route.params

  const { colors } = useTheme()

  const queryClient = useQueryClient()
  const gateQuery = queryClient.getQueryData(['gate-list']) as Gate[]

  const gate = gateQuery.filter((gate: Gate) => {
    if (gate.id === gateData.id) return gate
    else return null
  })[0] as Gate

  const [selectedSolicitation, setSelectedSolicitation] =
    useState<Solicitation | null>(null)

  const {
    data: solicitationData,
    isError,
    isLoading,
    refetch,
  } = useQuery(['list-solicitation'], () =>
    api.getSolicitations(gate, login.token),
  )

  const { isLoading: createSolicitationIsLoading, mutate: createSolicitation } =
    useMutation(() => api.createSolicitation(gate, login.user, login.token), {
      onSuccess: () => {
        queryClient.invalidateQueries(['gate-list'])
        queryClient.invalidateQueries(['list-solicitation'])

        const previousSolicitations = queryClient.getQueryData([
          'list-solicitation',
        ]) as Solicitation[]

        const newSolicitation = {
          id: uuid.v4(),
          message: { description: 'Loading...' } as Message,
          user: { name: login.user.name },
          updated_at: new Date(),
          valid: false,
        } as Solicitation

        previousSolicitations.unshift(newSolicitation)
      },
      onError: (error: any) =>
        Alert.alert('Attention', error.response.data.message),
    })

  const { isLoading: deleteSolicitationIsLoading, mutate: deleteSolicitation } =
    useMutation(
      () => api.deleteSolicitation(selectedSolicitation, login.token),
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['list-solicitation'])

          const previousSolicitations = queryClient.getQueryData([
            'list-solicitation',
          ]) as Solicitation[]

          previousSolicitations.filter((solicitation, index) => {
            if (solicitation.id === selectedSolicitation?.id)
              previousSolicitations.splice(index, 1)
            return 0
          })

          setSelectedSolicitation(null)
        },
        onError: (error: any) =>
          Alert.alert('Attention', error.response.data.message),
      },
    )

  useEffect(() => {
    if (selectedSolicitation) deleteSolicitation()
  }, [deleteSolicitation, selectedSolicitation])

  const [refreshing, setRefreshing] = React.useState(false)

  const handleRefresh = React.useCallback(async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }, [refetch])

  return (
    <Container>
      <Header>
        <GateContainer>
          <Logo
            source={{
              uri: 'https://s42814.pcdn.co/wp-content/uploads/2020/09/iStock_185930591-scaled.jpg.optimal.jpg',
            }}
          />
          <View style={{ width: '80%' }}>
            <Title>{gate.name}</Title>
            <TouchableOpacity onPress={() => createSolicitation()}>
              <Subtitle
                style={{
                  backgroundColor: gate.open ? colors.close : colors.open,
                }}
              >
                {createSolicitationIsLoading ? (
                  <ActivityIndicator color={colors.fontColorButton} />
                ) : gate.open ? (
                  <Text>CLOSE</Text>
                ) : (
                  <Text>OPEN</Text>
                )}
              </Subtitle>
            </TouchableOpacity>
          </View>
        </GateContainer>
        <AddressContainer>
          <Address>
            {gate.address} • {gate.number} • {gate.complement}
          </Address>
          <Address>
            {gate.city} • {gate.uf}
          </Address>
        </AddressContainer>
      </Header>
      <Body
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
          />
        }
      >
        <TouchableOpacity
          onPress={() => {
            queryClient.invalidateQueries(['gate-list'])
            refetch()
          }}
        >
          {/* <Title>reload</Title> */}
        </TouchableOpacity>
        {isLoading &&
          [...Array(6)].map((e, i) => (
            <SolicitationCardShimmer key={i}></SolicitationCardShimmer>
          ))}
        {isError && <Title>Erro</Title>}
        {solicitationData?.map((solicitation: Solicitation) => (
          <Card key={solicitation.id}>
            <ContainerImage style={{ opacity: solicitation.valid ? 1 : 0.4 }}>
              <MaterialIcons
                name={solicitation.code ? 'settings-remote' : 'smartphone'}
                size={32}
                color={colors.primary}
              />
            </ContainerImage>
            <CardBody style={{ opacity: solicitation.valid ? 1 : 0.4 }}>
              <GateText numberOfLines={1}>
                {solicitation.message.description}
              </GateText>
              <DateCard>
                {new Date(solicitation.updated_at).toLocaleString('pt-br')}
              </DateCard>
              <City numberOfLines={1}>
                {solicitation.user
                  ? `User: ${solicitation.user.name}`
                  : `Code: ${solicitation.code}`}
              </City>
            </CardBody>
            {!solicitation.valid ? (
              <CardDelete>
                {deleteSolicitationIsLoading ? (
                  <ActivityIndicator size="large" color={colors.primary} />
                ) : (
                  <MaterialIcons
                    name="clear"
                    size={32}
                    color={colors.primary}
                    onPress={() => {
                      setSelectedSolicitation(solicitation)
                    }}
                  />
                )}
              </CardDelete>
            ) : null}
          </Card>
        ))}
      </Body>
    </Container>
  )
}
