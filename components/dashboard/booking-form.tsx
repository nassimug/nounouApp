"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { CalendarIcon, Clock } from "lucide-react"

interface Nanny {
  id: string
  name: string
  hourlyRate: string
}

interface BookingFormProps {
  nanny: Nanny
  onSubmit: () => void
}

export function BookingForm({ nanny, onSubmit }: BookingFormProps) {
  const [date, setDate] = useState<Date>()
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [childrenCount, setChildrenCount] = useState("1")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simuler un délai de traitement
    setTimeout(() => {
      setIsLoading(false)
      onSubmit()
    }, 1500)
  }

  // Générer les options d'heures
  const timeOptions = []
  for (let i = 7; i <= 20; i++) {
    const hour = i < 10 ? `0${i}` : `${i}`
    timeOptions.push(`${hour}:00`)
    timeOptions.push(`${hour}:30`)
  }

  // Calculer le prix estimé
  const calculateEstimatedPrice = () => {
    if (!startTime || !endTime) return "0"

    const start = Number.parseInt(startTime.split(":")[0]) + Number.parseInt(startTime.split(":")[1]) / 60
    const end = Number.parseInt(endTime.split(":")[0]) + Number.parseInt(endTime.split(":")[1]) / 60
    const hours = end - start

    if (hours <= 0) return "0"

    const rate = Number.parseFloat(nanny.hourlyRate.replace("€/h", ""))
    return (hours * rate).toFixed(2)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal" id="date">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP", { locale: fr }) : "Sélectionner une date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus locale={fr} />
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startTime">Heure de début</Label>
          <Select value={startTime} onValueChange={setStartTime}>
            <SelectTrigger id="startTime">
              <SelectValue placeholder="Début" />
            </SelectTrigger>
            <SelectContent>
              {timeOptions.map((time) => (
                <SelectItem key={`start-${time}`} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="endTime">Heure de fin</Label>
          <Select value={endTime} onValueChange={setEndTime}>
            <SelectTrigger id="endTime">
              <SelectValue placeholder="Fin" />
            </SelectTrigger>
            <SelectContent>
              {timeOptions.map((time) => (
                <SelectItem key={`end-${time}`} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="childrenCount">Nombre d'enfants</Label>
        <Select value={childrenCount} onValueChange={setChildrenCount}>
          <SelectTrigger id="childrenCount">
            <SelectValue placeholder="Sélectionner" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 enfant</SelectItem>
            <SelectItem value="2">2 enfants</SelectItem>
            <SelectItem value="3">3 enfants</SelectItem>
            <SelectItem value="4">4 enfants</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes spéciales (optionnel)</Label>
        <Input id="notes" placeholder="Allergies, besoins particuliers, etc." />
      </div>

      <div className="pt-4 border-t">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-500">Prix estimé:</div>
          <div className="text-xl font-bold text-[#FF80AB]">{calculateEstimatedPrice()}€</div>
        </div>
        <Button
          type="submit"
          className="w-full bg-[#FF80AB] hover:bg-[#FF4081] text-white"
          disabled={!date || !startTime || !endTime || isLoading}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Réservation en cours...
            </span>
          ) : (
            <span className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              Réserver maintenant
            </span>
          )}
        </Button>
      </div>
    </form>
  )
}
