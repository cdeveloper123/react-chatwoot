"use client"

import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Smile,
  Paperclip,
  Send,
  Volume2,
  Share2,
  Clock,
  AlertCircle,
  ChevronDown,
  Undo,
  Redo,
  Code,
  Lock,
  ChevronLeft,
} from "lucide-react"
import { EmojiPicker } from "./emoji-picker"
import type { Conversation, User, Message } from "../../types/chat"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../store"
import { addMessage, updateMessage, receiveMessage, setFetchedMessages } from "../../store/slices/messagesSlice"
// import { getSocket, fetchMessages } from "../../utils/socket"

interface ChatAreaProps {
  conversation: Conversation
  onSendMessage?: (message: string, conversationId: string) => void
  currentUser: User
  onBackClick?: () => void
}

export default function ChatArea({ conversation, onSendMessage, currentUser, onBackClick }: ChatAreaProps) {
  const dispatch = useDispatch()
  const messages = useSelector((state: RootState) => state.messages.messages[conversation.id] || [])
  const currentUserRedux = useSelector((state: RootState) => state.user.currentUser)
  const [isResolved, setIsResolved] = useState(false)
  const [activeTab, setActiveTab] = useState<"reply" | "private">("reply")
  const [activeFormats, setActiveFormats] = useState<string[]>([])
  const editorRef = useRef<HTMLDivElement>(null)
  const privateNoteRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // useEffect(() => {
  //   const socket = getSocket();

  //   socket.on('new_message', (data: { conversationId: string; message: Message }) => {
  //     dispatch(receiveMessage(data));
  //   });

  //   fetchMessages(conversation.id)
  //     .then((fetchedMessages) => {
  //       dispatch(setFetchedMessages({ conversationId: conversation.id, messages: fetchedMessages }));
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching messages:', error);
  //     });

  //   return () => {
  //     socket.off('new_message');
  //   };
  // }, [dispatch, conversation.id]);

  const handleFormat = (command: string, value?: string) => {
    const ref = activeTab === "reply" ? editorRef : privateNoteRef
    if (command === "insertUnorderedList" || command === "insertOrderedList") {
      if (ref.current?.innerHTML && !ref.current.innerHTML.endsWith("<br>")) {
        document.execCommand("insertHTML", false, "<br>")
      }
      document.execCommand(command, false)
      if (!window.getSelection()?.toString()) {
        document.execCommand("insertHTML", false, "<li></li>")
      }
    } else {
      document.execCommand(command, false, value)
    }
    ref.current?.focus()
    updateActiveFormats()
  }

  const handleEmojiSelect = (emoji: string) => {
    const ref = activeTab === "reply" ? editorRef : privateNoteRef
    if (ref.current) {
      const selection = window.getSelection()
      const range = selection?.getRangeAt(0)
      if (range) {
        range.deleteContents()
        const textNode = document.createTextNode(emoji)
        range.insertNode(textNode)
        range.collapse(false)
        selection?.removeAllRanges()
        selection?.addRange(range)
      } else {
        ref.current.innerHTML += emoji
      }
      ref.current.focus()
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFormat("insertText", `[File: ${file.name}]`)
    }
  }

  const updateActiveFormats = () => {
    const formats: string[] = []
    if (document.queryCommandState("bold")) formats.push("bold")
    if (document.queryCommandState("italic")) formats.push("italic")
    if (document.queryCommandState("insertUnorderedList")) formats.push("unorderedList")
    if (document.queryCommandState("insertOrderedList")) formats.push("orderedList")
    if (document.queryCommandValue("formatBlock") === "pre") formats.push("code")
    setActiveFormats(formats)
  }

  const handleSend = async () => {
    const ref = activeTab === "reply" ? editorRef : privateNoteRef
    if (ref.current && ref.current.innerHTML.trim() && currentUserRedux) {
      const messageId = Date.now().toString()
      const newMessage: Message = {
        id: messageId,
        content: ref.current.innerHTML,
        timestamp: new Date().toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
        sender: currentUserRedux,
        type: activeTab === "reply" ? "message" : "private_note",
        sending: true,
      }

      dispatch(addMessage({ conversationId: conversation.id, message: newMessage }))
      ref.current.innerHTML = ""
      setActiveFormats([])

      // Send message through WebSocket
      // const socket = getSocket();
      // socket.emit('send_message', { conversationId: conversation.id, message: newMessage });

      // Simulate API call
      if (onSendMessage) {
        try {
          await onSendMessage(newMessage.content, conversation.id)
          dispatch(
            updateMessage({
              conversationId: conversation.id,
              messageId,
              updates: { sending: false },
            }),
          )
        } catch (error) {
          console.error("Failed to send message:", error)
        }
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      handleSend()
    }
    updateActiveFormats()
  }

  useEffect(() => {
    const handleSelectionChange = () => {
      updateActiveFormats()
    }
    document.addEventListener("selectionchange", handleSelectionChange)
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange)
    }
  }, [])

  const renderMessage = (msg: Message) => {
    const isCurrentUser = msg.sender.id === currentUserRedux?.id
    const isPrivateNote = msg.type === "private_note"

    return (
      <div
        key={msg.id}
        className={`mb-4 flex ${isCurrentUser ? "justify-end" : "justify-start"} ${msg.sending ? "opacity-70" : ""}`}
      >
        <div
          className={`inline-block p-2 rounded-lg max-w-[60%] ${
            isPrivateNote
              ? "bg-[#FFFBE6] dark:bg-[#2C2A19] text-gray-600 dark:text-white"
              : isCurrentUser
                ? "bg-[#7c66dc] text-white"
                : "bg-muted text-black dark:text-white"
          }`}
        >
          <div
            className={`text-left ${isPrivateNote ? "text-gray-600 dark:text-white" : isCurrentUser ? "text-white" : "text-black dark:text-white"}`}
          >
            <div dangerouslySetInnerHTML={{ __html: msg.content }} />
            <div className="flex items-center justify-between mt-1 text-xs">
              <span
                className={
                  isPrivateNote
                    ? "text-gray-500 dark:text-white/70"
                    : isCurrentUser
                      ? "text-white/70"
                      : "text-black/70 dark:text-white/70"
                }
              >
                {msg.timestamp}
              </span>
              {isPrivateNote && <Lock className="h-3 w-3 ml-2 text-gray-500 dark:text-white/70" />}
            </div>
          </div>
        </div>
        {msg.sending && <div className="text-xs text-muted-foreground mt-1">Sending...</div>}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          {onBackClick && (
            <Button variant="ghost" size="icon" onClick={onBackClick} className="sm:hidden">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
          <Avatar className="h-10 w-10 rounded-full bg-[#7c66dc] flex items-center justify-center">
            <span className="font-semibold text-white">{conversation.title[0].toUpperCase()}</span>
          </Avatar>
          <div>
            <h2 className="font-semibold">{conversation.title}</h2>
            <p className="text-sm text-muted-foreground">{conversation.source || "No source"}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 md:h-10 md:w-10">
            <Volume2 className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 md:h-10 md:w-10">
            <Share2 className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                onClick={() => setIsResolved(!isResolved)}
                className={`gap-1 md:gap-2 text-xs md:text-sm px-2 md:px-4 h-8 md:h-10 ${
                  isResolved ? "bg-[#22C55E] hover:bg-[#16A34A]" : "bg-[#7c66dc] hover:bg-[#6a56c9]"
                } text-white`}
              >
                {isResolved ? "Resolve" : "Open"}
                <ChevronDown className="h-3 w-3 md:h-4 md:w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-popover border-border">
              <DropdownMenuItem className="flex items-center gap-2 text-foreground hover:bg-accent focus:bg-accent cursor-pointer">
                <Clock className="h-4 w-4" />
                Snooze
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 text-foreground hover:bg-accent focus:bg-accent cursor-pointer"
                onClick={() => setIsResolved(!isResolved)}
              >
                <AlertCircle className="h-4 w-4" />
                Mark as pending
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex-1 p-4 overflow-auto">{messages.map(renderMessage)}</div>
      <div className="border-t border-border">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "reply" | "private")}>
          <TabsList className="w-fit rounded-none border-b-0 p-0 ml-4 mt-4 bg-transparent">
            <TabsTrigger
              value="reply"
              className="rounded-none data-[state=active]:bg-transparent px-4 text-[#7c66dc] hover:text-[#7c66dc]/90 border-b-2 border-transparent data-[state=active]:border-[#7c66dc]"
            >
              Reply
            </TabsTrigger>
            <TabsTrigger
              value="private"
              className="rounded-none data-[state=active]:bg-transparent px-4 text-[#F6C000] hover:text-[#F6C000]/90 border-b-2 border-transparent data-[state=active]:border-[#F6C000]"
            >
              Private Note
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reply" className="p-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1 md:gap-2 flex-wrap">
                <Button
                  variant={activeFormats.includes("bold") ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => handleFormat("bold")}
                  className="h-8 w-8 md:h-10 md:w-10"
                >
                  <Bold className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
                <Button
                  variant={activeFormats.includes("italic") ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => handleFormat("italic")}
                  className="h-8 w-8 md:h-10 md:w-10"
                >
                  <Italic className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleFormat("undo")}
                  className="h-8 w-8 md:h-10 md:w-10"
                >
                  <Undo className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleFormat("redo")}
                  className="h-8 w-8 md:h-10 md:w-10"
                >
                  <Redo className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
                <Button
                  variant={activeFormats.includes("unorderedList") ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => handleFormat("insertUnorderedList")}
                  className="h-8 w-8 md:h-10 md:w-10"
                >
                  <List className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
                <Button
                  variant={activeFormats.includes("orderedList") ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => handleFormat("insertOrderedList")}
                  className="h-8 w-8 md:h-10 md:w-10"
                >
                  <ListOrdered className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
                <Button
                  variant={activeFormats.includes("code") ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => handleFormat("formatBlock", "pre")}
                  className="h-8 w-8 md:h-10 md:w-10"
                >
                  <Code className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
              </div>

              <div className="relative">
                <div
                  ref={editorRef}
                  contentEditable
                  onKeyDown={handleKeyDown}
                  onKeyUp={updateActiveFormats}
                  onMouseUp={updateActiveFormats}
                  className="min-h-[100px] md:min-h-[150px] max-h-[200px] md:max-h-[300px] overflow-auto p-2 bg-muted rounded-md focus:outline-none text-sm md:text-base"
                  placeholder="Type your message here..."
                />

                <div className="absolute right-2 bottom-2 flex items-center gap-1 md:gap-2">
                  {" "}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 md:h-10 md:w-10">
                        <Smile className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent side="top" align="end" className="w-auto p-0">
                      <EmojiPicker onEmojiSelect={handleEmojiSelect} />
                    </PopoverContent>
                  </Popover>
                  <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-8 w-8 md:h-10 md:w-10"
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSend}
                    className="bg-[#7c66dc] text-white hover:bg-[#6a56c9] h-8 w-8 md:h-10 md:w-10"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="private" className="p-4 bg-[#FFFBE6] dark:bg-[#2C2A19]">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1 md:gap-2 flex-wrap">
                <Button
                  variant={activeFormats.includes("bold") ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => handleFormat("bold")}
                  className="h-8 w-8 md:h-10 md:w-10"
                >
                  <Bold className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
                <Button
                  variant={activeFormats.includes("italic") ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => handleFormat("italic")}
                  className="h-8 w-8 md:h-10 md:w-10"
                >
                  <Italic className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleFormat("undo")}
                  className="h-8 w-8 md:h-10 md:w-10"
                >
                  <Undo className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleFormat("redo")}
                  className="h-8 w-8 md:h-10 md:w-10"
                >
                  <Redo className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
                <Button
                  variant={activeFormats.includes("unorderedList") ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => handleFormat("insertUnorderedList")}
                  className="h-8 w-8 md:h-10 md:w-10"
                >
                  <List className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
                <Button
                  variant={activeFormats.includes("orderedList") ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => handleFormat("insertOrderedList")}
                  className="h-8 w-8 md:h-10 md:w-10"
                >
                  <ListOrdered className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
                <Button
                  variant={activeFormats.includes("code") ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => handleFormat("formatBlock", "pre")}
                  className="h-8 w-8 md:h-10 md:w-10"
                >
                  <Code className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
              </div>

              <div className="relative">
                <div
                  ref={privateNoteRef}
                  contentEditable
                  onKeyDown={handleKeyDown}
                  onKeyUp={updateActiveFormats}
                  onMouseUp={updateActiveFormats}
                  className="min-h-[100px] md:min-h-[150px] max-h-[200px] md:max-h-[300px] overflow-auto p-2 bg-[#FFFBE6] dark:bg-[#3C3A29] rounded-md focus:outline-none text-black dark:text-white placeholder:text-black/60 dark:placeholder:text-white/60 text-sm md:text-base"
                  placeholder="Shift + enter for new line. This will be visible only to Agents"
                />

                <div className="absolute right-2 bottom-2 flex items-center gap-1 md:gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-[#1E1E1E] hover:bg-[#2E2E2E] h-8 w-8 md:h-10 md:w-10"
                  >
                    <Smile className="h-4 w-4 text-[#F6C000]" />
                  </Button>
                  <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-[#1E1E1E] hover:bg-[#2E2E2E] h-8 w-8 md:h-10 md:w-10"
                  >
                    <Paperclip className="h-4 w-4 text-[#F6C000]" />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleSend}
                    className="bg-[#F6C000] text-black hover:bg-[#E5B000] px-2 md:px-4 py-1 md:py-2 h-8 md:h-10 rounded-md text-xs md:text-sm"
                  >
                    Add Note (⌘ + ↵)
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

