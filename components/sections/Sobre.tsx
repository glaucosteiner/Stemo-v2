export default function Sobre() {
  return (
    <section id="sobre" className="py-24 px-6" style={{ background: '#0a0a09' }}>
      <div className="max-w-7xl mx-auto">

        <div className="grid md:grid-cols-2 gap-20 items-start">

          <div className="fade-in space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-px w-8" style={{ background: '#c9a84c' }} />
                <span className="text-xs font-semibold tracking-[3px] uppercase" style={{ color: '#7a7a70' }}>
                  quem somos
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">
                <span className="text-white">Não somos</span><br />
                <span className="gradient-text">uma grande consultoria</span><br />
                <span className="text-white">e isso é intencional.</span>
              </h2>
            </div>

            <div className="h-px" style={{ background: 'linear-gradient(to right, rgba(201,168,76,0.2), transparent)' }} />

            <p className="text-base leading-relaxed" style={{ color: '#8a8a80' }}>
              Grandes consultorias mandam os sócios na venda e os analistas na execução. Nós mandamos quem vai resolver o problema desde a primeira conversa — e ficamos até o resultado aparecer.
            </p>

            <p className="text-base leading-relaxed" style={{ color: '#b8b8b0' }}>
              Somos pequenos por escolha. Isso nos permite trabalhar com profundidade em vez de volume, dizer não quando faz sentido, e manter co-responsabilidade real — não como conceito de pitch, mas como compromisso que limita quantos projetos aceitamos ao mesmo tempo.
            </p>

            <p className="text-base leading-relaxed" style={{ color: '#a0a098' }}>
              24 anos no mercado. Nenhum relatório entregue sem execução.
            </p>
          </div>

          <div className="fade-in space-y-4">
            {[
              {
                fase: 'Antes de propor qualquer coisa',
                desc: 'Entendemos o negócio, o setor, a cultura e o que já foi tentado. Muitos pedidos que chegam como "projeto de tecnologia" saem como algo completamente diferente.',
              },
              {
                fase: 'Durante o projeto',
                desc: 'Trabalhamos junto com as equipes internas — não paralelo a elas. Processo, cultura e tecnologia são tratados na sequência que faz sentido para aquela empresa, não em uma ordem de produto.',
              },
              {
                fase: 'Depois do prazo',
                desc: 'O prazo é uma referência, não um ponto final. Ficamos presentes enquanto o resultado não for real e sustentável.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-xl space-y-2"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <p className="text-xs font-semibold tracking-wider uppercase" style={{ color: '#c9a84c' }}>
                  {item.fase}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: '#b8b8b0' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
