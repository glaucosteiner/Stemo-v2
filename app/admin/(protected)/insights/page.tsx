'use client'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useEffect, useState } from 'react'
import { createBrowserClient } from '@/lib/supabase'
import type { Article } from '@/lib/supabase'
import { slugify } from '@/lib/utils'

export default function InsightsAdminPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<Partial<Article>>({})
  const [loading, setLoading] = useState(true)
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    const supabase = createBrowserClient()
    const { data } = await supabase
      .from('articles')
      .select('*')
      .order('is_published', { ascending: false })
      .order('published_at', { ascending: false })
    setArticles(data || [])
    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as any
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }))
    } else if (name === 'title') {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        slug: !editingId ? slugify(value) : prev.slug,
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createBrowserClient()

    try {
      if (editingId) {
        await supabase.from('articles').update(formData).eq('id', editingId)
      } else {
        await supabase.from('articles').insert({
          ...formData,
          article_references: formData.article_references || [],
          keywords: (formData.keywords as any)?.split(',').map((k: string) => k.trim()) || [],
        })
      }

      setShowForm(false)
      setEditingId(null)
      setFormData({})
      setShowPreview(false)
      fetchArticles()
    } catch (error) {
      console.error('Erro ao salvar artigo:', error)
    }
  }

  const handleEdit = (article: Article) => {
    setFormData(article)
    setEditingId(article.id)
    setShowForm(true)
    setShowPreview(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza?')) return
    const supabase = createBrowserClient()
    await supabase.from('articles').delete().eq('id', id)
    fetchArticles()
  }

  const handleToggle = async (article: Article) => {
    const supabase = createBrowserClient()
    await supabase.from('articles').update({ is_published: !article.is_published }).eq('id', article.id)
    fetchArticles()
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData({})
    setShowPreview(false)
  }

  if (loading) return <div className="text-slate-400">Carregando...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Insights</h1>
        {!showForm && (
          <button
            onClick={() => { setShowForm(true); setEditingId(null); setFormData({}); setShowPreview(false) }}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:shadow-lg transition-all"
          >
            + Novo Artigo
          </button>
        )}
      </div>

      {showForm && (
        <div className="mb-12 p-8 rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-transparent">
          <h2 className="text-xl font-bold text-white mb-6">{editingId ? 'Editar Artigo' : 'Novo Artigo'}</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Título*</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Slug*</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug || ''}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Categoria</label>
              <input
                type="text"
                name="category"
                value={formData.category || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Resumo (excerpt)*</label>
              <textarea
                name="excerpt"
                value={formData.excerpt || ''}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Conteúdo (Markdown)*</label>
              <textarea
                name="content"
                value={formData.content || ''}
                onChange={handleChange}
                required
                rows={14}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white resize-none font-mono text-sm"
              />
            </div>

            {showPreview && (
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-6">
                <p className="text-xs text-amber-400/80 uppercase font-semibold mb-4 tracking-widest">Preview do artigo</p>
                {formData.content ? (
                  <div className="text-slate-300 leading-relaxed space-y-4 text-sm">
                    <Markdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({children}: any) => <h1 className="text-2xl font-bold text-white mt-6 mb-3">{children}</h1>,
                        h2: ({children}: any) => <h2 className="text-xl font-bold text-white mt-5 mb-2">{children}</h2>,
                        h3: ({children}: any) => <h3 className="text-lg font-semibold text-white mt-4 mb-2">{children}</h3>,
                        p: ({children}: any) => <p className="text-slate-300 mb-3 leading-relaxed">{children}</p>,
                        strong: ({children}: any) => <strong className="text-white font-semibold">{children}</strong>,
                        ul: ({children}: any) => <ul className="list-disc list-inside space-y-1 text-slate-300 mb-3">{children}</ul>,
                        ol: ({children}: any) => <ol className="list-decimal list-inside space-y-1 text-slate-300 mb-3">{children}</ol>,
                        li: ({children}: any) => <li className="text-slate-300">{children}</li>,
                        blockquote: ({children}: any) => <blockquote className="border-l-4 border-amber-500/50 pl-4 italic text-slate-400 my-4">{children}</blockquote>,
                        code: ({children}: any) => <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono text-amber-300">{children}</code>,
                      }}
                    >
                      {formData.content}
                    </Markdown>
                  </div>
                ) : (
                  <p className="text-slate-500 italic text-sm">Nenhum conteúdo para exibir. Escreva algo no campo acima.</p>
                )}
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Tempo de Leitura (min)</label>
                <input
                  type="number"
                  name="read_time"
                  value={formData.read_time || 5}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Meta Título</label>
                <input type="text" name="meta_title" value={formData.meta_title || ''} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Keywords (vírgula)</label>
                <input
                  type="text"
                  name="keywords"
                  value={Array.isArray(formData.keywords) ? formData.keywords.join(', ') : (formData.keywords || '')}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Meta Descrição</label>
              <textarea name="meta_description" value={formData.meta_description || ''} onChange={handleChange} rows={2} className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white resize-none" />
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <input type="checkbox" name="is_published" checked={formData.is_published || false} onChange={handleChange} id="pub" className="w-4 h-4" />
                <label htmlFor="pub" className="text-sm text-slate-400">Publicado</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" name="is_featured" checked={formData.is_featured || false} onChange={handleChange} id="feat" className="w-4 h-4" />
                <label htmlFor="feat" className="text-sm text-slate-400">Destaque</label>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className={`px-4 py-2 rounded-lg border font-semibold transition-all ${showPreview ? 'border-amber-500/50 bg-amber-500/10 text-amber-400' : 'border-blue-500/30 text-blue-400 hover:bg-blue-500/10'}`}
              >
                {showPreview ? '✕ Fechar Preview' : '👁 Preview'}
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:shadow-lg transition-all"
              >
                Salvar
              </button>
              <button type="button" onClick={handleCancel} className="px-6 py-2 rounded-lg border border-red-500/30 text-red-400 font-semibold hover:bg-red-500/10 transition-all">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de artigos */}
      {articles.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <p>Nenhum artigo ainda.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <div
              key={article.id}
              className="p-6 rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-transparent"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${article.is_published ? 'bg-green-500/20 text-green-400' : 'bg-slate-500/20 text-slate-400'}`}>
                      {article.is_published ? 'Publicado' : 'Oculto'}
                    </span>
                    {article.is_featured && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-semibold">Destaque</span>
                    )}
                    <span className="text-xs text-slate-500">{article.category}</span>
                  </div>
                  <h3 className="font-bold text-white truncate">{article.title}</h3>
                  <p className="text-sm text-slate-400 mt-1 line-clamp-2">{article.excerpt}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleToggle(article)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${article.is_published ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30' : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'}`}
                  >
                    {article.is_published ? 'Ocultar' : 'Publicar'}
                  </button>
                  <button onClick={() => handleEdit(article)} className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 font-semibold transition-all text-sm">
                    Editar
                  </button>
                  <button onClick={() => handleDelete(article.id)} className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 font-semibold transition-all text-sm">
                    Deletar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
