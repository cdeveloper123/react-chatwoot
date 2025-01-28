import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Message } from "../../types/chat"

interface MessagesState {
  messages: { [conversationId: string]: Message[] }
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
  },
})

export const { setMessages, addMessage } = messagesSlice.actions
export default messagesSlice.reducer

