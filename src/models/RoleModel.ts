import { User } from './UserModel'

export interface Role {
  id: string
  name: string
  level: number

  users: User[]

  created_at: Date
  updated_at: Date
}
