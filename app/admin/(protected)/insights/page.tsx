'use client'
import { useEffect, useState, useRef } from 'react'
import { createBrowserClient } from '@/lib/supabase'
import type { Article } from '@/lib/supabase'
import { slugify } from '@/lib/utils'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

export default function InsightsAdminPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<Partial<Article>>({})
  const [loading, setLoading] = useState(true)
  const [showPreview, setShowPreview] = useState(false)
  const contentRef = useRef<HTMLTextAreaElement>(null)

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

  const applyFormat = (type: 'bold' | 'italic' | 'underline') => {
    const textarea = contentRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selected = textarea.value.substring(start, end)
    const before = textarea.value.substring(0, start)
    const after = textarea.value.substring(end)

    const placeholder = selected || 'texto'
    let wrapped = ''
    if (type === 'bold') wrapped = `**${placeholder}**`
    else if (type === 'italic') wrapped = `*${placeholder}*`
    else if (type === 'underline') wrapped = `<u>${placeholder}</u>`

    const newValue = before + wrapped + after
    setFormData((prev) => ({ ...prev, content: newValue }))

    setTimeout(() => {
      textarea.focus()
      const newStart = start + (type === 'bold' ? 2 : type === 'italic' ? 1 : 3)
      const newEnd = newStart + placeholder.length
      textarea.setSelectionRange(newStart, newEnd)
    }, 0)
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
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
                <label className="block text-sm font-semibold text-white mb-2">Titulo*</label>
                <input type="text" name="title" value={formData.title || ''} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Slug</label>
                <input type="text" name="slug" value={formData.slug || ''} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Categoria*</label>
                <select name="category" value={formData.category || ''} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white">
                  <option value="">Selecione...</option>
                  <option value="IA Estrategica">IA Estrategica</option>
                  <option value="Transformacao Digital">Transformacao Digital</option>
                  <option value="Dados & Analytics">Dados & Analytics</option>
                  <option value="Gestao & Cultura">Gestao & Cultura</option>
                  <option value="Nova Economia">Nova Economia</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Autor</label>
                <input type="text" name="author" value={formData.author || ''} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white" placeholder="Equipe Stemo" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Resumo (Excerpt)*</label>
              <textarea name="excerpt" value={formData.excerpt || ''} onChange={handleChange} required rows={2} className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white resize-none" />
            </div>

            {/* Conteudo com toolbar */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Conteudo (Markdown)*</label>
              <div className="flex items-center gap-1 px-3 py-2 rounded-t-lg border border-white/10 bg-white/5" style={{ borderBottom: 'none' }}>
                <button
                  type="button"
                  onClick={() => applyFormat('bold')}
                  title="Negrito: selecione texto e clique"
                  className="w-8 h-8 rounded flex items-center justify-center text-white hover:bg-white/20 active:bg-white/30 transition-colors font-bold text-base select-none"
                >
                  B
                </button>
                <button
                  type="button"
                  onClick={() => applyFormat('italic')}
                  title="Italico: selecione texto e clique"
                  className="w-8 h-8 rounded flex items-center justify-center text-white hover:bg-white/20 active:bg-white/30 transition-colors italic text-base select-none"
                >
                  I
                </button>
                <button
                  type="button"
                  onClick={() => applyFormat('underline')}
                  title="Sublinhado: selecione texto e clique"
                  className="w-8 h-8 rounded flex items-center justify-center text-white hover:bg-white/20 active:bg-white/30 transition-colors underline text-base select-none"
                >
                  U
                </button>
                <div className="w-px h-4 bg-white/20 mx-1" />
                <span className="text-xs text-slate-500 italic">selecione o texto e clique no botao</span>
              </div>
              <textarea
                ref={contentRef}
                name="content"
                value={formData.content || ''}
                onChange={handleChange}
                required
                rows={14}
                className="w-full px-4 py-3 rounded-b-lg bg-white/5 border border-white/10 text-white resize-y font-mono text-sm leading-relaxed"
                style={{ borderTop: 'none' }}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Tempo de Leitura (min)</label>
                <input type="number" name="read_time" value={formData.read_time || 5} onChange={handleChange} min="1" className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Meta Titulo</label>
                <input type="text" name="meta_title" value={formData.meta_title || ''} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Meta Descricao</label>
                <input type="text" name="meta_description" value={formData.meta_description || ''} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
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
              <button type="button" onClick={() => setShowPreview(!showPreview)} className="px-4 py-2 rounded-lg border border-blue-500/30 text-blue-400 font-semibold hover:bg-blue-500/10 transition-all">
                {showPreview ? 'Fechar Preview' : 'Preview'}
              </button>
              <button type="submit" className="px-6 py-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:shadow-lg transition-all">
                Salvar
              </button>
              <button type="button" onClick={handleCancel} className="px-6 py-2 rounded-lg border border-red-500/30 text-red-400 font-semibold hover:bg-red-500/10 transition-all">
                Cancelar
              </button>
            </div>
          </form>

          {showPreview && (
            <div className="mt-8 rounded-xl border border-amber-500/20 bg-amber-500/5 p-6">
              <p className="text-xs text-amber-400/80 uppercase font-semibold mb-4 tracking-widest">Preview do artigo</p>
              {formData.content ? (
                <div className="text-slate-300 leading-relaxed text-sm">
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      h1: ({children}: any) => <h1 className="text-2xl font-bold text-white mt-6 mb-3">{children}</h1>,
                      h2: ({children}: any) => <h2 className="text-xl font-bold text-white mt-5 mb-2">{children}</h2>,
                      h3: ({children}: any) => <h3 className="text-lg font-semibold text-white mt-4 mb-2">{children}</h3>,
                      p: ({children}: any) => <p className="text-slate-300 mb-3 leading-relaxed">{children}</p>,
                      strong: ({children}: any) => <strong className="text-white font-bold">{children}</strong>,
                      em: ({children}: any) => <em className="text-slate-200 italic">{children}</em>,
                      u: ({children}: any) => <u className="underline decoration-amber-400/70">{children}</u>,
                      ul: ({children}: any) => <ul className="list-disc list-inside space-y-1 text-slate-300 mb-3 ml-4">{children}</ul>,
                      ol: ({children}: any) => <ol className="list-decimal list-inside space-y-1 text-slate-300 mb-3 ml-4">{children}</ol>,
                      li: ({children}: any) => <li className="text-slate-300">{children}</li>,
                      blockquote: ({children}: any) => <blockquote className="border-l-4 border-amber-500/50 pl-4 italic text-slate-400 my-4">{children}</blockquote>,
                      code: ({children}: any) => <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono text-amber-300">{children}</code>,
                      hr: () => <hr className="border-white/10 my-4" />,
                    }}
                  >
                    {formData.content}
                  </Markdown>
                </div>
              ) : (
                <p className="text-slate-500 italic text-sm">Nenhum conteudo para exibir.</p>
              )}
            </div>
          )}
        </div>
      )}

      <div className="space-y-4">
        {articles.map((article) => (
          <div key={article.id} className="p-6 rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-transparent">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  {article.is_published
                    ? <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-400">Publicado</span>
                    : <span className="px-2 py-1 rounded text-xs bg-slate-500/20 text-slate-400">Oculto</span>}
                  {article.is_featured && <span className="px-2 py-1 rounded text-xs bg-yellow-500/20 text-yellow-400">Destaque</span>}
                  <span className="text-xs text-slate-500">{article.category}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{article.title}</h3>
                <p className="text-sm text-slate-400 line-clamp-2">{article.excerpt}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0 ml-4">
                <button onClick={() => handleToggle(article)} className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${article.is_published ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'}`}>
                  {article.is_published ? 'Ocultar' : 'Publicar'}
                </button>
                <button onClick={() => handleEdit(article)} className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 font-semibold transition-all text-sm">Editar</button>
                <button onClick={() => handleDelete(article.id)} className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 font-semibold transition-all text-sm">Deletar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
