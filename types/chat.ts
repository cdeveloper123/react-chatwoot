export interface ChatProps {}

export interface Message {
  id: string
  content: string
  timestamp: string
  sender: User
  type: "message" | "private_note"
  sending?: boolean
}

export interface User {
  id: string
  name: string
  avatar?: string
  status?: "online" | "offline"
}

export interface Conversation {
  id: string
  title: string
  lastMessage?: string
  timestamp: string
  unread?: number
  participants: User[]
  source?: string
  messages?: Message[]
}

