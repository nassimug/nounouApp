"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FamilyNavigation } from "@/components/dashboard/family-navigation"
import {
  Star,
  MapPin,
  Clock,
  Users,
  Languages,
  MessageSquare,
  Calendar,
  Heart,
  CheckCircle,
  Award,
  FileText,
  Sparkles,
} from "lucide-react"
import { ReviewCard } from "@/components/dashboard/review-card"
import { BookingForm } from "@/components/dashboard/booking-form"

// Données fictives pour les nounous
const nannies = [
  {
    id: "1",
    name: "Sophie Martin",
    city: "Paris",
    experience: "5 ans",
    rating: 4.8,
    childrenCapacity: 3,
    languages: ["Français", "Anglais"],
    availability: ["Lundi", "Mardi", "Jeudi"],
    distance: "1.2 km",
    image: "/placeholder.svg?height=400&width=400",
    description:
      "Je suis une nounou expérimentée avec plus de 5 ans d'expérience dans la garde d'enfants. J'adore organiser des activités créatives et éducatives. Je suis patiente, attentionnée et je m'adapte aux besoins spécifiques de chaque enfant.",
    specialSkills: ["Premiers secours", "Aide aux devoirs", "Activités artistiques", "Cuisine pour enfants"],
    hourlyRate: "15€/h",
    reviews: [
      {
        id: 1,
        author: "Famille Dupont",
        rating: 5,
        date: "15 avril 2025",
        comment:
          "Sophie est une nounou exceptionnelle ! Nos enfants l'adorent et nous sommes très satisfaits de son professionnalisme et de sa bienveillance.",
      },
      {
        id: 2,
        author: "Famille Bernard",
        rating: 4.5,
        date: "2 mars 2025",
        comment:
          "Très bonne expérience avec Sophie. Elle est ponctuelle, attentionnée et propose des activités adaptées à l'âge de nos enfants.",
      },
      {
        id: 3,
        author: "Famille Petit",
        rating: 5,
        date: "18 février 2025",
        comment:
          "Sophie est devenue un membre de notre famille ! Elle est très professionnelle et nos enfants l'adorent. Je la recommande vivement.",
      },
    ],
    certifications: ["Diplôme CAP Petite Enfance", "Formation premiers secours", "Agrément PMI"],
  },
  {
    id: "2",
    name: "Marie Dubois",
    city: "Lyon",
    experience: "8 ans",
    rating: 4.9,
    childrenCapacity: 2,
    languages: ["Français", "Espagnol"],
    availability: ["Lundi", "Mercredi", "Vendredi"],
    distance: "0.8 km",
    image: "/placeholder.svg?height=400&width=400",
    description:
      "Nounou expérimentée avec 8 ans d'expérience, je suis spécialisée dans la garde d'enfants de 0 à 6 ans. J'aime proposer des activités ludiques et éducatives adaptées à chaque âge.",
    specialSkills: ["Éveil musical", "Activités motrices", "Lecture", "Jeux éducatifs"],
    hourlyRate: "16€/h",
    reviews: [
      {
        id: 1,
        author: "Famille Martin",
        rating: 5,
        date: "10 avril 2025",
        comment:
          "Marie est une nounou formidable ! Elle est très attentive aux besoins de notre enfant et propose des activités variées et adaptées.",
      },
      {
        id: 2,
        author: "Famille Leroy",
        rating: 4.8,
        date: "25 mars 2025",
        comment:
          "Nous sommes très satisfaits des services de Marie. Elle est ponctuelle, professionnelle et très douce avec notre bébé.",
      },
    ],
    certifications: ["Diplôme d'État d'éducateur de jeunes enfants", "Formation premiers secours"],
  },
]

export default function NannyProfilePage() {
  const params = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("profile")
  const [isFavorite, setIsFavorite] = useState(false)

  // Récupérer les données de la nounou en fonction de l'ID
  const nanny = nannies.find((n) => n.id === params.id) || nannies[0]

  const handleBooking = () => {
    router.push(`/dashboard/famille/reservations`)
  }

  return (
    <div className="min-h-screen bg-[#FCE4EC]/30 bg-[url('/pattern-bg.png')]">
      <FamilyNavigation />

      <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#FF80AB]">Profil de {nanny.name}</h1>
            <p className="text-gray-600 flex items-center">
              <MapPin className="h-4 w-4 mr-1 text-[#FF80AB]" />
              {nanny.city} • {nanny.distance}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className={`${isFavorite ? "bg-[#FF80AB]/10 text-[#FF80AB] border-[#FF80AB]" : "text-gray-500"}`}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-[#FF80AB]" : ""}`} />
              {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
            </Button>
            <Button className="bg-[#FF80AB] hover:bg-[#FF4081] text-white" asChild>
              <Link href={`/dashboard/famille/messages/${nanny.id}`}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Contacter
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
                <TabsTrigger
                  value="profile"
                  className="data-[state=active]:bg-[#FF80AB] data-[state=active]:text-white"
                >
                  Profil
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="data-[state=active]:bg-[#FF80AB] data-[state=active]:text-white"
                >
                  Avis
                </TabsTrigger>
                <TabsTrigger
                  value="availability"
                  className="data-[state=active]:bg-[#FF80AB] data-[state=active]:text-white"
                >
                  Disponibilités
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-4">
                <Card className="overflow-hidden border-2 border-[#FF80AB]/20 shadow-md">
                  <div className="relative h-64 md:h-80">
                    <Image
                      src={nanny.image || "/placeholder.svg"}
                      alt={nanny.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-bold mb-2 text-[#FF80AB]">{nanny.name}</h2>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 mr-1 text-[#FF80AB]" />
                          <span>
                            {nanny.city} • {nanny.distance}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <div className="flex items-center bg-[#FFD54F]/20 px-2 py-1 rounded-md mr-3">
                            <Star className="h-4 w-4 text-[#FFD54F] mr-1" />
                            <span className="font-medium">{nanny.rating}</span>
                          </div>
                          <span className="text-sm text-gray-500">({nanny.reviews.length} avis)</span>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 text-right">
                        <div className="text-2xl font-bold text-[#FF80AB]">{nanny.hourlyRate}</div>
                        <div className="text-sm text-gray-500">Tarif horaire</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3 text-[#FF80AB] flex items-center">
                          <Clock className="h-5 w-5 mr-2 text-[#FF80AB]" />
                          Expérience & Capacité
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-[#4FC3F7]" />
                            <span>{nanny.experience} d'expérience</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-[#4FC3F7]" />
                            <span>Jusqu'à {nanny.childrenCapacity} enfants</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3 text-[#FF80AB] flex items-center">
                          <Languages className="h-5 w-5 mr-2 text-[#FF80AB]" />
                          Langues parlées
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {nanny.languages.map((language, index) => (
                            <Badge key={index} className="bg-[#4FC3F7]/10 text-[#4FC3F7] border-[#4FC3F7]/30">
                              {language}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3 text-[#FF80AB] flex items-center">
                        <Sparkles className="h-5 w-5 mr-2 text-[#FF80AB]" />
                        Compétences particulières
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {nanny.specialSkills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-[#81C784]/10 text-[#81C784] border-[#81C784]/30"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3 text-[#FF80AB] flex items-center">
                        <Award className="h-5 w-5 mr-2 text-[#FF80AB]" />
                        Certifications
                      </h3>
                      <div className="space-y-2">
                        {nanny.certifications.map((certification, index) => (
                          <div key={index} className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2 text-[#81C784]" />
                            <span>{certification}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-[#FF80AB]">À propos de moi</h3>
                      <p className="text-gray-700 leading-relaxed">{nanny.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                <Card className="border-2 border-[#FF80AB]/20 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl text-[#FF80AB] flex items-center">
                      <Star className="h-5 w-5 mr-2 text-[#FFD54F]" />
                      Avis des familles ({nanny.reviews.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {nanny.reviews.map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="availability" className="space-y-4">
                <Card className="border-2 border-[#FF80AB]/20 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl text-[#FF80AB] flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-[#FF80AB]" />
                      Disponibilités
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Jours disponibles</h3>
                        <div className="flex flex-wrap gap-2">
                          {["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"].map((day) => (
                            <Badge
                              key={day}
                              variant={nanny.availability.includes(day) ? "default" : "outline"}
                              className={
                                nanny.availability.includes(day)
                                  ? "bg-[#81C784] hover:bg-[#81C784]"
                                  : "text-gray-400 border-gray-200"
                              }
                            >
                              {day}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Horaires habituels</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {nanny.availability.map((day) => (
                            <div key={day} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                              <span className="font-medium">{day}</span>
                              <span className="text-gray-600">8h00 - 18h00</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button className="w-full bg-[#FF80AB] hover:bg-[#FF4081] text-white">
                          <Calendar className="h-4 w-4 mr-2" />
                          Voir le calendrier complet
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card className="border-2 border-[#FF80AB]/20 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl text-[#FF80AB]">Réserver {nanny.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <BookingForm nanny={nanny} onSubmit={handleBooking} />
              </CardContent>
            </Card>

            <Card className="border-2 border-[#FF80AB]/20 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl text-[#FF80AB]">Documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-3 text-[#4FC3F7]" />
                    <span>Contrat type</span>
                  </div>
                  <Button variant="outline" size="sm" className="text-[#FF80AB] border-[#FF80AB]" asChild>
                    <Link href="/dashboard/famille/documents/contract-template">Voir</Link>
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-3 text-[#4FC3F7]" />
                    <span>Attestation d'agrément</span>
                  </div>
                  <Button variant="outline" size="sm" className="text-[#FF80AB] border-[#FF80AB]">
                    Voir
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
