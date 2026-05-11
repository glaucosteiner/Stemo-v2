import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

const PROTECTION_SCRIPT = `<script>
(function(){
  /* ── Toast de aviso ── */
  function _toast(msg){
    var t=document.createElement('div');
    t.textContent=msg;
    t.style.cssText='position:fixed;bottom:24px;right:24px;z-index:99999;'+
      'background:rgba(15,15,15,0.92);color:#888;font-family:sans-serif;'+
      'font-size:11px;letter-spacing:1.5px;text-transform:uppercase;'+
      'padding:10px 18px;border-radius:6px;border:1px solid rgba(255,255,255,0.08);'+
      'pointer-events:none;opacity:0;transition:opacity .3s;';
    document.body.appendChild(t);
    requestAnimationFrame(function(){t.style.opacity='1';});
    setTimeout(function(){t.style.opacity='0';setTimeout(function(){t.remove();},400);},2500);
  }

  /* ── Bloqueia botão direito ── */
  document.addEventListener('contextmenu',function(e){
    e.preventDefault();
    _toast('Conteúdo protegido');
    return false;
  },true);

  /* ── Bloqueia atalhos de teclado ── */
  document.addEventListener('keydown',function(e){
    var k=(e.key||'').toUpperCase();
    var blocked=false;
    if(e.key==='F12'){blocked=true;}
    if((e.ctrlKey||e.metaKey)&&e.shiftKey&&['I','J','C','K'].includes(k)){blocked=true;}
    if((e.ctrlKey||e.metaKey)&&['U','S','P'].includes(k)){blocked=true;}
    if(blocked){
      e.preventDefault();
      e.stopImmediatePropagation();
      _toast('Conteúdo protegido');
      return false;
    }
  },true);

  /* ── Bloqueia seleção, drag e cópia ── */
  document.addEventListener('selectstart',function(e){e.preventDefault();},true);
  document.addEventListener('dragstart',function(e){e.preventDefault();},true);
  document.addEventListener('copy',function(e){
    e.preventDefault();
    _toast('Conteúdo protegido');
  },true);

  /* ── CSS: desabilita seleção em tudo ── */
  var _s=document.createElement('style');
  _s.textContent='*{-webkit-user-select:none!important;user-select:none!important;'+
    '-webkit-touch-callout:none!important;-moz-user-select:none!important;}'+
    'img{pointer-events:none!important;-webkit-user-drag:none!important;}';
  var _inject=function(){if(document.head)document.head.appendChild(_s);};
  if(document.head){_inject();}
  else{document.addEventListener('DOMContentLoaded',_inject);}

  /* ── Debugger trap — atrasa inspeção via console ── */
  try{setInterval(new Function('debugger;'),3000);}catch(x){}
})();
</script>`

function injectProtection(html: string): string {
  if (/<head[\s>]/i.test(html)) {
    return html.replace(/(<head[^>]*>)/i, `$1${PROTECTION_SCRIPT}`)
  }
  if (/<html[\s>]/i.test(html)) {
    return html.replace(/(<html[^>]*>)/i, `$1<head>${PROTECTION_SCRIPT}</head>`)
  }
  return PROTECTION_SCRIPT + html
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params
  const supabase = createAdminClient()

  const { data: material } = await supabase
    .from('materials')
    .select('id, title, html_content')
    .eq('token', token)
    .eq('is_active', true)
    .single()

  if (!material) {
    return new NextResponse('Not found', { status: 404 })
  }

  const protectedHtml = injectProtection(material.html_content)

  return new NextResponse(protectedHtml, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate, private',
      'Pragma': 'no-cache',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}

export const dynamic = 'force-dynamic'
