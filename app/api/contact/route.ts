import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, company, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando' }, { status: 400 })
    }

    // Salva no Supabase
    const supabase = createAdminClient()
    const { error: dbError } = await supabase.from('contact_submissions').insert({
      name,
      email,
      company: company || null,
      message,
    })

    if (dbError) throw dbError

    // Envia email de notificação
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'Stemo Site <noreply@stemo.com.br>',
        to: 'glauco.motta@stemo.com.br',
        reply_to: email,
        subject: `Novo contato: ${name}${company ? ` — ${company}` : ''}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #292524;">
            <div style="border-bottom: 2px solid #92400e; padding-bottom: 16px; margin-bottom: 24px;">
              <h2 style="margin: 0; font-size: 20px; color: #92400e;">Novo contato via stemo.com.br</h2>
            </div>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #78716c; width: 100px;">Nome</td><td style="padding: 8px 0; font-weight: bold;">${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #78716c;">E-mail</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #92400e;">${email}</a></td></tr>
              ${company ? `<tr><td style="padding: 8px 0; color: #78716c;">Empresa</td><td style="padding: 8px 0;">${company}</td></tr>` : ''}
            </table>
            <div style="margin-top: 24px; padding: 20px; background: #fafaf9; border-left: 3px solid #d6d3d1;">
              <p style="margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
            <p style="margin-top: 24px; font-size: 12px; color: #a8a29e;">
              Responda diretamente neste email — o Reply-To já está configurado para ${email}
            </p>
          </div>
        `,
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
