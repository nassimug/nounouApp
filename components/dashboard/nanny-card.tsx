"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageSquare, Star, MapPin, Clock, Users, Languages } from "lucide-react"

interface Nanny {
  id: number
  name: string
  city: string
  experience: string
  rating: number
  childrenCapacity: number
  languages: string[]
  availability: string[]
  distance: string
  image: string
}

interface NannyCardProps {
  nanny: Nanny
}

export function NannyCard({ nanny }: NannyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <Image
          src={nanny.image || "/placeholder.svg"}
          alt={nanny.name}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 rounded-full bg-white/80 hover:bg-white ${
            isFavorite ? "text-[#FF80AB]" : "text-gray-500"
          }`}
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? "fill-[#FF80AB]" : ""}`} />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg">{nanny.name}</h3>
            <div className="flex items-center text-gray-500 text-sm">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              <span>
                {nanny.city} • {nanny.distance}
              </span>
            </div>
          </div>
          <div className="flex items-center bg-[#FFD54F]/20 px-2 py-1 rounded-md">
            <Star className="h-4 w-4 text-[#FFD54F] mr-1" />
            <span className="font-medium">{nanny.rating}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <Clock className="h-4 w-4 mr-1 text-[#4FC3F7]" />
            <span>{nanny.experience}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Users className="h-4 w-4 mr-1 text-[#4FC3F7]" />
            <span>{nanny.childrenCapacity} enfants max</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center mb-1">
            <Languages className="h-4 w-4 mr-1 text-[#4FC3F7]" />
            <span className="text-sm font-medium">Langues parlées</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            {nanny.languages.map((language, index) => (
              <Badge key={index} variant="outline" className="bg-[#4FC3F7]/10 text-[#4FC3F7] border-[#4FC3F7]/30">
                {language}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center mb-1">
            <Clock className="h-4 w-4 mr-1 text-[#4FC3F7]" />
            <span className="text-sm font-medium">Disponibilités</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            {nanny.availability.map((day, index) => (
              <Badge key={index} variant="outline" className="bg-[#81C784]/10 text-[#81C784] border-[#81C784]/30">
                {day}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1 bg-[#FF80AB] hover:bg-[#FF4081] text-white" asChild>
            <Link href={`/dashboard/famille/nanny/${nanny.id}`}>Voir le profil</Link>
          </Button>
          <Button variant="outline" className="flex-1 border-[#4FC3F7] text-[#4FC3F7] hover:bg-[#4FC3F7]/10" asChild>
            <Link href={`/dashboard/famille/messages?open=${nanny.id}`}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Contacter
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
