import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { to, name, message } = await req.json()

    if (!to || !message) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'Glauco Motta — Stemo <glauco.motta@stemo.com.br>',
      to,
      subject: `Re: Seu contato com a Stemo Advisors`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #292524;">
          <div style="border-bottom: 2px solid #92400e; padding-bottom: 16px; margin-bottom: 24px;">
            <h2 style="margin: 0; font-size: 18px; color: #92400e;">Stemo Business Advisory</h2>
          </div>
          <p style="margin-bottom: 8px;">Olá, ${name}.</p>
          <div style="white-space: pre-wrap; line-height: 1.7; color: #44403c;">${message}</div>
          <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e7e5e4; font-size: 13px; color: #78716c;">
            <strong>Glauco Motta</strong><br/>
            Stemo Business Advisory<br/>
            <a href="https://stemo.com.br" style="color: #92400e;">stemo.com.br</a>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Reply error:', err)
    return NextResponse.json({ error: 'Erro ao enviar resposta' }, { status: 500 })
  }
}
