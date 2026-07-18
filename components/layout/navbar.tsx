'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Code2, ChevronDown } from 'lucide-react'
import { UNITS, COURSE } from '@/lib/course-data'
import { cn } from '@/lib/utils'

export function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [unitsOpen, setUnitsOpen] = useState(false)

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <header className="sticky top-0 z-50 border-b border-[#27272a] bg-[#09090b]/90 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6"
        aria-label="Navegación principal"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-[#f4f4f5] transition-opacity hover:opacity-80"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[oklch(0.72_0.19_198)] text-[#09090b]">
            <Code2 size={15} strokeWidth={2.5} />
          </span>
          <span className="hidden font-mono text-sm font-semibold tracking-tight sm:block">
            TOO115
          </span>
          <span className="hidden text-[#52525b] text-sm sm:block">/</span>
          <span className="hidden text-[#a1a1aa] text-xs sm:block">2016</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          <Link
            href="/"
            className={cn(
              'rounded-md px-3 py-1.5 text-sm transition-colors',
              isActive('/') && pathname === '/'
                ? 'bg-[#1a1a1f] text-[#f4f4f5]'
                : 'text-[#a1a1aa] hover:bg-[#1a1a1f] hover:text-[#f4f4f5]',
            )}
          >
            Inicio
          </Link>

          {/* Units dropdown */}
          <div className="relative" onMouseLeave={() => setUnitsOpen(false)}>
            <button
              onMouseEnter={() => setUnitsOpen(true)}
              onClick={() => setUnitsOpen((v) => !v)}
              className={cn(
                'flex items-center gap-1 rounded-md px-3 py-1.5 text-sm transition-colors',
                pathname.startsWith('/unidad')
                  ? 'bg-[#1a1a1f] text-[#f4f4f5]'
                  : 'text-[#a1a1aa] hover:bg-[#1a1a1f] hover:text-[#f4f4f5]',
              )}
              aria-haspopup="true"
              aria-expanded={unitsOpen}
            >
              Unidades
              <ChevronDown
                size={13}
                className={cn('transition-transform', unitsOpen && 'rotate-180')}
              />
            </button>

            {unitsOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-72 rounded-xl border border-[#27272a] bg-[#111113] p-2 shadow-2xl shadow-black/40">
                {UNITS.map((u) => (
                  <Link
                    key={u.id}
                    href={`/unidad/${u.id}`}
                    onClick={() => setUnitsOpen(false)}
                    className={cn(
                      'flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-[#1a1a1f]',
                      isActive(`/unidad/${u.id}`) && 'bg-[#1a1a1f]',
                    )}
                  >
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded text-[10px] font-bold font-mono"
                      style={{ background: u.colorDim, color: u.color }}
                    >
                      {u.number}
                    </span>
                    <div>
                      <p className="text-sm text-[#f4f4f5] leading-tight">{u.title}</p>
                      <p className="mt-0.5 text-xs text-[#52525b] leading-tight">{u.subtitle}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/editor"
            className={cn(
              'rounded-md px-3 py-1.5 text-sm transition-colors',
              isActive('/editor')
                ? 'bg-[#1a1a1f] text-[#f4f4f5]'
                : 'text-[#a1a1aa] hover:bg-[#1a1a1f] hover:text-[#f4f4f5]',
            )}
          >
            Editor
          </Link>
        </div>

        {/* Course badge */}
        <div className="hidden items-center gap-2 md:flex">
          <span className="rounded-full border border-[#27272a] px-2.5 py-0.5 font-mono text-[11px] text-[#52525b]">
            {COURSE.code}
          </span>
          <span className="h-1 w-1 rounded-full bg-[oklch(0.72_0.18_150)]" />
          <span className="text-xs text-[#52525b]">{COURSE.credits} créditos</span>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex items-center justify-center rounded-md p-2 text-[#a1a1aa] transition-colors hover:bg-[#1a1a1f] hover:text-[#f4f4f5] md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-[#27272a] bg-[#09090b] px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm text-[#a1a1aa] hover:bg-[#1a1a1f] hover:text-[#f4f4f5]"
            >
              Inicio
            </Link>
            <p className="px-3 pt-2 pb-1 text-[11px] font-medium uppercase tracking-widest text-[#3f3f46]">
              Unidades
            </p>
            {UNITS.map((u) => (
              <Link
                key={u.id}
                href={`/unidad/${u.id}`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#a1a1aa] hover:bg-[#1a1a1f] hover:text-[#f4f4f5]"
              >
                <span
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded text-[10px] font-bold font-mono"
                  style={{ background: u.colorDim, color: u.color }}
                >
                  {u.number}
                </span>
                {u.title}
              </Link>
            ))}
            <Link
              href="/editor"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm text-[#a1a1aa] hover:bg-[#1a1a1f] hover:text-[#f4f4f5]"
            >
              Editor
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
