"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Camera, Save, Upload } from "lucide-react"
import { NannyNavigation } from "@/components/dashboard/nanny-navigation"
import Image from "next/image"

export default function NannyProfilePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=200&width=200")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simuler un délai de sauvegarde
    setTimeout(() => {
      setIsLoading(false)
      alert("Profil mis à jour avec succès !")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#E3F2FD]/30">
      <NannyNavigation />

      <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#4FC3F7]">Mon profil</h1>
          <p className="text-gray-600">Gérez vos informations personnelles et professionnelles</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg text-[#4FC3F7]">Photo de profil</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="relative mb-6">
                  <Image
                    src={profileImage || "/placeholder.svg"}
                    alt="Photo de profil"
                    width={150}
                    height={150}
                    className="rounded-full object-cover border-4 border-white shadow-md"
                  />
                  <Button
                    size="icon"
                    className="absolute bottom-0 right-0 rounded-full bg-[#4FC3F7] hover:bg-[#29B6F6] text-white"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4 w-full">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="profileVisibility" className="font-medium">
                      Profil visible
                    </Label>
                    <Switch id="profileVisibility" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="availableForWork" className="font-medium">
                      Disponible pour garder
                    </Label>
                    <Switch id="availableForWork" defaultChecked />
                  </div>

                  <div className="pt-4">
                    <Label htmlFor="agrementFile" className="font-medium block mb-2">
                      Justificatif d'agrément
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 mb-2">Glissez votre fichier ici ou</p>
                      <Button variant="outline" size="sm" className="text-[#4FC3F7] border-[#4FC3F7]">
                        Parcourir
                      </Button>
                      <p className="text-xs text-gray-400 mt-2">PDF, JPG ou PNG (max 5 Mo)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg text-[#4FC3F7]">Informations personnelles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input id="firstName" defaultValue="Sophie" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input id="lastName" defaultValue="Martin" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="sophie.martin@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" type="tel" defaultValue="06 12 34 56 78" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Ville</Label>
                    <Input id="city" defaultValue="Paris" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Code postal</Label>
                    <Input id="postalCode" defaultValue="75001" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input id="address" defaultValue="123 rue de Paris" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="experience">Années d'expérience</Label>
                    <Select defaultValue="5-10">
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
                    <Label htmlFor="childrenCapacity">Nombre d'enfants acceptés</Label>
                    <Select defaultValue="3">
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="languages">Langues parlées</Label>
                  <Select defaultValue="fr,en">
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">Anglais</SelectItem>
                      <SelectItem value="fr,en">Français, Anglais</SelectItem>
                      <SelectItem value="fr,es">Français, Espagnol</SelectItem>
                      <SelectItem value="fr,en,es">Français, Anglais, Espagnol</SelectItem>
                      <SelectItem value="fr,en,de">Français, Anglais, Allemand</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    rows={5}
                    defaultValue="Je suis une nounou expérimentée avec plus de 5 ans d'expérience dans la garde d'enfants. J'adore organiser des activités créatives et éducatives. Je suis patiente, attentionnée et je m'adapte aux besoins spécifiques de chaque enfant."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialSkills">Compétences particulières</Label>
                  <Textarea
                    id="specialSkills"
                    rows={3}
                    defaultValue="Premiers secours, aide aux devoirs, activités artistiques, cuisine pour enfants"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#4FC3F7] hover:bg-[#29B6F6] text-white"
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
                      Enregistrer mon profil
                    </span>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </main>
    </div>
  )
}
