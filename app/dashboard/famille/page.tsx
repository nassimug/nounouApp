"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, Star, MapPin, Clock, Languages } from "lucide-react"
import { FamilyNavigation } from "@/components/dashboard/family-navigation"
import { NannyCard } from "@/components/dashboard/nanny-card"

// Données fictives pour les nounous
const nannies = [
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
    id: 3,
    name: "Camille Leroy",
    city: "Marseille",
    experience: "3 ans",
    rating: 4.6,
    childrenCapacity: 4,
    languages: ["Français"],
    availability: ["Mardi", "Jeudi", "Vendredi"],
    distance: "2.5 km",
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

export default function FamilyDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")

  const filteredNannies = nannies.filter(
    (nanny) =>
      nanny.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nanny.city.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-[#FCE4EC]/30">
      <FamilyNavigation />

      <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#FF80AB]">Bonjour, Famille Dupont</h1>
            <p className="text-gray-600">Trouvez la nounou idéale pour vos enfants</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="bg-[#FF80AB] hover:bg-[#FF4081] text-white">
              <Calendar className="mr-2 h-4 w-4" />
              Mes réservations
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Rechercher une nounou par nom ou ville..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="text-[#FF80AB] border-[#FF80AB]">
                Filtres avancés
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <Badge
                variant={activeFilter === "all" ? "default" : "outline"}
                className={activeFilter === "all" ? "bg-[#FF80AB]" : "hover:bg-[#FF80AB]/10"}
                onClick={() => setActiveFilter("all")}
              >
                Toutes
              </Badge>
              <Badge
                variant={activeFilter === "nearby" ? "default" : "outline"}
                className={activeFilter === "nearby" ? "bg-[#FF80AB]" : "hover:bg-[#FF80AB]/10"}
                onClick={() => setActiveFilter("nearby")}
              >
                <MapPin className="mr-1 h-3 w-3" />
                Proximité
              </Badge>
              <Badge
                variant={activeFilter === "available" ? "default" : "outline"}
                className={activeFilter === "available" ? "bg-[#FF80AB]" : "hover:bg-[#FF80AB]/10"}
                onClick={() => setActiveFilter("available")}
              >
                <Clock className="mr-1 h-3 w-3" />
                Disponibles aujourd'hui
              </Badge>
              <Badge
                variant={activeFilter === "experience" ? "default" : "outline"}
                className={activeFilter === "experience" ? "bg-[#FF80AB]" : "hover:bg-[#FF80AB]/10"}
                onClick={() => setActiveFilter("experience")}
              >
                <Star className="mr-1 h-3 w-3" />
                Expérimentées
              </Badge>
              <Badge
                variant={activeFilter === "languages" ? "default" : "outline"}
                className={activeFilter === "languages" ? "bg-[#FF80AB]" : "hover:bg-[#FF80AB]/10"}
                onClick={() => setActiveFilter("languages")}
              >
                <Languages className="mr-1 h-3 w-3" />
                Multilingues
              </Badge>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNannies.length > 0 ? (
            filteredNannies.map((nanny) => <NannyCard key={nanny.id} nanny={nanny} />)
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium">Aucune nounou trouvée</h3>
              <p className="text-gray-500 mt-2">Essayez de modifier vos critères de recherche</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
