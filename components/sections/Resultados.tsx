export default function Resultados() {
  const sectors = [
    'Financeiro', 'Saúde', 'Varejo', 'Indústria',
    'Educação', 'Logística', 'Tecnologia', 'Energia', 'Serviços',
  ]

  const stats = [
    { value: '+200', label: 'projetos concluídos', note: 'Em múltiplos setores e portes' },
    { value: '24', label: 'anos no mercado', note: 'Sem mudar o modelo de trabalho' },
    { value: '0', label: 'relatórios sem execução', note: 'Entregamos ou ficamos até entregar' },
    { value: '9', label: 'setores atendidos', note: 'Do financeiro ao industrial' },
  ]

  const naoMedimos = [
    'Projetos entregues no prazo mas sem resultado — não consideramos isso sucesso.',
    'Clientes atendidos simultaneamente — limitamos propositalmente para manter profundidade.',
    'Volume de proposta — preferimos poucos projetos certos a muitos projetos mediocres.',
  ]

  return (
    <section className="py-24 px-6" style={{ background: '#0a0a09' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header 2-col */}
        <div className="fade-in grid md:grid-cols-2 gap-16 items-start mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px w-8" style={{ background: '#c9a84c' }} />
              <span className="text-xs font-semibold tracking-[3px] uppercase" style={{ color: '#7a7a70' }}>
                em números
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">
              <span className="text-white">24 anos.</span><br />
              <span className="gradient-text">Alguns números.</span>
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: '#888882' }}>
              Não colocamos caso de sucesso em site. O que podemos dizer é isto:
            </p>
          </div>

          {/* O que não medimos */}
          <div style={{ borderLeft: '2px solid rgba(201,168,76,0.25)', paddingLeft: '2rem' }}>
            <p className="text-xs font-semibold tracking-[2px] uppercase mb-5" style={{ color: '#9a7040' }}>
              o que não medimos
            </p>
            <div className="space-y-4">
              {naoMedimos.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-sm" style={{ color: '#707068', marginTop: '1px' }}>—</span>
                  <span className="text-sm leading-relaxed" style={{ color: '#b0b0a8' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats — painel editorial esquerda + cards direita */}
        <div className="fade-in grid md:grid-cols-2 gap-px mb-6" style={{ background: 'rgba(201,168,76,0.08)' }}>

          {/* Painel editorial esquerdo */}
          <div
            className="relative flex flex-col justify-between p-10"
            style={{ background: '#0d0d0b', minHeight: '320px' }}
          >
            {/* Grade sutil de fundo */}
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: 'linear-gradient(to right, #c9a84c 1px, transparent 1px), linear-gradient(to bottom, #c9a84c 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
            <div className="relative z-10">
              <div className="h-px w-10 mb-8" style={{ background: 'linear-gradient(to right, #c9a84c, transparent)' }} />
              <p className="text-3xl md:text-4xl font-black leading-[1.1] tracking-tight text-white mb-3">
                Empresa
              </p>
              <p className="text-3xl md:text-4xl font-black leading-[1.1] tracking-tight gradient-text mb-3">
                transforma
              </p>
              <p className="text-3xl md:text-4xl font-black leading-[1.1] tracking-tight text-white">
                empresa.
              </p>
            </div>
            <div className="relative z-10 mt-8">
              <p className="text-xs leading-relaxed" style={{ color: '#505048' }}>
                Desde 2001, trabalhamos ao lado de quem decide — não entregamos relatório e saímos.
              </p>
            </div>
          </div>

          {/* Cards de stats à direita */}
          <div className="grid grid-cols-2 gap-px" style={{ background: 'rgba(201,168,76,0.08)' }}>
            {stats.map((s, i) => (
              <div
                key={i}
                className="p-6 flex flex-col justify-between"
                style={{
                  background: '#0a0a09',
                  borderTop: '2px solid rgba(201,168,76,0.3)',
                }}
              >
                <div className="text-4xl font-black gradient-text mb-2">{s.value}</div>
                <div>
                  <div className="text-sm font-semibold mb-1" style={{ color: '#8a8a80' }}>{s.label}</div>
                  <div className="text-xs leading-relaxed" style={{ color: '#5a5a58' }}>{s.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Setores — linha discreta */}
        <div className="fade-in flex items-center gap-2 flex-wrap pt-2">
          <span className="text-xs font-semibold tracking-[2px] uppercase mr-2" style={{ color: '#4a4a48' }}>
            setores
          </span>
          {sectors.map((s, i) => (
            <span
              key={i}
              className="text-xs px-2.5 py-1 rounded"
              style={{
                color: '#6a6a62',
                border: '1px solid rgba(201,168,76,0.1)',
              }}
            >
              {s}
            </span>
          ))}
        </div>

      </div>
    </section>
  )
}
