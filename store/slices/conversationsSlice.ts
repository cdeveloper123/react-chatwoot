import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Conversation } from "../../types/chat"

interface ConversationsState {
  conversations: Conversation[]
  selectedConversationId: string | null
}

const initialState: ConversationsState = {
  conversations: [],
  selectedConversationId: null,
}

const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    setConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.conversations = action.payload
    },
    addConversation: (state, action: PayloadAction<Conversation>) => {
      state.conversations.push(action.payload)
    },
    updateConversation: (state, action: PayloadAction<Conversation>) => {
      const index = state.conversations.findIndex((conv) => conv.id === action.payload.id)
      if (index !== -1) {
        state.conversations[index] = action.payload
      }
    },
    setSelectedConversationId: (state, action: PayloadAction<string | null>) => {
      state.selectedConversationId = action.payload
    },
  },
})

export const { setConversations, addConversation, updateConversation, setSelectedConversationId } =
  conversationsSlice.actions
export default conversationsSlice.reducer

