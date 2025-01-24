import { useState, useEffect } from "react"
import { ThemeProvider } from "next-themes"
import ConversationList from "./conversation-list"
import ChatArea from "./chat-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Menu, ChevronLeft, ChevronRight } from "lucide-react"
import { ThemeToggle } from "../theme-toggle"
import type { ChatProps, Conversation } from "../../types/chat"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import { setConversations, setSelectedConversationId } from "../../store/slices/conversationsSlice"
import { setMessages } from "../../store/slices/messagesSlice"
import { setCurrentUser } from "../../store/slices/userSlice"

// ... rest of the file remains the same

