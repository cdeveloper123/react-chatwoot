import type { User, Conversation, Message } from "../types/chat"

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

