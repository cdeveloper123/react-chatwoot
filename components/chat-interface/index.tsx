"use client"

import { useState, useEffect } from "react"
import { ThemeProvider } from "next-themes"
import ConversationList from "./conversation-list"
import ChatArea from "./chat-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Menu, ChevronLeft, ChevronRight } from "lucide-react"
import { ThemeToggle } from "../theme-toggle"
import type { ChatProps, Conversation } from "../../types/chat"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import { setConversations, setSelectedConversationId } from "../../store/slices/conversationsSlice"
import { setMessages } from "../../store/slices/messagesSlice"
import { setCurrentUser } from "../../store/slices/userSlice"

// import { initSocket } from "../../utils/socket"

export default function withChat<T extends object>(WrappedComponent: React.ComponentType<T>) {
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

      // Initialize WebSocket connection
      // const socket = initSocket("http://localhost:3001") // Replace with your WebSocket server URL
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

    const toggleRightPanel = () => {
      setIsRightPanelCollapsed(!isRightPanelCollapsed)
    }

    const toggleMobileView = () => {
      setShowConversationList(!showConversationList)
    }

    return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="flex h-screen bg-background text-foreground">
          <div className={`flex-1 ${isSmallMobileView && showConversationList ? "hidden" : "block"}`}>
            {selectedConversationId ? (
              <ChatArea
                conversation={conversations.find((c) => c.id === selectedConversationId)!}
                onSendMessage={props.onSendMessage}
                currentUser={currentUser!}
                onBackClick={isSmallMobileView ? toggleMobileView : undefined}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Select a conversation to start chatting
              </div>
            )}
          </div>
          <div
            className={`flex flex-col transition-all duration-300 border-l border-border
              ${isRightPanelCollapsed ? "w-16" : "w-full sm:w-80"}
              ${isSmallMobileView && !showConversationList ? "hidden" : "block"}
              ${isSmallMobileView ? "absolute inset-0 bg-background" : "relative"}
            `}
          >
            <div
              className={`flex items-center justify-between p-4 ${isRightPanelCollapsed ? "border-b-0" : "border-b border-border"}`}
            >
              {isRightPanelCollapsed ? (
                <Button variant="ghost" size="icon" onClick={toggleRightPanel} className="w-full">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              ) : (
                <>
                  <div className="flex items-center">
                    {isSmallMobileView && (
                      <Button variant="ghost" size="icon" onClick={toggleMobileView}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                    )}
                    {!isSmallMobileView && (
                      <Button variant="ghost" size="icon" onClick={toggleRightPanel}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    )}
                    <ThemeToggle />
                  </div>
                  <div className="flex-1 relative px-4">
                    <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="w-full pl-14 pr-4 py-2 bg-muted border-none text-sm"
                      placeholder="Search conversations"
                    />
                  </div>
                </>
              )}
            </div>
            <ConversationList
              conversations={conversations}
              onSelect={handleSelectConversation}
              selectedId={selectedConversationId}
              isCollapsed={isRightPanelCollapsed}
            />
          </div>
        </div>
      </ThemeProvider>
    )
  }
}

