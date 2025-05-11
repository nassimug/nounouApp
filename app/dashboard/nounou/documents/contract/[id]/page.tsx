"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NannyNavigation } from "@/components/dashboard/nanny-navigation"
import { ArrowLeft, Download, Printer, Send, FileCheck, CheckCircle } from "lucide-react"
import { generatePDF } from "@/utils/pdf-generator"

// Données fictives pour les contrats
const contracts = [
  {
    id: "1",
    title: "Contrat de garde - Famille Dupont",
    nannyName: "Sophie Martin",
    nannyAddress: "123 rue de Paris, 75001 Paris",
    familyName: "Famille Dupont",
    familyAddress: "45 avenue Victor Hugo, 75016 Paris",
    startDate: "01/01/2025",
    endDate: "31/12/2025",
    childrenNames: ["Emma Dupont", "Lucas Dupont"],
    childrenAges: ["5 ans", "3 ans"],
    workSchedule: [
      { day: "Lundi", hours: "8h00 - 18h00" },
      { day: "Mardi", hours: "8h00 - 18h00" },
      { day: "Jeudi", hours: "8h00 - 18h00" },
    ],
    hourlyRate: 12,
    extraHourRate: 15,
    additionalTerms: "Repas fournis par la famille. Activités extérieures autorisées.",
    status: "active",
    signatureDate: "15/12/2024",
  },
  {
    id: "2",
    title: "Contrat de garde - Famille Martin",
    nannyName: "Sophie Martin",
    nannyAddress: "123 rue de Paris, 75001 Paris",
    familyName: "Famille Martin",
    familyAddress: "27 boulevard Saint-Michel, 75005 Paris",
    startDate: "15/02/2025",
    endDate: "15/02/2026",
    childrenNames: ["Léa Martin"],
    childrenAges: ["4 ans"],
    workSchedule: [
      { day: "Mercredi", hours: "8h00 - 18h00" },
      { day: "Vendredi", hours: "8h00 - 18h00" },
    ],
    hourlyRate: 13,
    extraHourRate: 16,
    additionalTerms: "Repas fournis par la nounou. Sorties au parc autorisées.",
    status: "active",
    signatureDate: "01/02/2025",
  },
]

export default function NannyContractViewPage() {
  const params = useParams()
  const contract = contracts.find((c) => c.id === params.id) || contracts[0]
  const contractRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPDF = async () => {
    await generatePDF("nanny-contract-content", `contrat-${contract.familyName.replace(/ /g, "-")}`)
  }

  const handleSendEmail = () => {
    alert("Le contrat a été envoyé par email.")
  }

  return (
    <div className="min-h-screen bg-[#E3F2FD]/30 bg-[url('/pattern-bg.png')]">
      <NannyNavigation />

      <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        <div className="mb-6 flex justify-between items-center">
          <Button variant="outline" className="text-[#4FC3F7] border-[#4FC3F7]" asChild>
            <Link href="/dashboard/nounou/documents">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux documents
            </Link>
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" className="text-[#4FC3F7] border-[#4FC3F7]" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Imprimer
            </Button>
            <Button variant="outline" className="text-[#4FC3F7] border-[#4FC3F7]" onClick={handleDownloadPDF}>
              <Download className="h-4 w-4 mr-2" />
              Télécharger PDF
            </Button>
            <Button variant="outline" className="text-[#4FC3F7] border-[#4FC3F7]" onClick={handleSendEmail}>
              <Send className="h-4 w-4 mr-2" />
              Envoyer
            </Button>
          </div>
        </div>

        <Card
          id="nanny-contract-content"
          ref={contractRef}
          className="border-2 border-[#4FC3F7]/20 shadow-md max-w-3xl mx-auto"
        >
          <CardHeader className="border-b">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <FileCheck className="h-6 w-6 mr-2 text-[#4FC3F7]" />
                <CardTitle className="text-xl text-[#4FC3F7]">{contract.title}</CardTitle>
              </div>
              <div className="flex items-center">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    contract.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <CheckCircle className="mr-1 h-3 w-3" />
                  {contract.status === "active" ? "Actif" : "Inactif"}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="font-medium text-[#4FC3F7]">Employeur</h3>
                <div className="text-gray-700">{contract.familyName}</div>
                <div className="text-gray-700">{contract.familyAddress}</div>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-[#4FC3F7]">Salarié(e)</h3>
                <div className="text-gray-700">{contract.nannyName}</div>
                <div className="text-gray-700">{contract.nannyAddress}</div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium text-[#4FC3F7] mb-3">Enfants concernés</h3>
              <div className="space-y-2">
                {contract.childrenNames.map((name, index) => (
                  <div key={index} className="flex justify-between py-1 border-b border-dashed">
                    <span>{name}</span>
                    <div className="font-medium">{contract.childrenAges[index]}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium text-[#4FC3F7] mb-3">Période du contrat</h3>
              <div className="flex justify-between py-1">
                <span>Date de début</span>
                <div className="font-medium">{contract.startDate}</div>
              </div>
              <div className="flex justify-between py-1">
                <span>Date de fin</span>
                <div className="font-medium">{contract.endDate}</div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium text-[#4FC3F7] mb-3">Horaires de travail</h3>
              <div className="space-y-2">
                {contract.workSchedule.map((schedule, index) => (
                  <div key={index} className="flex justify-between py-1 border-b border-dashed">
                    <span>{schedule.day}</span>
                    <div className="font-medium">{schedule.hours}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium text-[#4FC3F7] mb-3">Rémunération</h3>
              <div className="flex justify-between py-1 border-b border-dashed">
                <span>Taux horaire</span>
                <div className="font-medium">{contract.hourlyRate}€/h</div>
              </div>
              <div className="flex justify-between py-1 border-b border-dashed">
                <span>Taux horaire majoré</span>
                <div className="font-medium">{contract.extraHourRate}€/h</div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium text-[#4FC3F7] mb-3">Conditions particulières</h3>
              <p className="text-gray-700">{contract.additionalTerms}</p>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium text-[#4FC3F7] mb-3">Signatures</h3>
              <div className="flex justify-between py-1">
                <span>Date de signature</span>
                <div className="font-medium">{contract.signatureDate}</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-sm text-gray-500 mb-2">Signature de l'employeur</div>
                  <div className="h-16 flex items-center justify-center">
                    <span className="text-[#FF80AB] italic">{contract.familyName}</span>
                  </div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-sm text-gray-500 mb-2">Signature du/de la salarié(e)</div>
                  <div className="h-16 flex items-center justify-center">
                    <span className="text-[#4FC3F7] italic">{contract.nannyName}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
              <p>
                Ce contrat est établi conformément à la Convention Collective Nationale des Salariés du Particulier
                Employeur.
              </p>
              <p className="mt-2">
                Pour toute question concernant ce contrat, veuillez contacter le support Nounou Connect.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
