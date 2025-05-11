"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  MessageSquare,
  Calendar,
  Settings,
  Users,
  Clock,
  Star,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Eye,
} from "lucide-react"
import { NannyNavigation } from "@/components/dashboard/nanny-navigation"
import { AvailabilityCalendar } from "@/components/dashboard/availability-calendar"
import { ReservationDetails } from "@/components/dashboard/reservation-details"
import { Dialog, DialogContent } from "@/components/ui/dialog"

// Données fictives pour les demandes
const requests = [
  {
    id: 1,
    family: "Famille Dupont",
    children: 2,
    date: "12 mai 2025",
    time: "8h00 - 18h00",
    status: "pending",
  },
  {
    id: 2,
    family: "Famille Martin",
    children: 1,
    date: "15 mai 2025",
    time: "13h00 - 17h30",
    status: "accepted",
  },
  {
    id: 3,
    family: "Famille Bernard",
    children: 3,
    date: "20 mai 2025",
    time: "9h00 - 16h00",
    status: "accepted",
  },
]

export default function NannyDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const handleViewDetails = (id: number) => {
    setSelectedRequestId(id)
    setIsDetailsOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#E3F2FD]/30">
      <NannyNavigation />

      <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#4FC3F7]">Bonjour, Sophie</h1>
            <p className="text-gray-600">Gérez vos demandes et votre disponibilité</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="bg-[#4FC3F7] hover:bg-[#29B6F6] text-white" asChild>
              <Link href="/dashboard/nounou/availability">
                <Calendar className="mr-2 h-4 w-4" />
                Modifier mes disponibilités
              </Link>
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 md:w-[400px]">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#4FC3F7] data-[state=active]:text-white">
              Aperçu
            </TabsTrigger>
            <TabsTrigger value="requests" className="data-[state=active]:bg-[#4FC3F7] data-[state=active]:text-white">
              Demandes
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-[#4FC3F7] data-[state=active]:text-white">
              Calendrier
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-[#4FC3F7]/20 flex items-center justify-center mb-4">
                      <MessageSquare className="h-8 w-8 text-[#4FC3F7]" />
                    </div>
                    <h3 className="font-bold text-lg mb-1">2</h3>
                    <p className="text-gray-600">Nouveaux messages</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-[#FF80AB]/20 flex items-center justify-center mb-4">
                      <Users className="h-8 w-8 text-[#FF80AB]" />
                    </div>
                    <h3 className="font-bold text-lg mb-1">5</h3>
                    <p className="text-gray-600">Familles intéressées</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-[#81C784]/20 flex items-center justify-center mb-4">
                      <Calendar className="h-8 w-8 text-[#81C784]" />
                    </div>
                    <h3 className="font-bold text-lg mb-1">3</h3>
                    <p className="text-gray-600">Réservations à venir</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-[#4FC3F7]">Demandes récentes</CardTitle>
              </CardHeader>
              <CardContent>
                {requests.length > 0 ? (
                  <div className="space-y-4">
                    {requests.map((request) => (
                      <div
                        key={request.id}
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              request.status === "pending"
                                ? "bg-amber-100 text-amber-600"
                                : "bg-green-100 text-green-600"
                            }`}
                          >
                            {request.status === "pending" ? (
                              <Clock className="h-5 w-5" />
                            ) : (
                              <CheckCircle className="h-5 w-5" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">{request.family}</h4>
                            <div className="flex items-center text-sm text-gray-500">
                              <Users className="h-3.5 w-3.5 mr-1" />
                              <span>
                                {request.children} enfant{request.children > 1 ? "s" : ""}
                              </span>
                              <span className="mx-1">•</span>
                              <span>{request.date}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={
                              request.status === "pending"
                                ? "bg-amber-100 text-amber-600 hover:bg-amber-200"
                                : "bg-green-100 text-green-600 hover:bg-green-200"
                            }
                          >
                            {request.status === "pending" ? "En attente" : "Acceptée"}
                          </Badge>
                          <Button variant="ghost" size="icon" onClick={() => handleViewDetails(request.id)}>
                            <ChevronRight className="h-5 w-5" />
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
                    <h3 className="font-medium mb-1">Aucune demande</h3>
                    <p className="text-gray-500 text-sm">Vous n'avez pas encore reçu de demandes</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-[#4FC3F7]">Votre profil</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="relative w-32 h-32 mx-auto md:mx-0">
                      <Image
                        src="/placeholder.svg?height=200&width=200"
                        alt="Photo de profil"
                        width={128}
                        height={128}
                        className="rounded-full object-cover"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute bottom-0 right-0 rounded-full bg-white border-2 border-white"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="font-bold text-xl">Sophie Martin</h3>
                      <p className="text-gray-600">Paris, France</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">Expérience</div>
                        <div className="font-medium">5 ans</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Capacité</div>
                        <div className="font-medium">3 enfants</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Langues</div>
                        <div className="font-medium">Français, Anglais</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Évaluation</div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-[#FFD54F] mr-1" />
                          <span className="font-medium">4.8/5</span>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline" className="text-[#4FC3F7] border-[#4FC3F7]" asChild>
                      <Link href="/dashboard/nounou/profile">Modifier mon profil</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-[#4FC3F7]">Demandes en attente</CardTitle>
              </CardHeader>
              <CardContent>
                {requests.filter((r) => r.status === "pending").length > 0 ? (
                  <div className="space-y-4">
                    {requests
                      .filter((r) => r.status === "pending")
                      .map((request) => (
                        <div key={request.id} className="p-4 rounded-lg border hover:bg-gray-50">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                                <Clock className="h-5 w-5 text-amber-600" />
                              </div>
                              <h4 className="font-medium">{request.family}</h4>
                            </div>
                            <Badge className="bg-amber-100 text-amber-600">En attente</Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <div className="text-sm text-gray-500">Date</div>
                              <div className="font-medium">{request.date}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Horaires</div>
                              <div className="font-medium">{request.time}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Enfants</div>
                              <div className="font-medium">
                                {request.children} enfant{request.children > 1 ? "s" : ""}
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button className="flex-1 bg-[#81C784] hover:bg-[#66BB6A] text-white">Accepter</Button>
                            <Button variant="outline" className="flex-1 border-red-300 text-red-500 hover:bg-red-50">
                              Refuser
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1 border-[#4FC3F7] text-[#4FC3F7]"
                              onClick={() => handleViewDetails(request.id)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Détails
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <AlertCircle className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="font-medium mb-1">Aucune demande en attente</h3>
                    <p className="text-gray-500 text-sm">Vous n'avez pas de demandes à traiter pour le moment</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-[#4FC3F7]">Demandes acceptées</CardTitle>
              </CardHeader>
              <CardContent>
                {requests.filter((r) => r.status === "accepted").length > 0 ? (
                  <div className="space-y-4">
                    {requests
                      .filter((r) => r.status === "accepted")
                      .map((request) => (
                        <div key={request.id} className="p-4 rounded-lg border hover:bg-gray-50">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                              </div>
                              <h4 className="font-medium">{request.family}</h4>
                            </div>
                            <Badge className="bg-green-100 text-green-600">Acceptée</Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <div className="text-sm text-gray-500">Date</div>
                              <div className="font-medium">{request.date}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Horaires</div>
                              <div className="font-medium">{request.time}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Enfants</div>
                              <div className="font-medium">
                                {request.children} enfant{request.children > 1 ? "s" : ""}
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button className="flex-1 bg-[#4FC3F7] hover:bg-[#29B6F6] text-white" asChild>
                              <Link href={`/dashboard/nounou/messages/${request.id}`}>
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Contacter
                              </Link>
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1 border-[#4FC3F7] text-[#4FC3F7]"
                              onClick={() => handleViewDetails(request.id)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Détails
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
                    <h3 className="font-medium mb-1">Aucune demande acceptée</h3>
                    <p className="text-gray-500 text-sm">Vous n'avez pas encore accepté de demandes</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-[#4FC3F7]">Mes disponibilités</CardTitle>
              </CardHeader>
              <CardContent>
                <AvailabilityCalendar />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
          {selectedRequestId && <ReservationDetails requestId={selectedRequestId} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}
