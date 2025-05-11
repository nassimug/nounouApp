import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FCE4EC] to-white flex flex-col bg-[url('/pattern-bg.png')]">
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-center md:justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="Nounou Connect Logo"
                width={40}
                height={40}
                className="rounded-full bg-[#FF80AB]"
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#4FC3F7] rounded-full animate-bounce"></div>
            </div>
            <h1 className="text-2xl font-bold text-[#FF80AB] hidden md:block">Nounou Connect</h1>
          </div>
          <div className="hidden md:flex gap-4">
            <Button variant="ghost" className="text-gray-600 hover:text-[#FF80AB] hover:bg-[#FF80AB]/10">
              À propos
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:text-[#FF80AB] hover:bg-[#FF80AB]/10">
              Comment ça marche
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:text-[#FF80AB] hover:bg-[#FF80AB]/10">
              Contact
            </Button>
            <Button className="bg-[#4FC3F7] hover:bg-[#29B6F6] text-white rounded-full">Se connecter</Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="text-center mb-12 relative">
          <div className="absolute -top-10 -left-10 w-20 h-20 bg-[#FFD54F]/20 rounded-full animate-pulse hidden md:block"></div>
          <div className="absolute -bottom-10 -right-10 w-16 h-16 bg-[#81C784]/20 rounded-full animate-pulse hidden md:block"></div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#FF80AB] relative">
            <span className="relative inline-block">
              Nounou Connect
              <span className="absolute -top-6 -right-6 text-2xl animate-bounce">✨</span>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            Trouvez la nounou idéale pour vos enfants ou proposez vos services en quelques clics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <Card className="border-2 border-[#FF80AB] hover:shadow-lg transition-shadow rounded-3xl overflow-hidden relative group">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern-bg.png')] opacity-10"></div>
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-[#FF80AB]/20 rounded-full hidden group-hover:block transition-all duration-300"></div>
            <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-[#FF80AB]/20 rounded-full hidden group-hover:block transition-all duration-300"></div>

            <CardContent className="p-6 flex flex-col items-center text-center relative z-10">
              <div className="w-24 h-24 rounded-full bg-[#FF80AB]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Image
                  src="/placeholder.svg?height=60&width=60"
                  alt="Famille"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-[#FF80AB]">Je suis une famille</h2>
              <p className="text-gray-600 mb-6">
                Trouvez une nounou de confiance pour vos enfants, consultez les profils et gérez vos réservations.
              </p>
              <Link href="/auth/register?role=famille" className="w-full">
                <Button className="w-full bg-[#FF80AB] hover:bg-[#FF4081] text-white rounded-full">
                  Créer un compte famille
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#4FC3F7] hover:shadow-lg transition-shadow rounded-3xl overflow-hidden relative group">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern-bg.png')] opacity-10"></div>
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-[#4FC3F7]/20 rounded-full hidden group-hover:block transition-all duration-300"></div>
            <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-[#4FC3F7]/20 rounded-full hidden group-hover:block transition-all duration-300"></div>

            <CardContent className="p-6 flex flex-col items-center text-center relative z-10">
              <div className="w-24 h-24 rounded-full bg-[#4FC3F7]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Image
                  src="/placeholder.svg?height=60&width=60"
                  alt="Nounou"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-[#4FC3F7]">Je suis une nounou</h2>
              <p className="text-gray-600 mb-6">
                Créez votre profil, gérez vos disponibilités et trouvez des familles près de chez vous.
              </p>
              <Link href="/auth/register?role=nounou" className="w-full">
                <Button className="w-full bg-[#4FC3F7] hover:bg-[#29B6F6] text-white rounded-full">
                  Créer un compte nounou
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Vous avez déjà un compte ?</p>
          <Link href="/auth/login">
            <Button
              variant="outline"
              className="border-[#81C784] text-[#81C784] hover:bg-[#81C784] hover:text-white rounded-full"
            >
              Se connecter
            </Button>
          </Link>
        </div>
      </main>

      <footer className="bg-gray-50 py-8 mt-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern-bg.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
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
              <span className="text-lg font-bold text-[#FF80AB]">Nounou Connect</span>
            </div>
            <div className="flex gap-6 mb-4 md:mb-0">
              <Link href="#" className="text-gray-600 hover:text-[#FF80AB]">
                Conditions d'utilisation
              </Link>
              <Link href="#" className="text-gray-600 hover:text-[#FF80AB]">
                Politique de confidentialité
              </Link>
              <Link href="#" className="text-gray-600 hover:text-[#FF80AB]">
                Contact
              </Link>
            </div>
            <div className="text-gray-500 text-sm">© 2025 Nounou Connect. Tous droits réservés.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
