'use client'
import { useEffect, useState } from 'react'
import { createBrowserClient } from '@/lib/supabase'
import type { Product } from '@/lib/supabase'
import { slugify } from '@/lib/utils'

export default function ProdutosAdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<Partial<Product>>({})
  const [loading, setLoading] = useState(true)
  const [sectionVisible, setSectionVisible] = useState(false)

  useEffect(() => {
    fetchProducts()
    fetchSectionVisibility()
  }, [])

  const fetchProducts = async () => {
    const supabase = createBrowserClient()
    const { data } = await supabase.from('products').select('*').order('sort_order')
    setProducts(data || [])
    setLoading(false)
  }

  const fetchSectionVisibility = async () => {
    const supabase = createBrowserClient()
    const { data } = await supabase.from('site_config').select('*').eq('key', 'products_section_visible').single()
    setSectionVisible(data?.value === true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as any
    if (name === 'title') {
      setFormData((prev) => ({
        ...prev,
        name: value,
        slug: !editingId ? slugify(value) : prev.slug,
      }))
    } else if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleFeatureChange = (index: number, value: string) => {
    const features = formData.features || []
    features[index] = value
    setFormData((prev) => ({ ...prev, features: [...features] }))
  }

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...(prev.features || []), ''],
    }))
  }

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: (prev.features || []).filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createBrowserClient()

    try {
      if (editingId) {
        await supabase.from('products').update(formData).eq('id', editingId)
      } else {
        await supabase.from('products').insert(formData)
      }

      setShowForm(false)
      setEditingId(null)
      setFormData({})
      fetchProducts()
    } catch (error) {
      console.error('Erro ao salvar produto:', error)
    }
  }

  const handleEdit = (product: Product) => {
    setFormData(product)
    setEditingId(product.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza?')) return

    const supabase = createBrowserClient()
    await supabase.from('products').delete().eq('id', id)
    fetchProducts()
  }

  const toggleSectionVisibility = async () => {
    const supabase = createBrowserClient()
    await supabase.from('site_config').upsert({ key: 'products_section_visible', value: !sectionVisible })
    setSectionVisible(!sectionVisible)
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
        <h1 className="text-3xl font-bold text-white">Produtos</h1>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:shadow-lg transition-all"
          >
            + Novo Produto
          </button>
        )}
      </div>

      {/* Section visibility toggle */}
      <div className="mb-8 p-6 rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-transparent">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Seção de Produtos Visível</h3>
            <p className="text-sm text-slate-400 mt-1">Mostrar ou ocultar a seção de produtos no site</p>
          </div>
          <button
            onClick={toggleSectionVisibility}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              sectionVisible
                ? 'bg-green-500/20 text-green-400'
                : 'bg-slate-500/20 text-slate-400'
            }`}
          >
            {sectionVisible ? '✓ Visível' : '✗ Oculto'}
          </button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="mb-12 p-8 rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-transparent">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Nome*</label>
                <input
                  type="text"
                  name="title"
                  value={formData.name || ''}
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

            <div className="grid md:grid-cols-3 gap-6">
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
                <label className="block text-sm font-semibold text-white mb-2">Badge</label>
                <input
                  type="text"
                  name="badge"
                  value={formData.badge || ''}
                  onChange={handleChange}
                  placeholder="SaaS, API, etc"
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Ordem</label>
                <input
                  type="number"
                  name="sort_order"
                  value={formData.sort_order || 0}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Ícone (emoji ou classe)</label>
                <input type="text" name="icon" value={formData.icon || ''} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white" placeholder="🚀 ou fa-rocket" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Cor Ícone</label>
                <input type="text" name="icon_color" value={formData.icon_color || ''} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white" placeholder="text-blue-400" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Gradiente Início</label>
                <input type="text" name="gradient_from" value={formData.gradient_from || ''} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white" placeholder="from-blue-500" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Gradiente Fim</label>
                <input type="text" name="gradient_to" value={formData.gradient_to || ''} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white" placeholder="to-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">URL Imagem Capa</label>
                <input type="text" name="cover_image_url" value={formData.cover_image_url || ''} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Descrição*</label>
              <textarea
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-4">Funcionalidades</label>
              <div className="space-y-2">
                {(formData.features || []).map((feature, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(i, e.target.value)}
                      className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                      placeholder="Funcionalidade"
                    />
                    <button type="button" onClick={() => removeFeature(i)} className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30">
                      Remover
                    </button>
                  </div>
                ))}
              </div>
              <button type="button" onClick={addFeature} className="mt-3 px-4 py-2 rounded-lg border border-blue-500/30 text-blue-400 hover:bg-blue-500/10 font-semibold transition-all">
                + Adicionar Funcionalidade
              </button>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" name="is_published" checked={formData.is_published || false} onChange={handleChange} id="pub" className="w-4 h-4" />
              <label htmlFor="pub" className="text-sm text-slate-400">
                Publicado
              </label>
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

      {/* Products list */}
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="p-6 rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-transparent">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-white">{product.name}</h3>
                  {product.is_published && <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-400">✓ Publicado</span>}
                </div>
                <p className="text-sm text-slate-400">{product.category}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => handleEdit(product)} className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 font-semibold transition-all">
                  Editar
                </button>
                <button onClick={() => handleDelete(product.id)} className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 font-semibold transition-all">
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
