'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavbarProps {
  productsVisible: boolean
}

function StemoDiamond({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="nd-a" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8d5a3" />
          <stop offset="45%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#8a6914" />
        </linearGradient>
        <linearGradient id="nd-b" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#b8860b" />
        </linearGradient>
        <linearGradient id="nd-c" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c9a84c" />
          <stop offset="100%" stopColor="#7a5c0a" />
        </linearGradient>
      </defs>
      <polygon points="26,4 46,24 26,44 6,24" fill="none" stroke="url(#nd-a)" strokeWidth="2.2" />
      <polygon points="26,11 39,24 26,37 13,24" fill="none" stroke="url(#nd-a)" strokeWidth="1.5" opacity="0.65" />
      <polygon points="20,42 36,58 20,74 4,58" fill="none" stroke="url(#nd-b)" strokeWidth="2" />
      <polygon points="20,49 29,58 20,67 11,58" fill="none" stroke="url(#nd-b)" strokeWidth="1.4" opacity="0.65" />
      <polygon points="54,16 68,30 54,44 40,30" fill="url(#nd-b)" opacity="0.88" />
      <polygon points="60,50 72,62 60,74 48,62" fill="url(#nd-c)" opacity="0.65" />
    </svg>
  )
}

export default function Navbar({ productsVisible }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  // Na homepage usa âncora direta (#sobre), em outras páginas prefixo com / (/#sobre)
  const a = (id: string) => isHome ? `#${id}` : `/#${id}`

  const links = [
    { href: a('sobre'), label: 'Sobre' },
    { href: a('servicos'), label: 'Serviços' },
    ...(productsVisible ? [{ href: a('produtos'), label: 'Produtos' }] : []),
    { href: a('insights'), label: 'Insights' },
    { href: a('faq'), label: 'FAQ' },
  ]

  return (
    <nav
      className="nav-glass fixed top-0 left-0 right-0 z-50 border-b py-3 transition-all duration-300"
      style={{ borderColor: 'rgba(201,168,76,0.1)' }}
      role="navigation"
      aria-label="Navegação principal"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" aria-label="Stemo — Página inicial">
          <StemoDiamond size={34} />
          <div className="flex flex-col leading-none">
            <span className="font-black text-lg tracking-[3px] gold-text">STEMO</span>
            <span className="text-[9px] tracking-[3px] font-medium" style={{ color: '#7a5c0a' }}>
              BUSINESS ADVISORY
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium transition-colors"
              style={{ color: '#4a4a40' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#c9a84c')}
              onMouseLeave={e => (e.currentTarget.style.color = '#4a4a40')}
            >
              {l.label}
            </a>
          ))}
          <a
            href={a('contato')}
            className="btn-gold-outline text-sm font-semibold px-5 py-2.5 rounded-lg transition-all"
          >
            Conversar
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-1 transition-colors"
          style={{ color: '#4a4a40' }}
          aria-label="Menu"
          aria-expanded={open}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
            ) : (
              <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-4" style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium py-1 transition-colors"
              style={{ color: '#6a6a60' }}
            >
              {l.label}
            </a>
          ))}
          <a
            href={a('contato')}
            onClick={() => setOpen(false)}
            className="btn-gold text-sm px-5 py-2.5 rounded-lg text-center transition-all"
          >
            Conversar
          </a>
        </div>
      )}
    </nav>
  )
}
