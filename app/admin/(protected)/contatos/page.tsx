'use client'
import { useEffect, useState } from 'react'
import { createBrowserClient } from '@/lib/supabase'
import type { ContactSubmission } from '@/lib/supabase'
import { formatDate } from '@/lib/utils'

export default function ContatosAdminPage() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')
  const [replySending, setReplySending] = useState(false)
  const [replyStatus, setReplyStatus] = useState<'idle' | 'sent' | 'error'>('idle')

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    const supabase = createBrowserClient()
    const { data } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false })
    setContacts(data || [])
    setLoading(false)
  }

  const handleSelect = (id: string) => {
    setSelectedId(id)
    setReplyText('')
    setReplyStatus('idle')
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este contato?')) return
    const supabase = createBrowserClient()
    await supabase.from('contact_submissions').delete().eq('id', id)
    setSelectedId(null)
    fetchContacts()
  }

  const handleSendReply = async () => {
    if (!selectedContact || !replyText.trim()) return
    setReplySending(true)
    setReplyStatus('idle')
    try {
      const res = await fetch('/api/admin/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: selectedContact.email,
          name: selectedContact.name,
          message: replyText,
        }),
      })
      if (res.ok) {
        setReplyStatus('sent')
        setReplyText('')
      } else {
        setReplyStatus('error')
      }
    } catch {
      setReplyStatus('error')
    } finally {
      setReplySending(false)
    }
  }

  const selectedContact = contacts.find((c) => c.id === selectedId)

  if (loading) return <div className="text-slate-400">Carregando...</div>

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {/* List */}
      <div className="md:col-span-2">
        <h1 className="text-3xl font-bold text-white mb-8">Mensagens de Contato</h1>

        {contacts.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <p>Nenhuma mensagem de contato ainda.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => handleSelect(contact.id)}
                className={`w-full text-left p-6 rounded-xl border transition-all ${
                  selectedId === contact.id
                    ? 'border-blue-500/50 bg-blue-500/10'
                    : 'border-white/10 bg-gradient-to-br from-slate-900/50 to-transparent hover:border-white/20'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-white">{contact.name}</h3>
                  <span className="text-xs text-slate-500">{formatDate(contact.created_at)}</span>
                </div>
                <p className="text-sm text-slate-400 mb-1">{contact.email}</p>
                {contact.company && <p className="text-xs text-slate-500 mb-1">Empresa: {contact.company}</p>}
                <p className="text-sm text-slate-400 line-clamp-2 mt-2">{contact.message}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Detail + Reply */}
      {selectedContact && (
        <div className="space-y-4 sticky top-8">
          <div className="p-8 rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-transparent">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-1">{selectedContact.name}</h2>
              <p className="text-sm text-slate-400">{formatDate(selectedContact.created_at)}</p>
            </div>

            <div className="space-y-4 mb-6 pb-6 border-b border-white/10">
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Email</p>
                <p className="text-blue-400">{selectedContact.email}</p>
              </div>
              {selectedContact.company && (
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Empresa</p>
                  <p className="text-white">{selectedContact.company}</p>
                </div>
              )}
            </div>

            <div className="mb-6">
              <p className="text-xs text-slate-500 uppercase font-semibold mb-2">Mensagem recebida</p>
              <p className="text-slate-300 leading-relaxed whitespace-pre-wrap text-sm">{selectedContact.message}</p>
            </div>

            <button
              onClick={() => handleDelete(selectedContact.id)}
              className="w-full px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 font-semibold transition-all text-sm"
            >
              Deletar mensagem
            </button>
          </div>

          {/* Reply panel */}
          <div className="p-6 rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-transparent">
            <p className="text-sm font-semibold text-white mb-3">
              Responder para <span className="text-blue-400">{selectedContact.email}</span>
            </p>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={5}
              placeholder="Escreva sua resposta..."
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm resize-none placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
            />
            {replyStatus === 'sent' && (
              <p className="text-green-400 text-xs mt-2">✓ Resposta enviada com sucesso!</p>
            )}
            {replyStatus === 'error' && (
              <p className="text-red-400 text-xs mt-2">Erro ao enviar. Tente novamente.</p>
            )}
            <button
              onClick={handleSendReply}
              disabled={replySending || !replyText.trim()}
              className="mt-3 w-full px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm"
            >
              {replySending ? 'Enviando...' : 'Enviar resposta'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
