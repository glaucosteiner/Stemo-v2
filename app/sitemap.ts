import { MetadataRoute } from 'next'
import { createServerClient } from '@/lib/supabase-server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createServerClient()

  const [{ data: articles }, { data: products }] = await Promise.all([
    supabase.from('articles').select('slug, updated_at').eq('is_published', true),
    supabase.from('products').select('slug, updated_at').eq('is_published', true),
  ])

  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.stemo.com.br'

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${base}/insights`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    ...(articles || []).map((a) => ({
      url: `${base}/insights/${a.slug}`,
      lastModified: new Date(a.updated_at),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...(products || []).map((p) => ({
      url: `${base}/produtos/${p.slug}`,
      lastModified: new Date(p.updated_at),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
