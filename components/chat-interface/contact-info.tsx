import React from 'react';
import { Button } from "@/components/ui/button"

interface ContactInfoProps {
  conversationId: string | null
}

export default function ContactInfo({ conversationId }: ContactInfoProps) {
  return (
    <div className="w-80 border-l border-[#2E2E2E] flex flex-col">
      <div className="p-4 border-b border-[#2E2E2E]">
        <h2 className="font-semibold mb-2">What would you like to know?</h2>
        <ul className="space-y-2">
          <li className="cursor-pointer hover:bg-[#2E2E2E] p-2 rounded">1. context</li>
          <li className="cursor-pointer hover:bg-[#2E2E2E] p-2 rounded">2. memory</li>
        </ul>
      </div>
      <div className="flex-1"></div>
      <div className="p-4 border-t border-[#2E2E2E]">
        <Button variant="outline" className="w-full mb-2">
          Private Note
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">
            B
          </Button>
          <Button variant="outline" className="flex-1">
            I
          </Button>
          <Button variant="outline" className="flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
          </Button>
          <Button variant="outline" className="flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
          </Button>
        </div>
      </div>
    </div>
  )
}

