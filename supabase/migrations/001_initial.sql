-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL DEFAULT '',
  badge TEXT NOT NULL DEFAULT 'SaaS',
  icon TEXT NOT NULL DEFAULT 'fa-box',
  icon_color TEXT NOT NULL DEFAULT 'text-blue-400',
  gradient_from TEXT NOT NULL DEFAULT 'from-blue-500',
  gradient_to TEXT NOT NULL DEFAULT 'to-indigo-500',
  description TEXT NOT NULL DEFAULT '',
  features TEXT[] NOT NULL DEFAULT '{}',
  cover_image_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Articles table
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL DEFAULT 'Insights',
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  cover_image_url TEXT,
  author TEXT NOT NULL DEFAULT 'Equipe Stemo',
  read_time INT NOT NULL DEFAULT 5,
  article_references JSONB NOT NULL DEFAULT '[]',
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  meta_title TEXT,
  meta_description TEXT,
  og_image_url TEXT,
  schema_type TEXT NOT NULL DEFAULT 'Article',
  keywords TEXT[] NOT NULL DEFAULT '{}',
  canonical_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- FAQs table
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Site config (key-value)
CREATE TABLE site_config (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Contact submissions
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public read policies (only published content)
CREATE POLICY "Public can read published products" ON products FOR SELECT USING (is_published = true);
CREATE POLICY "Public can read published articles" ON articles FOR SELECT USING (is_published = true);
CREATE POLICY "Public can read published faqs" ON faqs FOR SELECT USING (is_published = true);
CREATE POLICY "Public can read site config" ON site_config FOR SELECT USING (true);

-- Contact submissions: anyone can insert
CREATE POLICY "Anyone can submit contact" ON contact_submissions FOR INSERT WITH CHECK (true);

-- Authenticated users (admin) can do everything
CREATE POLICY "Admin full access products" ON products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access articles" ON articles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access faqs" ON faqs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access site_config" ON site_config FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can read contacts" ON contact_submissions FOR SELECT USING (auth.role() = 'authenticated');

-- Indexes
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_published ON articles(is_published, published_at DESC);
CREATE INDEX idx_articles_featured ON articles(is_featured, is_published);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_published ON products(is_published, sort_order);
