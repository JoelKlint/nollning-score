interface ICategory {
  id: number
  name?: string
  type: 'interval' | 'integer' | 'boolean' | 'guild'
  absolute?: boolean
  global?: boolean
  weight?: number
  interval_min?: number
  interval_max?: number
  eventId?: number
  selected_guildId?: number
}

interface IEvent {
  id: number
  name?: string
}

interface IGuild {
  id: number
  name?: string
  color?: string
}

interface IScore {
  id: number
  value?: number
  categoryId?: number
  guildId?: number
  userId?: number
}

interface IUser {
  id: number
  email?: string
  role: 'basic' | 'admin'
}

