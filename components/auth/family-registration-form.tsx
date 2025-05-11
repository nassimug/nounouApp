"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function FamilyRegistrationForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simuler un délai d'inscription
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard/famille")
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Prénom</Label>
          <Input id="firstName" placeholder="Prénom" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Nom</Label>
          <Input id="lastName" placeholder="Nom" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="votre@email.com" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Mot de passe</Label>
        <Input id="password" type="password" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="city">Ville</Label>
        <Input id="city" placeholder="Votre ville" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="childrenCount">Nombre d'enfants</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="5+">5 ou plus</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="needs">Besoins spécifiques (optionnel)</Label>
        <Input id="needs" placeholder="Ex: Garde le mercredi, aide aux devoirs..." />
      </div>

      <Button type="submit" className="w-full bg-[#FF80AB] hover:bg-[#FF4081] text-white" disabled={isLoading}>
        {isLoading ? "Création en cours..." : "Créer mon compte famille"}
      </Button>
    </form>
  )
}
