import React from "react"
import { useState } from "react"
import ConversationList from "./ConversationList"
import ChatArea from "./ChatArea"
import ContactInfo from "./ContactInfo"
import type { Conversation, User } from "../types/chat"

interface ChatInterfaceProps {
  conversations: Conversation[]
  currentUser: User
  onSendMessage: (message: string, conversationId: string) => void
  onSelectConversation: (conversation: Conversation) => void
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  conversations,
  currentUser,
  onSendMessage,
  onSelectConversation,
}) => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation)
    onSelectConversation(conversation)
  }

  return (
    <div className="flex h-screen bg-white text-gray-800">
      <ConversationList
        conversations={conversations}
        onSelectConversation={handleSelectConversation}
        selectedConversationId={selectedConversation?.id || ''}
      />
      {selectedConversation ? (
        <>
          <ChatArea conversation={selectedConversation} currentUser={currentUser} onSendMessage={onSendMessage} />
          <ContactInfo conversationId={selectedConversation.id} />
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Select a conversation to start chatting</p>
        </div>
      )}
    </div>
  )
}

export default ChatInterface

