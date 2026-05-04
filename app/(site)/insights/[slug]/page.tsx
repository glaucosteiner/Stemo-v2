import { createServerClient } from '@/lib/supabase-server'
import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { formatDate } from '@/lib/utils'
import Navbar from '@/components/Navbar'
import Footer from '@/components/sections/Footer'

// Client simples sem cookies — usado em generateStaticParams (build time)
function createBuildTimeClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const supabase = createBuildTimeClient()
  const { data } = await supabase.from('articles').select('slug').eq('is_published', true)

  return (data || []).map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createServerClient()
  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!article) {
    return { title: 'Artigo não encontrado' }
  }

  return {
    title: article.meta_title || article.title,
    description: article.meta_description || article.excerpt,
    keywords: article.keywords,
    openGraph: {
      title: article.meta_title || article.title,
      description: article.meta_description || article.excerpt,
      images: article.og_image_url ? [{ url: article.og_image_url }] : [],
      type: 'article',
      publishedTime: article.published_at,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.meta_title || article.title,
      description: article.meta_description || article.excerpt,
      images: article.og_image_url ? [article.og_image_url] : [],
    },
    alternates: article.canonical_url
      ? { canonical: article.canonical_url }
      : undefined,
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const supabase = await createServerClient()
  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!article) {
    notFound()
  }

  const { data: relatedArticles } = await supabase
    .from('articles')
    .select('*')
    .eq('category', article.category)
    .eq('is_published', true)
    .neq('id', article.id)
    .limit(3)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': article.schema_type || 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.og_image_url,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: {
      '@type': 'Organization',
      name: article.author,
      url: 'https://www.stemo.com.br',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Stemo Consultoria',
      logo: { '@type': 'ImageObject', url: 'https://www.stemo.com.br/logo.png' },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.stemo.com.br/insights/${article.slug}`,
    },
    wordCount: article.content.split(/\s+/).length,
  }

  return (
    <>
      <Navbar productsVisible={false} />
      <main className="pt-32 pb-24 px-6 min-h-screen" style={{ background: '#0d0d0d' }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />

        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <span
                className="px-3 py-1 rounded text-xs font-semibold"
                style={{
                  background: 'rgba(201,168,76,0.1)',
                  color: '#9a7040',
                  border: '1px solid rgba(201,168,76,0.15)',
                }}
              >
                {article.category}
              </span>
              <span className="text-sm" style={{ color: '#5a5a50' }}>
                {formatDate(article.published_at)}
              </span>
              <span className="text-sm" style={{ color: '#5a5a50' }}>
                {article.read_time || 5} min de leitura
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {article.title}
            </h1>

            <p className="text-xl leading-relaxed" style={{ color: '#8a8a80' }}>
              {article.excerpt}
            </p>

            <div
              className="mt-8 pt-8 flex items-center gap-4"
              style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}
            >
              <div>
                <p className="text-sm font-semibold text-white">Por {article.author}</p>
                <p className="text-xs" style={{ color: '#5a5a50' }}>
                  {formatDate(article.published_at)}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose-stemo max-w-none mb-16">
            <Markdown remarkPlugins={[remarkGfm]}>{article.content}</Markdown>
          </div>

          {/* References */}
          {article.article_references && article.article_references.length > 0 && (
            <div
              className="mb-16 p-8 rounded-xl"
              style={{
                border: '1px solid rgba(201,168,76,0.12)',
                background: 'rgba(201,168,76,0.04)',
              }}
            >
              <h3 className="text-lg font-bold text-white mb-4">Referências</h3>
              <ul className="space-y-2">
                {article.article_references.map(
                  (ref: { text: string; url: string }, i: number) => (
                    <li key={i}>
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#c9a84c' }}
                        className="hover:underline transition-colors"
                      >
                        {ref.text}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          {/* Divider */}
          <div className="section-divider mb-16" />

          {/* Back link */}
          <Link
            href="/#insights"
            className="inline-flex items-center gap-2 font-semibold mb-12 transition-colors"
            style={{ color: '#c9a84c' }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Voltar para Insights
          </Link>

          {/* Related articles */}
          {relatedArticles && relatedArticles.length > 0 && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-8">Artigos Relacionados</h3>
              <div
                className="grid md:grid-cols-3 gap-px"
                style={{ background: 'rgba(201,168,76,0.08)' }}
              >
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    href={`/insights/${related.slug}`}
                    className="group block"
                  >
                    <div
                      className="p-6 h-full transition-colors duration-300 hover:bg-[#111110]"
                      style={{ background: '#0d0d0d' }}
                    >
                      <p className="text-xs mb-2" style={{ color: '#5a5a50' }}>
                        {related.category}
                      </p>
                      <h4
                        className="text-base font-bold mb-3 line-clamp-2 leading-snug"
                        style={{ color: '#b0b0a8' }}
                      >
                        {related.title}
                      </h4>
                      <span
                        className="group-hover:translate-x-1 transition-transform font-semibold text-sm inline-block"
                        style={{ color: '#c9a84c' }}
                      >
                        →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer productsVisible={false} />
    </>
  )
}
