"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SummaryAndChatProps {
  summary: string
}

export function SummaryAndChat({ summary }: SummaryAndChatProps) {
  const [input, setInput] = useState("")

  const handleSearch = () => {
    if (!input.trim()) return
    // Handle search/query logic here
    setInput("")
  }

  return (
    <div className="flex flex-col h-full p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Market Summary</h3>
        <p className="text-gray-700">{summary}</p>
      </div>

      <div className="mt-auto">
        <div className="relative">
          <Input
            placeholder="Ask about the market..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="pr-20 bg-neutral-50 border-neutral-300"
          />
          <Button
            onClick={handleSearch}
            className="absolute right-0 top-0 h-full rounded-l-none bg-teal hover:bg-teal-dark"
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  )
}
