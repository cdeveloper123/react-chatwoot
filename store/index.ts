import { configureStore } from "@reduxjs/toolkit"
import conversationsReducer from "./slices/conversationsSlice"
import messagesReducer from "./slices/messagesSlice"
import userReducer from "./slices/userSlice"
import uiReducer from "./slices/uiSlice"

export const store = configureStore({
  reducer: {
    conversations: conversationsReducer,
    messages: messagesReducer,
    user: userReducer,
    ui: uiReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

