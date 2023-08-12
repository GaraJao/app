import { Gate } from './GateModel'
import { Message } from './MessageModel'
import { User } from './UserModel'

export interface Solicitation {
  id: string
  status: boolean
  code: string
  valid: boolean

  gate: Gate
  user: User
  message: Message

  created_at: Date
  updated_at: Date
}
