import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

const PROTECTION_SCRIPT = `<script>
(function(){
  /* ── Modal de aviso ── */
  var _modalOpen = false;
  function _showModal(){
    if(_modalOpen) return;
    _modalOpen = true;
    var overlay = document.createElement('div');
    overlay.style.cssText =
      'position:fixed;inset:0;z-index:99999;'+
      'background:rgba(0,0,0,0.55);'+
      'display:flex;align-items:center;justify-content:center;';
    var box = document.createElement('div');
    box.style.cssText =
      'background:#111;border:1px solid rgba(255,255,255,0.1);'+
      'border-radius:10px;padding:32px 40px;text-align:center;'+
      'font-family:sans-serif;max-width:320px;box-shadow:0 8px 40px rgba(0,0,0,0.6);';
    var icon = document.createElement('div');
    icon.textContent = '🔒';
    icon.style.cssText = 'font-size:32px;margin-bottom:14px;';
    var title = document.createElement('p');
    title.textContent = 'Conteúdo Protegido';
    title.style.cssText = 'color:#fff;font-size:15px;font-weight:700;margin-bottom:8px;letter-spacing:.3px;';
    var sub = document.createElement('p');
    sub.textContent = 'Este material é confidencial e não pode ser copiado ou inspecionado.';
    sub.style.cssText = 'color:#888;font-size:12px;line-height:1.6;margin-bottom:22px;';
    var btn = document.createElement('button');
    btn.textContent = 'OK, entendi';
    btn.style.cssText =
      'background:#fff;color:#111;border:none;border-radius:6px;'+
      'padding:9px 28px;font-size:13px;font-weight:700;cursor:pointer;'+
      'letter-spacing:.3px;transition:background .2s;';
    btn.onmouseover = function(){ btn.style.background='#e5e5e5'; };
    btn.onmouseout  = function(){ btn.style.background='#fff'; };
    btn.onclick = function(){
      overlay.remove();
      _modalOpen = false;
    };
    box.appendChild(icon);
    box.appendChild(title);
    box.appendChild(sub);
    box.appendChild(btn);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
  }

  /* ── Botão direito ── */
  document.addEventListener('contextmenu', function(e){
    e.preventDefault();
    _showModal();
    return false;
  }, true);

  /* ── Atalhos de teclado ── */
  document.addEventListener('keydown', function(e){
    var k = (e.key || '').toUpperCase();
    var blocked = false;
    if(e.key === 'F12') blocked = true;
    if((e.ctrlKey||e.metaKey) && e.shiftKey && ['I','J','C','K'].includes(k)) blocked = true;
    if((e.ctrlKey||e.metaKey) && ['U','S','P'].includes(k)) blocked = true;
    if(blocked){
      e.preventDefault();
      e.stopImmediatePropagation();
      _showModal();
      return false;
    }
  }, true);

  /* ── Bloqueia seleção, drag e cópia silenciosamente ── */
  document.addEventListener('selectstart', function(e){ e.preventDefault(); }, true);
  document.addEventListener('dragstart',   function(e){ e.preventDefault(); }, true);
  document.addEventListener('copy',        function(e){ e.preventDefault(); }, true);

  /* ── CSS: desabilita seleção ── */
  var _s = document.createElement('style');
  _s.textContent =
    '*{-webkit-user-select:none!important;user-select:none!important;'+
    '-webkit-touch-callout:none!important;-moz-user-select:none!important;}'+
    'img{pointer-events:none!important;-webkit-user-drag:none!important;}';
  var _inject = function(){ if(document.head) document.head.appendChild(_s); };
  if(document.head){ _inject(); }
  else{ document.addEventListener('DOMContentLoaded', _inject); }

  /* ── Debugger trap ── */
  try{ setInterval(new Function('debugger;'), 3000); }catch(x){}
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
