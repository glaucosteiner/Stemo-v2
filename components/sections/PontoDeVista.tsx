export default function PontoDeVista() {
  const posicoes = [
    {
      num: '01',
      titulo: 'O problema raramente é o que parece.',
      corpo: 'A empresa chega com um pedido de sistema. Abrimos o processo e encontramos um problema de governança. Abrimos a governança e encontramos um problema de cultura. Quem só entrega o que foi pedido está resolvendo o sintoma — e garantindo que o cliente volte com o mesmo problema reformulado.',
    },
    {
      num: '02',
      titulo: 'Consultoria que vai embora não é parceria — é serviço.',
      corpo: 'Não existe transformação que funcione em projeto fechado. Quando o contrato termina no prazo e o resultado ainda não apareceu, alguém tem que responder por isso. Na Stemo, esse alguém somos nós também. É por isso que escolhemos os projetos que aceitamos — e recusamos os que não acreditamos.',
    },
    {
      num: '03',
      titulo: 'Cultura não é etapa. É o terreno.',
      corpo: 'A maioria dos projetos coloca cultura como última fase — depois de sistema instalado, processo desenhado, treinamento feito. É o motivo pelo qual a maioria falha. Cultura é o que determina se qualquer outra mudança vai durar. Trabalhamos nela desde o dia um, não como agenda paralela.',
    },
    {
      num: '04',
      titulo: 'Velocidade sem direção é custo acelerado.',
      corpo: 'A pressão para "fazer IA" ou "digitalizar tudo já" é real. E é perigosa. Empresas que automatizam processos ruins ficam com processos ruins mais rápidos. O papel da estratégia não é frear — é garantir que a velocidade vá na direção certa.',
    },
  ]

  return (
    <section id="ponto-de-vista" className="py-24 px-6" style={{ background: '#0d0d0d' }}>
      <div className="max-w-7xl mx-auto">

        <div className="fade-in grid md:grid-cols-2 gap-20 items-start mb-20">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px w-8" style={{ background: '#c9a84c' }} />
              <span className="text-xs font-semibold tracking-[3px] uppercase" style={{ color: '#7a7a70' }}>
                ponto de vista
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">
              <span className="text-white">O que pensamos</span><br />
              <span className="gradient-text">sobre transformação.</span>
            </h2>
          </div>
          <div className="flex items-end pb-2">
            <p className="text-base leading-relaxed" style={{ color: '#b8b8b0' }}>
              Não são princípios de site. São as razões pelas quais alguns clientes nos procuram — e outras consultorias não conseguem repetir o que fazemos.
            </p>
          </div>
        </div>

        <div className="space-y-0">
          {posicoes.map((p, i) => (
            <div
              key={i}
              className="fade-in grid md:grid-cols-12 gap-8 py-10"
              style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div className="md:col-span-1">
                <span className="text-xs font-mono" style={{ color: '#707068' }}>{p.num}</span>
              </div>
              <div className="md:col-span-4">
                <h3 className="text-xl font-bold leading-snug" style={{ color: '#c9a84c' }}>
                  {p.titulo}
                </h3>
              </div>
              <div className="md:col-span-7">
                <p className="text-base leading-relaxed" style={{ color: '#b8b8b0' }}>
                  {p.corpo}
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
