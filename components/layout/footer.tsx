import Link from 'next/link'
import { Code2 } from 'lucide-react'
import { COURSE, UNITS } from '@/lib/course-data'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#27272a] bg-[#09090b]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[oklch(0.72_0.19_198)] text-[#09090b]">
                <Code2 size={15} strokeWidth={2.5} />
              </span>
              <span className="font-mono text-sm font-semibold text-[#f4f4f5]">TOO115-2016</span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-[#52525b]">
              {COURSE.name} — plataforma interactiva de aprendizaje con visualizaciones y editor de código en línea.
            </p>
          </div>

          {/* Units */}
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#3f3f46]">
              Unidades
            </p>
            <ul className="space-y-2">
              {UNITS.map((u) => (
                <li key={u.id}>
                  <Link
                    href={`/unidad/${u.id}`}
                    className="text-xs text-[#52525b] transition-colors hover:text-[#a1a1aa]"
                  >
                    {u.number}. {u.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#3f3f46]">
              Información
            </p>
            <ul className="space-y-2">
              <li>
                <span className="text-xs text-[#52525b]">Semestre: {COURSE.semester}</span>
              </li>
              <li>
                <span className="text-xs text-[#52525b]">Créditos: {COURSE.credits}</span>
              </li>
              <li>
                <Link href="/editor" className="text-xs text-[#52525b] transition-colors hover:text-[#a1a1aa]">
                  Editor de código
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-[#1a1a1f] pt-6 sm:flex-row">
          <p className="font-mono text-[11px] text-[#3f3f46]">
            {COURSE.code} &copy; {new Date().getFullYear()}
          </p>
          <p className="text-[11px] text-[#3f3f46]">
            Programación · Estructuras de Datos · Algoritmos
          </p>
        </div>
      </div>
    </footer>
  )
}
