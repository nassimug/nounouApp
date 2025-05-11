"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, Paperclip, ImageIcon } from "lucide-react"

interface Conversation {
  id: number
  name: string
  avatar: string
}

interface MessageChatProps {
  conversation: Conversation
  onBack: () => void
  userType: "famille" | "nounou"
}

// Données fictives pour les messages
const dummyMessages = [
  {
    id: 1,
    sender: "other",
    text: "Bonjour, comment allez-vous ?",
    time: "10:30",
  },
  {
    id: 2,
    sender: "me",
    text: "Bonjour ! Je vais bien, merci. Et vous ?",
    time: "10:32",
  },
  {
    id: 3,
    sender: "other",
    text: "Très bien, merci. Je voulais savoir si vous étiez disponible pour garder mes enfants mercredi prochain ?",
    time: "10:33",
  },
  {
    id: 4,
    sender: "me",
    text: "Oui, je suis disponible mercredi prochain. À quelle heure auriez-vous besoin de moi ?",
    time: "10:35",
  },
  {
    id: 5,
    sender: "other",
    text: "Ce serait de 14h à 18h. Est-ce que cela vous conviendrait ?",
    time: "10:36",
  },
]

export function MessageChat({ conversation, onBack, userType }: MessageChatProps) {
  const [messages, setMessages] = useState(dummyMessages)
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const primaryColor = userType === "famille" ? "#FF80AB" : "#4FC3F7"

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const newMsg = {
      id: messages.length + 1,
      sender: "me",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newMsg])
    setNewMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack} className="md:hidden">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Image
          src={conversation.avatar || "/placeholder.svg"}
          alt={conversation.name}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <h4 className="font-medium">{conversation.name}</h4>
          <div className="text-xs text-green-600">En ligne</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.sender === "me" ? `bg-${primaryColor} text-white` : "bg-gray-100 text-gray-800"
              }`}
              style={{ backgroundColor: message.sender === "me" ? primaryColor : "" }}
            >
              <p className="break-words">{message.text}</p>
              <div className={`text-xs mt-1 text-right ${message.sender === "me" ? "text-white/70" : "text-gray-500"}`}>
                {message.time}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500">
            <ImageIcon className="h-5 w-5" />
          </Button>
          <div className="flex-1 relative">
            <Input
              placeholder="Écrivez votre message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              className="pr-10"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 bottom-0"
              onClick={handleSendMessage}
              disabled={newMessage.trim() === ""}
              style={{ color: primaryColor }}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
