'use client'

export default function Reconhecimento() {
  const pains = [
    {
      num: '01',
      title: 'Tecnologia entregue, operação igual.',
      text: 'O sistema foi implementado. O contrato foi encerrado. A empresa continua fazendo tudo do mesmo jeito.',
    },
    {
      num: '02',
      title: 'A liderança aprovou. As pessoas não vieram.',
      text: 'A diretoria anunciou a mudança. Seis meses depois, a resistência ainda é maior do que a adoção.',
    },
    {
      num: '03',
      title: 'Automação sobre processo quebrado.',
      text: 'Tentaram automatizar antes de entender o processo. Agora o erro acontece mais rápido e em escala.',
    },
    {
      num: '04',
      title: 'O relatório ficou ótimo. Ninguém executou.',
      text: 'A consultoria entregou o diagnóstico impecável. Quem transforma o diagnóstico em realidade é problema de quem?',
    },
    {
      num: '05',
      title: 'Cultura como etapa — não como base.',
      text: 'Trataram cultura como item do cronograma. Quando o projeto foi "concluído", a cultura não tinha mudado nada.',
    },
    {
      num: '06',
      title: 'Estratégia clara, execução perdida.',
      text: 'O planejamento estratégico estava certo. Mas entre o plano e a operação existe um abismo que ninguém atravessou junto.',
    },
  ]

  return (
    <section className="py-24 px-6" style={{ background: '#0a0a09' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="fade-in max-w-2xl mb-16 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px w-8" style={{ background: '#c9a84c' }} />
            <span className="text-xs font-semibold tracking-[3px] uppercase" style={{ color: '#7a7a70' }}>
              o padrão que se repete
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight text-white">
            Você já viveu<br />
            <span className="gradient-text">algum desses</span><br />
            cenários?
          </h2>
          <p className="text-base leading-relaxed" style={{ color: '#8a8a80' }}>
            Não são falhas isoladas. São sintomas de um modelo de consultoria que entrega projeto — e não transformação.
          </p>
        </div>

        {/* Grid de dores */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'rgba(201,168,76,0.08)' }}>
          {pains.map((pain, i) => (
            <div
              key={i}
              className="fade-in group p-8 cursor-default transition-colors duration-300"
              style={{ background: '#0d0d0d' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#141412')}
              onMouseLeave={e => (e.currentTarget.style.background = '#0d0d0d')}
            >
              <div className="flex items-start gap-4">
                <span className="text-xs font-mono mt-1 flex-shrink-0" style={{ color: '#888882' }}>
                  {pain.num}
                </span>
                <div className="space-y-2">
                  <h3 className="text-sm font-bold leading-snug" style={{ color: '#c8c8c0' }}>
                    {pain.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: '#b8b8b0' }}>
                    {pain.text}
                  </p>
                </div>
              </div>
              <div
                className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500"
                style={{ background: 'rgba(201,168,76,0.25)' }}
              />
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div
          className="fade-in mt-px px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.1)' }}
        >
          <p className="text-sm" style={{ color: '#7a7a70' }}>
            Se algum desses soou familiar — é exatamente onde trabalhamos.
          </p>
          <a
            href="#parceria"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: '#c9a84c' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#e8d5a3')}
            onMouseLeave={e => (e.currentTarget.style.color = '#c9a84c')}
          >
            Como a Stemo trabalha diferente
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  )
}
