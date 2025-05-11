import type React from "react"
import "./globals.css"
import "./print.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "Nounou Connect",
  description: "Plateforme de mise en relation entre familles et nounous",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
