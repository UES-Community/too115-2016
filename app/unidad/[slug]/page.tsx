import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { UNITS } from '@/lib/course-data'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { UnitDetail } from '@/components/unit/unit-detail'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const unit = UNITS.find((u) => u.id === slug)
  if (!unit) return {}
  return {
    title: `U${unit.number} — ${unit.title}`,
    description: unit.description,
  }
}

export function generateStaticParams() {
  return UNITS.map((u) => ({ slug: u.id }))
}

export default async function UnitPage({ params }: Props) {
  const { slug } = await params
  const unit = UNITS.find((u) => u.id === slug)
  if (!unit) notFound()

  const idx = UNITS.findIndex((u) => u.id === slug)
  const prev = UNITS[idx - 1] ?? null
  const next = UNITS[idx + 1] ?? null

  return (
    <div className="flex min-h-screen flex-col bg-[#09090b]">
      <Navbar />
      <main className="flex-1">
        <UnitDetail unit={unit} prev={prev} next={next} />
      </main>
      <Footer />
    </div>
  )
}
