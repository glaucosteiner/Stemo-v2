'use client'
import { useEffect, useState } from 'react'
import type { Article } from '@/lib/supabase'
import { createBrowserClient } from '@/lib/supabase'
import Link from 'next/link'
import { formatDateShort } from '@/lib/utils'
import Navbar from '@/components/Navbar'
import Footer from '@/components/sections/Footer'

export default function InsightsPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      const supabase = createBrowserClient()
      const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false })

      setArticles(data || [])
      setLoading(false)
    }

    fetchArticles()
  }, [])

  const categories = [
    'All',
    'IA Estratégica',
    'Transformação Digital',
    'Dados & Analytics',
    'Gestão & Cultura',
    'Nova Economia',
  ]

  const filteredArticles =
    selectedCategory === 'All' ? articles : articles.filter((a) => a.category === selectedCategory)

  return (
    <>
      <Navbar productsVisible={false} />
      <main className="pt-32 pb-24 px-6 bg-[#050d1a] min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="gradient-text">Insights</span> & Conhecimento
            </h1>
            <p className="text-slate-400 text-lg">
              Artigos, análises e reflexões sobre transformação digital, IA e novo modelo de negócio
            </p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                    : 'border border-white/10 text-slate-400 hover:border-blue-500/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Articles grid */}
          {loading ? (
            <div className="text-center py-24">
              <p className="text-slate-400">Carregando artigos...</p>
            </div>
          ) : filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/insights/${article.slug}`}
                  className="group block h-full"
                >
                  <div className="h-full p-8 rounded-xl border border-white/5 bg-gradient-to-br from-slate-900/50 to-transparent hover:border-blue-500/30 transition-all flex flex-col">
                    {/* Category & Date */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full bg-slate-800/50 text-slate-400 text-xs font-semibold">
                        {article.category}
                      </span>
                      <span className="text-xs text-slate-500">
                        {article.published_at ? formatDateShort(article.published_at) : ''}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-bold text-white mb-3 group-hover:gradient-text transition-all line-clamp-2 flex-grow">
                      {article.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">{article.excerpt}</p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                      <div className="text-xs text-slate-500">
                        <span>{article.read_time || 5} min</span>
                      </div>
                      <span className="text-blue-400 group-hover:translate-x-1 transition-transform font-semibold text-sm">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-slate-400">Nenhum artigo nesta categoria.</p>
            </div>
          )}
        </div>
      </main>
      <Footer productsVisible={false} />
    </>
  )
}
