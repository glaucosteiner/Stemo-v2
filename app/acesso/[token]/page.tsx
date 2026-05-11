import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import { createAdminClient } from '@/lib/supabase'

interface Props {
  params: Promise<{ token: string }>
}

function parseUserAgent(ua: string) {
  const browser =
    /Edg\//.test(ua) ? 'Edge' :
    /OPR\/|Opera/.test(ua) ? 'Opera' :
    /Chrome\//.test(ua) && !/Chromium/.test(ua) ? 'Chrome' :
    /Firefox\//.test(ua) ? 'Firefox' :
    /Safari\//.test(ua) && !/Chrome/.test(ua) ? 'Safari' :
    /MSIE|Trident/.test(ua) ? 'IE' : 'Outro'

  const os =
    /Windows NT/.test(ua) ? 'Windows' :
    /Mac OS X/.test(ua) ? 'macOS' :
    /Android/.test(ua) ? 'Android' :
    /iPhone|iPad/.test(ua) ? 'iOS' :
    /Linux/.test(ua) ? 'Linux' : 'Outro'

  const device =
    /Mobi|Android|iPhone/.test(ua) ? 'Mobile' :
    /iPad|Tablet/.test(ua) ? 'Tablet' : 'Desktop'

  return { browser, os, device }
}

async function logAccess(materialId: string, ip: string, ua: string) {
  try {
    const supabase = createAdminClient()
    const { browser, os, device_type } = { ...parseUserAgent(ua), device_type: parseUserAgent(ua).device }
    await supabase.from('access_logs').insert({
      material_id: materialId,
      ip,
      user_agent: ua,
      device_type,
      browser,
      os,
    })
  } catch (e) {
    console.error('logAccess error', e)
  }
}

export default async function AcessoPage({ params }: Props) {
  const { token } = await params
  const supabase = createAdminClient()

  const { data: material } = await supabase
    .from('materials')
    .select('id, title, html_content')
    .eq('token', token)
    .eq('is_active', true)
    .single()

  if (!material) notFound()

  // Log the access
  const headersList = await headers()
  const ip =
    headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headersList.get('x-real-ip') ||
    'unknown'
  const ua = headersList.get('user-agent') || ''

  await logAccess(material.id, ip, ua)

  // Render the HTML full-page via iframe srcdoc
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{material.title}</title>
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body { height: 100%; overflow: hidden; background: #08090d; }
          iframe { width: 100%; height: 100vh; border: none; display: block; }
        `}</style>
      </head>
      <body>
        <iframe
          srcDoc={material.html_content}
          sandbox="allow-scripts allow-same-origin"
          title={material.title}
        />
      </body>
    </html>
  )
}

export const dynamic = 'force-dynamic'
