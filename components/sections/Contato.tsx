'use client'
import { useState } from 'react'

export default function Contato() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'ok' : 'err')
    } catch {
      setStatus('err')
    }
  }

  const inputStyle = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: 'white',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '14px',
    width: '100%',
    outline: 'none',
  } as React.CSSProperties

  return (
    <section id="contato" className="py-24 px-6" style={{ background: '#0d0d0d' }}>
      <div className="max-w-7xl mx-auto">

        <div className="grid md:grid-cols-2 gap-20 items-start">

          <div className="fade-in space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-px w-8" style={{ background: '#c9a84c' }} />
                <span className="text-xs font-semibold tracking-[3px] uppercase" style={{ color: '#7a7a70' }}>
                  contato
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">
                <span className="text-white">Primeira conversa</span><br />
                <span className="gradient-text">é diagnóstico.</span>
              </h2>
            </div>

            <div className="h-px" style={{ background: 'linear-gradient(to right, rgba(201,168,76,0.2), transparent)' }} />

            <p className="text-base leading-relaxed" style={{ color: '#8a8a80' }}>
              Não fazemos reunião de apresentação de portfólio. Na primeira conversa, entendemos seu desafio e dizemos com honestidade o que pensamos — incluindo se faz sentido trabalharmos juntos.
            </p>

            <p className="text-sm leading-relaxed" style={{ color: '#a0a098' }}>
              Sem pitch. Sem proposta automática no dia seguinte. Sem pressão.
            </p>

            <div className="space-y-3 pt-4">
              {[
                'A conversa é gratuita e sem compromisso',
                'Respondemos em até 24 horas',
                'Se não for o momento certo, dizemos isso também',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full" style={{ background: '#c9a84c', flexShrink: 0 }} />
                  <span className="text-sm" style={{ color: '#b8b8b0' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="fade-in">
            {status === 'ok' ? (
              <div
                className="rounded-xl p-10 text-center space-y-4"
                style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.15)' }}
              >
                <p className="text-lg font-bold" style={{ color: '#c9a84c' }}>Mensagem recebida.</p>
                <p className="text-sm" style={{ color: '#b8b8b0' }}>Retornaremos em até 24 horas.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 md:col-span-1">
                    <input
                      style={inputStyle}
                      placeholder="Nome"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <input
                      style={inputStyle}
                      type="email"
                      placeholder="E-mail"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <input
                  style={inputStyle}
                  placeholder="Empresa"
                  value={form.company}
                  onChange={e => setForm({ ...form, company: e.target.value })}
                />
                <textarea
                  style={{ ...inputStyle, resize: 'none' }}
                  rows={5}
                  placeholder="O que está enfrentando? Quanto mais específico, melhor."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  required
                />
                {status === 'err' && (
                  <p className="text-xs" style={{ color: '#c9a84c' }}>
                    Algo deu errado. Tente novamente ou escreva para contato@stemo.com.br
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-gold w-full py-4 rounded-lg text-sm font-semibold transition-all"
                >
                  {status === 'loading' ? 'Enviando...' : 'Enviar mensagem'}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
