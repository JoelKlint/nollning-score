interface ICategory {
  eventId?: number
  absolute?: boolean
  type: 'interval' | 'integer' | 'boolean' | 'guild'
}

interface IEvent {
  id: number
}

interface IScore {
  value?: number
  userId?: number
  guildId?: number
}

interface IUser {
  id: number
  role: 'basic' | 'admin'
}

interface IGuild {
  id: number
  color: string
}
