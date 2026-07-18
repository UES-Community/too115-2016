'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Box,
  Layers,
  GitBranch,
  BarChart2,
  Puzzle,
  ArrowRight,
  BookOpen,
} from 'lucide-react'
import { UNITS } from '@/lib/course-data'

const ICONS: Record<string, React.ElementType> = {
  Box,
  Layers,
  GitBranch,
  BarChart2,
  Puzzle,
}

export function UnitsGrid() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-[#52525b]">
              Plan de estudio
            </p>
            <h2 className="text-2xl font-bold text-[#f4f4f5] sm:text-3xl">
              Unidades del curso
            </h2>
          </div>
          <span className="font-mono text-sm text-[#3f3f46]">
            {UNITS.length} unidades
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {UNITS.map((unit, i) => {
            const Icon = ICONS[unit.icon] ?? BookOpen
            return (
              <motion.div
                key={unit.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={`/unidad/${unit.id}`}
                  className="group flex h-full flex-col rounded-xl border border-[#27272a] bg-[#111113] p-6 transition-colors hover:border-[#3f3f46] hover:bg-[#1a1a1f]"
                >
                  {/* Icon + number */}
                  <div className="flex items-start justify-between">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ background: unit.colorDim }}
                    >
                      <Icon size={18} style={{ color: unit.color }} strokeWidth={1.75} />
                    </div>
                    <span
                      className="font-mono text-[11px] font-semibold"
                      style={{ color: unit.color }}
                    >
                      U{unit.number.toString().padStart(2, '0')}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 text-base font-semibold text-[#f4f4f5] leading-snug">
                    {unit.title}
                  </h3>
                  <p className="mt-1 text-sm text-[#52525b]">{unit.subtitle}</p>

                  {/* Description */}
                  <p className="mt-3 flex-1 text-xs leading-relaxed text-[#71717a]">
                    {unit.description}
                  </p>

                  {/* Topics count + arrow */}
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-xs text-[#52525b]">
                      {unit.topics.length} tema{unit.topics.length !== 1 ? 's' : ''}
                    </span>
                    <span
                      className="flex items-center gap-1 text-xs font-medium transition-transform group-hover:translate-x-0.5"
                      style={{ color: unit.color }}
                    >
                      Ver unidad
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
