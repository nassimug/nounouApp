"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { NannyNavigation } from "@/components/dashboard/nanny-navigation"
import { FileText, Download, Eye, Calendar, Users, FileCheck } from "lucide-react"

// Données fictives pour les fiches de paie
const payslips = [
  {
    id: 1,
    month: "Avril 2025",
    family: "Famille Dupont",
    amount: "850,00 €",
    date: "30/04/2025",
    status: "available",
  },
  {
    id: 2,
    month: "Mars 2025",
    family: "Famille Dupont",
    amount: "850,00 €",
    date: "31/03/2025",
    status: "available",
  },
  {
    id: 3,
    month: "Février 2025",
    family: "Famille Dupont",
    amount: "780,00 €",
    date: "28/02/2025",
    status: "available",
  },
  {
    id: 4,
    month: "Avril 2025",
    family: "Famille Martin",
    amount: "420,00 €",
    date: "30/04/2025",
    status: "available",
  },
  {
    id: 5,
    month: "Mars 2025",
    family: "Famille Martin",
    amount: "420,00 €",
    date: "31/03/2025",
    status: "available",
  },
]

// Données fictives pour les contrats
const contracts = [
  {
    id: 1,
    title: "Contrat de garde - Famille Dupont",
    startDate: "01/01/2025",
    endDate: "31/12/2025",
    status: "active",
  },
  {
    id: 2,
    title: "Contrat de garde - Famille Martin",
    startDate: "15/02/2025",
    endDate: "15/02/2026",
    status: "active",
  },
  {
    id: 3,
    title: "Contrat de garde - Famille Leroy",
    startDate: "01/09/2024",
    endDate: "30/06/2025",
    status: "active",
  },
]

export default function NannyDocumentsPage() {
  const [activeTab, setActiveTab] = useState("payslips")

  return (
    <div className="min-h-screen bg-[#E3F2FD]/30">
      <NannyNavigation />

      <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#4FC3F7]">Documents</h1>
          <p className="text-gray-600">Gérez vos fiches de paie et contrats</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 md:w-[400px]">
            <TabsTrigger value="payslips" className="data-[state=active]:bg-[#4FC3F7] data-[state=active]:text-white">
              Fiches de paie
            </TabsTrigger>
            <TabsTrigger value="contracts" className="data-[state=active]:bg-[#4FC3F7] data-[state=active]:text-white">
              Contrats
            </TabsTrigger>
          </TabsList>

          <TabsContent value="payslips" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-[#4FC3F7]">Mes fiches de paie</CardTitle>
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
                          <div className="w-10 h-10 rounded-full bg-[#4FC3F7]/10 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-[#4FC3F7]" />
                          </div>
                          <div>
                            <h4 className="font-medium">{payslip.month}</h4>
                            <div className="flex items-center text-sm text-gray-500">
                              <Users className="h-3.5 w-3.5 mr-1" />
                              <span>{payslip.family}</span>
                              <span className="mx-1">•</span>
                              <span>{payslip.amount}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 self-end md:self-auto">
                          <Badge className="bg-green-100 text-green-600 hover:bg-green-200">Disponible</Badge>
                          <Button variant="outline" size="sm" className="text-[#4FC3F7] border-[#4FC3F7]" asChild>
                            <Link href={`/dashboard/nounou/documents/payslip/${payslip.id}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              Voir
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" className="text-[#4FC3F7] border-[#4FC3F7]">
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
                    <p className="text-gray-500 text-sm">Vous n'avez pas encore reçu de fiches de paie</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contracts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-[#4FC3F7]">Mes contrats</CardTitle>
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
                          <div className="w-10 h-10 rounded-full bg-[#4FC3F7]/10 flex items-center justify-center">
                            <FileCheck className="h-5 w-5 text-[#4FC3F7]" />
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
                          <Button variant="outline" size="sm" className="text-[#4FC3F7] border-[#4FC3F7]" asChild>
                            <Link href={`/dashboard/nounou/documents/contract/${contract.id}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              Voir
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" className="text-[#4FC3F7] border-[#4FC3F7]">
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
