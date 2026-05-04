import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, company, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando' }, { status: 400 })
    }

    const supabase = createAdminClient()
    const { error } = await supabase.from('contact_submissions').insert({
      name,
      email,
      company: company || null,
      message,
    })

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
