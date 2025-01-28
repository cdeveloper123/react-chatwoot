import React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar } from "@/components/ui/avatar"
import { Globe, Mail, MessageCircle, Reply, ImageIcon } from "lucide-react"
import type { Conversation } from "../../types/chat"
import { useSelector } from "react-redux"
import type { RootState } from "../../store"

type SourceType = "web" | "email" | "facebook" | "telegram"

interface ConversationSource {
  type: SourceType
  name: string
  icon?: React.ReactNode
}

interface ConversationListProps {
  onSelect: (conversation: Conversation) => void
  isCollapsed: boolean
}

const getSourceIcon = (type: SourceType) => {
  switch (type) {
    case "web":
      return <Globe className="h-4 w-4" />
    case "email":
      return <Mail className="h-4 w-4" />
    case "facebook":
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      )
    case "telegram":
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      )
    default:
      return <MessageCircle className="h-4 w-4" />
  }
}

const getSourceInfo = (source: string): ConversationSource => {
  if (source.includes("Email")) {
    return { type: "email", name: source }
  }
  if (source.includes("CW")) {
    return { type: "facebook", name: source }
  }
  if (source.includes("Bot")) {
    return { type: "telegram", name: source }
  }
  return { type: "web", name: source }
}

export default function ConversationList({ onSelect, isCollapsed }: ConversationListProps) {
  const conversations = useSelector((state: RootState) => state.conversations.conversations)
  const selectedId = useSelector((state: RootState) => state.conversations.selectedConversationId)

  if (isCollapsed) {
    return null
  }

  return (
    <Tabs
      defaultValue="mine"
      className="flex-1 overflow-hidden"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <TabsList className="w-full overflow-x-auto flex-nowrap whitespace-nowrap justify-start px-4 bg-transparent border-t border-gray-200/10">
        <TabsTrigger
          value="mine"
          className="relative px-0 mr-6 data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:border-[#7c66dc] data-[state=active]:text-[#7c66dc] text-gray-400 hover:text-gray-200"
        >
          Mine <span className="ml-1 text-xs opacity-60">24</span>
        </TabsTrigger>
        <TabsTrigger
          value="unassigned"
          className="relative px-0 mr-6 data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:border-[#7c66dc] data-[state=active]:text-[#7c66dc] text-gray-400 hover:text-gray-200"
        >
          Unassigned <span className="ml-1 text-xs opacity-60">19</span>
        </TabsTrigger>
        <TabsTrigger
          value="all"
          className="relative px-0 data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:border-[#7c66dc] data-[state=active]:text-[#7c66dc] text-gray-400 hover:text-gray-200"
        >
          All <span className="ml-1 text-xs opacity-60">43</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="mine" className="m-0 flex-1 overflow-hidden">
        <ScrollArea className="h-[calc(100vh-120px)]">
          {conversations.map((conversation) => {
            const source = getSourceInfo(conversation.source || "Web")
            const sourceIcon = getSourceIcon(source.type)

            return (
              <button
                key={conversation.id}
                onClick={() => onSelect(conversation)}
                className={`w-full p-2 md:p-4 text-left hover:bg-gray-100 dark:hover:bg-[#2E2E2E] ${
                  selectedId === conversation.id ? "bg-gray-100 dark:bg-[#2E2E2E]" : "bg-white dark:bg-transparent"
                }`}
              >
                <div className="flex flex-col gap-1 md:gap-2">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    {sourceIcon}
                    <span>{source.name}</span>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3">
                    <Avatar className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-[#7c66dc] flex items-center justify-center">
                      <span className="font-semibold text-white text-xs md:text-sm">
                        {conversation.title[0].toUpperCase()}
                      </span>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-start justify-between gap-1 md:gap-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm md:text-base truncate">{conversation.title}</h3>
                          {conversation.lastMessage && (
                            <p className="text-xs md:text-sm text-muted-foreground truncate">
                              {conversation.lastMessage.includes("Picture message") ? (
                                <span className="flex items-center gap-1">
                                  <ImageIcon className="h-3 w-3" />
                                  Picture message
                                </span>
                              ) : (
                                conversation.lastMessage
                              )}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {conversation.timestamp}
                          </span>
                          {conversation.unread && (
                            <span className="mt-0.5 md:mt-1 px-1.5 md:px-2 py-0.5 text-xs bg-[#22C55E] text-white rounded-full">
                              {conversation.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </ScrollArea>
      </TabsContent>
    </Tabs>
  )
}
;<style jsx>{`
  .overflow-x-auto::-webkit-scrollbar {
    display: none;
  }
`}</style>

