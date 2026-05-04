import type { Product } from '@/lib/supabase'
import Link from 'next/link'

interface ProdutosProps {
  products: Product[]
}

export default function Produtos({ products }: ProdutosProps) {
  if (!products.length) return null

  return (
    <section id="produtos" className="py-24 px-6 bg-[#060e1b]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="fade-in text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Nossos <span className="gradient-text">Produtos</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Soluções prontas que aceleram sua transformação digital
          </p>
        </div>

        {/* Products grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/produtos/${product.slug}`}
              className="fade-in group block h-full"
            >
              <div className="h-full p-8 rounded-xl border border-white/5 bg-gradient-to-br from-slate-900/50 to-transparent hover:border-blue-500/30 transition-all cursor-pointer">
                {/* Top gradient bar */}
                <div
                  className={`h-1 w-full rounded-full mb-6 bg-gradient-to-r ${product.gradient_from} ${product.gradient_to}`}
                />

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-lg ${product.icon_color} flex items-center justify-center mb-4 text-xl group-hover:scale-110 transition-transform`}
                >
                  {product.icon}
                </div>

                {/* Badge */}
                {product.badge && (
                  <div className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20 mb-4">
                    {product.badge}
                  </div>
                )}

                {/* Title & Category */}
                <h3 className="text-xl font-bold text-white mb-1">{product.name}</h3>
                <p className="text-sm text-slate-400 mb-4">{product.category}</p>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{product.description}</p>

                {/* Features */}
                {product.features.length > 0 && (
                  <div className="space-y-2 mb-6">
                    {product.features.slice(0, 3).map((feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">•</span>
                        <span className="text-sm text-slate-400">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <div className="inline-flex items-center gap-2 text-blue-400 group-hover:gap-3 transition-all font-semibold text-sm">
                  Saiba mais
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
