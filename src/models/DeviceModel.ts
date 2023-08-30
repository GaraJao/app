import { User } from './UserModel'
import { Notification } from './NotificationModel'

export interface Device {
  id: string
  os: string
  model: string
  name: string
  push_token: string

  user: User
  notifications: Notification[]

  created_at: Date
  updated_at: Date
  deleted_at: Date
}
