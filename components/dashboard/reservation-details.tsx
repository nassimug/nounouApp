"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Calendar, Clock, Users, MapPin, Phone, Mail, Info, AlertTriangle } from "lucide-react"

interface Child {
  name: string
  age: string
  allergies?: string
  specialNeeds?: string
  image: string
}

interface Family {
  id: number
  name: string
  address: string
  phone: string
  email: string
  children: Child[]
  image: string
}

interface ReservationDetailsProps {
  requestId: number
}

// Données fictives pour la démonstration
const dummyFamily: Family = {
  id: 1,
  name: "Famille Dupont",
  address: "123 Avenue des Champs-Élysées, Paris",
  phone: "06 12 34 56 78",
  email: "dupont@example.com",
  children: [
    {
      name: "Emma",
      age: "4 ans",
      allergies: "Arachides",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Lucas",
      age: "2 ans",
      specialNeeds: "Doudou requis pour la sieste",
      image: "/placeholder.svg?height=100&width=100",
    },
  ],
  image: "/placeholder.svg?height=200&width=200",
}

const dummyReservation = {
  id: 1,
  date: "12 mai 2025",
  startTime: "8h00",
  endTime: "18h00",
  status: "accepted",
  specialInstructions:
    "Emma a son cours de danse à 14h, les affaires sont dans son sac rose. Lucas fait généralement une sieste vers 13h pendant environ 1h30.",
  paymentStatus: "pending",
  amount: "100€",
}

export function ReservationDetails({ requestId }: ReservationDetailsProps) {
  const [activeTab, setActiveTab] = useState("details")
  const [showConfirmation, setShowConfirmation] = useState(false)

  // Simuler la récupération des données en fonction de l'ID
  const family = dummyFamily
  const reservation = dummyReservation

  return (
    <Card className="overflow-hidden border-2 border-[#4FC3F7]/30 bg-white rounded-xl shadow-md">
      <CardHeader className="bg-[#4FC3F7]/10 border-b border-[#4FC3F7]/20 pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-[#4FC3F7]">Détails de la réservation</CardTitle>
          <Badge
            className={reservation.status === "pending" ? "bg-amber-100 text-amber-600" : "bg-green-100 text-green-600"}
          >
            {reservation.status === "pending" ? "En attente" : "Acceptée"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full rounded-none border-b grid grid-cols-3">
            <TabsTrigger
              value="details"
              className="data-[state=active]:bg-[#4FC3F7]/10 data-[state=active]:text-[#4FC3F7] rounded-none"
            >
              Réservation
            </TabsTrigger>
            <TabsTrigger
              value="family"
              className="data-[state=active]:bg-[#4FC3F7]/10 data-[state=active]:text-[#4FC3F7] rounded-none"
            >
              Famille
            </TabsTrigger>
            <TabsTrigger
              value="children"
              className="data-[state=active]:bg-[#4FC3F7]/10 data-[state=active]:text-[#4FC3F7] rounded-none"
            >
              Enfants
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-sm text-gray-500 flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-[#4FC3F7]" />
                  Date
                </div>
                <div className="font-medium">{reservation.date}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-500 flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-[#4FC3F7]" />
                  Horaires
                </div>
                <div className="font-medium">
                  {reservation.startTime} - {reservation.endTime}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-500 flex items-center">
                  <Users className="h-4 w-4 mr-1 text-[#4FC3F7]" />
                  Enfants
                </div>
                <div className="font-medium">{family.children.length} enfants</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-500 flex items-center">
                  <Info className="h-4 w-4 mr-1 text-[#4FC3F7]" />
                  Statut du paiement
                </div>
                <div className="font-medium">
                  {reservation.paymentStatus === "pending" ? (
                    <span className="text-amber-600">En attente</span>
                  ) : (
                    <span className="text-green-600">Payé</span>
                  )}
                </div>
              </div>
            </div>

            {reservation.specialInstructions && (
              <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-100">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-amber-700 mb-1">Instructions spéciales</h4>
                    <p className="text-sm text-amber-700">{reservation.specialInstructions}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-gray-500">Montant total:</div>
                <div className="text-xl font-bold text-[#4FC3F7]">{reservation.amount}</div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-[#4FC3F7] hover:bg-[#29B6F6] text-white" asChild>
                  <Link href={`/dashboard/nounou/messages/${family.id}`}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contacter la famille
                  </Link>
                </Button>

                <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex-1 border-red-300 text-red-500 hover:bg-red-50">
                      Annuler
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-center">Confirmer l'annulation</DialogTitle>
                    </DialogHeader>
                    <div className="p-4 text-center">
                      <div className="mx-auto w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                        <AlertTriangle className="h-6 w-6 text-red-500" />
                      </div>
                      <p className="mb-4">
                        Êtes-vous sûr de vouloir annuler cette réservation ? Cette action ne peut pas être annulée.
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1" onClick={() => setShowConfirmation(false)}>
                          Retour
                        </Button>
                        <Button className="flex-1 bg-red-500 hover:bg-red-600 text-white">
                          Confirmer l'annulation
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="family" className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <Image
                  src={family.image || "/placeholder.svg"}
                  alt={family.name}
                  width={120}
                  height={120}
                  className="rounded-lg object-cover"
                />
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="font-bold text-xl">{family.name}</h3>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-[#4FC3F7] mr-2 mt-0.5" />
                    <span>{family.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-[#4FC3F7] mr-2" />
                    <a href={`tel:${family.phone}`} className="text-[#4FC3F7] hover:underline">
                      {family.phone}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-[#4FC3F7] mr-2" />
                    <a href={`mailto:${family.email}`} className="text-[#4FC3F7] hover:underline">
                      {family.email}
                    </a>
                  </div>
                </div>

                <Button className="bg-[#4FC3F7] hover:bg-[#29B6F6] text-white" asChild>
                  <Link href={`/dashboard/nounou/messages/${family.id}`}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contacter la famille
                  </Link>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="children" className="p-6">
            <div className="space-y-6">
              {family.children.map((child, index) => (
                <div key={index} className="flex gap-4 p-4 rounded-lg border hover:bg-gray-50">
                  <div className="flex-shrink-0">
                    <Image
                      src={child.image || "/placeholder.svg"}
                      alt={child.name}
                      width={80}
                      height={80}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg">{child.name}</h4>
                    <p className="text-gray-600">{child.age}</p>

                    {(child.allergies || child.specialNeeds) && (
                      <div className="mt-2 space-y-2">
                        {child.allergies && (
                          <div className="flex items-start">
                            <AlertTriangle className="h-4 w-4 text-amber-500 mr-1 mt-0.5" />
                            <span className="text-sm text-amber-700">
                              <strong>Allergies:</strong> {child.allergies}
                            </span>
                          </div>
                        )}
                        {child.specialNeeds && (
                          <div className="flex items-start">
                            <Info className="h-4 w-4 text-blue-500 mr-1 mt-0.5" />
                            <span className="text-sm text-blue-700">
                              <strong>Besoins spécifiques:</strong> {child.specialNeeds}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
