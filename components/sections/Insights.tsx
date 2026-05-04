'use client'
import type { Article } from '@/lib/supabase'
import Link from 'next/link'
import { formatDateShort } from '@/lib/utils'

interface InsightsProps {
  articles: Article[]
}

export default function Insights({ articles }: InsightsProps) {
  const featured = articles[0] ?? null
  const regular = articles.slice(1)

  return (
    <section id="insights" className="py-24 px-6" style={{ background: '#0a0a09' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="fade-in max-w-2xl mb-16 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px w-8" style={{ background: '#c9a84c' }} />
            <span className="text-xs font-semibold tracking-[3px] uppercase" style={{ color: '#7a7a70' }}>
              insights
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">
            <span className="gradient-text">Ponto de vista</span><br />
            <span className="text-white">de quem executa.</span>
          </h2>
        </div>

        {/* Artigo em destaque */}
        {featured && (
          <div className="fade-in mb-12">
            <Link href={`/insights/${featured.slug}`} className="group block">
              <div
                className="grid md:grid-cols-2 gap-0 rounded-xl overflow-hidden"
                style={{ border: '1px solid rgba(201,168,76,0.15)' }}
              >
                {/* Left panel — titulo em destaque */}
                <div
                  className="relative flex flex-col justify-between h-48 md:h-auto p-8 overflow-hidden"
                  style={{ background: 'rgba(201,168,76,0.05)' }}
                >
                  <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, rgba(201,168,76,0.3) 0px, rgba(201,168,76,0.3) 1px, transparent 1px, transparent 28px)',
                  }} />
                  {/* Badge destaque */}
                  <p
                    className="relative text-[11px] font-bold tracking-[4px] uppercase"
                    style={{ color: 'rgba(201,168,76,0.5)' }}
                  >
                    destaque
                  </p>
                  {/* Titulo do artigo — proeminente */}
                  <p
                    className="relative text-xl md:text-2xl font-black leading-snug"
                    style={{ color: 'rgba(201,168,76,0.85)' }}
                  >
                    {featured.title}
                  </p>
                </div>

                {/* Right panel — detalhes */}
                <div className="flex flex-col justify-center p-8 space-y-4" style={{ background: 'rgba(201,168,76,0.03)' }}>
                  <div className="flex items-center gap-3">
                    <span
                      className="px-2.5 py-1 rounded text-[10px] font-semibold"
                      style={{ background: 'rgba(201,168,76,0.1)', color: '#9a7040', border: '1px solid rgba(201,168,76,0.15)' }}
                    >
                      {featured.category}
                    </span>
                    <span className="text-xs" style={{ color: '#4a4a40' }}>
                      {featured.published_at ? formatDateShort(featured.published_at) : ''}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold leading-snug" style={{ color: '#b0b0a8' }}>
                    {featured.title}
                  </h3>
                  <p className="text-sm line-clamp-3 leading-relaxed" style={{ color: '#6a6a60' }}>
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs" style={{ color: '#4a4a40' }}>Por {featured.author}</span>
                    <span className="text-xs font-semibold transition-all group-hover:translate-x-1" style={{ color: '#c9a84c' }}>
                      Ler artigo →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Grid dos demais artigos */}
        {regular.length > 0 && (
          <>
            {/* Label "Artigos Publicados" + subtitulo */}
            <div className="mb-6 flex items-end justify-between">
              <div>
                <p className="text-[11px] font-semibold tracking-[3px] uppercase mb-1" style={{ color: '#7a7a70' }}>
                  Artigos publicados
                </p>
                <p className="text-sm" style={{ color: '#5a5a50' }}>
                  Leituras sobre o que realmente muda — e o que quase sempre fica de fora.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px mb-4" style={{ background: 'rgba(201,168,76,0.08)' }}>
              {regular.map((article) => (
                <Link key={article.id} href={`/insights/${article.slug}`} className="group block">
                  <div
                    className="fade-in h-full p-8 flex flex-col transition-colors duration-300"
                    style={{ background: '#0a0a09' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#111110')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#0a0a09')}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded"
                        style={{ background: 'rgba(201,168,76,0.07)', color: '#7a7a70' }}
                      >
                        {article.category}
                      </span>
                      <span className="text-[11px]" style={{ color: '#3a3a38' }}>
                        {article.published_at ? formatDateShort(article.published_at) : ''}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold mb-3 line-clamp-2 flex-grow leading-snug" style={{ color: '#b0b0a8' }}>
                      {article.title}
                    </h3>
                    <p className="text-xs mb-4 line-clamp-2 leading-relaxed" style={{ color: '#5a5a50' }}>
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 mt-auto" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                      <span className="text-[11px]" style={{ color: '#3a3a38' }}>
                        {article.read_time || 5} min
                      </span>
                      <span className="text-xs font-semibold transition-transform group-hover:translate-x-1" style={{ color: '#c9a84c' }}>
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Ver todos */}
        <div className="text-center py-12">
          <Link
            href="/insights"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-lg text-sm font-semibold transition-all"
            style={{ border: '1px solid rgba(201,168,76,0.3)', color: '#c9a84c', background: 'rgba(201,168,76,0.06)' }}
          >
            Ver todos os artigos →
          </Link>
        </div>

      </div>
    </section>
  )
}
