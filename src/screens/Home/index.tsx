import React, { useContext, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { RefreshControl, View } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native'

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
import { AuthContext } from '../../hooks/auth'
import { api } from '../../services/api'
import { Gate } from '../../models/GateModel'
import { GateCardShimmer } from '../../components/GateCardShimmer/GateCardShimmer'
import { ThemeContext, ThemeType } from '../../hooks/theme'

export function Home() {
  const { login } = useContext(AuthContext)
  const navigation = useNavigation()

  const { data, isError, isLoading, refetch } = useQuery(['gate-list'], () =>
    api.getGates(login.user, login.token),
  )

  const queryClient = useQueryClient()
  const [refreshing, setRefreshing] = useState(false)

  const { toggleTheme, theme } = useContext(ThemeContext)
  const isDarkMode = theme === ThemeType.dark
  const { colors } = useTheme()

  const handleRefresh = React.useCallback(async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }, [refetch])

  useFocusEffect(
    React.useCallback(() => {
      queryClient.removeQueries(['list-solicitation'])
      refetch()
    }, [queryClient, refetch]),
  )

  return (
    <Container>
      <Header>
        <Logo source={require('../../assets/logo.png')} />
        <View>
          <Title>{login.user.name.split(' ')[0]}</Title>
          <Subtitle
            onPress={() =>
              navigation.reset({ index: 1, routes: [{ name: 'Login' }] })
            }
          >
            sign out
          </Subtitle>
        </View>
        <ColorThemeContainer>
          <MaterialIcons
            onPress={() => toggleTheme()}
            // nightlight-round
            name={isDarkMode ? 'nightlight-round' : 'wb-sunny'}
            size={37}
            color={colors.primary}
          />
        </ColorThemeContainer>
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
        {isLoading &&
          [...Array(6)].map((e, i) => (
            <GateCardShimmer key={i}></GateCardShimmer>
          ))}
        {isError && <Subtitle>Erro</Subtitle>}
        {data?.map((gate: Gate) => (
          <Card
            onPress={() =>
              navigation.navigate('Solicitations', { gateData: gate })
            }
            key={gate.id}
          >
            <ContainerImage>
              <CardImage
                source={{
                  uri: 'https://s42814.pcdn.co/wp-content/uploads/2020/09/iStock_185930591-scaled.jpg.optimal.jpg',
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
                    backgroundColor: gate.open ? colors.open : colors.close,
                  }}
                />
                <State>{gate.open ? 'OPENED' : 'CLOSED'}</State>
                <DateCard>
                  {new Date(gate.updated_at).toLocaleString('pt-br')}
                </DateCard>
              </ContainerState>
            </CardBody>
          </Card>
        ))}
      </Body>
    </Container>
  )
}
