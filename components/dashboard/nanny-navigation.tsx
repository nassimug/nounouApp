"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Home, MessageSquare, Calendar, FileText, Settings, Menu, X, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMobile } from "@/hooks/use-mobile"

export function NannyNavigation() {
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const navItems = [
    { icon: Home, label: "Accueil", href: "/dashboard/nounou" },
    { icon: User, label: "Profil", href: "/dashboard/nounou/profile" },
    { icon: MessageSquare, label: "Messages", href: "/dashboard/nounou/messages" },
    { icon: Calendar, label: "Disponibilités", href: "/dashboard/nounou/availability" },
    { icon: FileText, label: "Documents", href: "/dashboard/nounou/documents" },
    { icon: Settings, label: "Paramètres", href: "/dashboard/nounou/settings" },
  ]

  const handleLogout = () => {
    // Rediriger vers la page d'accueil
    router.push("/")
  }

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#4FC3F7]/10 text-gray-700 hover:text-[#4FC3F7]"
        >
          <item.icon className="h-5 w-5" />
          <span>{item.label}</span>
        </Link>
      ))}
    </>
  )

  return (
    <>
      {/* Desktop Navigation */}
      <header className="bg-white border-b border-gray-200 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Image
                src="/placeholder.svg?height=32&width=32"
                alt="Nounou Connect Logo"
                width={32}
                height={32}
                className="rounded-full bg-[#4FC3F7]"
              />
              <span className="font-bold text-[#4FC3F7]">Nounou Connect</span>
            </div>

            <nav className="flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex flex-col items-center px-3 py-2 rounded-md hover:bg-[#4FC3F7]/10 text-gray-700 hover:text-[#4FC3F7]"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-xs mt-1">{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <Button variant="outline" className="text-[#4FC3F7] border-[#4FC3F7]" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Se déconnecter
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <header className="bg-white border-b border-gray-200 md:hidden sticky top-0 z-10">
        <div className="flex justify-between items-center h-14 px-4">
          <div className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=28&width=28"
              alt="Nounou Connect Logo"
              width={28}
              height={28}
              className="rounded-full bg-[#4FC3F7]"
            />
            <span className="font-bold text-[#4FC3F7]">Nounou Connect</span>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[350px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/placeholder.svg?height=28&width=28"
                      alt="Nounou Connect Logo"
                      width={28}
                      height={28}
                      className="rounded-full bg-[#4FC3F7]"
                    />
                    <span className="font-bold text-[#4FC3F7]">Nounou Connect</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <nav className="flex flex-col space-y-1">
                  <NavLinks />
                </nav>

                <div className="mt-auto pt-6">
                  <Button variant="outline" className="w-full text-[#4FC3F7] border-[#4FC3F7]" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Se déconnecter
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-10">
        <nav className="flex justify-around items-center h-16">
          <Link href="/dashboard/nounou" className="flex flex-col items-center px-3 py-2 text-[#4FC3F7]">
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Accueil</span>
          </Link>
          <Link href="/dashboard/nounou/profile" className="flex flex-col items-center px-3 py-2 text-gray-500">
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">Profil</span>
          </Link>
          <Link href="/dashboard/nounou/messages" className="flex flex-col items-center px-3 py-2 text-gray-500">
            <MessageSquare className="h-6 w-6" />
            <span className="text-xs mt-1">Messages</span>
          </Link>
          <Link href="/dashboard/nounou/availability" className="flex flex-col items-center px-3 py-2 text-gray-500">
            <Calendar className="h-6 w-6" />
            <span className="text-xs mt-1">Disponibilités</span>
          </Link>
          <Link href="/dashboard/nounou/settings" className="flex flex-col items-center px-3 py-2 text-gray-500">
            <Settings className="h-6 w-6" />
            <span className="text-xs mt-1">Paramètres</span>
          </Link>
        </nav>
      </div>
    </>
  )
}
