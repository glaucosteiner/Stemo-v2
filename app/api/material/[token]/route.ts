import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

const PROTECTION_SCRIPT = `<script>
(function(){
  /* ── Bloqueia botão direito ── */
  document.addEventListener('contextmenu',function(e){e.preventDefault();return false;},true);

  /* ── Bloqueia atalhos de teclado ── */
  document.addEventListener('keydown',function(e){
    var k=(e.key||'').toUpperCase();
    /* F12 */
    if(e.key==='F12'){e.preventDefault();e.stopImmediatePropagation();return false;}
    /* Ctrl/Cmd + Shift + I/J/C/K (DevTools) */
    if((e.ctrlKey||e.metaKey)&&e.shiftKey&&['I','J','C','K'].includes(k)){e.preventDefault();return false;}
    /* Ctrl/Cmd + U (ver fonte) */
    if((e.ctrlKey||e.metaKey)&&k==='U'){e.preventDefault();return false;}
    /* Ctrl/Cmd + S (salvar) */
    if((e.ctrlKey||e.metaKey)&&k==='S'){e.preventDefault();return false;}
    /* Ctrl/Cmd + P (imprimir/salvar PDF) */
    if((e.ctrlKey||e.metaKey)&&k==='P'){e.preventDefault();return false;}
    /* Ctrl/Cmd + A (selecionar tudo) */
    if((e.ctrlKey||e.metaKey)&&k==='A'){e.preventDefault();return false;}
  },true);

  /* ── Bloqueia seleção de texto e drag ── */
  document.addEventListener('selectstart',function(e){e.preventDefault();},true);
  document.addEventListener('dragstart',function(e){e.preventDefault();},true);
  document.addEventListener('copy',function(e){e.preventDefault();},true);

  /* ── CSS: user-select none em tudo ── */
  var _s=document.createElement('style');
  _s.textContent='*{-webkit-user-select:none!important;user-select:none!important;'+
    '-webkit-touch-callout:none!important;-moz-user-select:none!important;}'+
    'img{pointer-events:none!important;-webkit-user-drag:none!important;}';
  var _injectCss=function(){if(document.head)document.head.appendChild(_s);};
  if(document.head){_injectCss();}else{document.addEventListener('DOMContentLoaded',_injectCss);}

  /* ── Detecção de DevTools aberto (tamanho de janela) ── */
  var _devOpen=false;
  var _blank=function(){
    if(!_devOpen){
      _devOpen=true;
      try{
        document.documentElement.innerHTML=
          '<body style="margin:0;background:#09090b;display:flex;height:100vh;'+
          'align-items:center;justify-content:center;">'+
          '<p style="color:#27272a;font-family:sans-serif;font-size:13px;letter-spacing:1px;">'+
          'CONTEÚDO PROTEGIDO</p></body>';
      }catch(x){}
    }
  };
  var _check=function(){
    if(window.outerWidth-window.innerWidth>160||window.outerHeight-window.innerHeight>160){
      _blank();
    }
  };
  setInterval(_check,600);
  window.addEventListener('resize',_check);

  /* ── Trap debugger para atrasar inspeção manual ── */
  var _dbg=function(){};
  try{
    _dbg=new Function('debugger;');
    setInterval(_dbg,2000);
  }catch(x){}
})();
</script>`

function injectProtection(html: string): string {
  // Injeta o script logo após <head> (ou cria o head se não existir)
  if (/<head[^>]*>/i.test(html)) {
    return html.replace(/(<head[^>]*>)/i, `$1${PROTECTION_SCRIPT}`)
  }
  if (/<html[^>]*>/i.test(html)) {
    return html.replace(/(<html[^>]*>)/i, `$1<head>${PROTECTION_SCRIPT}</head>`)
  }
  // Fallback: injeta no início
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
      // Sem cache — cada acesso busca fresco do servidor
      'Cache-Control': 'no-store, no-cache, must-revalidate, private',
      'Pragma': 'no-cache',
      // Impede embedding em outros sites
      'X-Frame-Options': 'SAMEORIGIN',
      // Não indexar
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}

export const dynamic = 'force-dynamic'
