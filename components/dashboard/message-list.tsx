"use client"

import Image from "next/image"

interface Conversation {
  id: number
  name: string
  lastMessage: string
  time: string
  unread: number
  avatar: string
}

interface MessageListProps {
  conversations: Conversation[]
  selectedId: number | null
  onSelect: (id: number) => void
  userType: "famille" | "nounou"
}

export function MessageList({ conversations, selectedId, onSelect, userType }: MessageListProps) {
  const primaryColor = userType === "famille" ? "#FF80AB" : "#4FC3F7"

  return (
    <div className="overflow-y-auto h-full">
      {conversations.length > 0 ? (
        <div className="divide-y">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-3 hover:bg-gray-50 cursor-pointer ${
                selectedId === conversation.id ? `bg-${primaryColor}/10` : ""
              }`}
              onClick={() => onSelect(conversation.id)}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <Image
                    src={conversation.avatar || "/placeholder.svg"}
                    alt={conversation.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  {conversation.unread > 0 && (
                    <div
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs text-white"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {conversation.unread}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium truncate">{conversation.name}</h4>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{conversation.time}</span>
                  </div>
                  <p className={`text-sm truncate ${conversation.unread > 0 ? "font-medium" : "text-gray-500"}`}>
                    {conversation.lastMessage}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full p-6 text-center text-gray-500">
          <div>
            <p className="mb-1">Aucune conversation</p>
            <p className="text-sm">Vos conversations apparaîtront ici</p>
          </div>
        </div>
      )}
    </div>
  )
}
