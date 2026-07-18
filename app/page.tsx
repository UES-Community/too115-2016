import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Hero } from '@/components/home/hero'
import { UnitsGrid } from '@/components/home/units-grid'
import { ComplexityTable } from '@/components/home/complexity-table'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#09090b]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <UnitsGrid />
        <ComplexityTable />
      </main>
      <Footer />
    </div>
  )
}
