export default function Metodologia() {
  const etapas = [
    {
      fase: 'Diagnóstico',
      desc: 'Entender o problema real antes de qualquer proposta. Inclui conversas com diferentes níveis da organização — não só com quem nos contratou.',
      detalhe: 'Às vezes o diagnóstico já é a entrega mais valiosa.',
    },
    {
      fase: 'Estratégia',
      desc: 'Definir o que vai mudar, em que ordem, com que recursos e como vamos saber que funcionou. Sem indicadores acordados antes, não há como medir resultado.',
      detalhe: 'Incluindo o que escolhemos não fazer.',
    },
    {
      fase: 'Execução',
      desc: 'Trabalhamos junto com as equipes — não entregamos para elas executarem. A transferência de capacidade acontece durante, não no final.',
      detalhe: 'Presença real, não supervisão remota.',
    },
    {
      fase: 'Sustentação',
      desc: 'Ficamos enquanto o resultado não for real e estável. O prazo é uma referência — não uma saída.',
      detalhe: 'O projeto termina quando o resultado aparecer.',
    },
  ]

  return (
    <section id="metodologia" className="py-24 px-6" style={{ background: '#0a0a09' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header — título em largura total, texto abaixo */}
        <div className="fade-in mb-16 space-y-4 max-w-3xl">
          <div className="flex items-center gap-3">
            <div className="h-px w-8" style={{ background: '#c9a84c' }} />
            <span className="text-xs font-semibold tracking-[3px] uppercase" style={{ color: '#7a7a70' }}>
              como trabalhamos
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">
            <span className="text-white">Método não é</span><br />
            <span className="gradient-text">o mesmo que fórmula.</span>
          </h2>
          <p className="text-base leading-relaxed" style={{ color: '#b8b8b0' }}>
            Toda empresa tem contexto próprio. O que funciona em uma pode não funcionar em outra com o mesmo problema. O que trazemos não é um template — é a capacidade de ler o contexto e agir na sequência certa.
          </p>
        </div>

        {/* Sequência visual com anéis progressivos */}
        <div className="fade-in mb-0">
          <svg
            viewBox="0 0 1280 88"
            width="100%"
            height="88"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block' }}
          >
            {/* Centros das 4 colunas: 160, 480, 800, 1120 */}

            {/* Linhas conectoras — mesma intensidade */}
            <line x1="177" y1="36" x2="463" y2="36" stroke="rgba(201,168,76,0.25)" strokeWidth="1.5" />
            <line x1="497" y1="36" x2="783" y2="36" stroke="rgba(201,168,76,0.25)" strokeWidth="1.5" />
            <line x1="817" y1="36" x2="1103" y2="36" stroke="rgba(201,168,76,0.25)" strokeWidth="1.5" />

            {/* Setas */}
            <polygon points="461,31 471,36 461,41" fill="rgba(201,168,76,0.4)" />
            <polygon points="781,31 791,36 781,41" fill="rgba(201,168,76,0.4)" />
            <polygon points="1101,31 1111,36 1101,41" fill="rgba(201,168,76,0.4)" />

            {/* STEP 1 — 25% (circunferência r=16 = 100.53, 25% = 25.13) */}
            <circle cx="160" cy="36" r="16" fill="rgba(201,168,76,0.06)" stroke="rgba(201,168,76,0.12)" strokeWidth="1.5" />
            <circle cx="160" cy="36" r="16" fill="none" stroke="#c9a84c" strokeWidth="2.5"
              strokeDasharray="25.13 75.40" transform="rotate(-90 160 36)" />
            <circle cx="160" cy="36" r="7" fill="#c9a84c" />
            <text x="160" y="68" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#707068">01</text>

            {/* STEP 2 — 50% (50.27 dash, 50.27 gap) */}
            <circle cx="480" cy="36" r="16" fill="rgba(201,168,76,0.06)" stroke="rgba(201,168,76,0.12)" strokeWidth="1.5" />
            <circle cx="480" cy="36" r="16" fill="none" stroke="#c9a84c" strokeWidth="2.5"
              strokeDasharray="50.27 50.27" transform="rotate(-90 480 36)" />
            <circle cx="480" cy="36" r="7" fill="#c9a84c" />
            <text x="480" y="68" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#707068">02</text>

            {/* STEP 3 — 75% (75.40 dash, 25.13 gap) */}
            <circle cx="800" cy="36" r="16" fill="rgba(201,168,76,0.06)" stroke="rgba(201,168,76,0.12)" strokeWidth="1.5" />
            <circle cx="800" cy="36" r="16" fill="none" stroke="#c9a84c" strokeWidth="2.5"
              strokeDasharray="75.40 25.13" transform="rotate(-90 800 36)" />
            <circle cx="800" cy="36" r="7" fill="#c9a84c" />
            <text x="800" y="68" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#707068">03</text>

            {/* STEP 4 — 100% (anel completo) */}
            <circle cx="1120" cy="36" r="16" fill="rgba(201,168,76,0.08)" stroke="#c9a84c" strokeWidth="2.5" />
            <circle cx="1120" cy="36" r="7" fill="#c9a84c" />
            <text x="1120" y="68" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#707068">04</text>
          </svg>
        </div>

        {/* Cards das etapas */}
        <div
          className="fade-in grid md:grid-cols-4 gap-px mb-16"
          style={{ background: 'rgba(201,168,76,0.08)' }}
        >
          {etapas.map((item, i) => (
            <div key={i} className="p-8 space-y-4" style={{ background: '#0a0a09' }}>
              <h3 className="text-lg font-bold" style={{ color: '#c9a84c' }}>
                {item.fase}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#b8b8b0' }}>
                {item.desc}
              </p>
              <p className="text-xs leading-relaxed italic" style={{ color: '#888882' }}>
                {item.detalhe}
              </p>
            </div>
          ))}
        </div>

        {/* Box de seletividade */}
        <div
          className="fade-in rounded-xl p-8 md:p-10"
          style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.12)' }}
        >
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <p className="text-xl font-bold leading-relaxed mb-3" style={{ color: '#b0b0a8' }}>
                "Analisamos cuidadosamente os projetos que participamos."
              </p>
              <p className="text-sm leading-relaxed" style={{ color: '#a0a098' }}>
                Não aceitamos projetos em que não acreditamos — porque não acreditamos que conseguiríamos fazer diferença real naquela situação, por capacidade, por fit ou porque o momento ainda não está certo. Isso não é postura de marketing. É o que viabiliza comprometimento real.
              </p>
            </div>
            <div className="flex justify-end">
              <a href="#contato" className="btn-gold-outline px-6 py-3 rounded-lg text-sm font-semibold transition-all">
                Conversar sobre seu projeto →
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
