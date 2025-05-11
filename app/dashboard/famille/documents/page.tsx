"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FamilyNavigation } from "@/components/dashboard/family-navigation"
import { FileText, Download, Eye, Calendar, User, FileCheck, FilePlus } from "lucide-react"
import { PayslipGenerator } from "@/components/dashboard/payslip-generator"

// Données fictives pour les fiches de paie
const payslips = [
  {
    id: 1,
    month: "Avril 2025",
    nanny: "Sophie Martin",
    amount: "850,00 €",
    date: "30/04/2025",
    status: "available",
  },
  {
    id: 2,
    month: "Mars 2025",
    nanny: "Sophie Martin",
    amount: "850,00 €",
    date: "31/03/2025",
    status: "available",
  },
  {
    id: 3,
    month: "Février 2025",
    nanny: "Sophie Martin",
    amount: "780,00 €",
    date: "28/02/2025",
    status: "available",
  },
  {
    id: 4,
    month: "Avril 2025",
    nanny: "Marie Dubois",
    amount: "420,00 €",
    date: "30/04/2025",
    status: "available",
  },
]

// Données fictives pour les attestations fiscales
const taxCertificates = [
  {
    id: 1,
    year: "2024",
    amount: "9 850,00 €",
    date: "31/12/2024",
    status: "available",
  },
  {
    id: 2,
    year: "2023",
    amount: "8 720,00 €",
    date: "31/12/2023",
    status: "available",
  },
]

// Données fictives pour les contrats
const contracts = [
  {
    id: 1,
    title: "Contrat de garde - Sophie Martin",
    startDate: "01/01/2025",
    endDate: "31/12/2025",
    status: "active",
  },
  {
    id: 2,
    title: "Contrat de garde - Marie Dubois",
    startDate: "15/02/2025",
    endDate: "15/02/2026",
    status: "active",
  },
]

export default function FamilyDocumentsPage() {
  const [activeTab, setActiveTab] = useState("payslips")
  const [showPayslipGenerator, setShowPayslipGenerator] = useState(false)

  return (
    <div className="min-h-screen bg-[#FCE4EC]/30">
      <FamilyNavigation />

      <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#FF80AB]">Documents</h1>
          <p className="text-gray-600">Gérez vos fiches de paie, attestations fiscales et contrats</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 md:w-[400px]">
            <TabsTrigger value="payslips" className="data-[state=active]:bg-[#FF80AB] data-[state=active]:text-white">
              Fiches de paie
            </TabsTrigger>
            <TabsTrigger value="tax" className="data-[state=active]:bg-[#FF80AB] data-[state=active]:text-white">
              Attestations
            </TabsTrigger>
            <TabsTrigger value="contracts" className="data-[state=active]:bg-[#FF80AB] data-[state=active]:text-white">
              Contrats
            </TabsTrigger>
          </TabsList>

          <TabsContent value="payslips" className="space-y-4">
            <div className="flex justify-end">
              <Button
                className="bg-[#FF80AB] hover:bg-[#FF4081] text-white"
                onClick={() => setShowPayslipGenerator(true)}
              >
                <FilePlus className="h-4 w-4 mr-2" />
                Générer une fiche de paie
              </Button>
            </div>

            {showPayslipGenerator && (
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle className="text-lg text-[#FF80AB]">Générer une fiche de paie</CardTitle>
                </CardHeader>
                <CardContent>
                  <PayslipGenerator onClose={() => setShowPayslipGenerator(false)} />
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-[#FF80AB]">Mes fiches de paie</CardTitle>
              </CardHeader>
              <CardContent>
                {payslips.length > 0 ? (
                  <div className="space-y-4">
                    {payslips.map((payslip) => (
                      <div
                        key={payslip.id}
                        className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-3 mb-3 md:mb-0">
                          <div className="w-10 h-10 rounded-full bg-[#FF80AB]/10 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-[#FF80AB]" />
                          </div>
                          <div>
                            <h4 className="font-medium">{payslip.month}</h4>
                            <div className="flex items-center text-sm text-gray-500">
                              <User className="h-3.5 w-3.5 mr-1" />
                              <span>{payslip.nanny}</span>
                              <span className="mx-1">•</span>
                              <span>{payslip.amount}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 self-end md:self-auto">
                          <Badge className="bg-green-100 text-green-600 hover:bg-green-200">Disponible</Badge>
                          <Button variant="outline" size="sm" className="text-[#FF80AB] border-[#FF80AB]" asChild>
                            <Link href={`/dashboard/famille/documents/payslip/${payslip.id}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              Voir
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" className="text-[#FF80AB] border-[#FF80AB]">
                            <Download className="h-4 w-4 mr-1" />
                            Télécharger
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <FileText className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="font-medium mb-1">Aucune fiche de paie</h3>
                    <p className="text-gray-500 text-sm">Vous n'avez pas encore généré de fiches de paie</p>
                    <Button
                      className="mt-4 bg-[#FF80AB] hover:bg-[#FF4081] text-white"
                      onClick={() => setShowPayslipGenerator(true)}
                    >
                      Générer une fiche de paie
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tax" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-[#FF80AB]">Mes attestations fiscales</CardTitle>
              </CardHeader>
              <CardContent>
                {taxCertificates.length > 0 ? (
                  <div className="space-y-4">
                    {taxCertificates.map((certificate) => (
                      <div
                        key={certificate.id}
                        className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-3 mb-3 md:mb-0">
                          <div className="w-10 h-10 rounded-full bg-[#FF80AB]/10 flex items-center justify-center">
                            <FileCheck className="h-5 w-5 text-[#FF80AB]" />
                          </div>
                          <div>
                            <h4 className="font-medium">Attestation fiscale {certificate.year}</h4>
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="h-3.5 w-3.5 mr-1" />
                              <span>Année {certificate.year}</span>
                              <span className="mx-1">•</span>
                              <span>Montant : {certificate.amount}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 self-end md:self-auto">
                          <Badge className="bg-green-100 text-green-600 hover:bg-green-200">Disponible</Badge>
                          <Button variant="outline" size="sm" className="text-[#FF80AB] border-[#FF80AB]" asChild>
                            <Link href={`/dashboard/famille/documents/tax-certificate/${certificate.id}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              Voir
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" className="text-[#FF80AB] border-[#FF80AB]">
                            <Download className="h-4 w-4 mr-1" />
                            Télécharger
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <FileCheck className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="font-medium mb-1">Aucune attestation fiscale</h3>
                    <p className="text-gray-500 text-sm">Vos attestations fiscales apparaîtront ici</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contracts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-[#FF80AB]">Mes contrats</CardTitle>
              </CardHeader>
              <CardContent>
                {contracts.length > 0 ? (
                  <div className="space-y-4">
                    {contracts.map((contract) => (
                      <div
                        key={contract.id}
                        className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-3 mb-3 md:mb-0">
                          <div className="w-10 h-10 rounded-full bg-[#FF80AB]/10 flex items-center justify-center">
                            <FileCheck className="h-5 w-5 text-[#FF80AB]" />
                          </div>
                          <div>
                            <h4 className="font-medium">{contract.title}</h4>
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="h-3.5 w-3.5 mr-1" />
                              <span>
                                Du {contract.startDate} au {contract.endDate}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 self-end md:self-auto">
                          <Badge className="bg-green-100 text-green-600 hover:bg-green-200">Actif</Badge>
                          <Button variant="outline" size="sm" className="text-[#FF80AB] border-[#FF80AB]" asChild>
                            <Link href={`/dashboard/famille/documents/contract/${contract.id}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              Voir
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" className="text-[#FF80AB] border-[#FF80AB]">
                            <Download className="h-4 w-4 mr-1" />
                            Télécharger
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <FileCheck className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="font-medium mb-1">Aucun contrat</h3>
                    <p className="text-gray-500 text-sm">Vous n'avez pas encore de contrats enregistrés</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
