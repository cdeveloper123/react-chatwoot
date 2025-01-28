import React from "react"
import { useState, useEffect } from "react"
import { ThemeProvider } from "next-themes"
import { Search, Menu, ChevronLeft, ChevronRight } from "lucide-react"
import type { ChatProps, Conversation, User, Message } from "../../types/chat"
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
          <div className="w-1/4 bg-gray-100 p-4">
            <h2 className="text-xl font-bold mb-4">Conversations</h2>
            {conversations.map((conv) => (
              <div key={conv.id} className="mb-2 p-2 bg-white rounded shadow">
                {conv.title}
              </div>
            ))}
          </div>
          <div className="w-3/4 p-4">
            <h1 className="text-2xl font-bold mb-4">Chat Interface</h1>
            <WrappedComponent {...props} />
          </div>
        </div>
      </ThemeProvider>
    )
  }
}

// Sample data (unchanged)
export const sampleUsers: User[] = [
  { id: "1", name: "Alice Johnson", avatar: "https://example.com/avatars/alice.jpg" },
  { id: "2", name: "Bob Smith", avatar: "https://example.com/avatars/bob.jpg" },
  { id: "3", name: "Charlie Brown", avatar: "https://example.com/avatars/charlie.jpg" },
  { id: "4", name: "Support Agent", avatar: "https://example.com/avatars/support.jpg" },
]

export const sampleMessages: Message[] = [
  {
    id: "1",
    content: "Hello! How can I help you today?",
    timestamp: "2023-06-15T10:00:00Z",
    sender: sampleUsers[3],
    type: "message",
  },
  {
    id: "2",
    content: "I'm having trouble with my account settings.",
    timestamp: "2023-06-15T10:05:00Z",
    sender: sampleUsers[0],
    type: "message",
  },
  {
    id: "3",
    content: "I understand. Can you please specify which settings you're having issues with?",
    timestamp: "2023-06-15T10:07:00Z",
    sender: sampleUsers[3],
    type: "message",
  },
  {
    id: "4",
    content: "I can't seem to change my password.",
    timestamp: "2023-06-15T10:10:00Z",
    sender: sampleUsers[0],
    type: "message",
  },
]

export const sampleConversations: Conversation[] = [
  {
    id: "1",
    title: "Account Settings Help",
    timestamp: "2023-06-15T10:00:00Z",
    lastMessage: "I can't seem to change my password.",
    participants: [sampleUsers[0], sampleUsers[3]],
    source: "Web Chat",
    messages: sampleMessages,
  },
  {
    id: "2",
    title: "Order #1234 Inquiry",
    timestamp: "2023-06-14T14:30:00Z",
    lastMessage: "Your order has been shipped.",
    participants: [sampleUsers[1], sampleUsers[3]],
    source: "Email",
  },
  {
    id: "3",
    title: "Product Question",
    timestamp: "2023-06-13T09:15:00Z",
    lastMessage: "Yes, the product comes with a 2-year warranty.",
    participants: [sampleUsers[2], sampleUsers[3]],
    source: "Facebook",
  },
]

export const sampleCurrentUser: User = sampleUsers[3]

