"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FamilyNavigation } from "@/components/dashboard/family-navigation"
import { ArrowLeft, Download, Printer, Send, FileCheck } from "lucide-react"
import { generatePDF } from "@/utils/pdf-generator"

// Données fictives pour les attestations fiscales
const taxCertificates = [
  {
    id: "1",
    year: "2024",
    familyName: "Famille Dupont",
    familyAddress: "45 avenue Victor Hugo, 75016 Paris",
    familyTaxId: "1234567890123",
    totalAmount: 9850,
    childrenNames: ["Emma Dupont", "Lucas Dupont"],
    childrenAges: ["5 ans", "3 ans"],
    date: "31/12/2024",
  },
  {
    id: "2",
    year: "2023",
    familyName: "Famille Dupont",
    familyAddress: "45 avenue Victor Hugo, 75016 Paris",
    familyTaxId: "1234567890123",
    totalAmount: 8720,
    childrenNames: ["Emma Dupont", "Lucas Dupont"],
    childrenAges: ["4 ans", "2 ans"],
    date: "31/12/2023",
  },
]

export default function TaxCertificateViewPage() {
  const params = useParams()
  const certificate = taxCertificates.find((c) => c.id === params.id) || taxCertificates[0]
  const certificateRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPDF = async () => {
    await generatePDF("certificate-content", `attestation-fiscale-${certificate.year}`)
  }

  const handleSendEmail = () => {
    alert("L'attestation fiscale a été envoyée par email.")
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
          id="certificate-content"
          ref={certificateRef}
          className="border-2 border-[#FF80AB]/20 shadow-md max-w-3xl mx-auto"
        >
          <CardHeader className="border-b">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <FileCheck className="h-6 w-6 mr-2 text-[#FF80AB]" />
                <CardTitle className="text-xl text-[#FF80AB]">Attestation fiscale - Année {certificate.year}</CardTitle>
              </div>
              <div className="text-sm text-gray-500">Émise le {certificate.date}</div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <h3 className="font-medium text-[#FF80AB]">Bénéficiaire</h3>
              <div className="text-gray-700">{certificate.familyName}</div>
              <div className="text-gray-700">{certificate.familyAddress}</div>
              <div className="text-gray-700">Numéro fiscal: {certificate.familyTaxId}</div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium text-[#FF80AB] mb-3">Enfants concernés</h3>
              <div className="space-y-2">
                {certificate.childrenNames.map((name, index) => (
                  <div key={index} className="flex justify-between py-1 border-b border-dashed">
                    <span>{name}</span>
                    <div className="font-medium">{certificate.childrenAges[index]}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium text-[#FF80AB] mb-3">Montant total des dépenses</h3>
              <div className="flex justify-between py-2 font-bold text-lg">
                <span>Montant total payé pour l'année {certificate.year}</span>
                <div className="text-[#FF80AB]">{certificate.totalAmount.toLocaleString()}€</div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
              <p>
                Cette attestation fiscale est établie pour vous permettre de bénéficier des avantages fiscaux liés à
                l'emploi d'un(e) assistant(e) maternel(le) ou d'une garde d'enfants à domicile.
              </p>
              <p className="mt-2">
                Conformément à l'article 199 sexdecies du Code Général des Impôts, vous pouvez bénéficier d'un crédit
                d'impôt de 50% des dépenses effectivement supportées, retenues dans la limite de plafonds définis par la
                législation fiscale en vigueur.
              </p>
              <p className="mt-2">
                Pour toute question concernant cette attestation, veuillez contacter le support Nounou Connect.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
