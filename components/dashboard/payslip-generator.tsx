"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, FileText, Download } from "lucide-react"

interface PayslipGeneratorProps {
  onClose: () => void
}

export function PayslipGenerator({ onClose }: PayslipGeneratorProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simuler un délai de génération
    setTimeout(() => {
      setIsLoading(false)
      setIsGenerated(true)
    }, 2000)
  }

  // Liste des mois pour le sélecteur
  const months = [
    { value: "01", label: "Janvier" },
    { value: "02", label: "Février" },
    { value: "03", label: "Mars" },
    { value: "04", label: "Avril" },
    { value: "05", label: "Mai" },
    { value: "06", label: "Juin" },
    { value: "07", label: "Juillet" },
    { value: "08", label: "Août" },
    { value: "09", label: "Septembre" },
    { value: "10", label: "Octobre" },
    { value: "11", label: "Novembre" },
    { value: "12", label: "Décembre" },
  ]

  // Obtenir l'année courante et les 2 années précédentes
  const currentYear = new Date().getFullYear()
  const years = [currentYear, currentYear - 1, currentYear - 2]

  return (
    <div className="space-y-6">
      {!isGenerated ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Informations de la fiche de paie</h3>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nanny">Nounou</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une nounou" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sophie">Sophie Martin</SelectItem>
                  <SelectItem value="marie">Marie Dubois</SelectItem>
                  <SelectItem value="camille">Camille Leroy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="period">Période</Label>
              <div className="grid grid-cols-2 gap-2">
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Mois" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Année" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hours">Nombre d'heures</Label>
              <Input id="hours" type="number" min="1" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hourlyRate">Taux horaire (€)</Label>
              <Input id="hourlyRate" type="number" min="1" step="0.01" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="extraHours">Heures supplémentaires</Label>
              <Input id="extraHours" type="number" min="0" defaultValue="0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="extraRate">Taux majoré (€)</Label>
              <Input id="extraRate" type="number" min="0" step="0.01" defaultValue="0" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalFees">Indemnités supplémentaires (€)</Label>
            <Input id="additionalFees" type="number" min="0" step="0.01" defaultValue="0" />
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full bg-[#FF80AB] hover:bg-[#FF4081] text-white" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center justify-center">
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
                  Génération en cours...
                </span>
              ) : (
                "Générer la fiche de paie"
              )}
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Fiche de paie générée</h3>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex flex-col items-center justify-center py-6 bg-gray-50 rounded-lg border border-dashed">
            <FileText className="h-16 w-16 text-[#FF80AB] mb-4" />
            <h4 className="font-medium text-lg mb-1">Fiche de paie - Mai 2025</h4>
            <p className="text-gray-500 mb-4">Sophie Martin</p>
            <div className="flex gap-2">
              <Button className="bg-[#FF80AB] hover:bg-[#FF4081] text-white">
                <Download className="h-4 w-4 mr-2" />
                Télécharger
              </Button>
              <Button variant="outline" className="border-[#FF80AB] text-[#FF80AB]">
                Envoyer par email
              </Button>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Récapitulatif</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Heures travaillées:</span>
                <span className="font-medium">40 heures</span>
              </div>
              <div className="flex justify-between">
                <span>Taux horaire:</span>
                <span className="font-medium">12,00 €</span>
              </div>
              <div className="flex justify-between">
                <span>Heures supplémentaires:</span>
                <span className="font-medium">5 heures</span>
              </div>
              <div className="flex justify-between">
                <span>Taux majoré:</span>
                <span className="font-medium">15,00 €</span>
              </div>
              <div className="flex justify-between">
                <span>Indemnités:</span>
                <span className="font-medium">50,00 €</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                <span>Total net:</span>
                <span>635,00 €</span>
              </div>
            </div>
          </div>

          <Button
            onClick={() => {
              setIsGenerated(false)
            }}
            variant="outline"
            className="w-full border-[#FF80AB] text-[#FF80AB]"
          >
            Générer une autre fiche de paie
          </Button>
        </div>
      )}
    </div>
  )
}
