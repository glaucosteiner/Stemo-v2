'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@/lib/supabase'

export default function AdminSidebar() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setLoading(true)
    const supabase = createBrowserClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const navItems = [
    { icon: '📊', label: 'Dashboard', href: '/admin' },
    { icon: '📝', label: 'Insights', href: '/admin/insights' },
    { icon: '📦', label: 'Produtos', href: '/admin/produtos' },
    { icon: '❓', label: 'FAQ', href: '/admin/faq' },
    { icon: '⚙️', label: 'Configurações', href: '/admin/config' },
    { icon: '📬', label: 'Contatos', href: '/admin/contatos' },
    { icon: '🔐', label: 'Materiais', href: '/admin/materiais' },
  ]

  return (
    <aside className="w-64 bg-[#050d1a] border-r border-white/10 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
            <span className="text-white font-black text-lg">S</span>
          </div>
          <span className="font-bold text-white">Stemo Admin</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          disabled={loading}
          className="w-full px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 font-medium transition-colors disabled:opacity-50"
        >
          {loading ? 'Desconectando...' : 'Desconectar'}
        </button>
      </div>
    </aside>
  )
}
