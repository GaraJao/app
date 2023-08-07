import { Gate } from './GateModel'
import { Message } from './MessageModel'
import { User } from './UserModel'

export interface Solicitation {
  id: string
  status: boolean
  code: string
  valid: boolean
  created_at: Date
  updated_at: Date
  gate: Gate
  user: User
  message: Message
}
