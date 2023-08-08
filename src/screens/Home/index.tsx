import { useCallback, useContext, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Alert, BackHandler, RefreshControl, View } from 'react-native'
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
import { AuthContext } from '../../hooks/auth'
import { api } from '../../services/api'
import { Gate } from '../../models/GateModel'
import { GateCardShimmer } from '../../components/GateCardShimmer/GateCardShimmer'
import { ThemeContext, ThemeType } from '../../hooks/theme'

export function Home() {
  const { login } = useContext(AuthContext)
  const navigation = useNavigation()

  const { data, isError, isLoading } = useQuery(['gate-list'], () =>
    api.getGates(login.user, login.token),
  )

  const queryClient = useQueryClient()
  const [refreshing, setRefreshing] = useState(false)

  const { toggleTheme, theme } = useContext(ThemeContext)
  const isDarkMode = theme === ThemeType.dark
  const { colors } = useTheme()

  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    await queryClient.invalidateQueries(['gate-list'])
    setRefreshing(false)
  }, [queryClient])

  useFocusEffect(
    useCallback(() => {
      queryClient.removeQueries(['list-solicitation'])
      queryClient.invalidateQueries(['gate-list'])
    }, [queryClient]),
  )

  const backAction = () => {
    if (navigation.isFocused()) {
      Alert.alert('Attention', 'Do you really want to exit the App?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'YES', onPress: () => BackHandler.exitApp() },
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
            key={gate.id}
            onPress={() =>
              navigation.navigate('Solicitations', { gateData: gate })
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
                    backgroundColor: gate.open ? colors.open : colors.close,
                  }}
                />
                <State>{gate.open ? 'OPENED' : 'CLOSED'}</State>
                <DateCard>
                  {gate.solicitations
                    ? moment(gate.solicitations.updated_at).fromNow()
                    : ''}
                </DateCard>
              </ContainerState>
            </CardBody>
          </Card>
        ))}
      </Body>
    </Container>
  )
}
