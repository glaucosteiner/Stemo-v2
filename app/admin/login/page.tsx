'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@/lib/supabase'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const supabase = createBrowserClient()
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        setError(authError.message)
      } else {
        router.push('/admin')
      }
    } catch (err) {
      setError('Erro ao conectar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#050d1a] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 mx-auto mb-4">
            <span className="text-white font-black text-xl">S</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Stemo Admin</h1>
          <p className="text-slate-400 mt-2">Painel de controle</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-transparent">
          {error && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-white mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-blue-500/50 focus:outline-none transition-colors"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-blue-500/50 focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 transition-all"
          >
            {loading ? 'Conectando...' : 'Conectar'}
          </button>
        </form>
      </div>
    </div>
  )
}
