"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NannyNavigation } from "@/components/dashboard/nanny-navigation"
import { Save, CalendarIcon, Clock, Check } from "lucide-react"
import { fr } from "date-fns/locale"

const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
]

const weekDays = [
  { id: "monday", label: "Lundi" },
  { id: "tuesday", label: "Mardi" },
  { id: "wednesday", label: "Mercredi" },
  { id: "thursday", label: "Jeudi" },
  { id: "friday", label: "Vendredi" },
  { id: "saturday", label: "Samedi" },
  { id: "sunday", label: "Dimanche" },
]

// Données fictives pour les réservations
const bookings = [
  {
    id: 1,
    date: new Date(2025, 4, 12), // 12 mai 2025
    family: "Famille Dupont",
    children: 2,
    time: "8h00 - 18h00",
    status: "confirmed",
  },
  {
    id: 2,
    date: new Date(2025, 4, 15), // 15 mai 2025
    family: "Famille Martin",
    children: 1,
    time: "13h00 - 17h30",
    status: "confirmed",
  },
  {
    id: 3,
    date: new Date(2025, 4, 20), // 20 mai 2025
    family: "Famille Leroy",
    children: 2,
    time: "9h00 - 16h00",
    status: "pending",
  },
]

export default function NannyAvailabilityPage() {
  const [activeTab, setActiveTab] = useState("weekly")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isLoading, setIsLoading] = useState(false)

  // État pour les disponibilités hebdomadaires
  const [weeklyAvailability, setWeeklyAvailability] = useState<Record<string, string[]>>({
    monday: ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
    tuesday: ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
    wednesday: ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
    thursday: ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
    friday: ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
    saturday: [],
    sunday: [],
  })

  const toggleTimeSlot = (day: string, time: string) => {
    setWeeklyAvailability((prev) => {
      const daySlots = [...(prev[day] || [])]

      if (daySlots.includes(time)) {
        return {
          ...prev,
          [day]: daySlots.filter((t) => t !== time),
        }
      } else {
        return {
          ...prev,
          [day]: [...daySlots, time].sort(),
        }
      }
    })
  }

  const toggleAllDay = (day: string, checked: boolean) => {
    setWeeklyAvailability((prev) => {
      if (checked) {
        return {
          ...prev,
          [day]: [...timeSlots],
        }
      } else {
        return {
          ...prev,
          [day]: [],
        }
      }
    })
  }

  const saveAvailability = () => {
    setIsLoading(true)
    // Simuler un délai de sauvegarde
    setTimeout(() => {
      setIsLoading(false)
      alert("Vos disponibilités ont été enregistrées avec succès !")
    }, 1500)
  }

  // Fonction pour vérifier si une date a des réservations
  const hasBooking = (date: Date) => {
    return bookings.some(
      (booking) =>
        booking.date.getDate() === date.getDate() &&
        booking.date.getMonth() === date.getMonth() &&
        booking.date.getFullYear() === date.getFullYear(),
    )
  }

  // Fonction pour obtenir les réservations d'une date
  const getBookingsForDate = (date: Date) => {
    return bookings.filter(
      (booking) =>
        booking.date.getDate() === date.getDate() &&
        booking.date.getMonth() === date.getMonth() &&
        booking.date.getFullYear() === date.getFullYear(),
    )
  }

  return (
    <div className="min-h-screen bg-[#E3F2FD]/30 bg-[url('/pattern-bg.png')]">
      <NannyNavigation />

      <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#4FC3F7]">Mes disponibilités</h1>
          <p className="text-gray-600">Gérez vos disponibilités et consultez vos réservations</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 md:w-[400px]">
            <TabsTrigger value="weekly" className="data-[state=active]:bg-[#4FC3F7] data-[state=active]:text-white">
              Hebdomadaire
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-[#4FC3F7] data-[state=active]:text-white">
              Calendrier
            </TabsTrigger>
          </TabsList>

          <div className="flex justify-end">
            <Button
              className="bg-[#81C784] hover:bg-[#66BB6A] text-white"
              onClick={saveAvailability}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Enregistrement...
                </span>
              ) : (
                <span className="flex items-center">
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer
                </span>
              )}
            </Button>
          </div>

          <TabsContent value="weekly" className="space-y-6">
            {weekDays.map((day) => (
              <Card key={day.id} className="border-2 border-[#4FC3F7]/20 shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`all-${day.id}`}
                        checked={weeklyAvailability[day.id]?.length === timeSlots.length}
                        onCheckedChange={(checked) => toggleAllDay(day.id, checked === true)}
                      />
                      <Label htmlFor={`all-${day.id}`} className="font-medium text-[#4FC3F7]">
                        {day.label}
                      </Label>
                    </div>
                    <div className="text-sm text-gray-500">
                      {weeklyAvailability[day.id]?.length || 0} créneaux sélectionnés
                    </div>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {timeSlots.map((time) => (
                      <div key={`${day.id}-${time}`} className="flex items-center gap-2">
                        <Checkbox
                          id={`${day.id}-${time}`}
                          checked={weeklyAvailability[day.id]?.includes(time)}
                          onCheckedChange={() => toggleTimeSlot(day.id, time)}
                        />
                        <Label htmlFor={`${day.id}-${time}`} className="text-sm">
                          {time}
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <Card className="border-2 border-[#4FC3F7]/20 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg text-[#4FC3F7] flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  Calendrier des réservations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      locale={fr}
                      className="rounded-md border"
                      modifiers={{
                        booked: (date) => hasBooking(date),
                      }}
                      modifiersStyles={{
                        booked: { backgroundColor: "#E3F2FD", color: "#4FC3F7", fontWeight: "bold" },
                      }}
                    />
                  </div>
                  <div className="md:w-1/2">
                    <h3 className="font-medium mb-4">
                      {date ? (
                        <>
                          Réservations du{" "}
                          {date.toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </>
                      ) : (
                        "Sélectionnez une date"
                      )}
                    </h3>

                    {date && getBookingsForDate(date).length > 0 ? (
                      <div className="space-y-3">
                        {getBookingsForDate(date).map((booking) => (
                          <div
                            key={booking.id}
                            className="p-3 border rounded-lg flex justify-between items-center hover:bg-gray-50"
                          >
                            <div>
                              <div className="font-medium">{booking.family}</div>
                              <div className="text-sm text-gray-500">
                                <span className="flex items-center">
                                  <Clock className="h-3.5 w-3.5 mr-1" />
                                  {booking.time}
                                </span>
                              </div>
                            </div>
                            <div
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                booking.status === "confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {booking.status === "confirmed" ? (
                                <span className="flex items-center">
                                  <Check className="h-3 w-3 mr-1" />
                                  Confirmé
                                </span>
                              ) : (
                                <span className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  En attente
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Clock className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                        <p>Aucune réservation pour cette date</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
