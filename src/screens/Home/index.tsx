import { useCallback, useContext, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  RefreshControl,
  View,
} from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native'
import moment from 'moment'

import {
  DateCard,
  State,
  StateCircle,
  ContainerState,
  City,
  GateText,
  CardBody,
  Body,
  Card,
  ContainerImage,
  CardImage,
  Header,
  Logo,
  Title,
  Subtitle,
  Container,
  ColorThemeContainer,
} from './styles'
import { useAuth } from '../../hooks/auth'
import { api } from '../../services/api'
import { Gate } from '../../models/GateModel'
import { GateCardShimmer } from '../../components/GateCardShimmer/GateCardShimmer'
import { ThemeContext, ThemeType } from '../../hooks/theme'
import 'moment/locale/pt-br'

export function Home() {
  const { authData, signOut, device } = useAuth()
  const navigation = useNavigation()

  const [date, setDate] = useState(0)

  const { data, isError, isLoading } = useQuery(
    ['list-gate'],
    () => api.getGates(authData.user, authData.token),
    {
      onSuccess: () => {
        setDate(Date.now())
      },
    },
  )

  const { isLoading: createSolicitationIsLoading, mutate: createSolicitation } =
    useMutation(
      (gate: Gate) =>
        api.createSolicitation(gate, authData.user, authData.token),
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['list-gate'])
          queryClient.invalidateQueries(['list-solicitation'])
        },
        onError: (error: any) =>
          Alert.alert('Atenção', error.response.data.message),
      },
    )

  const queryClient = useQueryClient()
  const [refreshing, setRefreshing] = useState(false)

  const { toggleTheme, theme } = useContext(ThemeContext)
  const isDarkMode = theme === ThemeType.dark
  const { colors } = useTheme()

  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    await queryClient.invalidateQueries(['list-gate'])
    setRefreshing(false)
  }, [queryClient])

  useFocusEffect(
    useCallback(() => {
      queryClient.removeQueries(['list-solicitation'])
      queryClient.invalidateQueries(['list-gate'])
    }, [queryClient]),
  )

  const backAction = () => {
    if (navigation.isFocused()) {
      Alert.alert('Atenção', 'Você realmente deseja sair do aplicativo?', [
        {
          text: 'Cancelar',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'Sim', onPress: () => BackHandler.exitApp() },
      ])
      return true
    }
  }

  BackHandler.addEventListener('hardwareBackPress', backAction)

  return (
    <Container>
      <Header>
        <Logo source={require('../../assets/logo.png')} />
        <View>
          <Title>{authData.user.name.split(' ')[0]}</Title>
          <Subtitle
            onPress={() => {
              signOut(device, authData)
              queryClient.removeQueries(['list-gate'])
            }}
          >
            sair
          </Subtitle>
        </View>
        <ColorThemeContainer>
          <MaterialIcons
            onPress={() => toggleTheme()}
            name={isDarkMode ? 'nightlight-round' : 'wb-sunny'}
            size={37}
            color={colors.primary}
          />
        </ColorThemeContainer>
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
        {isLoading &&
          [...Array(6)].map((e, i) => (
            <GateCardShimmer key={i}></GateCardShimmer>
          ))}
        {isError && <Subtitle>Erro</Subtitle>}
        {data?.map((gate: Gate) => (
          <Card
            key={gate.id}
            onPress={() =>
              navigation.navigate('Solicitations', {
                gateData: gate,
                date,
              })
            }
          >
            <ContainerImage>
              <CardImage
                source={{
                  uri: gate.image,
                }}
              ></CardImage>
            </ContainerImage>
            <CardBody>
              <GateText numberOfLines={1}>{gate.name}</GateText>
              <City>
                {gate.city} • {gate.uf}
              </City>
              <ContainerState>
                <StateCircle
                  style={{
                    backgroundColor:
                      moment(date).diff(gate.consulted_at, 'seconds') < 30
                        ? gate.open
                          ? colors.open
                          : colors.close
                        : colors.offline,
                  }}
                />
                <State>
                  {moment(date).diff(gate.consulted_at, 'seconds') < 30
                    ? gate.open
                      ? 'ABERTO'
                      : 'FECHADO'
                    : 'OFFLINE'}
                </State>
                <DateCard>
                  {gate.solicitations &&
                    moment(gate.solicitations.updated_at).fromNow()}
                </DateCard>
              </ContainerState>
            </CardBody>
            {moment(date).diff(gate.consulted_at, 'seconds') < 30 ? (
              createSolicitationIsLoading ? (
                <ActivityIndicator
                  size="large"
                  color={colors.primary}
                  style={{ position: 'absolute', right: 15 }}
                />
              ) : (
                <MaterialIcons
                  style={{ position: 'absolute', right: 15 }}
                  onPress={() => createSolicitation(gate)}
                  name={'play-arrow'}
                  size={37}
                  color={colors.primary}
                />
              )
            ) : (
              ''
            )}
          </Card>
        ))}
      </Body>
    </Container>
  )
}
