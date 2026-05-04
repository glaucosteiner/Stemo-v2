'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createBrowserClient } from '@/lib/supabase'

interface DashboardStats {
  totalArticles: number
  publishedArticles: number
  totalProducts: number
  publishedProducts: number
  totalContacts: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = createBrowserClient()

      const [
        { count: totalArticles },
        { count: publishedArticles },
        { count: totalProducts },
        { count: publishedProducts },
        { count: totalContacts },
      ] = await Promise.all([
        supabase.from('articles').select('id', { count: 'exact' }),
        supabase.from('articles').select('id', { count: 'exact' }).eq('is_published', true),
        supabase.from('products').select('id', { count: 'exact' }),
        supabase.from('products').select('id', { count: 'exact' }).eq('is_published', true),
        supabase.from('contact_submissions').select('id', { count: 'exact' }),
      ])

      setStats({
        totalArticles: totalArticles || 0,
        publishedArticles: publishedArticles || 0,
        totalProducts: totalProducts || 0,
        publishedProducts: publishedProducts || 0,
        totalContacts: totalContacts || 0,
      })
      setLoading(false)
    }

    fetchStats()
  }, [])

  if (loading) {
    return <div className="text-slate-400">Carregando...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-12">Dashboard</h1>

      {/* Stats grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
        <div className="p-6 rounded-xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-transparent">
          <div className="text-3xl font-bold text-white mb-2">{stats?.totalArticles || 0}</div>
          <div className="text-sm text-slate-400">Artigos Totais</div>
          <div className="text-xs text-blue-400 mt-2">{stats?.publishedArticles || 0} publicados</div>
        </div>

        <div className="p-6 rounded-xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-transparent">
          <div className="text-3xl font-bold text-white mb-2">{stats?.totalProducts || 0}</div>
          <div className="text-sm text-slate-400">Produtos Totais</div>
          <div className="text-xs text-indigo-400 mt-2">{stats?.publishedProducts || 0} publicados</div>
        </div>

        <div className="p-6 rounded-xl border border-white/10 bg-gradient-to-br from-violet-500/10 to-transparent">
          <div className="text-3xl font-bold text-white mb-2">{stats?.totalContacts || 0}</div>
          <div className="text-sm text-slate-400">Mensagens de Contato</div>
          <div className="text-xs text-violet-400 mt-2">Não lidas</div>
        </div>

        <div className="p-6 rounded-xl border border-white/10 bg-gradient-to-br from-green-500/10 to-transparent">
          <div className="text-3xl font-bold text-white mb-2">✓</div>
          <div className="text-sm text-slate-400">Sistema Online</div>
          <div className="text-xs text-green-400 mt-2">Tudo funcionando</div>
        </div>

        <div className="p-6 rounded-xl border border-white/10 bg-gradient-to-br from-slate-500/10 to-transparent">
          <div className="text-3xl font-bold text-white mb-2">24</div>
          <div className="text-sm text-slate-400">Anos Stemo</div>
          <div className="text-xs text-slate-400 mt-2">Desde 2000</div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <Link href="/admin/insights" className="group p-6 rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-transparent hover:border-blue-500/30 transition-all">
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">📝 Insights</h3>
          <p className="text-slate-400 text-sm mb-4">Gerenciar artigos, categorias e publicações</p>
          <span className="text-blue-400 font-semibold text-sm">Acessar →</span>
        </Link>

        <Link href="/admin/produtos" className="group p-6 rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-transparent hover:border-blue-500/30 transition-all">
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">📦 Produtos</h3>
          <p className="text-slate-400 text-sm mb-4">Criar e editar produtos da plataforma</p>
          <span className="text-blue-400 font-semibold text-sm">Acessar →</span>
        </Link>

        <Link href="/admin/config" className="group p-6 rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-transparent hover:border-blue-500/30 transition-all">
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">⚙️ Configurações</h3>
          <p className="text-slate-400 text-sm mb-4">Definir preferências globais do site</p>
          <span className="text-blue-400 font-semibold text-sm">Acessar →</span>
        </Link>
      </div>
    </div>
  )
}
