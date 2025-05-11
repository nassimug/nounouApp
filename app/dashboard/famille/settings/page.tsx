"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FamilyNavigation } from "@/components/dashboard/family-navigation"
import { Bell, Save, Smartphone, Trash2 } from "lucide-react"

export default function FamilySettingsPage() {
  const [activeTab, setActiveTab] = useState("account")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simuler un délai de sauvegarde
    setTimeout(() => {
      setIsLoading(false)
      alert("Paramètres mis à jour avec succès !")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#FCE4EC]/30">
      <FamilyNavigation />

      <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#FF80AB]">Paramètres</h1>
          <p className="text-gray-600">Gérez vos préférences et la sécurité de votre compte</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 md:w-[400px]">
            <TabsTrigger value="account" className="data-[state=active]:bg-[#FF80AB] data-[state=active]:text-white">
              Compte
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-[#FF80AB] data-[state=active]:text-white">
              Sécurité
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-[#FF80AB] data-[state=active]:text-white"
            >
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-[#FF80AB]">Informations du compte</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input id="firstName" defaultValue="Jean" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input id="lastName" defaultValue="Dupont" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="jean.dupont@example.com" />
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

                  <div className="space-y-2">
                    <Label htmlFor="childrenCount">Nombre d'enfants</Label>
                    <select
                      id="childrenCount"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      defaultValue="2"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5+">5 ou plus</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Langue de l'application</Label>
                    <select
                      id="language"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="fr">Français</option>
                      <option value="en">English</option>
                    </select>
                  </div>

                  <div className="pt-4 space-y-4">
                    <Button type="submit" className="bg-[#FF80AB] hover:bg-[#FF4081] text-white" disabled={isLoading}>
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
                          Enregistrer les modifications
                        </span>
                      )}
                    </Button>

                    <div className="border-t pt-4">
                      <h3 className="text-base font-medium text-red-500 mb-2">Supprimer mon compte</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Cette action est irréversible et supprimera définitivement toutes vos données.
                      </p>
                      <Button variant="outline" className="border-red-300 text-red-500 hover:bg-red-50">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Supprimer mon compte
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-[#FF80AB]">Sécurité du compte</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                    <Input id="currentPassword" type="password" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </div>

                  <div className="pt-2 text-sm text-gray-500">
                    <p>Votre mot de passe doit contenir :</p>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Au moins 8 caractères</li>
                      <li>Au moins une lettre majuscule</li>
                      <li>Au moins un chiffre</li>
                      <li>Au moins un caractère spécial</li>
                    </ul>
                  </div>

                  <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="twoFactorAuth" className="text-base">
                          Authentification à deux facteurs
                        </Label>
                        <p className="text-sm text-gray-500">
                          Renforcez la sécurité de votre compte avec une vérification supplémentaire.
                        </p>
                      </div>
                      <Switch id="twoFactorAuth" />
                    </div>

                    <Button type="submit" className="bg-[#FF80AB] hover:bg-[#FF4081] text-white" disabled={isLoading}>
                      {isLoading ? "Enregistrement..." : "Mettre à jour le mot de passe"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-[#FF80AB]">Préférences de notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium flex items-center gap-2">
                      <Bell className="h-5 w-5 text-[#FF80AB]" />
                      Notifications par email
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="emailNewNanny" className="flex-1">
                          Nouvelles nounous disponibles
                        </Label>
                        <Switch id="emailNewNanny" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="emailNewMessage" className="flex-1">
                          Nouveaux messages
                        </Label>
                        <Switch id="emailNewMessage" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="emailReservation" className="flex-1">
                          Confirmations de réservation
                        </Label>
                        <Switch id="emailReservation" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="emailReminders" className="flex-1">
                          Rappels de garde
                        </Label>
                        <Switch id="emailReminders" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium flex items-center gap-2">
                      <Smartphone className="h-5 w-5 text-[#FF80AB]" />
                      Notifications push
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="pushNewNanny" className="flex-1">
                          Nouvelles nounous disponibles
                        </Label>
                        <Switch id="pushNewNanny" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="pushNewMessage" className="flex-1">
                          Nouveaux messages
                        </Label>
                        <Switch id="pushNewMessage" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="pushReservation" className="flex-1">
                          Confirmations de réservation
                        </Label>
                        <Switch id="pushReservation" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="pushReminders" className="flex-1">
                          Rappels de garde
                        </Label>
                        <Switch id="pushReminders" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="bg-[#FF80AB] hover:bg-[#FF4081] text-white" disabled={isLoading}>
                    {isLoading ? "Enregistrement..." : "Enregistrer les préférences"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
