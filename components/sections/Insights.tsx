'use client'
import type { Article } from '@/lib/supabase'
import Link from 'next/link'
import { useState } from 'react'
import { formatDateShort } from '@/lib/utils'

interface InsightsProps {
  articles: Article[]
}

export default function Insights({ articles }: InsightsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos')

  const featured = articles.find((a) => a.is_featured)
  const regular = articles.filter((a) => !a.is_featured)

  // Categorias derivadas dinamicamente dos artigos
  const categories = ['Todos', ...Array.from(new Set(regular.map((a) => a.category))).sort()]

  const filteredArticles =
    selectedCategory === 'Todos'
      ? regular
      : regular.filter((a) => a.category === selectedCategory)

  return (
    <section id="insights" className="py-24 px-6" style={{ background: '#0a0a09' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="fade-in grid md:grid-cols-2 gap-12 items-end mb-12">
          <div className="space-y-4">
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
          {/* Filtro de categorias */}
          <div className="flex flex-wrap gap-2 md:justify-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="px-4 py-2 rounded-lg text-xs font-semibold transition-all"
                style={
                  selectedCategory === cat
                    ? { background: 'rgba(201,168,76,0.15)', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.3)' }
                    : { background: 'transparent', color: '#6a6a62', border: '1px solid rgba(255,255,255,0.07)' }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Artigo em destaque */}
        {featured && (
          <div className="fade-in mb-10">
            <Link href={`/insights/${featured.slug}`} className="group block">
              <div
                className="rounded-xl overflow-hidden"
                style={{
                  border: '1px solid rgba(201,168,76,0.3)',
                  borderLeft: '4px solid rgba(201,168,76,0.7)',
                  background: 'rgba(201,168,76,0.03)',
                }}
              >
                <div className="grid md:grid-cols-5">

                  {/* Esquerda — painel visual */}
                  <div
                    className="md:col-span-2 relative flex flex-col items-center justify-center p-10 min-h-[260px]"
                    style={{
                      background: 'linear-gradient(160deg, rgba(201,168,76,0.2) 0%, rgba(201,168,76,0.07) 60%, rgba(201,168,76,0.02) 100%)',
                      borderRight: '1px solid rgba(201,168,76,0.18)',
                    }}
                  >
                    {/* Linhas decorativas */}
                    <div
                      className="absolute top-0 left-0 right-0 h-px"
                      style={{ background: 'linear-gradient(to right, rgba(201,168,76,0.6), rgba(201,168,76,0.15), transparent)' }}
                    />
                    <div
                      className="absolute bottom-0 left-0 right-0 h-px"
                      style={{ background: 'linear-gradient(to right, rgba(201,168,76,0.3), rgba(201,168,76,0.08), transparent)' }}
                    />

                    <div className="text-center space-y-4">
                      <span
                        className="inline-block text-[9px] font-bold tracking-[6px] uppercase px-3 py-1.5 rounded"
                        style={{
                          color: '#c9a84c',
                          background: 'rgba(201,168,76,0.15)',
                          border: '1px solid rgba(201,168,76,0.3)',
                        }}
                      >
                        destaque
                      </span>
                      <p
                        className="text-4xl md:text-5xl font-black leading-none"
                        style={{ color: 'rgba(201,168,76,0.65)' }}
                      >
                        {featured.category}
                      </p>
                    </div>
                  </div>

                  {/* Direita — conteúdo */}
                  <div className="md:col-span-3 flex flex-col justify-center p-8 md:p-10 space-y-5">
                    <div className="flex items-center gap-3">
                      <span
                        className="px-3 py-1 rounded text-[10px] font-semibold"
                        style={{ background: 'rgba(201,168,76,0.12)', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.25)' }}
                      >
                        {featured.category}
                      </span>
                      <span className="text-xs" style={{ color: '#707068' }}>
                        {featured.published_at ? formatDateShort(featured.published_at) : ''}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold leading-snug" style={{ color: '#e8e8e0' }}>
                      {featured.title}
                    </h3>

                    <p className="text-sm line-clamp-3 leading-relaxed" style={{ color: '#a8a8a0' }}>
                      {featured.excerpt}
                    </p>

                    <div
                      className="flex items-center justify-between pt-4"
                      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <span className="text-xs" style={{ color: '#707068' }}>Por {featured.author}</span>
                      <span
                        className="text-sm font-bold transition-all group-hover:translate-x-1"
                        style={{ color: '#c9a84c' }}
                      >
                        Ler artigo →
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Grid de artigos */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ background: 'rgba(201,168,76,0.08)' }}
        >
          {filteredArticles.map((article) => (
            <Link key={article.id} href={`/insights/${article.slug}`} className="group block">
              <div
                className="fade-in h-full p-8 flex flex-col transition-colors duration-300"
                style={{ background: '#0a0a09' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#111110')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#0a0a09')}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded"
                    style={{ background: 'rgba(201,168,76,0.07)', color: '#a0a098' }}
                  >
                    {article.category}
                  </span>
                  <span className="text-[11px]" style={{ color: '#707068' }}>
                    {article.published_at ? formatDateShort(article.published_at) : ''}
                  </span>
                </div>

                <h3
                  className="text-sm font-bold mb-3 line-clamp-2 flex-grow leading-snug"
                  style={{ color: '#d0d0c8' }}
                >
                  {article.title}
                </h3>

                <p className="text-xs mb-4 line-clamp-2 leading-relaxed" style={{ color: '#888882' }}>
                  {article.excerpt}
                </p>

                <div
                  className="flex items-center justify-between pt-4 mt-auto"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <span className="text-[11px]" style={{ color: '#707068' }}>
                    {article.read_time || 5} min
                  </span>
                  <span
                    className="text-xs font-semibold transition-transform group-hover:translate-x-1"
                    style={{ color: '#c9a84c' }}
                  >
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <p className="text-sm" style={{ color: '#888882' }}>Nenhum artigo nesta categoria.</p>
          </div>
        )}

      </div>
    </section>
  )
}
