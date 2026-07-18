import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { EditorShell } from '@/components/editor/editor-shell'

export const metadata: Metadata = {
  title: 'Editor de Código',
  description: 'Editor interactivo en línea para practicar TypeScript y algoritmos del curso TOO115-2016.',
}

export default function EditorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#09090b]">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <EditorShell />
      </main>
      <Footer />
    </div>
  )
}
