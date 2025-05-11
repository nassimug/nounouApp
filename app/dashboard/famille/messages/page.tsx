"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FamilyNavigation } from "@/components/dashboard/family-navigation"
import { MessageList } from "@/components/dashboard/message-list"
import { MessageChat } from "@/components/dashboard/message-chat"
import { Search } from "lucide-react"
import { useSearchParams } from "next/navigation"

// Données fictives pour les conversations
const conversations = [
  {
    id: 1,
    name: "Sophie Martin",
    lastMessage: "Bonjour, je suis disponible pour garder vos enfants mercredi.",
    time: "10:30",
    unread: 2,
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 2,
    name: "Marie Dubois",
    lastMessage: "Merci pour votre demande, je vous confirme ma disponibilité.",
    time: "Hier",
    unread: 0,
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 3,
    name: "Camille Leroy",
    lastMessage: "Je peux garder vos enfants ce weekend si besoin.",
    time: "Lun",
    unread: 1,
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 4,
    name: "Julie Moreau",
    lastMessage: "Je confirme notre rendez-vous pour vendredi.",
    time: "28/04",
    unread: 0,
    avatar: "/placeholder.svg?height=50&width=50",
  },
]

export default function FamilyMessagesPage() {
  const searchParams = useSearchParams()
  const openConversationId = searchParams.get("open")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null)
  const [isMobileView, setIsMobileView] = useState(false)

  useEffect(() => {
    if (openConversationId) {
      const conversationId = Number.parseInt(openConversationId)
      const conversation = conversations.find((c) => c.id === conversationId)
      if (conversation) {
        setSelectedConversation(conversationId)
        setIsMobileView(true)
      }
    }
  }, [openConversationId])

  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSelectConversation = (id: number) => {
    setSelectedConversation(id)
    setIsMobileView(true)
  }

  const handleBackToList = () => {
    setIsMobileView(false)
  }

  return (
    <div className="min-h-screen bg-[#FCE4EC]/30">
      <FamilyNavigation />

      <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#FF80AB]">Messages</h1>
          <p className="text-gray-600">Communiquez avec vos nounous</p>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex h-[calc(100vh-220px)] md:h-[600px]">
              {/* Liste des conversations (masquée en vue mobile lorsqu'une conversation est sélectionnée) */}
              <div className={`w-full md:w-1/3 border-r ${isMobileView ? "hidden md:block" : "block"}`}>
                <div className="p-3 border-b">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Rechercher une conversation..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <MessageList
                  conversations={filteredConversations}
                  selectedId={selectedConversation}
                  onSelect={handleSelectConversation}
                  userType="famille"
                />
              </div>

              {/* Zone de chat (affichée uniquement lorsqu'une conversation est sélectionnée) */}
              <div
                className={`w-full md:w-2/3 ${
                  !selectedConversation && !isMobileView ? "hidden md:flex md:items-center md:justify-center" : ""
                } ${isMobileView || selectedConversation ? "block" : "hidden md:flex"}`}
              >
                {selectedConversation ? (
                  <MessageChat
                    conversation={conversations.find((c) => c.id === selectedConversation)!}
                    onBack={handleBackToList}
                    userType="famille"
                  />
                ) : (
                  <div className="text-center p-6 text-gray-500">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="font-medium mb-1">Aucune conversation sélectionnée</h3>
                    <p className="text-sm">Sélectionnez une conversation pour commencer à discuter</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
