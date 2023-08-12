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

  gates: Gate
  solicitations: Solicitation
  role: Role

  created_at: Date
  updated_at: Date
}
