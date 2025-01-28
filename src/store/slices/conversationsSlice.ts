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
    setSelectedConversationId: (state, action: PayloadAction<string | null>) => {
      state.selectedConversationId = action.payload
    },
  },
})

export const { setConversations, setSelectedConversationId } = conversationsSlice.actions
export default conversationsSlice.reducer

