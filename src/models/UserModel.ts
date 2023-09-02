import { Device } from './DeviceModel'
import { Gate } from './GateModel'
import { Role } from './RoleModel'
import { Solicitation } from './SolicitationModel'

export interface User {
  id: string
  name: string
  email: string
  login: string
  password: string
  active: boolean
  image: string
  last_login: Date

  gates: Gate[]
  solicitations: Solicitation[]
  role: Role
  devices: Device[]

  created_at: Date
  updated_at: Date
}
