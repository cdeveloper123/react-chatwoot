import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Message } from "../../types/chat"

interface MessagesState {
  messages: Record<string, Message[]>
}

const initialState: MessagesState = {
  messages: {},
}

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<{ conversationId: string; messages: Message[] }>) => {
      state.messages[action.payload.conversationId] = action.payload.messages
    },
    addMessage: (state, action: PayloadAction<{ conversationId: string; message: Message }>) => {
      if (!state.messages[action.payload.conversationId]) {
        state.messages[action.payload.conversationId] = []
      }
      state.messages[action.payload.conversationId].push(action.payload.message)
    },
    updateMessage: (
      state,
      action: PayloadAction<{
        conversationId: string
        messageId: string
        updates: Partial<Message>
      }>,
    ) => {
      const messages = state.messages[action.payload.conversationId]
      const messageIndex = messages.findIndex((m) => m.id === action.payload.messageId)
      if (messageIndex !== -1) {
        messages[messageIndex] = { ...messages[messageIndex], ...action.payload.updates }
      }
    },
    receiveMessage: (state, action: PayloadAction<{ conversationId: string; message: Message }>) => {
      if (!state.messages[action.payload.conversationId]) {
        state.messages[action.payload.conversationId] = []
      }
      state.messages[action.payload.conversationId].push(action.payload.message)
    },
    setFetchedMessages: (state, action: PayloadAction<{ conversationId: string; messages: Message[] }>) => {
      state.messages[action.payload.conversationId] = action.payload.messages
    },
  },
})

export const { setMessages, addMessage, updateMessage, receiveMessage, setFetchedMessages } = messagesSlice.actions
export default messagesSlice.reducer

