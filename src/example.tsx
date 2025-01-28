import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./store"
import { withChat, sampleConversations, sampleCurrentUser } from "./components/chat-interface"
import type { ChatProps, Conversation, User } from "./types/chat"
import "./styles/globals.css"

// Create a simple component to wrap with the chat interface
const ChatWrapper: React.FC = () => {
  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <h1>Chat Interface Wrapper</h1>
    </div>
  )
}

// Wrap the component with the chat interface
const ChatInterface = withChat(ChatWrapper)

// Use it with required props
function App() {
  const chatProps: ChatProps = {
    conversations: sampleConversations,
    currentUser: sampleCurrentUser,
    onSendMessage: (message: string, conversationId: string) =>
      console.log("Sending:", message, "to conversation:", conversationId),
    onSelectConversation: (conversation: Conversation) => console.log("Selected conversation:", conversation.id),
  }

  return (
    <Provider store={store}>
      <ChatInterface {...chatProps} />
    </Provider>
  )
}

// Ensure the DOM is fully loaded before rendering
document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById("root")
  if (rootElement) {
    const root = createRoot(rootElement)
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )
  } else {
    console.error("Root element not found")
  }
})

