'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Box,
  Layers,
  GitBranch,
  BarChart2,
  Puzzle,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Code2,
} from 'lucide-react'
import type { Unit } from '@/lib/course-data'
import { CodeBlock } from '@/components/ui/code-block'
import { cn } from '@/lib/utils'

const ICONS: Record<string, React.ElementType> = {
  Box,
  Layers,
  GitBranch,
  BarChart2,
  Puzzle,
}

interface Props {
  unit: Unit
  prev: Unit | null
  next: Unit | null
}

export function UnitDetail({ unit, prev, next }: Props) {
  const [openTopic, setOpenTopic] = useState<string | null>(unit.topics[0]?.id ?? null)
  const Icon = ICONS[unit.icon] ?? BookOpen

  return (
    <div>
      {/* Hero banner */}
      <div
        className="relative border-b border-[#27272a] py-14"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 60% 50%, ${unit.colorDim}, transparent)`,
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-[#52525b]">
            <Link href="/" className="transition-colors hover:text-[#a1a1aa]">
              Inicio
            </Link>
            <ChevronRight size={12} />
            <span className="text-[#a1a1aa]">Unidad {unit.number}</span>
          </nav>

          <div className="flex items-start gap-5">
            <div
              className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
              style={{ background: unit.colorDim }}
            >
              <Icon size={22} style={{ color: unit.color }} strokeWidth={1.75} />
            </div>
            <div>
              <p className="font-mono text-xs" style={{ color: unit.color }}>
                UNIDAD {unit.number}
              </p>
              <h1 className="mt-1 text-3xl font-bold text-[#f4f4f5] sm:text-4xl">{unit.title}</h1>
              <p className="mt-1 text-base text-[#71717a]">{unit.subtitle}</p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#52525b]">
                {unit.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          {/* Sidebar — topic list */}
          <aside>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-[#3f3f46]">
              Temas
            </p>
            <nav aria-label="Temas de la unidad" className="flex flex-col gap-1">
              {unit.topics.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setOpenTopic(openTopic === t.id ? null : t.id)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors',
                    openTopic === t.id
                      ? 'bg-[#1a1a1f] text-[#f4f4f5]'
                      : 'text-[#71717a] hover:bg-[#1a1a1f] hover:text-[#f4f4f5]',
                  )}
                >
                  <Code2
                    size={14}
                    strokeWidth={1.75}
                    style={{ color: openTopic === t.id ? unit.color : undefined }}
                  />
                  <span className="flex-1 leading-snug">{t.title}</span>
                  <ChevronDown
                    size={13}
                    className={cn(
                      'shrink-0 transition-transform text-[#3f3f46]',
                      openTopic === t.id && 'rotate-180',
                    )}
                  />
                </button>
              ))}
            </nav>

            {/* Quick nav */}
            <div className="mt-8 flex flex-col gap-2">
              {prev && (
                <Link
                  href={`/unidad/${prev.id}`}
                  className="flex items-center gap-2 rounded-lg border border-[#27272a] px-3 py-2 text-xs text-[#71717a] transition-colors hover:border-[#3f3f46] hover:text-[#a1a1aa]"
                >
                  <ChevronLeft size={13} />
                  <div>
                    <p className="text-[10px] text-[#3f3f46]">Anterior</p>
                    <p className="font-medium">{prev.title}</p>
                  </div>
                </Link>
              )}
              {next && (
                <Link
                  href={`/unidad/${next.id}`}
                  className="flex items-center gap-2 rounded-lg border border-[#27272a] px-3 py-2 text-xs text-[#71717a] transition-colors hover:border-[#3f3f46] hover:text-[#a1a1aa]"
                >
                  <div className="flex-1 text-right">
                    <p className="text-[10px] text-[#3f3f46]">Siguiente</p>
                    <p className="font-medium">{next.title}</p>
                  </div>
                  <ChevronRight size={13} />
                </Link>
              )}
            </div>
          </aside>

          {/* Main — topic detail */}
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              {unit.topics.map((topic) =>
                openTopic === topic.id ? (
                  <motion.article
                    key={topic.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Topic header */}
                    <div className="mb-6 rounded-xl border border-[#27272a] bg-[#111113] p-6">
                      <h2 className="text-xl font-bold text-[#f4f4f5]">{topic.title}</h2>
                      <p className="mt-2 text-sm leading-relaxed text-[#71717a]">
                        {topic.description}
                      </p>
                    </div>

                    {/* Code example */}
                    {topic.codeExample && (
                      <div>
                        <div className="mb-3 flex items-center gap-2">
                          <Code2 size={14} style={{ color: unit.color }} />
                          <p className="text-sm font-medium text-[#a1a1aa]">
                            Ejemplo de código
                          </p>
                        </div>
                        <CodeBlock
                          code={topic.codeExample}
                          language={topic.lang ?? 'typescript'}
                        />

                        {/* Open in editor CTA */}
                        <div className="mt-4 flex justify-end">
                          <Link
                            href={`/editor?code=${encodeURIComponent(topic.codeExample)}&lang=${topic.lang ?? 'typescript'}`}
                            className="flex items-center gap-1.5 rounded-lg border border-[#27272a] bg-[#111113] px-3 py-2 text-xs text-[#71717a] transition-colors hover:border-[#3f3f46] hover:text-[#f4f4f5]"
                          >
                            <Code2 size={12} />
                            Abrir en el editor
                          </Link>
                        </div>
                      </div>
                    )}
                  </motion.article>
                ) : null,
              )}
            </AnimatePresence>

            {/* If nothing open */}
            {!openTopic && (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#27272a] py-16 text-center">
                <BookOpen size={28} className="text-[#3f3f46]" />
                <p className="mt-3 text-sm text-[#52525b]">
                  Selecciona un tema del panel izquierdo
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
