'use client'
import { useEffect, useState } from 'react'
import { createBrowserClient } from '@/lib/supabase'
import type { Material, AccessLog } from '@/lib/supabase'

export default function MateriaisAdminPage() {
  const [materials, setMaterials] = useState<Material[]>([])
  const [logs, setLogs] = useState<Record<string, AccessLog[]>>({})
  const [accessCounts, setAccessCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ title: '', description: '', html_content: '' })
  const [saving, setSaving] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  const supabase = createBrowserClient()
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''

  useEffect(() => { fetchMaterials() }, [])

  async function fetchMaterials() {
    setLoading(true)
    const { data } = await supabase
      .from('materials')
      .select('*')
      .order('created_at', { ascending: false })
    setMaterials(data || [])

    if (data && data.length > 0) {
      const ids = data.map((m: Material) => m.id)
      const { data: logData } = await supabase
        .from('access_logs')
        .select('material_id')
        .in('material_id', ids)
      const counts: Record<string, number> = {}
      ;(logData || []).forEach((l: { material_id: string }) => {
        counts[l.material_id] = (counts[l.material_id] || 0) + 1
      })
      setAccessCounts(counts)
    }
    setLoading(false)
  }

  async function fetchLogs(materialId: string) {
    if (selectedId === materialId) { setSelectedId(null); return }
    if (!logs[materialId]) {
      const { data } = await supabase
        .from('access_logs')
        .select('*')
        .eq('material_id', materialId)
        .order('accessed_at', { ascending: false })
        .limit(100)
      setLogs(prev => ({ ...prev, [materialId]: data || [] }))
    }
    setSelectedId(materialId)
  }

  async function saveMaterial() {
    if (!formData.title.trim() || !formData.html_content.trim()) return
    setSaving(true)
    await supabase.from('materials').insert({
      title: formData.title.trim(),
      description: formData.description.trim() || null,
      html_content: formData.html_content.trim(),
    })
    setFormData({ title: '', description: '', html_content: '' })
    setShowForm(false)
    await fetchMaterials()
    setSaving(false)
  }

  async function toggleActive(material: Material) {
    await supabase.from('materials').update({ is_active: !material.is_active }).eq('id', material.id)
    await fetchMaterials()
  }

  async function deleteMaterial(id: string) {
    if (!confirm('Excluir este material e todos os logs de acesso?')) return
    await supabase.from('materials').delete().eq('id', id)
    await fetchMaterials()
    if (selectedId === id) setSelectedId(null)
  }

  function copyLink(token: string) {
    navigator.clipboard.writeText(`${baseUrl}/acesso/${token}`)
    setCopied(token)
    setTimeout(() => setCopied(null), 2000)
  }

  function formatDate(dt: string) {
    return new Date(dt).toLocaleString('pt-BR', {
      day: '2-digit', month: '2-digit', year: '2-digit',
      hour: '2-digit', minute: '2-digit',
    })
  }

  function formatLocation(log: AccessLog) {
    const parts = [log.city, log.region, log.country].filter(Boolean)
    return parts.length > 0 ? parts.join(' · ') : '—'
  }

  const inputCls = "w-full bg-[#0d1929] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
  const btnBase = "px-4 py-2 rounded-lg text-sm font-semibold transition-colors"

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Materiais Privados</h1>
          <p className="text-slate-400 text-sm">
            Links exclusivos com rastreamento de IP, dispositivo e localização
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`${btnBase} bg-blue-600 hover:bg-blue-700 text-white`}
        >
          {showForm ? '✕ Cancelar' : '+ Novo Material'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-[#050d1a] border border-white/10 rounded-xl p-6 mb-6">
          <h2 className="text-white font-semibold mb-4">Novo Material</h2>
          <div className="space-y-4">
            <div>
              <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Título</label>
              <input
                className={inputCls}
                placeholder="Ex: GovAI × Lecom · Stemo"
                value={formData.title}
                onChange={e => setFormData(p => ({ ...p, title: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Descrição (opcional)</label>
              <input
                className={inputCls}
                placeholder="Ex: Apresentação para reunião inicial com Tiago / Lecom"
                value={formData.description}
                onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">
                HTML Content <span className="text-slate-600 normal-case">(cole o código completo do arquivo .html)</span>
              </label>
              <textarea
                className={`${inputCls} font-mono text-xs`}
                rows={12}
                placeholder="<!DOCTYPE html>..."
                value={formData.html_content}
                onChange={e => setFormData(p => ({ ...p, html_content: e.target.value }))}
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={saveMaterial}
                disabled={saving || !formData.title.trim() || !formData.html_content.trim()}
                className={`${btnBase} bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40`}
              >
                {saving ? 'Salvando...' : '💾 Salvar Material'}
              </button>
              <button onClick={() => setShowForm(false)} className={`${btnBase} bg-white/5 hover:bg-white/10 text-slate-400`}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="text-slate-500 text-sm py-12 text-center">Carregando...</div>
      ) : materials.length === 0 ? (
        <div className="text-slate-500 text-sm py-12 text-center bg-[#050d1a] border border-white/10 rounded-xl">
          Nenhum material criado ainda.
        </div>
      ) : (
        <div className="space-y-3">
          {materials.map(m => (
            <div key={m.id} className="bg-[#050d1a] border border-white/10 rounded-xl overflow-hidden">
              {/* Material row */}
              <div className="flex items-center gap-4 p-5">
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${m.is_active ? 'bg-green-500' : 'bg-slate-600'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm truncate">{m.title}</p>
                  {m.description && <p className="text-slate-500 text-xs mt-0.5 truncate">{m.description}</p>}
                  <p className="text-slate-600 text-xs mt-1 font-mono truncate">/acesso/{m.token}</p>
                </div>
                <div className="text-center flex-shrink-0">
                  <p className="text-2xl font-black text-blue-400">{accessCounts[m.id] || 0}</p>
                  <p className="text-slate-600 text-[10px] uppercase tracking-wider">acessos</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => copyLink(m.token)}
                    className={`${btnBase} text-xs ${copied === m.token ? 'bg-green-600/30 text-green-400' : 'bg-white/5 hover:bg-white/10 text-slate-300'}`}
                  >
                    {copied === m.token ? '✓ Copiado!' : '🔗 Copiar Link'}
                  </button>
                  <button
                    onClick={() => fetchLogs(m.id)}
                    className={`${btnBase} text-xs ${selectedId === m.id ? 'bg-blue-600/30 text-blue-400' : 'bg-white/5 hover:bg-white/10 text-slate-400'}`}
                  >
                    📋 Logs
                  </button>
                  <button
                    onClick={() => toggleActive(m)}
                    className={`${btnBase} text-xs ${m.is_active ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400' : 'bg-green-500/10 hover:bg-green-500/20 text-green-400'}`}
                  >
                    {m.is_active ? '⏸ Desativar' : '▶ Ativar'}
                  </button>
                  <button
                    onClick={() => deleteMaterial(m.id)}
                    className={`${btnBase} text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400`}
                  >
                    🗑
                  </button>
                </div>
              </div>

              {/* Access logs */}
              {selectedId === m.id && (
                <div className="border-t border-white/10 bg-[#030a14] p-5">
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">
                    Últimos 100 Acessos
                  </p>
                  {!logs[m.id] || logs[m.id].length === 0 ? (
                    <p className="text-slate-600 text-sm">Nenhum acesso registrado ainda.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="text-slate-500 text-left">
                            <th className="pb-2 pr-4 font-semibold whitespace-nowrap">Data/Hora</th>
                            <th className="pb-2 pr-4 font-semibold">IP</th>
                            <th className="pb-2 pr-4 font-semibold">Localização</th>
                            <th className="pb-2 pr-4 font-semibold">Dispositivo</th>
                            <th className="pb-2 pr-4 font-semibold">Browser</th>
                            <th className="pb-2 font-semibold">OS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {logs[m.id].map(log => (
                            <tr key={log.id} className="border-t border-white/5 text-slate-400">
                              <td className="py-2 pr-4 font-mono whitespace-nowrap">{formatDate(log.accessed_at)}</td>
                              <td className="py-2 pr-4 font-mono text-blue-400 whitespace-nowrap">{log.ip}</td>
                              <td className="py-2 pr-4 text-emerald-400 whitespace-nowrap">{formatLocation(log)}</td>
                              <td className="py-2 pr-4">{log.device_type}</td>
                              <td className="py-2 pr-4">{log.browser}</td>
                              <td className="py-2">{log.os}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
