"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { FamilyNavigation } from "@/components/dashboard/family-navigation"
import { NannyCard } from "@/components/dashboard/nanny-card"
import { Search, Filter, MapPin, Clock, Star, Languages, Users, X } from "lucide-react"

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
  {
    id: 5,
    name: "Emma Bernard",
    city: "Nantes",
    experience: "6 ans",
    rating: 4.7,
    childrenCapacity: 2,
    languages: ["Français", "Anglais"],
    availability: ["Lundi", "Mardi", "Mercredi"],
    distance: "3.2 km",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Léa Petit",
    city: "Toulouse",
    experience: "4 ans",
    rating: 4.5,
    childrenCapacity: 3,
    languages: ["Français", "Espagnol"],
    availability: ["Mercredi", "Jeudi", "Vendredi"],
    distance: "2.1 km",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function FamilySearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [maxDistance, setMaxDistance] = useState([5])
  const [minExperience, setMinExperience] = useState([0])
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [minCapacity, setMinCapacity] = useState(1)

  const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
  const languages = ["Français", "Anglais", "Espagnol", "Allemand", "Italien", "Arabe"]

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day))
    } else {
      setSelectedDays([...selectedDays, day])
    }
  }

  const toggleLanguage = (language: string) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter((l) => l !== language))
    } else {
      setSelectedLanguages([...selectedLanguages, language])
    }
  }

  const resetFilters = () => {
    setMaxDistance([5])
    setMinExperience([0])
    setSelectedDays([])
    setSelectedLanguages([])
    setMinCapacity(1)
  }

  // Filtrer les nounous en fonction des critères
  const filteredNannies = nannies.filter((nanny) => {
    // Filtre par recherche (nom ou ville)
    const matchesSearch =
      nanny.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nanny.city.toLowerCase().includes(searchTerm.toLowerCase())

    // Filtre par distance
    const matchesDistance = Number.parseFloat(nanny.distance) <= maxDistance[0]

    // Filtre par expérience
    const yearsExp = Number.parseInt(nanny.experience.split(" ")[0])
    const matchesExperience = yearsExp >= minExperience[0]

    // Filtre par jours de disponibilité
    const matchesDays = selectedDays.length === 0 || selectedDays.some((day) => nanny.availability.includes(day))

    // Filtre par langues
    const matchesLanguages =
      selectedLanguages.length === 0 || selectedLanguages.every((lang) => nanny.languages.includes(lang))

    // Filtre par capacité d'enfants
    const matchesCapacity = nanny.childrenCapacity >= minCapacity

    return matchesSearch && matchesDistance && matchesExperience && matchesDays && matchesLanguages && matchesCapacity
  })

  return (
    <div className="min-h-screen bg-[#FCE4EC]/30">
      <FamilyNavigation />

      <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#FF80AB]">Recherche de nounous</h1>
          <p className="text-gray-600">Trouvez la nounou idéale pour vos enfants</p>
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
              <Button
                variant="outline"
                className={`text-[#FF80AB] border-[#FF80AB] ${showFilters ? "bg-[#FF80AB]/10" : ""}`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filtres avancés
              </Button>
            </div>

            {showFilters && (
              <div className="mt-4 p-4 border rounded-md bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Filtres avancés</h3>
                  <Button variant="ghost" size="sm" onClick={resetFilters} className="text-gray-500">
                    <X className="h-4 w-4 mr-1" />
                    Réinitialiser
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-[#FF80AB]" />
                          Distance maximale
                        </Label>
                        <span className="text-sm font-medium">{maxDistance[0]} km</span>
                      </div>
                      <Slider
                        defaultValue={[5]}
                        max={20}
                        step={0.5}
                        value={maxDistance}
                        onValueChange={setMaxDistance}
                        className="[&>span]:bg-[#FF80AB]"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="flex items-center">
                          <Star className="h-4 w-4 mr-2 text-[#FF80AB]" />
                          Expérience minimale
                        </Label>
                        <span className="text-sm font-medium">{minExperience[0]} ans</span>
                      </div>
                      <Slider
                        defaultValue={[0]}
                        max={10}
                        step={1}
                        value={minExperience}
                        onValueChange={setMinExperience}
                        className="[&>span]:bg-[#FF80AB]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-[#FF80AB]" />
                        Capacité minimale d'enfants
                      </Label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4].map((num) => (
                          <Button
                            key={num}
                            type="button"
                            variant={minCapacity === num ? "default" : "outline"}
                            className={minCapacity === num ? "bg-[#FF80AB]" : "border-[#FF80AB] text-[#FF80AB]"}
                            onClick={() => setMinCapacity(num)}
                          >
                            {num}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-[#FF80AB]" />
                        Jours de disponibilité
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {days.map((day) => (
                          <Badge
                            key={day}
                            variant={selectedDays.includes(day) ? "default" : "outline"}
                            className={`cursor-pointer ${
                              selectedDays.includes(day)
                                ? "bg-[#FF80AB]"
                                : "hover:bg-[#FF80AB]/10 text-[#FF80AB] border-[#FF80AB]"
                            }`}
                            onClick={() => toggleDay(day)}
                          >
                            {day}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center">
                        <Languages className="h-4 w-4 mr-2 text-[#FF80AB]" />
                        Langues parlées
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {languages.map((language) => (
                          <Badge
                            key={language}
                            variant={selectedLanguages.includes(language) ? "default" : "outline"}
                            className={`cursor-pointer ${
                              selectedLanguages.includes(language)
                                ? "bg-[#FF80AB]"
                                : "hover:bg-[#FF80AB]/10 text-[#FF80AB] border-[#FF80AB]"
                            }`}
                            onClick={() => toggleLanguage(language)}
                          >
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mb-4 flex justify-between items-center">
          <p className="text-gray-600">
            {filteredNannies.length} {filteredNannies.length > 1 ? "nounous trouvées" : "nounou trouvée"}
          </p>
          <select className="px-3 py-2 border rounded-md text-sm" defaultValue="rating">
            <option value="rating">Trier par : Évaluation</option>
            <option value="distance">Trier par : Distance</option>
            <option value="experience">Trier par : Expérience</option>
          </select>
        </div>

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

const Label = ({ children, className, ...props }: React.HTMLAttributes<HTMLLabelElement>) => (
  <label className={`text-sm font-medium ${className || ""}`} {...props}>
    {children}
  </label>
)
