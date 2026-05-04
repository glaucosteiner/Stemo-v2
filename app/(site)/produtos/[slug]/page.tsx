import { createServerClient } from '@/lib/supabase-server'
import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/sections/Footer'




// Cliente simples sem cookies - usado em generateStaticParams (build time)
function createBuildTimeClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

interface ProductPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const supabase = createBuildTimeClient()
  const { data } = await supabase.from('products').select('slug').eq('is_published', true)

  return (data || []).map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const supabase = await createServerClient()
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', params.slug)
    .eq('is_published', true)
    .single()

  if (!product) {
    return { title: 'Produto nÃ£o encontrado' }
  }

  return {
    title: `${product.name} | Stemo Consultoria`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const supabase = await createServerClient()
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', params.slug)
    .eq('is_published', true)
    .single()

  if (!product) {
    notFound()
  }

  // Get related products
  const { data: relatedProducts } = await supabase
    .from('products')
    .select('*')
    .eq('category', product.category)
    .eq('is_published', true)
    .neq('id', product.id)
    .limit(3)

  return (
    <>
      <Navbar productsVisible={true} />
      <main className="pt-32 pb-24 px-6 bg-[#050d1a] min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <Link
            href="/#produtos"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold mb-12 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Voltar para Produtos
          </Link>

          {/* Header */}
          <div className="mb-16">
            <div
              className={`h-2 w-16 mb-6 rounded-full bg-gradient-to-r ${product.gradient_from} ${product.gradient_to}`}
            />

            <div className="flex items-start justify-between gap-8 mb-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-semibold">
                    {product.badge}
                  </span>
                  <span className="text-sm text-slate-500">{product.category}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white">{product.name}</h1>
              </div>
              <div className={`w-16 h-16 rounded-lg ${product.icon_color} flex items-center justify-center text-2xl flex-shrink-0`}>
                {product.icon}
              </div>
            </div>

            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl">{product.description}</p>
          </div>

          {/* Features */}
          {product.features.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-8">Funcionalidades</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {product.features.map((feature: string, i: number) => (
                  <div key={i} className="p-6 rounded-xl border border-white/5 bg-gradient-to-br from-slate-900/50 to-transparent flex items-start gap-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400 flex-shrink-0 mt-1">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span className="text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mb-16 p-8 rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-transparent">
            <h3 className="text-xl font-bold text-white mb-4">Pronto para comeÃ§ar?</h3>
            <p className="text-slate-400 mb-6">Entre em contato conosco para discutir como este produto pode transformar seu negÃ³cio.</p>
            <a
              href="#contato"
              className="inline-flex bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-8 py-3 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all"
            >
              Agende uma demonstraÃ§Ã£o
            </a>
          </div>

          {/* Related products */}
          {relatedProducts && relatedProducts.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-white mb-8">Produtos Relacionados</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedProducts.map((related) => (
                  <Link key={related.id} href={`/produtos/${related.slug}`} className="group block">
                    <div className="h-full p-8 rounded-xl border border-white/5 bg-gradient-to-br from-slate-900/50 to-transparent hover:border-blue-500/30 transition-all">
                      <div
                        className={`h-1 w-full rounded-full mb-4 bg-gradient-to-r ${related.gradient_from} ${related.gradient_to}`}
                      />
                      <div className={`w-10 h-10 rounded-lg ${related.icon_color} flex items-center justify-center mb-4 text-lg`}>
                        {related.icon}
                      </div>
                      <h4 className="text-lg font-bold text-white mb-2 group-hover:gradient-text transition-all">
                        {related.name}
                      </h4>
                      <p className="text-sm text-slate-400 line-clamp-2 mb-4">{related.description}</p>
                      <span className="text-blue-400 group-hover:translate-x-1 transition-transform font-semibold text-sm">
                        â†’
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer productsVisible={true} />
    </>
  )
}
