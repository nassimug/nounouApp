"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FamilyNavigation } from "@/components/dashboard/family-navigation"
import { NannyCard } from "@/components/dashboard/nanny-card"
import { Search, Heart } from "lucide-react"

// Données fictives pour les nounous favorites
const favoriteNannies = [
  {
    id: 1,
    name: "Sophie Martin",
    city: "Paris",
    experience: "5 ans",
    rating: 4.8,
    childrenCapacity: 3,
    languages: ["Français", "Anglais"],
    availability: ["Lundi", "Mardi", "Jeudi"],
    distance: "1.2 km",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Marie Dubois",
    city: "Lyon",
    experience: "8 ans",
    rating: 4.9,
    childrenCapacity: 2,
    languages: ["Français", "Espagnol"],
    availability: ["Lundi", "Mercredi", "Vendredi"],
    distance: "0.8 km",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Julie Moreau",
    city: "Bordeaux",
    experience: "10 ans",
    rating: 5.0,
    childrenCapacity: 3,
    languages: ["Français", "Anglais", "Allemand"],
    availability: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
    distance: "1.5 km",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function FamilyFavoritesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredNannies = favoriteNannies.filter(
    (nanny) =>
      nanny.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nanny.city.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-[#FCE4EC]/30">
      <FamilyNavigation />

      <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#FF80AB]">Mes nounous favorites</h1>
          <p className="text-gray-600">Retrouvez vos nounous préférées</p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Rechercher parmi vos favorites..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNannies.length > 0 ? (
            filteredNannies.map((nanny) => <NannyCard key={nanny.id} nanny={nanny} />)
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium">Aucune nounou favorite</h3>
              <p className="text-gray-500 mt-2">Ajoutez des nounous à vos favoris pour les retrouver facilement ici</p>
              <Button className="mt-4 bg-[#FF80AB] hover:bg-[#FF4081] text-white">Rechercher des nounous</Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
