"use client"
import Link from "next/link"
import { NannyNavigation } from "@/components/dashboard/nanny-navigation"
import { ReservationDetails } from "@/components/dashboard/reservation-details"

export default function ReservationDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-[#E3F2FD]/30">
      <NannyNavigation />

      <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        <div className="mb-6">
          <Link href="/dashboard/nounou" className="text-[#4FC3F7] hover:underline mb-2 inline-block">
            &larr; Retour au tableau de bord
          </Link>
          <h1 className="text-2xl font-bold text-[#4FC3F7]">Détails de la réservation</h1>
        </div>

        <ReservationDetails requestId={Number.parseInt(params.id)} />
      </main>
    </div>
  )
}
