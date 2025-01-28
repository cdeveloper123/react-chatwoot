import { withChat } from "./components/chat-interface"
import { store } from "./store"
import type { ChatProps, Conversation, User, Message } from "./types/chat"

export { withChat, store }
export type { ChatProps, Conversation, User, Message }

// For local development
import("./example")

