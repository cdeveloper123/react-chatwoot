import React from "react"
import { useState } from "react"
import type { Conversation, User, Message } from "../types/chat"

interface ChatAreaProps {
  conversation: Conversation
  currentUser: User
  onSendMessage: (message: string, conversationId: string) => void
}

const ChatArea: React.FC<ChatAreaProps> = ({ conversation, currentUser, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage, conversation.id)
      setNewMessage("")
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold">{conversation.title}</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {conversation.messages?.map((message) => (
          <MessageBubble key={message.id} message={message} isCurrentUser={message.sender.id === currentUser.id} />
        ))}
      </div>
      <div className="p-4 border-t border-gray-200">
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 mr-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

const MessageBubble: React.FC<{ message: Message; isCurrentUser: boolean }> = ({ message, isCurrentUser }) => {
  return (
    <div className={`flex mb-4 ${isCurrentUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs p-3 rounded-lg ${isCurrentUser ? "bg-primary text-white" : "bg-gray-200 text-gray-800"}`}
      >
        <p>{message.content}</p>
        <span className="text-xs opacity-75">{message.timestamp}</span>
      </div>
    </div>
  )
}

export default ChatArea

