import { Solicitation } from './SolicitationModel'
import { User } from './UserModel'

export interface Gate {
  id: string
  name: string
  open: boolean
  provisional_open: boolean
  notified: boolean
  cep: string
  address: string
  complement: string
  number: number
  city: string
  uf: string
  image: string

  solicitations: Solicitation[]
  users: User[]

  consulted_at: Date
  created_at: Date
  updated_at: Date
}
