import { Solicitation } from './SolicitationModel'

export interface Message {
  id: number
  description: string

  solicitations: Solicitation[]

  created_at: Date
  updated_at: Date
}
