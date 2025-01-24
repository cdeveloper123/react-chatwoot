import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UIState {
  isRightPanelCollapsed: boolean
  isSmallMobileView: boolean
  showConversationList: boolean
}

const initialState: UIState = {
  isRightPanelCollapsed: false,
  isSmallMobileView: false,
  showConversationList: true,
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setRightPanelCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isRightPanelCollapsed = action.payload
    },
    setSmallMobileView: (state, action: PayloadAction<boolean>) => {
      state.isSmallMobileView = action.payload
    },
    setShowConversationList: (state, action: PayloadAction<boolean>) => {
      state.showConversationList = action.payload
    },
    toggleRightPanel: (state) => {
      state.isRightPanelCollapsed = !state.isRightPanelCollapsed
    },
    toggleMobileView: (state) => {
      state.showConversationList = !state.showConversationList
    },
  },
})

export const {
  setRightPanelCollapsed,
  setSmallMobileView,
  setShowConversationList,
  toggleRightPanel,
  toggleMobileView,
} = uiSlice.actions
export default uiSlice.reducer

