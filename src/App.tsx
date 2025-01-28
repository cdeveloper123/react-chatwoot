import React from "react"
import ChatInterface from "./components/ChatInterface"
import { sampleConversations, sampleCurrentUser } from "./data/sampleData"

const App: React.FC = () => {
  return (
    <div className="App">
      <ChatInterface
        conversations={sampleConversations}
        currentUser={sampleCurrentUser}
        onSendMessage={(message: string, conversationId: string) =>
          console.log("Sending:", message, "to conversation:", conversationId)
        }
        onSelectConversation={(conversation) => console.log("Selected conversation:", conversation.id)}
      />
    </div>
  )
}

export default App

