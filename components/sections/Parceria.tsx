export default function Parceria() {
  return (
    <section className="py-24 px-6" style={{ background: '#0d0d0d' }}>
      <div className="max-w-7xl mx-auto">

        <div className="grid md:grid-cols-2 gap-20 items-start">

          <div className="fade-in space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-8" style={{ background: '#c9a84c' }} />
              <span className="text-xs font-semibold tracking-[3px] uppercase" style={{ color: '#7a7a70' }}>
                modelo de trabalho
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">
              <span className="text-white">Fornecedor entrega.</span><br />
              <span className="gradient-text">Parceiro responde.</span>
            </h2>

            <div className="h-px" style={{ background: 'linear-gradient(to right, rgba(201,168,76,0.2), transparent)' }} />

            <p className="text-base leading-relaxed" style={{ color: '#8a8a80' }}>
              A diferença não está no contrato — está em quem fica quando o resultado não aparece no prazo esperado. Fornecedor encerra o escopo. Parceiro pergunta o que está travando.
            </p>

            <p className="text-sm leading-relaxed" style={{ color: '#b8b8b0' }}>
              Definimos juntos o que é sucesso antes de começar. Não como formalidade — como critério que determina quando nosso trabalho de fato terminou.
            </p>

            <a href="#contato" className="inline-flex items-center gap-2 btn-gold-outline px-6 py-3 rounded-lg text-sm font-semibold transition-all">
              Falar com a Stemo
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="fade-in space-y-3">
            {[
              {
                pergunta: 'O que acontece quando o prazo chega e o resultado não?',
                stemo: 'Continuamos. O prazo é uma referência de ritmo, não uma data de saída.',
              },
              {
                pergunta: 'E se o problema que encontrarmos for diferente do que foi contratado?',
                stemo: 'Falamos. Preferimos reformular o projeto do que entregar a solução errada no prazo certo.',
              },
              {
                pergunta: 'Como garantem que as pessoas da empresa vão aderir?',
                stemo: 'Trabalhamos com elas desde o início — não entregamos para elas no final. Adesão não é treinamento, é participação.',
              },
              {
                pergunta: 'Aceitam qualquer projeto?',
                stemo: 'Não. Recusamos projetos em que não acreditamos ou para os quais o momento da empresa não está pronto. Dito isso antes da proposta.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl p-6 space-y-3"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <p className="text-xs leading-relaxed" style={{ color: '#a0a098' }}>
                  {item.pergunta}
                </p>
                <p className="text-sm leading-relaxed font-medium" style={{ color: '#b8b8b0' }}>
                  {item.stemo}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
