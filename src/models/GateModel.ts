export interface Gate {
  id: string
  name: string
  open: boolean
  provisional_open: boolean
  cep: string
  address: string
  complement: string
  number: number
  city: string
  uf: string
  created_at: Date
  updated_at: Date
}
