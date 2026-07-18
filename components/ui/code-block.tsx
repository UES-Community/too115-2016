'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface CodeBlockProps {
  code: string
  language?: string
  showLineNumbers?: boolean
}

export function CodeBlock({ code, language = 'typescript', showLineNumbers = true }: CodeBlockProps) {
  const ref = useRef<HTMLElement>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    // Dynamic import to keep bundle lean
    import('highlight.js').then((hljs) => {
      const lib = hljs.default
      if (ref.current) {
        ref.current.removeAttribute('data-highlighted')
        lib.highlightElement(ref.current)
      }
    })
  }, [code, language])

  const copy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.split('\n')

  return (
    <div className="group relative overflow-hidden rounded-xl border border-[#27272a] bg-[#0d0d10]">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-[#1a1a1f] px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#3f3f46]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#3f3f46]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#3f3f46]" />
        </div>
        <span className="font-mono text-[11px] text-[#3f3f46]">{language}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] text-[#52525b] transition-colors hover:bg-[#1a1a1f] hover:text-[#a1a1aa]"
          aria-label="Copiar código"
        >
          {copied ? (
            <>
              <Check size={12} className="text-[oklch(0.72_0.18_150)]" />
              <span className="text-[oklch(0.72_0.18_150)]">Copiado</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              Copiar
            </>
          )}
        </button>
      </div>

      {/* Code area */}
      <div className="flex overflow-x-auto">
        {showLineNumbers && (
          <div
            aria-hidden="true"
            className="select-none border-r border-[#1a1a1f] px-3 py-5 text-right font-mono text-[12px] leading-[1.7] text-[#3f3f46]"
          >
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
        )}
        <pre className="flex-1 overflow-x-auto p-5 text-[0.8125rem] leading-[1.7]">
          <code ref={ref} className={`language-${language}`}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  )
}
