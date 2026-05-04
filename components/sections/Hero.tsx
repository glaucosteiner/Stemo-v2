export default function Hero() {
  const clientes = [
    'Itaú', 'Santander', 'LATAM', 'Vivo', 'Ipiranga',
    'Riachuelo', 'UOL', 'ABN AMRO', 'Buscapé', 'TJDFT', 'Apolo Energia',
  ]

  return (
    <section className="hero-bg min-h-screen pt-36 pb-24 px-6 relative overflow-hidden">
      {/* Grid sutil */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(to right, #d4af37 1px, transparent 1px), linear-gradient(to bottom, #d4af37 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-4xl">

          <div className="fade-in flex items-center gap-3 mb-12">
            <div className="h-px w-8" style={{ background: '#c9a84c' }} />
            <span className="text-xs font-semibold tracking-[3px] uppercase" style={{ color: '#7a7a70' }}>
              Stemo — desde 2001
            </span>
          </div>

          {/* Título provocação */}
          <div className="fade-in space-y-3 mb-10">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-white">
              Tecnologia não
            </h1>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight gradient-text">
              transforma empresa.
            </h1>
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black leading-[1.1] tracking-tight" style={{ color: '#707068' }}>
              Empresa transforma empresa.
            </h1>
          </div>

          <div className="fade-in h-px w-16 mb-10" style={{ background: 'linear-gradient(to right, #c9a84c, transparent)' }} />

          <p className="fade-in text-lg leading-relaxed max-w-2xl mb-4" style={{ color: '#b8b8b0' }}>
            Tecnologia amplifica o que já existe. Se o que existe é um processo quebrado, uma cultura resistente ou uma estratégia indefinida — a tecnologia só vai amplificar isso mais rápido e com mais custo.
          </p>

          <p className="fade-in text-base leading-relaxed max-w-2xl mb-6" style={{ color: '#909088' }}>
            Há 24 anos trabalhamos com empresas que perceberam isso — algumas antes de gastar, outras depois.
          </p>

          {/* Linha diferenciadora — permanência */}
          <div
            className="fade-in flex items-center gap-3 mb-10 max-w-2xl py-4"
            style={{ borderTop: '1px solid rgba(201,168,76,0.12)', borderBottom: '1px solid rgba(201,168,76,0.12)' }}
          >
            <div className="w-1 h-full self-stretch rounded-full flex-shrink-0" style={{ background: '#c9a84c', minHeight: '20px' }} />
            <p className="text-sm leading-relaxed" style={{ color: '#c9a84c' }}>
              Ficamos até o resultado ser real — não até o prazo acabar.
            </p>
          </div>

          {/* CTAs */}
          <div className="fade-in flex flex-col sm:flex-row gap-4 mb-16">
            <a href="#contato" className="btn-gold px-8 py-4 rounded-lg text-sm text-center transition-all">
              Começar pelo diagnóstico
            </a>
            <a href="#ponto-de-vista" className="btn-gold-outline px-8 py-4 rounded-lg text-sm font-semibold text-center transition-all">
              Como pensamos
            </a>
          </div>

          {/* Faixa de clientes */}
          <div className="fade-in" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem' }}>
            <p className="text-[10px] font-semibold tracking-[3px] uppercase mb-5" style={{ color: '#4a4a48' }}>
              Algumas empresas que já passaram pela Stemo
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {clientes.map((c, i) => (
                <span
                  key={i}
                  className="text-xs font-semibold tracking-[1.5px] uppercase"
                  style={{ color: 'rgba(201,168,76,0.45)' }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
