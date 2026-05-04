'use client'
import { useEffect, useState } from 'react'
import { createBrowserClient } from '@/lib/supabase'
import type { FAQ } from '@/lib/supabase'

export default function FAQAdminPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<Partial<FAQ>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFAQs()
  }, [])

  const fetchFAQs = async () => {
    const supabase = createBrowserClient()
    const { data } = await supabase.from('faqs').select('*').order('sort_order')
    setFaqs(data || [])
    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as any
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createBrowserClient()

    try {
      if (editingId) {
        await supabase.from('faqs').update(formData).eq('id', editingId)
      } else {
        await supabase.from('faqs').insert(formData)
      }

      setShowForm(false)
      setEditingId(null)
      setFormData({})
      fetchFAQs()
    } catch (error) {
      console.error('Erro ao salvar FAQ:', error)
    }
  }

  const handleEdit = (faq: FAQ) => {
    setFormData(faq)
    setEditingId(faq.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza?')) return

    const supabase = createBrowserClient()
    await supabase.from('faqs').delete().eq('id', id)
    fetchFAQs()
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData({})
  }

  if (loading) return <div className="text-slate-400">Carregando...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">FAQ</h1>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:shadow-lg transition-all"
          >
            + Nova Pergunta
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="mb-12 p-8 rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-transparent">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Pergunta*</label>
              <input
                type="text"
                name="question"
                value={formData.question || ''}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Resposta*</label>
              <textarea
                name="answer"
                value={formData.answer || ''}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white resize-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Ordem</label>
                <input type="number" name="sort_order" value={formData.sort_order || 0} onChange={handleChange} min="0" className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white" />
              </div>
              <div className="flex items-end">
                <div className="flex items-center gap-2">
                  <input type="checkbox" name="is_published" checked={formData.is_published !== false} onChange={handleChange} id="pub" className="w-4 h-4" />
                  <label htmlFor="pub" className="text-sm text-slate-400">
                    Publicada
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
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

      {/* FAQs list */}
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="p-6 rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-transparent">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">{faq.question}</h3>
                <p className="text-sm text-slate-400 line-clamp-2">{faq.answer}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => handleEdit(faq)} className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 font-semibold transition-all">
                  Editar
                </button>
                <button onClick={() => handleDelete(faq.id)} className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 font-semibold transition-all">
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
