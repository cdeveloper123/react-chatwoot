import React from "react"
import type { Conversation } from "../types/chat"

interface ConversationListProps {
  conversations: Conversation[]
  onSelectConversation: (conversation: Conversation) => void
  selectedConversationId: string | null
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  onSelectConversation,
  selectedConversationId,
}) => {
  return (
    <div className="w-64 border-r border-gray-200 overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold">Conversations</h2>
      </div>
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          className={`p-4 cursor-pointer hover:bg-gray-100 ${
            selectedConversationId === conversation.id ? "bg-gray-100" : ""
          }`}
          onClick={() => onSelectConversation(conversation)}
        >
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mr-3">
              <span className="font-semibold text-sm">{conversation.title[0].toUpperCase()}</span>
            </div>
            <div>
              <h3 className="font-medium">{conversation.title}</h3>
              <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ConversationList

