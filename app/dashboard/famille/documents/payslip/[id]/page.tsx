"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FamilyNavigation } from "@/components/dashboard/family-navigation"
import { ArrowLeft, Download, Printer, Send, FileText } from "lucide-react"
import { generatePDF } from "@/utils/pdf-generator"

// Données fictives pour les fiches de paie
const payslips = [
  {
    id: "1",
    month: "Avril 2025",
    nanny: "Sophie Martin",
    nannyAddress: "123 rue de Paris, 75001 Paris",
    familyName: "Famille Dupont",
    familyAddress: "45 avenue Victor Hugo, 75016 Paris",
    date: "30/04/2025",
    hours: 40,
    hourlyRate: 12,
    extraHours: 5,
    extraRate: 15,
    additionalFees: 50,
    totalGross: 555,
    socialContributions: 55.5,
    totalNet: 499.5,
  },
  {
    id: "2",
    month: "Mars 2025",
    nanny: "Sophie Martin",
    nannyAddress: "123 rue de Paris, 75001 Paris",
    familyName: "Famille Dupont",
    familyAddress: "45 avenue Victor Hugo, 75016 Paris",
    date: "31/03/2025",
    hours: 42,
    hourlyRate: 12,
    extraHours: 3,
    extraRate: 15,
    additionalFees: 45,
    totalGross: 549,
    socialContributions: 54.9,
    totalNet: 494.1,
  },
]

export default function PayslipViewPage() {
  const params = useParams()
  const payslip = payslips.find((p) => p.id === params.id) || payslips[0]
  const payslipRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPDF = async () => {
    await generatePDF("payslip-content", `fiche-de-paie-${payslip.month.replace(/ /g, "-")}`)
  }

  const handleSendEmail = () => {
    alert("La fiche de paie a été envoyée par email.")
  }

  return (
    <div className="min-h-screen bg-[#FCE4EC]/30 bg-[url('/pattern-bg.png')]">
      <FamilyNavigation />

      <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        <div className="mb-6 flex justify-between items-center">
          <Button variant="outline" className="text-[#FF80AB] border-[#FF80AB]" asChild>
            <Link href="/dashboard/famille/documents">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux documents
            </Link>
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" className="text-[#FF80AB] border-[#FF80AB]" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Imprimer
            </Button>
            <Button variant="outline" className="text-[#FF80AB] border-[#FF80AB]" onClick={handleDownloadPDF}>
              <Download className="h-4 w-4 mr-2" />
              Télécharger PDF
            </Button>
            <Button variant="outline" className="text-[#FF80AB] border-[#FF80AB]" onClick={handleSendEmail}>
              <Send className="h-4 w-4 mr-2" />
              Envoyer
            </Button>
          </div>
        </div>

        <Card
          id="payslip-content"
          ref={payslipRef}
          className="border-2 border-[#FF80AB]/20 shadow-md max-w-3xl mx-auto"
        >
          <CardHeader className="border-b">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <FileText className="h-6 w-6 mr-2 text-[#FF80AB]" />
                <CardTitle className="text-xl text-[#FF80AB]">Fiche de paie - {payslip.month}</CardTitle>
              </div>
              <div className="text-sm text-gray-500">Émise le {payslip.date}</div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="font-medium text-[#FF80AB]">Employeur</h3>
                <div className="text-gray-700">{payslip.familyName}</div>
                <div className="text-gray-700">{payslip.familyAddress}</div>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-[#FF80AB]">Salarié(e)</h3>
                <div className="text-gray-700">{payslip.nanny}</div>
                <div className="text-gray-700">{payslip.nannyAddress}</div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium text-[#FF80AB] mb-3">Détails de la rémunération</h3>
              <div className="space-y-2">
                <div className="flex justify-between py-1 border-b border-dashed">
                  <span>Heures normales</span>
                  <div className="text-right">
                    <div>
                      {payslip.hours} heures × {payslip.hourlyRate}€/h
                    </div>
                    <div className="font-medium">{payslip.hours * payslip.hourlyRate}€</div>
                  </div>
                </div>
                <div className="flex justify-between py-1 border-b border-dashed">
                  <span>Heures supplémentaires</span>
                  <div className="text-right">
                    <div>
                      {payslip.extraHours} heures × {payslip.extraRate}€/h
                    </div>
                    <div className="font-medium">{payslip.extraHours * payslip.extraRate}€</div>
                  </div>
                </div>
                <div className="flex justify-between py-1 border-b border-dashed">
                  <span>Indemnités</span>
                  <div className="font-medium">{payslip.additionalFees}€</div>
                </div>
                <div className="flex justify-between py-1 border-b border-dashed">
                  <span className="font-medium">Total brut</span>
                  <div className="font-medium">{payslip.totalGross}€</div>
                </div>
                <div className="flex justify-between py-1 border-b border-dashed">
                  <span>Cotisations sociales (10%)</span>
                  <div className="font-medium">-{payslip.socialContributions}€</div>
                </div>
                <div className="flex justify-between py-2 font-bold text-lg">
                  <span>Net à payer</span>
                  <div className="text-[#FF80AB]">{payslip.totalNet}€</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
              <p>
                Cette fiche de paie est établie conformément à la Convention Collective Nationale des Salariés du
                Particulier Employeur.
              </p>
              <p className="mt-2">
                Pour toute question concernant cette fiche de paie, veuillez contacter le support Nounou Connect.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
