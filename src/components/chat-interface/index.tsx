"use client"

import React from "react"
import { useState, useEffect } from "react"
import { ThemeProvider } from "next-themes"
import { Search, Menu, ChevronLeft, ChevronRight } from "lucide-react"
import type { ChatProps, Conversation } from "../../types/chat"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import { setConversations, setSelectedConversationId } from "../../store/slices/conversationsSlice"
import { setMessages } from "../../store/slices/messagesSlice"
import { setCurrentUser } from "../../store/slices/userSlice"

export function withChat<T extends object>(WrappedComponent: React.ComponentType<T>): React.FC<T & ChatProps> {
  return function WithChatComponent(props: T & ChatProps) {
    const dispatch = useDispatch()
    const selectedConversationId = useSelector((state: RootState) => state.conversations.selectedConversationId)
    const conversations = useSelector((state: RootState) => state.conversations.conversations)
    const currentUser = useSelector((state: RootState) => state.user.currentUser)
    const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(false)
    const [isSmallMobileView, setIsSmallMobileView] = useState(false)
    const [showConversationList, setShowConversationList] = useState(true)

    useEffect(() => {
      dispatch(setConversations(props.conversations))
      dispatch(setCurrentUser(props.currentUser))
    }, [dispatch, props.conversations, props.currentUser])

    useEffect(() => {
      const handleResize = () => {
        setIsSmallMobileView(window.innerWidth < 640)
      }
      handleResize()
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }, [])

    const handleSelectConversation = (conversation: Conversation) => {
      dispatch(setSelectedConversationId(conversation.id))
      if (conversation.messages) {
        dispatch(setMessages({ conversationId: conversation.id, messages: conversation.messages }))
      }
      if (isSmallMobileView) {
        setShowConversationList(false)
      }
    }

    return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="flex h-screen bg-background text-foreground">
          <div>Chat interface placeholder</div>
          <WrappedComponent {...props} />
        </div>
      </ThemeProvider>
    )
  }
}

