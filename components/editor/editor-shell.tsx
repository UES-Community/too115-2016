'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { Play, RotateCcw, ChevronDown, Terminal } from 'lucide-react'
import { UNITS } from '@/lib/course-data'
import { cn } from '@/lib/utils'

// Lazy-load Monaco to keep initial bundle small
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-[#0d0d10] text-[#52525b] text-sm">
      Cargando editor…
    </div>
  ),
})

const DEFAULT_CODE = `// Bienvenido al editor TOO115 ✏️
// Selecciona un ejemplo de las Unidades o escribe tu propio código

class Nodo<T> {
  valor: T;
  siguiente: Nodo<T> | null = null;

  constructor(valor: T) {
    this.valor = valor;
  }
}

class ListaEnlazada<T> {
  private cabeza: Nodo<T> | null = null;

  agregar(valor: T): void {
    const nodo = new Nodo(valor);
    if (!this.cabeza) { this.cabeza = nodo; return; }
    let actual = this.cabeza;
    while (actual.siguiente) actual = actual.siguiente;
    actual.siguiente = nodo;
  }

  toArray(): T[] {
    const res: T[] = [];
    let actual = this.cabeza;
    while (actual) { res.push(actual.valor); actual = actual.siguiente; }
    return res;
  }
}

const lista = new ListaEnlazada<number>();
[10, 20, 30, 40].forEach(v => lista.agregar(v));
console.log(lista.toArray()); // [10, 20, 30, 40]
`

// Sandboxed JS execution — captures console.log output
function runCode(code: string): string {
  const logs: string[] = []
  const sandbox = {
    console: {
      log: (...args: unknown[]) => logs.push(args.map(String).join(' ')),
      error: (...args: unknown[]) => logs.push('ERROR: ' + args.map(String).join(' ')),
      warn: (...args: unknown[]) => logs.push('WARN: ' + args.map(String).join(' ')),
    },
  }
  try {
    // Strip TypeScript type annotations for runtime execution
    const jsCode = code
      .replace(/:\s*[A-Za-z<>\[\]|&?]+(?=\s*[=,\);\n{])/g, '') // param/return types
      .replace(/<[A-Za-z,\s]+>/g, '')                              // generics
      .replace(/\bprivate\b|\bpublic\b|\bprotected\b|\breadonly\b/g, '')
      .replace(/\babstract\b\s+/g, '')
      .replace(/implements\s+[\w,\s<>]+/g, '')
      .replace(/interface\s+\w+\s*\{[^}]*\}/gs, '')

    // eslint-disable-next-line no-new-func
    const fn = new Function('console', jsCode)
    fn(sandbox.console)
    return logs.join('\n') || '// Sin salida'
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    return `// Error de ejecución:\n// ${msg}`
  }
}

const SNIPPETS = UNITS.flatMap((u) =>
  u.topics
    .filter((t) => t.codeExample)
    .map((t) => ({
      label: `U${u.number} · ${t.title}`,
      code: t.codeExample!,
      lang: t.lang ?? 'typescript',
      color: u.color,
    })),
)

export function EditorShell() {
  const searchParams = useSearchParams()
  const initialCode = searchParams.get('code') ?? DEFAULT_CODE

  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState('// Presiona ▶ Ejecutar para ver la salida')
  const [snippetOpen, setSnippetOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setSnippetOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const execute = () => setOutput(runCode(code))

  const reset = () => {
    setCode(DEFAULT_CODE)
    setOutput('// Presiona ▶ Ejecutar para ver la salida')
  }

  return (
    <div className="flex flex-1 flex-col">
      {/* Toolbar */}
      <div className="flex items-center gap-2 border-b border-[#27272a] bg-[#111113] px-4 py-2">
        {/* Snippet picker */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setSnippetOpen((v) => !v)}
            className="flex items-center gap-1.5 rounded-md border border-[#27272a] bg-[#1a1a1f] px-3 py-1.5 text-xs text-[#a1a1aa] transition-colors hover:text-[#f4f4f5]"
          >
            Ejemplos del curso
            <ChevronDown size={12} className={cn('transition-transform', snippetOpen && 'rotate-180')} />
          </button>

          {snippetOpen && (
            <div className="absolute left-0 top-full z-50 mt-1 w-72 max-h-80 overflow-y-auto rounded-xl border border-[#27272a] bg-[#111113] p-1.5 shadow-2xl shadow-black/50">
              {SNIPPETS.map((s) => (
                <button
                  key={s.label}
                  onClick={() => { setCode(s.code); setSnippetOpen(false) }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs text-[#a1a1aa] transition-colors hover:bg-[#1a1a1f] hover:text-[#f4f4f5]"
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: s.color }}
                  />
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1" />

        <button
          onClick={reset}
          className="flex items-center gap-1.5 rounded-md border border-[#27272a] px-3 py-1.5 text-xs text-[#71717a] transition-colors hover:text-[#a1a1aa]"
          aria-label="Resetear código"
        >
          <RotateCcw size={12} />
          Reset
        </button>

        <button
          onClick={execute}
          className="flex items-center gap-1.5 rounded-md bg-[oklch(0.72_0.19_198)] px-4 py-1.5 text-xs font-semibold text-[#09090b] transition-opacity hover:opacity-90"
        >
          <Play size={12} fill="currentColor" />
          Ejecutar
        </button>
      </div>

      {/* Editor + Output */}
      <div className="grid flex-1 grid-cols-1 lg:grid-cols-2" style={{ minHeight: 'calc(100vh - 200px)' }}>
        {/* Monaco */}
        <div className="border-b border-[#27272a] lg:border-b-0 lg:border-r">
          <MonacoEditor
            height="100%"
            defaultLanguage="typescript"
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val ?? '')}
            options={{
              fontSize: 13,
              fontFamily: '"JetBrains Mono", "Fira Code", monospace',
              fontLigatures: true,
              minimap: { enabled: false },
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              renderLineHighlight: 'gutter',
              bracketPairColorization: { enabled: true },
              tabSize: 2,
              wordWrap: 'on',
              padding: { top: 16, bottom: 16 },
              scrollbar: { verticalScrollbarSize: 6, horizontalScrollbarSize: 6 },
            }}
          />
        </div>

        {/* Output */}
        <div className="flex flex-col bg-[#0d0d10]">
          <div className="flex items-center gap-2 border-b border-[#1a1a1f] px-4 py-2">
            <Terminal size={13} className="text-[#52525b]" />
            <span className="font-mono text-[11px] text-[#52525b]">Salida</span>
          </div>
          <pre className="flex-1 overflow-auto p-5 font-mono text-[0.8rem] leading-[1.75] text-[#a1a1aa] whitespace-pre-wrap">
            {output}
          </pre>
        </div>
      </div>
    </div>
  )
}
