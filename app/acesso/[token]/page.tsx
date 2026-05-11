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
    /Windows NT 10/.test(ua) ? 'Windows 10/11' :
    /Windows NT 6/.test(ua) ? 'Windows 7/8' :
    /Mac OS X/.test(ua) ? 'macOS' :
    /Android/.test(ua) ? 'Android' :
    /iPhone|iPad/.test(ua) ? 'iOS' :
    /Linux/.test(ua) ? 'Linux' : 'Outro'

  const device =
    /Mobi|Android|iPhone/.test(ua) ? 'Mobile' :
    /iPad|Tablet/.test(ua) ? 'Tablet' : 'Desktop'

  return { browser, os, device }
}

export default async function AcessoPage({ params }: Props) {
  const { token } = await params
  const supabase = createAdminClient()

  const { data: material } = await supabase
    .from('materials')
    .select('id, title')
    .eq('token', token)
    .eq('is_active', true)
    .single()

  if (!material) notFound()

  // Registrar acesso
  try {
    const headersList = await headers()
    const ip =
      headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      headersList.get('x-real-ip') ||
      'unknown'
    const ua = headersList.get('user-agent') || ''
    const { browser, os, device } = parseUserAgent(ua)

    const cityEncoded = headersList.get('x-vercel-ip-city') || ''
    const city = cityEncoded ? decodeURIComponent(cityEncoded) : null
    const region = headersList.get('x-vercel-ip-country-region') || null
    const country = headersList.get('x-vercel-ip-country') || null

    await supabase.from('access_logs').insert({
      material_id: material.id,
      ip, user_agent: ua, device_type: device, browser, os,
      city, region, country,
    })
  } catch (e) {
    console.error('logAccess error', e)
  }

  // Renderiza iframe apontando para a API — HTML nunca fica exposto no DOM
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{material.title}</title>
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body { height: 100%; overflow: hidden; background: #09090b; }
          iframe { width: 100%; height: 100vh; border: none; display: block; }
        `}</style>
        {/* Bloqueia também no wrapper (página pai do iframe) */}
        <script dangerouslySetInnerHTML={{ __html: `
          document.addEventListener('contextmenu',function(e){e.preventDefault();},true);
          document.addEventListener('keydown',function(e){
            if(e.key==='F12'){e.preventDefault();}
            if((e.ctrlKey||e.metaKey)&&e.shiftKey&&['I','J','C'].includes(e.key.toUpperCase())){e.preventDefault();}
            if((e.ctrlKey||e.metaKey)&&e.key.toUpperCase()==='U'){e.preventDefault();}
          },true);
        ` }} />
      </head>
      <body>
        {/* allow-same-origin permite que o script de proteção do iframe funcione */}
        <iframe
          src={`/api/material/${token}`}
          sandbox="allow-scripts allow-same-origin"
          title={material.title}
          referrerPolicy="no-referrer"
        />
      </body>
    </html>
  )
}

export const dynamic = 'force-dynamic'
