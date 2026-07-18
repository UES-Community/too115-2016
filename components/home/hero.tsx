'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Code2, BookOpen } from 'lucide-react'
import { COURSE, UNITS } from '@/lib/course-data'

const HERO_CODE = `// Árbol Binario de Búsqueda en TypeScript
class BST<T extends number> {
  private raiz: Nodo<T> | null = null;

  insertar(valor: T): void {
    this.raiz = this._ins(this.raiz, valor);
  }

  inorder(): T[] {
    const res: T[] = [];
    const visit = (n: Nodo<T> | null) => {
      if (!n) return;
      visit(n.izq); res.push(n.valor); visit(n.der);
    };
    visit(this.raiz);
    return res; // siempre ordenado
  }
}`

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[#27272a] bg-[#09090b]">
      {/* Grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      {/* Cyan glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-64 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full"
        style={{ background: 'oklch(0.72 0.19 198 / 0.08)', filter: 'blur(80px)' }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#27272a] bg-[#111113] px-3 py-1">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: 'oklch(0.72 0.18 150)' }}
              />
              <span className="font-mono text-[11px] text-[#71717a]">
                {COURSE.code} · {COURSE.semester}
              </span>
            </div>

            <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-[#f4f4f5] sm:text-5xl">
              {COURSE.name}
            </h1>

            <p className="mt-4 text-base leading-relaxed text-[#71717a] sm:text-lg">
              Domina la programación orientada a objetos, estructuras de datos y
              algoritmos con visualizaciones paso a paso y un editor de código interactivo.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {['OOP', 'Pilas & Colas', 'Árboles', 'Grafos', 'Ordenamiento', 'Patrones GoF'].map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-[#27272a] bg-[#111113] px-2.5 py-0.5 font-mono text-[11px] text-[#52525b]"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/unidad/${UNITS[0].id}`}
                className="flex items-center gap-2 rounded-lg bg-[oklch(0.72_0.19_198)] px-4 py-2.5 text-sm font-medium text-[#09090b] transition-opacity hover:opacity-90"
              >
                Comenzar
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/editor"
                className="flex items-center gap-2 rounded-lg border border-[#27272a] bg-[#111113] px-4 py-2.5 text-sm font-medium text-[#a1a1aa] transition-colors hover:border-[#3f3f46] hover:text-[#f4f4f5]"
              >
                <Code2 size={15} />
                Abrir editor
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap gap-8">
              <div>
                <p className="font-mono text-2xl font-bold text-[#f4f4f5]">{UNITS.length}</p>
                <p className="text-xs text-[#52525b]">unidades</p>
              </div>
              <div>
                <p className="font-mono text-2xl font-bold text-[#f4f4f5]">
                  {UNITS.reduce((s, u) => s + u.topics.length, 0)}
                </p>
                <p className="text-xs text-[#52525b]">temas</p>
              </div>
              <div>
                <p className="font-mono text-2xl font-bold text-[#f4f4f5]">{COURSE.credits}</p>
                <p className="text-xs text-[#52525b]">créditos</p>
              </div>
            </div>
          </motion.div>

          {/* Right — code preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="overflow-hidden rounded-xl border border-[#27272a] bg-[#0d0d10] shadow-2xl shadow-black/50">
              {/* Window chrome */}
              <div className="flex items-center justify-between border-b border-[#1a1a1f] px-4 py-2.5">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </div>
                <span className="font-mono text-[11px] text-[#3f3f46]">bst.ts</span>
                <BookOpen size={13} className="text-[#3f3f46]" />
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-[0.8rem] leading-[1.75]">
                <code className="language-typescript text-[#a1a1aa]">
                  {HERO_CODE.split('\n').map((line, i) => (
                    <span key={i} className="block">
                      {line
                        .replace(/\/\/.*/g, (m) => `<span style="color:#52525b;font-style:italic">${m}</span>`)
                        .split(/(<span[^>]*>.*?<\/span>)/g)
                        .map((part, j) =>
                          part.startsWith('<span') ? (
                            <span
                              key={j}
                              dangerouslySetInnerHTML={{ __html: part }}
                            />
                          ) : (
                            <span key={j} className="text-[#e4e4e7]">
                              {part
                                .replace(/(class|private|null|return|const|void|new)/g, `|||$1|||`)
                                .split('|||')
                                .map((seg, k) =>
                                  ['class', 'private', 'null', 'return', 'const', 'void', 'new'].includes(seg) ? (
                                    <span key={k} style={{ color: 'oklch(0.72 0.19 198)' }}>
                                      {seg}
                                    </span>
                                  ) : (
                                    seg
                                  )
                                )}
                            </span>
                          )
                        )}
                    </span>
                  ))}
                </code>
              </pre>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 rounded-xl border border-[#27272a] bg-[#111113] px-4 py-3 shadow-xl">
              <p className="font-mono text-xs text-[#71717a]">complejidad</p>
              <p className="mt-0.5 font-mono text-lg font-bold text-[oklch(0.72_0.18_150)]">
                O(log n)
              </p>
              <p className="text-[11px] text-[#52525b]">inserción / búsqueda</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
