"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FamilyNavigation } from "@/components/dashboard/family-navigation"
import { Calendar, Clock, MessageSquare, User, MapPin, CheckCircle, XCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { PayslipGenerator } from "@/components/dashboard/payslip-generator"
import { ReviewForm } from "@/components/dashboard/review-form"

// Données fictives pour les réservations
const reservations = [
  {
    id: 1,
    nannyId: 1,
    nannyName: "Sophie Martin",
    nannyImage: "/placeholder.svg?height=50&width=50",
    date: "12 mai 2025",
    time: "8h00 - 18h00",
    status: "upcoming",
    address: "123 rue de Paris, 75001 Paris",
    children: 2,
    price: "85,00 €",
  },
  {
    id: 2,
    nannyId: 2,
    nannyName: "Marie Dubois",
    nannyImage: "/placeholder.svg?height=50&width=50",
    date: "15 mai 2025",
    time: "13h00 - 17h30",
    status: "upcoming",
    address: "45 avenue Victor Hugo, 75016 Paris",
    children: 1,
    price: "45,00 €",
  },
  {
    id: 3,
    nannyId: 3,
    nannyName: "Camille Leroy",
    nannyImage: "/placeholder.svg?height=50&width=50",
    date: "5 mai 2025",
    time: "9h00 - 16h00",
    status: "completed",
    address: "8 rue du Commerce, 75015 Paris",
    children: 2,
    price: "70,00 €",
  },
  {
    id: 4,
    nannyId: 4,
    nannyName: "Julie Moreau",
    nannyImage: "/placeholder.svg?height=50&width=50",
    date: "28 avril 2025",
    time: "14h00 - 19h00",
    status: "completed",
    address: "27 boulevard Saint-Michel, 75005 Paris",
    children: 1,
    price: "50,00 €",
  },
  {
    id: 5,
    nannyId: 5,
    nannyName: "Emma Bernard",
    nannyImage: "/placeholder.svg?height=50&width=50",
    date: "10 avril 2025",
    time: "8h30 - 17h30",
    status: "cancelled",
    address: "12 rue de Rivoli, 75004 Paris",
    children: 2,
    price: "90,00 €",
  },
]

export default function FamilyReservationsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [isPayslipDialogOpen, setIsPayslipDialogOpen] = useState(false)
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [selectedReservation, setSelectedReservation] = useState<any>(null)

  const upcomingReservations = reservations.filter((r) => r.status === "upcoming")
  const completedReservations = reservations.filter((r) => r.status === "completed")
  const cancelledReservations = reservations.filter((r) => r.status === "cancelled")

  const handleGeneratePayslip = (reservation: any) => {
    setSelectedReservation(reservation)
    setIsPayslipDialogOpen(true)
  }

  const handleLeaveReview = (reservation: any) => {
    setSelectedReservation(reservation)
    setIsReviewDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#FCE4EC]/30">
      <FamilyNavigation />

      <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#FF80AB]">Mes réservations</h1>
          <p className="text-gray-600">Gérez vos réservations de garde d'enfants</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 md:w-[400px]">
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-[#FF80AB] data-[state=active]:text-white">
              À venir
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-[#FF80AB] data-[state=active]:text-white">
              Terminées
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="data-[state=active]:bg-[#FF80AB] data-[state=active]:text-white">
              Annulées
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-[#FF80AB]">Réservations à venir</CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingReservations.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingReservations.map((reservation) => (
                      <div key={reservation.id} className="p-4 rounded-lg border hover:bg-gray-50">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                          <div className="flex items-center gap-3 mb-3 md:mb-0">
                            <Image
                              src={reservation.nannyImage || "/placeholder.svg"}
                              alt={reservation.nannyName}
                              width={50}
                              height={50}
                              className="rounded-full"
                            />
                            <div>
                              <h4 className="font-medium">{reservation.nannyName}</h4>
                              <div className="flex items-center text-sm text-gray-500">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                <span>{reservation.date}</span>
                                <span className="mx-1">•</span>
                                <Clock className="h-3.5 w-3.5 mr-1" />
                                <span>{reservation.time}</span>
                              </div>
                            </div>
                          </div>
                          <Badge className="bg-blue-100 text-blue-600 self-start md:self-auto">À venir</Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                          <div>
                            <div className="text-gray-500 flex items-center">
                              <MapPin className="h-3.5 w-3.5 mr-1" />
                              Adresse
                            </div>
                            <div className="font-medium">{reservation.address}</div>
                          </div>
                          <div>
                            <div className="text-gray-500 flex items-center">
                              <User className="h-3.5 w-3.5 mr-1" />
                              Enfants
                            </div>
                            <div className="font-medium">
                              {reservation.children} enfant{reservation.children > 1 ? "s" : ""}
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-500">Prix</div>
                            <div className="font-medium">{reservation.price}</div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button className="bg-[#FF80AB] hover:bg-[#FF4081] text-white" asChild>
                            <Link href={`/dashboard/famille/messages?open=${reservation.nannyId}`}>
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Contacter
                            </Link>
                          </Button>
                          <Button variant="outline" className="border-red-300 text-red-500 hover:bg-red-50">
                            <XCircle className="h-4 w-4 mr-2" />
                            Annuler
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <Calendar className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="font-medium mb-1">Aucune réservation à venir</h3>
                    <p className="text-gray-500 text-sm">Vous n'avez pas de réservations prévues</p>
                    <Button className="mt-4 bg-[#FF80AB] hover:bg-[#FF4081] text-white">Rechercher une nounou</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-[#FF80AB]">Réservations terminées</CardTitle>
              </CardHeader>
              <CardContent>
                {completedReservations.length > 0 ? (
                  <div className="space-y-4">
                    {completedReservations.map((reservation) => (
                      <div key={reservation.id} className="p-4 rounded-lg border hover:bg-gray-50">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                          <div className="flex items-center gap-3 mb-3 md:mb-0">
                            <Image
                              src={reservation.nannyImage || "/placeholder.svg"}
                              alt={reservation.nannyName}
                              width={50}
                              height={50}
                              className="rounded-full"
                            />
                            <div>
                              <h4 className="font-medium">{reservation.nannyName}</h4>
                              <div className="flex items-center text-sm text-gray-500">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                <span>{reservation.date}</span>
                                <span className="mx-1">•</span>
                                <Clock className="h-3.5 w-3.5 mr-1" />
                                <span>{reservation.time}</span>
                              </div>
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-600 self-start md:self-auto">Terminée</Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                          <div>
                            <div className="text-gray-500 flex items-center">
                              <MapPin className="h-3.5 w-3.5 mr-1" />
                              Adresse
                            </div>
                            <div className="font-medium">{reservation.address}</div>
                          </div>
                          <div>
                            <div className="text-gray-500 flex items-center">
                              <User className="h-3.5 w-3.5 mr-1" />
                              Enfants
                            </div>
                            <div className="font-medium">
                              {reservation.children} enfant{reservation.children > 1 ? "s" : ""}
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-500">Prix</div>
                            <div className="font-medium">{reservation.price}</div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button
                            className="bg-[#81C784] hover:bg-[#66BB6A] text-white"
                            onClick={() => handleGeneratePayslip(reservation)}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Générer fiche de paie
                          </Button>
                          <Button
                            variant="outline"
                            className="border-[#FF80AB] text-[#FF80AB]"
                            onClick={() => handleLeaveReview(reservation)}
                          >
                            Laisser un avis
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <CheckCircle className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="font-medium mb-1">Aucune réservation terminée</h3>
                    <p className="text-gray-500 text-sm">Vos réservations terminées apparaîtront ici</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-[#FF80AB]">Réservations annulées</CardTitle>
              </CardHeader>
              <CardContent>
                {cancelledReservations.length > 0 ? (
                  <div className="space-y-4">
                    {cancelledReservations.map((reservation) => (
                      <div key={reservation.id} className="p-4 rounded-lg border hover:bg-gray-50">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                          <div className="flex items-center gap-3 mb-3 md:mb-0">
                            <Image
                              src={reservation.nannyImage || "/placeholder.svg"}
                              alt={reservation.nannyName}
                              width={50}
                              height={50}
                              className="rounded-full"
                            />
                            <div>
                              <h4 className="font-medium">{reservation.nannyName}</h4>
                              <div className="flex items-center text-sm text-gray-500">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                <span>{reservation.date}</span>
                                <span className="mx-1">•</span>
                                <Clock className="h-3.5 w-3.5 mr-1" />
                                <span>{reservation.time}</span>
                              </div>
                            </div>
                          </div>
                          <Badge className="bg-red-100 text-red-600 self-start md:self-auto">Annulée</Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                          <div>
                            <div className="text-gray-500 flex items-center">
                              <MapPin className="h-3.5 w-3.5 mr-1" />
                              Adresse
                            </div>
                            <div className="font-medium">{reservation.address}</div>
                          </div>
                          <div>
                            <div className="text-gray-500 flex items-center">
                              <User className="h-3.5 w-3.5 mr-1" />
                              Enfants
                            </div>
                            <div className="font-medium">
                              {reservation.children} enfant{reservation.children > 1 ? "s" : ""}
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-500">Prix</div>
                            <div className="font-medium">{reservation.price}</div>
                          </div>
                        </div>

                        <Button className="bg-[#FF80AB] hover:bg-[#FF4081] text-white">Réserver à nouveau</Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <XCircle className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="font-medium mb-1">Aucune réservation annulée</h3>
                    <p className="text-gray-500 text-sm">Vos réservations annulées apparaîtront ici</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Dialog pour générer une fiche de paie */}
      <Dialog open={isPayslipDialogOpen} onOpenChange={setIsPayslipDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <PayslipGenerator onClose={() => setIsPayslipDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Dialog pour laisser un avis */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedReservation && (
            <ReviewForm
              nannyName={selectedReservation.nannyName}
              nannyId={selectedReservation.nannyId}
              onClose={() => setIsReviewDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
