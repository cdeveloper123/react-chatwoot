import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { User } from "../../types/chat"

interface UserState {
  currentUser: User | null
}

const initialState: UserState = {
  currentUser: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
    },
  },
})

export const { setCurrentUser } = userSlice.actions
export default userSlice.reducer

