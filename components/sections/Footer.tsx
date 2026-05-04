'use client'
import Link from 'next/link'

interface FooterProps {
  productsVisible: boolean
}

function StemoDiamond({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fd-a" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8d5a3" />
          <stop offset="45%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#8a6914" />
        </linearGradient>
        <linearGradient id="fd-b" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#b8860b" />
        </linearGradient>
        <linearGradient id="fd-c" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c9a84c" />
          <stop offset="100%" stopColor="#7a5c0a" />
        </linearGradient>
      </defs>
      <polygon points="26,4 46,24 26,44 6,24" fill="none" stroke="url(#fd-a)" strokeWidth="2.2" />
      <polygon points="26,11 39,24 26,37 13,24" fill="none" stroke="url(#fd-a)" strokeWidth="1.5" opacity="0.65" />
      <polygon points="20,42 36,58 20,74 4,58" fill="none" stroke="url(#fd-b)" strokeWidth="2" />
      <polygon points="20,49 29,58 20,67 11,58" fill="none" stroke="url(#fd-b)" strokeWidth="1.4" opacity="0.65" />
      <polygon points="54,16 68,30 54,44 40,30" fill="url(#fd-b)" opacity="0.88" />
      <polygon points="60,50 72,62 60,74 48,62" fill="url(#fd-c)" opacity="0.65" />
    </svg>
  )
}

export default function Footer({ productsVisible }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{ background: '#060606', padding: '3rem 1.5rem 2rem' }}>
      <div className="max-w-7xl mx-auto">

        {/* Card flutuante */}
        <div
          style={{
            background: '#0f0f0d',
            border: '0.5px solid rgba(201,168,76,0.15)',
            borderRadius: '16px',
            borderTop: '2px solid rgba(201,168,76,0.35)',
            padding: '3rem',
            marginBottom: '1.5rem',
          }}
        >
          <div className="grid md:grid-cols-4 gap-12 mb-10">

            {/* Brand */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-3" aria-label="Stemo – Página inicial">
                <StemoDiamond size={28} />
                <div className="flex flex-col leading-none">
                  <span className="font-black text-base tracking-[3px] gold-text">STEMO</span>
                  <span className="text-[8px] tracking-[3px] font-medium" style={{ color: '#7a5c0a' }}>
                    BUSINESS ADVISORY
                  </span>
                </div>
              </Link>
              <p className="text-xs leading-relaxed" style={{ color: '#707068' }}>
                24 anos acompanhando transformações que as pessoas abraçam e os resultados sustentam.
              </p>
            </div>

            {/* Navegar */}
            <div>
              <h4 className="text-xs font-bold mb-4 tracking-[2px] uppercase" style={{ color: '#5a5a58' }}>Navegar</h4>
              <ul className="space-y-2">
                {[
                  { href: '#sobre', label: 'Sobre' },
                  { href: '#servicos', label: 'Serviços' },
                  { href: '#insights', label: 'Insights' },
                  { href: '#faq', label: 'FAQ' },
                ].map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-xs transition-colors"
                      style={{ color: '#5a5a58' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#c9a84c')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#5a5a58')}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Serviços */}
            <div>
              <h4 className="text-xs font-bold mb-4 tracking-[2px] uppercase" style={{ color: '#5a5a58' }}>Serviços</h4>
              <ul className="space-y-2">
                {[
                  'Estratégia & Posicionamento',
                  'Governança',
                  'Redesenho de Processos',
                  'Gestão de Mudança',
                  ...(productsVisible ? ['Produtos'] : []),
                ].map((label, i) => (
                  <li key={i}>
                    <a
                      href="#servicos"
                      className="text-xs transition-colors"
                      style={{ color: '#5a5a58' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#c9a84c')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#5a5a58')}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Conectar */}
            <div>
              <h4 className="text-xs font-bold mb-4 tracking-[2px] uppercase" style={{ color: '#5a5a58' }}>Conectar</h4>
              <ul className="space-y-2">
                {[
                  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/stemoadvisory', external: true },
                  { label: 'Email', href: 'mailto:contato@stemo.com.br', external: false },
                  { label: 'Fale Conosco', href: '#contato', external: false },
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className="text-xs transition-colors"
                      style={{ color: '#5a5a58' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#c9a84c')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#5a5a58')}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider interno */}
          <div style={{ borderTop: '0.5px solid rgba(201,168,76,0.08)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p className="text-xs" style={{ color: '#404040' }}>
              © {currentYear} Stemo Consultoria. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              {['Privacidade', 'Termos'].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="text-xs transition-colors"
                  style={{ color: '#404040' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#707068')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#404040')}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Assinatura abaixo do card */}
        <div className="text-center">
          <span className="text-[10px] tracking-[2px] uppercase" style={{ color: '#2a2a28' }}>
            desde 2001
          </span>
        </div>

      </div>
    </footer>
  )
}
