import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const _inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const _jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: {
    template: '%s | TOO115-2016',
    default: 'TOO115-2016 — Tecnologías Orientadas a Objetos',
  },
  description:
    'Plataforma interactiva para la materia Tecnologías Orientadas a Objetos (TOO115-2016). Aprende programación orientada a objetos, estructuras de datos y algoritmos con visualizaciones animadas y editor de código en línea.',
  keywords: [
    'TOO115',
    'programación orientada a objetos',
    'estructuras de datos',
    'algoritmos',
    'TypeScript',
    'Next.js',
  ],
  generator: 'v0.app',
  icons: {
    icon: '/icon.svg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#09090b',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-[#09090b]">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
