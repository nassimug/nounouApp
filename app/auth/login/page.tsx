"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("famille")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simuler un délai de connexion
    setTimeout(() => {
      setIsLoading(false)
      if (activeTab === "famille") {
        router.push("/dashboard/famille")
      } else {
        router.push("/dashboard/nounou")
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FCE4EC] to-white flex flex-col items-center justify-center p-4 bg-[url('/pattern-bg.png')]">
      <Link href="/" className="absolute top-4 left-4 flex items-center gap-2">
        <div className="relative">
          <Image
            src="/placeholder.svg?height=30&width=30"
            alt="Nounou Connect Logo"
            width={30}
            height={30}
            className="rounded-full bg-[#FF80AB]"
          />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#4FC3F7] rounded-full animate-bounce"></div>
        </div>
        <span className="font-bold text-[#FF80AB]">Nounou Connect</span>
      </Link>

      <Card className="w-full max-w-md border-2 border-[#FF80AB]/20 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern-bg.png')] opacity-5"></div>
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#FF80AB]/10 rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-[#4FC3F7]/10 rounded-full"></div>

        <CardHeader className="text-center relative z-10">
          <CardTitle className="text-2xl text-[#FF80AB] flex items-center justify-center">
            <span className="relative">
              Connexion
              <span className="absolute -top-4 -right-4 text-lg animate-bounce">✨</span>
            </span>
          </CardTitle>
          <CardDescription>Connectez-vous à votre compte Nounou Connect</CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6 rounded-full">
              <TabsTrigger
                value="famille"
                className="data-[state=active]:bg-[#FF80AB] data-[state=active]:text-white rounded-full"
              >
                Famille
              </TabsTrigger>
              <TabsTrigger
                value="nounou"
                className="data-[state=active]:bg-[#4FC3F7] data-[state=active]:text-white rounded-full"
              >
                Nounou
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  required
                  className="rounded-full border-2 focus:border-[#FF80AB] focus:ring-[#FF80AB]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  className="rounded-full border-2 focus:border-[#FF80AB] focus:ring-[#FF80AB]"
                />
                <div className="text-right">
                  <Link href="/auth/reset-password" className="text-sm text-[#FF80AB] hover:underline">
                    Mot de passe oublié ?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                className={`w-full rounded-full ${
                  activeTab === "famille" ? "bg-[#FF80AB] hover:bg-[#FF4081]" : "bg-[#4FC3F7] hover:bg-[#29B6F6]"
                } text-white`}
                disabled={isLoading}
              >
                {isLoading ? "Connexion en cours..." : "Se connecter"}
              </Button>
            </form>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center relative z-10">
          <div className="text-center text-sm">
            Vous n'avez pas de compte ?{" "}
            <Link href="/auth/register" className="text-[#FF80AB] hover:underline">
              S'inscrire
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
