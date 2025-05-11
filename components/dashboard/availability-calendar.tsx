"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Save } from "lucide-react"

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

export function AvailabilityCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [view, setView] = useState<"calendar" | "weekly">("weekly")

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
    // Ici, vous pourriez envoyer les données à votre backend
    console.log("Saving availability:", weeklyAvailability)
    // Afficher un message de confirmation
    alert("Vos disponibilités ont été enregistrées avec succès !")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            variant="outline"
            className={view === "weekly" ? "bg-[#4FC3F7]/10 text-[#4FC3F7] border-[#4FC3F7]" : ""}
            onClick={() => setView("weekly")}
          >
            Hebdomadaire
          </Button>
          <Button
            variant="outline"
            className={view === "calendar" ? "bg-[#4FC3F7]/10 text-[#4FC3F7] border-[#4FC3F7]" : ""}
            onClick={() => setView("calendar")}
          >
            Calendrier
          </Button>
        </div>
        <Button className="bg-[#81C784] hover:bg-[#66BB6A] text-white" onClick={saveAvailability}>
          <Save className="h-4 w-4 mr-2" />
          Enregistrer
        </Button>
      </div>

      {view === "calendar" ? (
        <div className="flex justify-center">
          <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
        </div>
      ) : (
        <div className="space-y-6">
          {weekDays.map((day) => (
            <Card key={day.id} className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`all-${day.id}`}
                    checked={weeklyAvailability[day.id]?.length === timeSlots.length}
                    onCheckedChange={(checked) => toggleAllDay(day.id, checked === true)}
                  />
                  <Label htmlFor={`all-${day.id}`} className="font-medium">
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
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
