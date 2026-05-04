'use client'
import { useEffect, useState } from 'react'
import { createBrowserClient } from '@/lib/supabase'
import type { ContactSubmission } from '@/lib/supabase'
import { formatDate } from '@/lib/utils'

export default function ContatosAdminPage() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    const supabase = createBrowserClient()
    const { data } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false })
    setContacts(data || [])
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este contato?')) return

    const supabase = createBrowserClient()
    await supabase.from('contact_submissions').delete().eq('id', id)
    fetchContacts()
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
                onClick={() => setSelectedId(contact.id)}
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
                <p className="text-sm text-slate-400 mb-2">{contact.email}</p>
                {contact.company && <p className="text-xs text-slate-500">Empresa: {contact.company}</p>}
                <p className="text-sm text-slate-400 line-clamp-2 mt-2">{contact.message}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Detail */}
      {selectedContact && (
        <div className="p-8 rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-transparent h-fit sticky top-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-1">{selectedContact.name}</h2>
            <p className="text-sm text-slate-400">{formatDate(selectedContact.created_at)}</p>
          </div>

          <div className="space-y-4 mb-8 pb-8 border-b border-white/10">
            <div>
              <p className="text-xs text-slate-500 uppercase font-semibold">Email</p>
              <a href={`mailto:${selectedContact.email}`} className="text-blue-400 hover:text-blue-300 transition-colors">
                {selectedContact.email}
              </a>
            </div>

            {selectedContact.company && (
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold">Empresa</p>
                <p className="text-white">{selectedContact.company}</p>
              </div>
            )}
          </div>

          <div className="mb-8">
            <p className="text-xs text-slate-500 uppercase font-semibold mb-2">Mensagem</p>
            <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{selectedContact.message}</p>
          </div>

          <div className="flex gap-2">
            <a
              href={`mailto:${selectedContact.email}`}
              className="flex-1 px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 font-semibold text-center transition-all"
            >
              Responder
            </a>
            <button
              onClick={() => {
                handleDelete(selectedContact.id)
                setSelectedId(null)
              }}
              className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 font-semibold transition-all"
            >
              Deletar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
