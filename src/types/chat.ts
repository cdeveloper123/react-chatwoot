export interface User {
  id: string
  name: string
  avatar?: string
}

export interface Message {
  id: string
  content: string
  timestamp: string
  sender: User
  type: "message" | "private_note"
}

export interface Conversation {
  id: string
  title: string
  timestamp: string
  lastMessage?: string
  participants: User[]
  source?: string
  messages?: Message[]
}

export interface ChatProps {
  conversations: Conversation[]
  currentUser: User
}
