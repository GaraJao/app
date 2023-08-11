import { useCallback, useContext, useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Alert,
  View,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  BackHandler,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import uuid from 'react-native-uuid'
import { useTheme } from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated'

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
  Container,
  GateState,
  GateUsers,
  CardImage,
} from './styles'
import { AuthContext } from '../../hooks/auth'
import { api } from '../../services/api'
import { Solicitation } from '../../models/SolicitationModel'
import { Message } from '../../models/MessageModel'
import { Gate } from '../../models/GateModel'
import { SolicitationCardShimmer } from '../../components/SolicitationCardShimmer/SolicitationCardShimmer'

export function Solicitations({ route }: any) {
  const { login } = useContext(AuthContext)
  const { gateData, date } = route.params
  const [menu, setMenu] = useState(false)
  const navigation = useNavigation()

  const { colors } = useTheme()

  const queryClient = useQueryClient()
  const gateQuery = queryClient.getQueryData(['list-gate']) as Gate[]

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
  } = useQuery(['list-solicitation'], () =>
    api.getSolicitations(gate, login.token),
  )

  const { isLoading: createSolicitationIsLoading, mutate: createSolicitation } =
    useMutation(() => api.createSolicitation(gate, login.user, login.token), {
      onSuccess: () => {
        queryClient.invalidateQueries(['list-gate'])
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

  BackHandler.addEventListener('hardwareBackPress', () => {
    setRefreshing(true)
    navigation.goBack()

    return true
  })

  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    await queryClient.invalidateQueries(['list-gate'])
    await queryClient.invalidateQueries(['list-solicitation'])
    setRefreshing(false)
  }, [queryClient])

  return (
    <Container>
      <Header>
        <GateContainer>
          <Logo
            source={{
              uri: gate.image,
            }}
          />
          <View style={{ width: '80%' }}>
            <Title>{gate.name}</Title>
            <View style={{ flexDirection: 'row', marginTop: 3 }}>
              <TouchableOpacity onPress={() => setMenu(!menu)}>
                <GateUsers
                  style={{
                    marginRight: 5,
                    backgroundColor: colors.primary,
                    width: 'auto',
                    padding: 20,
                  }}
                >
                  <Text>{menu ? 'HISTORY' : 'USERS'}</Text>
                </GateUsers>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => createSolicitation()}>
                <GateState
                  style={{
                    backgroundColor:
                      moment(date).diff(gate.consulted_at, 'seconds') < 30
                        ? gate.open
                          ? colors.close
                          : colors.open
                        : colors.offline200,
                  }}
                >
                  {createSolicitationIsLoading ? (
                    <ActivityIndicator color={colors.fontColorButton} />
                  ) : moment(date).diff(gate.consulted_at, 'seconds') < 30 ? (
                    gate.open ? (
                      <Text>CLOSE</Text>
                    ) : (
                      <Text>OPEN</Text>
                    )
                  ) : (
                    <Text>OFF</Text>
                  )}
                </GateState>
              </TouchableOpacity>
            </View>
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
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
          />
        }
      >
        {menu &&
          gate.users?.map((user: User) => (
            <Card key={user.id} style={{ height: 65 }}>
              <ContainerImage>
                <CardImage
                  source={{
                    uri: user.image,
                  }}
                ></CardImage>
              </ContainerImage>
              <CardBody>
                <GateText numberOfLines={1}>
                  {user.name} ({user.role.name})
                </GateText>
                <DateCard style={{ marginTop: 4 }}>
                  Created at:{' '}
                  {new Date(user.created_at).toLocaleString('pt-br')}
                </DateCard>
              </CardBody>
            </Card>
          ))}
        {!menu &&
          isLoading &&
          [...Array(6)].map((e, i) => (
            <SolicitationCardShimmer key={i}></SolicitationCardShimmer>
          ))}
        {!menu && isError && <Title>Erro</Title>}
        {!menu &&
          solicitationData?.map((solicitation: Solicitation) => (
            // <Animated.View
            //   entering={FadeIn}
            //   exiting={FadeOut}
            //   layout={Layout.delay(100)}
            //   key={solicitation.id}
            // >
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
                <DateCard>{moment(solicitation.updated_at).fromNow()}</DateCard>
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
            // </Animated.View>
          ))}
      </Body>
    </Container>
  )
}
