'use client'
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
    const { data } = await supabase.from('articles').select('*').order('published_at', { ascending: false })
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
      fetchArticles()
    } catch (error) {
      console.error('Erro ao salvar artigo:', error)
    }
  }

  const handleEdit = (article: Article) => {
    setFormData(article)
    setEditingId(article.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza?')) return

    const supabase = createBrowserClient()
    await supabase.from('articles').delete().eq('id', id)
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
            onClick={() => setShowForm(true)}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:shadow-lg transition-all"
          >
            + Novo Artigo
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="mb-12 p-8 rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-transparent">
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
                <label className="block text-sm font-semibold text-white mb-2">Slug</label>
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

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Categoria*</label>
                <select
                  name="category"
                  value={formData.category || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                >
                  <option value="">Selecione...</option>
                  <option value="IA Estratégica">IA Estratégica</option>
                  <option value="Transformação Digital">Transformação Digital</option>
                  <option value="Dados & Analytics">Dados & Analytics</option>
                  <option value="Gestão & Cultura">Gestão & Cultura</option>
                  <option value="Nova Economia">Nova Economia</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Autor</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                  placeholder="Equipe Stemo"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Resumo (Excerpt)*</label>
              <textarea
                name="excerpt"
                value={formData.excerpt || ''}
                onChange={handleChange}
                required
                rows={2}
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
                rows={10}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white resize-none font-mono text-sm"
              />
            </div>

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
                <label className="block text-sm font-semibold text-white mb-2">Meta Descrição</label>
                <input type="text" name="meta_description" value={formData.meta_description || ''} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center gap-2">
                <input type="checkbox" name="is_published" checked={formData.is_published || false} onChange={handleChange} id="pub" className="w-4 h-4" />
                <label htmlFor="pub" className="text-sm text-slate-400">
                  Publicado
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" name="is_featured" checked={formData.is_featured || false} onChange={handleChange} id="feat" className="w-4 h-4" />
                <label htmlFor="feat" className="text-sm text-slate-400">
                  Destaque
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button type="button" onClick={() => setShowPreview(!showPreview)} className="px-4 py-2 rounded-lg border border-blue-500/30 text-blue-400 font-semibold hover:bg-blue-500/10 transition-all">
                {showPreview ? 'Ocultar Preview' : 'Preview'}
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

      {/* Articles list */}
      <div className="space-y-4">
        {articles.map((article) => (
          <div key={article.id} className="p-6 rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-transparent">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-white">{article.title}</h3>
                  {article.is_featured && <span className="px-2 py-1 rounded text-xs bg-yellow-500/20 text-yellow-400">⭐ Destaque</span>}
                  {article.is_published && <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-400">✓ Publicado</span>}
                </div>
                <p className="text-sm text-slate-400">{article.category}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => handleEdit(article)} className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 font-semibold transition-all">
                  Editar
                </button>
                <button onClick={() => handleDelete(article.id)} className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 font-semibold transition-all">
                  Deletar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
