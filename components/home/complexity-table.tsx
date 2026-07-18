'use client'

import { motion } from 'framer-motion'

const STRUCTURES = [
  {
    name: 'Array dinámico',
    access: 'O(1)',
    search: 'O(n)',
    insert: 'O(n)',
    delete: 'O(n)',
    space: 'O(n)',
  },
  {
    name: 'Lista enlazada',
    access: 'O(n)',
    search: 'O(n)',
    insert: 'O(1)',
    delete: 'O(1)',
    space: 'O(n)',
  },
  {
    name: 'Pila / Cola',
    access: 'O(n)',
    search: 'O(n)',
    insert: 'O(1)',
    delete: 'O(1)',
    space: 'O(n)',
  },
  {
    name: 'BST (balanceado)',
    access: 'O(log n)',
    search: 'O(log n)',
    insert: 'O(log n)',
    delete: 'O(log n)',
    space: 'O(n)',
  },
  {
    name: 'Tabla hash',
    access: '—',
    search: 'O(1)*',
    insert: 'O(1)*',
    delete: 'O(1)*',
    space: 'O(n)',
  },
  {
    name: 'Heap',
    access: 'O(n)',
    search: 'O(n)',
    insert: 'O(log n)',
    delete: 'O(log n)',
    space: 'O(n)',
  },
]

const COLORS: Record<string, string> = {
  'O(1)':       'oklch(0.72 0.18 150)',
  'O(log n)':   'oklch(0.72 0.19 198)',
  'O(n)':       'oklch(0.78 0.18 75)',
  'O(n log n)': 'oklch(0.68 0.22 280)',
  'O(n²)':      'oklch(0.65 0.24 27)',
  'O(1)*':      'oklch(0.72 0.18 150)',
  '—':          '#3f3f46',
}

function ComplexityCell({ value }: { value: string }) {
  const color = COLORS[value] ?? '#71717a'
  return (
    <td className="px-4 py-3 text-center">
      <span
        className="inline-block rounded-md px-2 py-0.5 font-mono text-[11px] font-medium"
        style={{ color, background: `${color}18` }}
      >
        {value}
      </span>
    </td>
  )
}

export function ComplexityTable() {
  return (
    <section className="border-t border-[#27272a] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-[#52525b]">
            Referencia rápida
          </p>
          <h2 className="text-2xl font-bold text-[#f4f4f5] sm:text-3xl">
            Complejidad Big O
          </h2>
          <p className="mt-2 text-sm text-[#71717a]">
            Comparativa de las estructuras vistas en el curso.{' '}
            <span className="text-[#52525b]">* Caso promedio</span>
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="overflow-x-auto rounded-xl border border-[#27272a] bg-[#111113]"
        >
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#1a1a1f]">
                {['Estructura', 'Acceso', 'Búsqueda', 'Inserción', 'Eliminación', 'Espacio'].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left font-mono text-[11px] uppercase tracking-wider text-[#3f3f46] first:text-left"
                      style={{ textAlign: h === 'Estructura' ? 'left' : 'center' }}
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {STRUCTURES.map((row, i) => (
                <tr
                  key={row.name}
                  className="border-b border-[#1a1a1f] transition-colors hover:bg-[#1a1a1f] last:border-0"
                >
                  <td className="px-4 py-3 text-sm font-medium text-[#f4f4f5]">{row.name}</td>
                  <ComplexityCell value={row.access} />
                  <ComplexityCell value={row.search} />
                  <ComplexityCell value={row.insert} />
                  <ComplexityCell value={row.delete} />
                  <ComplexityCell value={row.space} />
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  )
}
