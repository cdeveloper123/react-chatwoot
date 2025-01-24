import { Provider } from "react-redux"
import { store } from "./store"
import withChat from "./components/chat-interface"
import type { ChatProps, Conversation, User, Message } from "./types/chat"

function YourApp() {
  return <div>Your app content</div>
}

// Sample data
const conversations: Conversation[] = [
  {
    id: "1",
    title: "Purple-Thunder-934",
    timestamp: "1mo",
    lastMessage: "What would you like to know?",
    participants: [{ id: "1", name: "Bot" }],
    source: "Test Botpress",
    messages: [
      {
        id: "1",
        content: "What would you like to know?",
        timestamp: "Dec 10 2024, 7:11 PM",
        sender: { id: "1", name: "Bot" },
        type: "message",
      },
      {
        id: "2",
        content: "1. context",
        timestamp: "Dec 10 2024, 7:11 PM",
        sender: { id: "2", name: "User" },
        type: "message",
      },
    ],
  },
  // Add more conversations here...
]

const currentUser: User = { id: "2", name: "Current User" }

// Wrap your app with the chat interface
const AppWithChat = withChat(YourApp)

// Use it with required props
export default function App() {
  const chatProps: ChatProps = {
    conversations: conversations,
    currentUser: currentUser,
    onSendMessage: (message, conversationId) => console.log("Sending:", message, "to conversation:", conversationId),
    onSelectConversation: (conversation) => console.log("Selected conversation:", conversation.id),
  }

  return (
    <Provider store={store}>
      <AppWithChat {...chatProps} />
    </Provider>
  )
}

