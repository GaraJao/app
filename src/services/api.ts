import axios from 'axios'
import { BASE_URL } from '@env'

import { Gate } from '../models/GateModel'
import { User } from '../models/UserModel'
import { Solicitation } from '../models/SolicitationModel'
import { Device } from '../models/DeviceModel'
import { AuthData } from '../hooks/auth'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
})

async function signIn(login: string, password: string): Promise<AuthData> {
  const response = await axiosInstance.post<AuthData>(`/users/signIn`, {
    login,
    password,
  })

  return response.data
}

async function signOut(): Promise<AuthData> {
  const response = await axiosInstance.post<AuthData>(`/users/signOut`, {})

  return response.data
}

async function createDevice(device: Device, token: string): Promise<Device> {
  const response = await axiosInstance.post<Device>(
    `/devices`,
    {
      os: device.os,
      model: device.model,
      name: device.name,
      push_token: device.push_token,
      user: device.user,
    },
    { headers: { Authorization: `Bearer ${token}` } },
  )

  return response.data
}

async function updateDevice(device: Device, token: string): Promise<Device> {
  const response = await axiosInstance.patch<Device>(
    `/devices/${device.id}`,
    {
      os: device.os,
      model: device.model,
      name: device.name,
      push_token: device.push_token,
      user: device.user,
    },
    { headers: { Authorization: `Bearer ${token}` } },
  )

  return response.data
}

async function deleteDevice(device: Device, token: string): Promise<Device> {
  const response = await axiosInstance.delete<Device>(`/devices/${device.id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return response.data
}

async function restoreDevice(device: Device, token: string): Promise<Device> {
  const response = await axiosInstance.patch<Device>(
    `/devices/${device.id}/restore`,
    {},
    { headers: { Authorization: `Bearer ${token}` } },
  )

  return response.data
}

async function findDevicesByPushToken(
  push_token: string,
  token: string,
): Promise<Device[]> {
  const response = await axiosInstance.get<Device[]>(
    `/devices/pushToken/${push_token}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )

  return response.data
}

async function getGates(user: User, token: string): Promise<Gate[]> {
  const response = await axiosInstance.get<Gate[]>(`/gates/${user.id}/user`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return response.data
}

async function getSolicitations(
  gate: Gate,
  token: string,
): Promise<Solicitation[]> {
  const response = await axiosInstance.get<Solicitation[]>(
    `/gates/${gate.id}/solicitations`,
    {
      headers: { Authorization: `Bearer ${token}` },
      params: { limit: 10, offset: 0 },
    },
  )

  return response.data
}

async function createSolicitation(
  gate: Gate,
  user: User,
  token: string,
): Promise<Solicitation> {
  const response = await axiosInstance.post<Solicitation>(
    `/solicitations/${gate.id}/gate`,
    { message: 3, user_id: user.id },
    { headers: { Authorization: `Bearer ${token}` } },
  )

  return response.data
}

async function deleteSolicitation(
  solicitation: Solicitation | null,
  token: string,
): Promise<Solicitation> {
  const response = await axiosInstance.delete<Solicitation>(
    `/solicitations/${solicitation?.id}`,
    { headers: { Authorization: `Bearer ${token}` } },
  )

  return response.data
}

export const api = {
  signIn,
  signOut,

  createDevice,
  updateDevice,
  deleteDevice,
  restoreDevice,
  findDevicesByPushToken,

  getGates,

  getSolicitations,
  createSolicitation,
  deleteSolicitation,
}
