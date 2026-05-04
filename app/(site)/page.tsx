export const dynamic = 'force-dynamic'

import { createServerClient } from '@/lib/supabase-server'
import Navbar from '@/components/Navbar'
import Hero from '@/components/sections/Hero'
import PontoDeVista from '@/components/sections/PontoDeVista'
import Sobre from '@/components/sections/Sobre'
import Servicos from '@/components/sections/Servicos'
import Metodologia from '@/components/sections/Metodologia'
import Parceria from '@/components/sections/Parceria'
import Resultados from '@/components/sections/Resultados'
import Produtos from '@/components/sections/Produtos'
import Insights from '@/components/sections/Insights'
import FAQ from '@/components/sections/FAQ'
import Contato from '@/components/sections/Contato'
import Footer from '@/components/sections/Footer'
import ScrollEffects from '@/components/ScrollEffects'

export default async function HomePage() {
  let articles = null
  let faqs = null
  let products = null
  let productsVisible = false

  try {
    const supabase = await createServerClient()
    const [{ data: a }, { data: f }, { data: p }, { data: config }] = await Promise.all([
      supabase.from('articles').select('*').eq('is_published', true).eq('is_featured', true).order('published_at', { ascending: false }),
      supabase.from('faqs').select('*').eq('is_published', true).order('sort_order'),
      supabase.from('products').select('*').eq('is_published', true).order('sort_order'),
      supabase.from('site_config').select('*').eq('key', 'products_section_visible').single(),
    ])
    articles = a
    faqs = f
    products = p
    productsVisible = config?.value === true
  } catch (err) {
    console.error('[HomePage v2] Database error:', err)
  }

  return (
    <>
      <ScrollEffects />
      <div id="read-progress" />
      <Navbar productsVisible={productsVisible} />
      <main>
        <Hero />
        <PontoDeVista />
        <Sobre />
        <Servicos />
        <Metodologia />
        <Parceria />
        <Resultados />
        {productsVisible && <Produtos products={products || []} />}
        <Insights articles={articles || []} />
        <FAQ faqs={faqs || []} />
        <Contato />
      </main>
      <Footer productsVisible={productsVisible} />
    </>
  )
}
