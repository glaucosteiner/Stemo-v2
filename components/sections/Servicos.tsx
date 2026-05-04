export default function Servicos() {
  const frentes = [
    {
      area: 'Estratégia e Diagnóstico',
      posicao: 'Antes de propor solução, precisamos entender o problema real. Que frequentemente não é o que foi descrito na primeira reunião.',
      quando: 'Quando a empresa sabe que precisa mudar mas não sabe por onde — ou quando mudanças anteriores não duraram.',
      icon: (
        <svg viewBox="0 0 20 20" fill="none" stroke="#c9a84c" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="10" cy="10" r="7" />
          <circle cx="10" cy="10" r="2.5" />
          <line x1="10" y1="3" x2="10" y2="5" />
          <line x1="17" y1="10" x2="15" y2="10" />
          <line x1="10" y1="17" x2="10" y2="15" />
          <line x1="3" y1="10" x2="5" y2="10" />
        </svg>
      ),
    },
    {
      area: 'Transformação Cultural',
      posicao: 'Cultura não muda com workshop. Muda com repetição de comportamentos novos sustentados por liderança que age de forma diferente.',
      quando: 'Quando a estratégia está clara mas a organização não vem junto.',
      icon: (
        <svg viewBox="0 0 20 20" fill="none" stroke="#c9a84c" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 7 Q10 3.5 17 7" />
          <path d="M3 10.5 Q10 7 17 10.5" />
          <path d="M3 14 Q10 10.5 17 14" />
        </svg>
      ),
    },
    {
      area: 'Redesenho de Processos',
      posicao: 'Automatizar processo ruim é gastar mais rápido. O processo precisa estar certo antes de qualquer ferramenta entrar.',
      quando: 'Antes de qualquer projeto de tecnologia ou quando a operação não escala com o negócio.',
      icon: (
        <svg viewBox="0 0 20 20" fill="none" stroke="#c9a84c" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="12" y2="6" />
          <polyline points="12,4 15,6 12,8" />
          <line x1="17" y1="10" x2="8" y2="10" />
          <polyline points="8,8 5,10 8,12" />
          <line x1="3" y1="14" x2="12" y2="14" />
          <polyline points="12,12 15,14 12,16" />
        </svg>
      ),
    },
    {
      area: 'Inteligência Artificial Aplicada',
      posicao: 'IA não é iniciativa de TI. É decisão de negócio. Trabalhamos a estratégia antes da ferramenta — e a adoção tanto quanto a implementação.',
      quando: 'Quando há pressão para "fazer IA" sem clareza sobre onde ela gera valor real.',
      icon: (
        <svg viewBox="0 0 20 20" fill="none" stroke="#c9a84c" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="10,2 17,6 17,14 10,18 3,14 3,6" />
          <circle cx="10" cy="10" r="2" />
          <line x1="10" y1="2" x2="10" y2="8" />
          <line x1="17" y1="6" x2="11.7" y2="8.7" />
          <line x1="17" y1="14" x2="11.7" y2="11.3" />
          <line x1="10" y1="18" x2="10" y2="12" />
          <line x1="3" y1="14" x2="8.3" y2="11.3" />
          <line x1="3" y1="6" x2="8.3" y2="8.7" />
        </svg>
      ),
    },
    {
      area: 'Gestão de Mudança',
      posicao: 'Mudança não falha por falta de projeto. Falha por falta de adesão. Trabalhamos as pessoas com a mesma profundidade que os processos.',
      quando: 'Em qualquer projeto onde o resultado depende de comportamento humano diferente — que é a maioria.',
      icon: (
        <svg viewBox="0 0 20 20" fill="none" stroke="#c9a84c" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 10 Q4 4 10 4 Q16 4 16 10" />
          <polyline points="13,7 16,10 13,13" />
          <path d="M16 10 Q16 16 10 16 Q4 16 4 10" />
          <polyline points="7,7 4,10 7,13" />
        </svg>
      ),
    },
    {
      area: 'Sustentação e Evolução',
      posicao: 'Resultado sustentável exige presença depois da entrega. A maioria das consultorias não fica. Nós ficamos.',
      quando: 'Quando o projeto termina mas o resultado ainda precisa ser consolidado e protegido.',
      icon: (
        <svg viewBox="0 0 20 20" fill="none" stroke="#c9a84c" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 14 Q3 6 10 6" />
          <path d="M10 6 Q17 6 17 10 Q17 14 13 14 Q9 14 9 10 Q9 7 12 7" />
          <polyline points="9,11 9,14 12,14" />
        </svg>
      ),
    },
  ]

  return (
    <section id="servicos" className="py-24 px-6" style={{ background: '#0d0d0d' }}>
      <div className="max-w-7xl mx-auto">

        <div className="fade-in max-w-2xl mb-16 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px w-8" style={{ background: '#c9a84c' }} />
            <span className="text-xs font-semibold tracking-[3px] uppercase" style={{ color: '#7a7a70' }}>
              como atuamos
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">
            <span className="text-white">Seis frentes.</span><br />
            <span className="gradient-text">Uma sequência.</span>
          </h2>
          <p className="text-base leading-relaxed" style={{ color: '#b8b8b0' }}>
            Cada frente tem uma posição própria — não é catálogo de serviços, é como enxergamos cada parte do problema.
          </p>
        </div>

        <div className="space-y-0">
          {frentes.map((f, i) => (
            <div
              key={i}
              className="fade-in grid md:grid-cols-12 gap-8 py-10 group cursor-default"
              style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div className="md:col-span-1 flex items-start pt-0.5">
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    border: '1px solid rgba(201,168,76,0.18)',
                    borderRadius: '7px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    background: 'rgba(201,168,76,0.04)',
                    transition: 'border-color 0.2s, background 0.2s',
                  }}
                  className="group-hover:border-[rgba(201,168,76,0.35)] group-hover:bg-[rgba(201,168,76,0.08)]"
                >
                  <div style={{ width: '18px', height: '18px' }}>
                    {f.icon}
                  </div>
                </div>
              </div>
              <div className="md:col-span-3">
                <h3 className="text-base font-bold" style={{ color: '#b0b0a8' }}>
                  {f.area}
                </h3>
              </div>
              <div className="md:col-span-5">
                <p className="text-sm leading-relaxed" style={{ color: '#b8b8b0' }}>
                  {f.posicao}
                </p>
              </div>
              <div className="md:col-span-3">
                <p className="text-xs leading-relaxed" style={{ color: '#888882', borderLeft: '1px solid rgba(201,168,76,0.15)', paddingLeft: '1rem' }}>
                  {f.quando}
                </p>
              </div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} />
        </div>

      </div>
    </section>
  )
}
