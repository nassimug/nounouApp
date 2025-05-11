"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function NannyRegistrationForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simuler un délai d'inscription
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard/nounou")
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="firstName">Prénom</Label>
        <Input id="firstName" placeholder="Prénom" required />
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
        <Label htmlFor="experience">Années d'expérience</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="<1">Moins d'1 an</SelectItem>
            <SelectItem value="1-3">1 à 3 ans</SelectItem>
            <SelectItem value="3-5">3 à 5 ans</SelectItem>
            <SelectItem value="5-10">5 à 10 ans</SelectItem>
            <SelectItem value="10+">Plus de 10 ans</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="capacity">Nombre d'enfants acceptés</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (optionnel)</Label>
        <Textarea
          id="description"
          placeholder="Parlez de votre expérience, vos qualités avec les enfants..."
          className="resize-none"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="agrementFile">Justificatif d'agrément</Label>
        <Input id="agrementFile" type="file" className="cursor-pointer" required />
        <p className="text-xs text-gray-500">Format PDF, JPG ou PNG (max 5 Mo)</p>
      </div>

      <Button type="submit" className="w-full bg-[#4FC3F7] hover:bg-[#29B6F6] text-white" disabled={isLoading}>
        {isLoading ? "Création en cours..." : "Créer mon compte nounou"}
      </Button>
    </form>
  )
}
