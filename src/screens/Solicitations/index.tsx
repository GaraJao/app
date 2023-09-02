import { useCallback, useEffect, useState } from 'react'
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
import { useAuth } from '../../hooks/auth'
import { api } from '../../services/api'
import { Solicitation } from '../../models/SolicitationModel'
import { Message } from '../../models/MessageModel'
import { Gate } from '../../models/GateModel'
import { SolicitationCardShimmer } from '../../components/SolicitationCardShimmer/SolicitationCardShimmer'
import { User } from '../../models/UserModel'
import { Device } from '../../models/DeviceModel'

export function Solicitations({ route }: any) {
  const { authData } = useAuth()
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
    api.getSolicitations(gate, authData.token),
  )

  const { isLoading: createSolicitationIsLoading, mutate: createSolicitation } =
    useMutation(
      () => api.createSolicitation(gate, authData.user, authData.token),
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['list-gate'])
          queryClient.invalidateQueries(['list-solicitation'])

          const previousSolicitations = queryClient.getQueryData([
            'list-solicitation',
          ]) as Solicitation[]

          const newSolicitation = {
            id: uuid.v4(),
            message: { description: 'Carregando...' } as Message,
            user: { name: authData.user.name },
            updated_at: new Date(),
            valid: false,
          } as Solicitation

          previousSolicitations.unshift(newSolicitation)
        },
        onError: (error: any) =>
          Alert.alert('Atenção', error.response.data.message),
      },
    )

  const { isLoading: deleteSolicitationIsLoading, mutate: deleteSolicitation } =
    useMutation(
      () => api.deleteSolicitation(selectedSolicitation, authData.token),
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
          Alert.alert('Atenção', error.response.data.message),
      },
    )

  useEffect(() => {
    if (selectedSolicitation) deleteSolicitation()
  }, [deleteSolicitation, selectedSolicitation])

  BackHandler.addEventListener('hardwareBackPress', () => {
    if (menu) {
      setMenu(!menu)
      return true
    }
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
                  <Text>{menu ? 'HISTÓRICO' : 'USUÁRIOS'}</Text>
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
                      <Text>FECHAR</Text>
                    ) : (
                      <Text>ABRIR</Text>
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
                  Último login:{' '}
                  {user.last_login
                    ? new Date(user.last_login).toLocaleString('pt-br')
                    : 'Nunca'}
                </DateCard>
                {user.devices.map((device: Device) => (
                  <DateCard
                    style={{ opacity: device.deleted_at ? 0.4 : 1 }}
                    key={device.id}
                  >{`${device.model} - ${device.name}`}</DateCard>
                ))}
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
                    ? `Usuário: ${solicitation.user.name}`
                    : `Código: ${solicitation.code}`}
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
