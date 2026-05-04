'use client'
import { useState } from 'react'
import type { FAQ } from '@/lib/supabase'

interface FAQProps {
  faqs: FAQ[]
}

export default function FAQ({ faqs }: FAQProps) {
  const [open, setOpen] = useState<string | null>(null)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <section id="faq" className="py-24 px-6" style={{ background: '#111110' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="fade-in mb-16 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px w-8" style={{ background: '#c9a84c' }} />
            <span className="text-xs font-semibold tracking-[3px] uppercase" style={{ color: '#7a7a70' }}>
              perguntas frequentes
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">
            <span className="text-white">Direto ao</span><br />
            <span className="gradient-text">ponto.</span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-px" style={{ background: 'rgba(201,168,76,0.08)' }}>
          {faqs.map((faq) => (
            <div key={faq.id} className="fade-in overflow-hidden" style={{ background: '#111110' }}>
              <button
                onClick={() => setOpen(open === faq.id ? null : faq.id)}
                className="w-full px-8 py-6 flex items-center justify-between transition-colors text-left"
                style={{ background: open === faq.id ? 'rgba(201,168,76,0.05)' : 'transparent' }}
                aria-expanded={open === faq.id}
              >
                <span
                  className="font-semibold text-base pr-4"
                  style={{ color: open === faq.id ? '#e8d5a3' : '#a0a098' }}
                >
                  {faq.question}
                </span>
                <svg
                  width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  className={`flex-shrink-0 transition-transform ${open === faq.id ? 'rotate-180' : ''}`}
                  style={{ color: '#c9a84c' }}
                >
                  <path d="M19 14l-7-7-7 7" />
                </svg>
              </button>

              {open === faq.id && (
                <div
                  className="px-8 pb-6 text-sm leading-relaxed prose-stemo"
                  style={{ color: '#7a7a70', borderTop: '1px solid rgba(201,168,76,0.08)' }}
                >
                  <div className="pt-4" dangerouslySetInnerHTML={{ __html: faq.answer.replace(/\n/g, '<br />') }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="fade-in mt-12 text-center space-y-4">
          <p className="text-sm" style={{ color: '#a0a098' }}>
            Tem uma pergunta que não está aqui?
          </p>
          <a href="#contato" className="inline-flex items-center gap-2 btn-gold-outline px-6 py-3 rounded-lg text-sm font-semibold transition-all">
            Fale com a gente
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
