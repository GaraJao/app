import { Device } from './DeviceModel'

export interface Notification {
  id: string
  title: string
  body: string
  expo_id: string
  expo_status: string
  expo_message: string

  device: Device[]

  created_at: Date
  updated_at: Date
}
