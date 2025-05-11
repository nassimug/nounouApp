"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FamilyRegistrationForm } from "@/components/auth/family-registration-form"
import { NannyRegistrationForm } from "@/components/auth/nanny-registration-form"

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("famille")

  useEffect(() => {
    const role = searchParams.get("role")
    if (role === "famille" || role === "nounou") {
      setActiveTab(role)
    }
  }, [searchParams])

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
          <CardTitle className="text-2xl text-[#FF80AB]">Créer un compte</CardTitle>
          <CardDescription>Rejoignez Nounou Connect et commencez votre expérience</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="famille" className="data-[state=active]:bg-[#FF80AB] data-[state=active]:text-white">
                Famille
              </TabsTrigger>
              <TabsTrigger value="nounou" className="data-[state=active]:bg-[#4FC3F7] data-[state=active]:text-white">
                Nounou
              </TabsTrigger>
            </TabsList>
            <TabsContent value="famille">
              <FamilyRegistrationForm />
            </TabsContent>
            <TabsContent value="nounou">
              <NannyRegistrationForm />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-gray-500">
            En vous inscrivant, vous acceptez nos{" "}
            <Link href="#" className="text-[#FF80AB] hover:underline">
              Conditions d'utilisation
            </Link>{" "}
            et notre{" "}
            <Link href="#" className="text-[#FF80AB] hover:underline">
              Politique de confidentialité
            </Link>
          </div>
          <div className="text-center text-sm">
            Vous avez déjà un compte ?{" "}
            <Link href="/auth/login" className="text-[#FF80AB] hover:underline">
              Se connecter
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
