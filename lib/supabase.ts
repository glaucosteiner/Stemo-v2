import { createClient } from '@supabase/supabase-js'
import { createBrowserClient as createSSRBrowserClient } from '@supabase/ssr'

// Type definitions
export type Product = {
  id: string
  name: string
  slug: string
  category: string
  badge: string
  icon: string
  icon_color: string
  gradient_from: string
  gradient_to: string
  description: string
  features: string[]
  cover_image_url: string | null
  is_published: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export type Article = {
  id: string
  title: string
  slug: string
  category: string
  excerpt: string
  content: string
  cover_image_url: string | null
  author: string
  read_time: number
  article_references: { text: string; url: string }[]
  is_featured: boolean
  is_published: boolean
  published_at: string
  meta_title: string | null
  meta_description: string | null
  og_image_url: string | null
  schema_type: 'Article' | 'NewsArticle' | 'BlogPosting'
  keywords: string[]
  canonical_url: string | null
  created_at: string
  updated_at: string
}

export type FAQ = {
  id: string
  question: string
  answer: string
  sort_order: number
  is_published: boolean
}

export type ContactSubmission = {
  id: string
  name: string
  email: string
  company: string | null
  message: string
  created_at: string
}

export type SiteConfig = {
  key: string
  value: unknown
  updated_at: string
}

export type Material = {
  id: string
  token: string
  title: string
  description: string | null
  html_content: string
  is_active: boolean
  created_at: string
}

export type AccessLog = {
  id: string
  material_id: string
  ip: string | null
  user_agent: string | null
  device_type: string | null
  browser: string | null
  os: string | null
  accessed_at: string
}

// Supabase clients
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Browser client — seguro para Client Components
export function createBrowserClient() {
  return createSSRBrowserClient(supabaseUrl, supabaseAnonKey)
}

// Admin client — usa service role key, ignora RLS (só server-side)
export function createAdminClient() {
  return createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}
