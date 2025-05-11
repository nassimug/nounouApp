"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2 } from "lucide-react"

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simuler un délai d'envoi
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FCE4EC] to-white flex flex-col items-center justify-center p-4">
      <Link href="/" className="absolute top-4 left-4 flex items-center gap-2">
        <Image
          src="/placeholder.svg?height=30&width=30"
          alt="Nounou Connect Logo"
          width={30}
          height={30}
          className="rounded-full bg-[#FF80AB]"
        />
        <span className="font-bold text-[#FF80AB]">Nounou Connect</span>
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-[#FF80AB]">Réinitialisation du mot de passe</CardTitle>
          <CardDescription>Entrez votre email pour recevoir un lien de réinitialisation</CardDescription>
        </CardHeader>
        <CardContent>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full bg-[#FF80AB] hover:bg-[#FF4081] text-white" disabled={isLoading}>
                {isLoading ? "Envoi en cours..." : "Envoyer le lien"}
              </Button>
            </form>
          ) : (
            <div className="flex flex-col items-center space-y-4 py-4">
              <CheckCircle2 className="h-16 w-16 text-[#81C784]" />
              <div className="text-center space-y-2">
                <h3 className="text-lg font-medium">Email envoyé !</h3>
                <p className="text-gray-500">
                  Un lien de réinitialisation a été envoyé à <span className="font-medium">{email}</span>. Veuillez
                  vérifier votre boîte de réception.
                </p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-center text-sm">
            <Link href="/auth/login" className="text-[#FF80AB] hover:underline">
              Retour à la connexion
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
