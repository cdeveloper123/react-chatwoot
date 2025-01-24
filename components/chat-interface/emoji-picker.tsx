"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void
}

const emojis = {
  "Smileys & Emotion": [
    "😀",
    "😃",
    "😄",
    "😁",
    "😅",
    "😂",
    "🤣",
    "😊",
    "😇",
    "🙂",
    "🙃",
    "😉",
    "😌",
    "😍",
    "🥰",
    "😘",
    "😗",
    "😙",
    "😚",
    "😋",
    "😛",
    "😝",
    "😜",
    "🤪",
    "🤨",
    "🧐",
    "🤓",
    "😎",
    "🤩",
    "🥳",
    "😏",
    "😒",
    "😞",
    "😔",
    "😟",
    "😕",
    "🙁",
    "☹️",
    "😣",
    "😖",
    "😫",
    "😩",
    "🥺",
    "😢",
    "😭",
  ],
  Objects: ["📎", "📌", "📍", "✂️", "📝", "✏️", "📱", "💻", "🖥️"],
  Symbols: ["❤️", "💔", "💫", "💥", "💢", "💦", "💨", "🕉️", "✝️"],
}

export function EmojiPicker({ onEmojiSelect }: EmojiPickerProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredEmojis = Object.entries(emojis).reduce(
    (acc, [category, emojiList]) => {
      const filtered = emojiList.filter((emoji) => emoji.toLowerCase().includes(searchQuery.toLowerCase()))
      if (filtered.length > 0) {
        acc[category] = filtered
      }
      return acc
    },
    {} as Record<string, string[]>,
  )

  return (
    <div className="w-[320px] bg-popover border border-border rounded-lg shadow-lg">
      <div className="p-2 border-b border-border">
        <Input
          placeholder="Search emojis"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>
      <ScrollArea className="h-[320px] p-2">
        {Object.entries(filteredEmojis).map(([category, categoryEmojis]) => (
          <div key={category} className="mb-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">{category}</h3>
            <div className="grid grid-cols-9 gap-1">
              {categoryEmojis.map((emoji, index) => (
                <button key={index} onClick={() => onEmojiSelect(emoji)} className="p-1 hover:bg-muted rounded text-lg">
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}

