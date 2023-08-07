import axios from 'axios'

import { Gate } from '../models/GateModel'
import { User } from '../models/UserModel'
import { Solicitation } from '../models/SolicitationModel'

const axiosInstance = axios.create({
  baseURL: 'https://garajao-dev.vercel.app/api',
})

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
  axiosInstance,
  getGates,
  getSolicitations,
  createSolicitation,
  deleteSolicitation,
}
