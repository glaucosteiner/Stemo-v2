'use client'
import { useEffect, useState } from 'react'
import { createBrowserClient } from '@/lib/supabase'

interface Config {
  [key: string]: unknown
}

export default function ConfigAdminPage() {
  const [config, setConfig] = useState<Config>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchConfig()
  }, [])

  const fetchConfig = async () => {
    const supabase = createBrowserClient()
    const { data } = await supabase.from('site_config').select('*')

    const configMap: Config = {}
    data?.forEach((item) => {
      configMap[item.key] = item.value
    })

    setConfig(configMap)
    setLoading(false)
  }

  const handleChange = (key: string, value: unknown) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    const supabase = createBrowserClient()

    try {
      for (const [key, value] of Object.entries(config)) {
        await supabase.from('site_config').upsert({ key, value })
      }

      setLoading(false)
      alert('Configurações salvas com sucesso!')
    } catch (error) {
      console.error('Erro ao salvar:', error)
      alert('Erro ao salvar configurações')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="text-slate-400">Carregando...</div>

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-12">Configurações do Site</h1>

      <div className="max-w-2xl space-y-8">
        {/* Contact Email */}
        <div className="p-8 rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-transparent">
          <h3 className="text-lg font-bold text-white mb-4">Email de Contato</h3>
          <input
            type="email"
            value={(config['contact_email'] as string) || ''}
            onChange={(e) => handleChange('contact_email', e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500"
            placeholder="contato@stemo.com.br"
          />
          <p className="text-xs text-slate-500 mt-2">Email que receberá as mensagens de contato</p>
        </div>

        {/* LinkedIn */}
        <div className="p-8 rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-transparent">
          <h3 className="text-lg font-bold text-white mb-4">URL LinkedIn</h3>
          <input
            type="url"
            value={(config['contact_linkedin'] as string) || ''}
            onChange={(e) => handleChange('contact_linkedin', e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500"
            placeholder="https://www.linkedin.com/company/stemo"
          />
          <p className="text-xs text-slate-500 mt-2">Link do perfil LinkedIn da empresa</p>
        </div>

        {/* WhatsApp */}
        <div className="p-8 rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-transparent">
          <h3 className="text-lg font-bold text-white mb-4">WhatsApp</h3>
          <input
            type="text"
            value={(config['contact_whatsapp'] as string) || ''}
            onChange={(e) => handleChange('contact_whatsapp', e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500"
            placeholder="+55 11 99999-9999"
          />
          <p className="text-xs text-slate-500 mt-2">Número WhatsApp (deixe vazio para desabilitar)</p>
        </div>

        {/* SEO Default Description */}
        <div className="p-8 rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-transparent">
          <h3 className="text-lg font-bold text-white mb-4">Descrição Meta Padrão</h3>
          <textarea
            value={(config['seo_default_description'] as string) || ''}
            onChange={(e) => handleChange('seo_default_description', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 resize-none"
            placeholder="Descrição padrão para meta tags..."
          />
          <p className="text-xs text-slate-500 mt-2">Descrição usada em páginas sem meta description específica</p>
        </div>

        {/* Products Visible */}
        <div className="p-8 rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-transparent">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">Seção de Produtos Visível</h3>
              <p className="text-sm text-slate-400 mt-1">Mostrar ou ocultar a seção de produtos no site</p>
            </div>
            <button
              onClick={() => handleChange('products_section_visible', !(config['products_section_visible'] === true))}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                config['products_section_visible'] === true
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-slate-500/20 text-slate-400'
              }`}
            >
              {config['products_section_visible'] === true ? '✓ Visível' : '✗ Oculto'}
            </button>
          </div>
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:shadow-lg disabled:opacity-50 transition-all"
        >
          {saving ? 'Salvando...' : 'Salvar Configurações'}
        </button>
      </div>
    </div>
  )
}
