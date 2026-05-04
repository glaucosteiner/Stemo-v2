import type { Metadata } from 'next'
import { Inter, Syne } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-inter',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  display: 'swap',
  variable: '--font-syne',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.stemo.com.br'),
  title: {
    template: '%s | Stemo Consultoria',
    default: 'Stemo – Tecnologia como Motor de Decisão e Estratégia de Negócio',
  },
  description: 'Stemo: 24 anos transformando complexidade digital em vantagem competitiva. Consultoria de IA estratégica, co-responsabilidade e evolução digital para empresas brasileiras.',
  keywords: ['consultoria tecnologia', 'IA estratégica', 'inteligência artificial empresas', 'transformação digital', 'consultoria TI Brasil', 'São Paulo'],
  authors: [{ name: 'Stemo Consultoria', url: 'https://www.stemo.com.br' }],
  creator: 'Stemo Consultoria',
  publisher: 'Stemo Consultoria',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large'
    }
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://www.stemo.com.br',
    siteName: 'Stemo Consultoria',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Stemo Consultoria' }],
  },
  twitter: { card: 'summary_large_image' },
  other: {
    'geo.region': 'BR-SP',
    'geo.placename': 'São Paulo, Brasil',
    'geo.position': '-23.5505;-46.6333',
    'ICBM': '-23.5505, -46.6333',
    'language': 'pt-BR',
  },
}

// Schema.org JSON-LD for Organization
const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'LocalBusiness'],
      '@id': 'https://www.stemo.com.br/#organization',
      name: 'Stemo Consultoria',
      alternateName: 'Stemo',
      url: 'https://www.stemo.com.br',
      logo: { '@type': 'ImageObject', url: 'https://www.stemo.com.br/logo.png', width: 200, height: 200 },
      foundingDate: '2000',
      description: 'Consultoria de tecnologia brasileira com 24 anos de mercado, especializada em IA estratégica, transformação digital e co-responsabilidade por resultados.',
      areaServed: { '@type': 'Country', name: 'Brasil' },
      address: { '@type': 'PostalAddress', addressLocality: 'São Paulo', addressRegion: 'SP', addressCountry: 'BR' },
      geo: { '@type': 'GeoCoordinates', latitude: '-23.5505', longitude: '-46.6333' },
      contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', email: 'contato@stemo.com.br', availableLanguage: 'Portuguese' },
      sameAs: ['https://www.linkedin.com/company/stemo'],
      knowsAbout: ['Inteligência Artificial Estratégica', 'Transformação Digital', 'Consultoria de Tecnologia', 'Gestão de Mudança', 'Desenvolvimento de Software', 'Inteligência de Dados'],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.stemo.com.br/#website',
      url: 'https://www.stemo.com.br',
      name: 'Stemo Consultoria',
      publisher: { '@id': 'https://www.stemo.com.br/#organization' },
      inLanguage: 'pt-BR',
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${syne.variable}`} data-scroll-behavior="smooth">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      </head>
      <body className={`${inter.className} bg-[#0d0d0d] text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}
