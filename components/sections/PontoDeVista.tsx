'use client'
import { useState } from 'react'

export default function PontoDeVista() {
  const [hovered, setHovered] = useState<number | null>(null)

  const posicoes = [
    {
      titulo: 'O problema raramente é o que parece.',
      corpo: 'A empresa chega com um pedido de sistema. Abrimos o processo e encontramos um problema de governança. Abrimos a governança e encontramos um problema de cultura. Quem só entrega o que foi pedido está resolvendo o sintoma — e garantindo que o cliente volte com o mesmo problema reformulado.',
    },
    {
      titulo: 'Consultoria que vai embora não é parceria — é serviço.',
      corpo: 'Não existe transformação que funcione em projeto fechado. Quando o contrato termina no prazo e o resultado ainda não apareceu, alguém tem que responder por isso. Na Stemo, esse alguém somos nós também. É por isso que escolhemos os projetos que aceitamos — e recusamos os que não acreditamos.',
    },
    {
      titulo: 'Cultura não é etapa. É o terreno.',
      corpo: 'A maioria dos projetos coloca cultura como última fase — depois de sistema instalado, processo desenhado, treinamento feito. É o motivo pelo qual a maioria falha. Cultura é o que determina se qualquer outra mudança vai durar. Trabalhamos nela desde o dia um, não como agenda paralela.',
    },
    {
      titulo: 'Velocidade sem direção é custo acelerado.',
      corpo: 'A pressão para "fazer IA" ou "digitalizar tudo já" é real. E é perigosa. Empresas que automatizam processos ruins ficam com processos ruins mais rápidos. O papel da estratégia não é frear — é garantir que a velocidade vá na direção certa.',
    },
  ]

  return (
    <section id="ponto-de-vista" className="py-24 px-6" style={{ background: '#0d0d0d' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="fade-in mb-16 max-w-3xl space-y-4">
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
          <p className="text-base leading-relaxed max-w-xl" style={{ color: '#b8b8b0' }}>
            Não são princípios de site. São as razões pelas quais alguns clientes nos procuram — e outras consultorias não conseguem repetir o que fazemos.
          </p>
        </div>

        {/* Items */}
        <div className="space-y-0">
          {posicoes.map((p, i) => (
            <div
              key={i}
              className="fade-in grid md:grid-cols-12 gap-8 py-9 cursor-default transition-all duration-300 relative"
              style={{
                borderTop: '1px solid rgba(255,255,255,0.05)',
                background: hovered === i ? 'rgba(201,168,76,0.03)' : 'transparent',
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Barra dourada esquerda */}
              <div
                className="absolute left-0 top-0 bottom-0 w-0.5 transition-all duration-300"
                style={{
                  background: '#c9a84c',
                  opacity: hovered === i ? 1 : 0,
                  transform: hovered === i ? 'scaleY(1)' : 'scaleY(0)',
                  transformOrigin: 'top',
                }}
              />

              {/* Titulo */}
              <div className="md:col-span-5 pl-4">
                <h3
                  className="text-xl font-bold leading-snug transition-colors duration-300"
                  style={{ color: hovered === i ? '#c9a84c' : '#9a8a6a' }}
                >
                  {p.titulo}
                </h3>
              </div>

              {/* Corpo */}
              <div className="md:col-span-7">
                <p
                  className="text-base leading-relaxed transition-colors duration-300"
                  style={{ color: hovered === i ? '#b8b8b0' : '#6a6a60' }}
                >
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
