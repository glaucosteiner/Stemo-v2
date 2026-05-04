# Stemo Consultoria - Setup Guia Completo

Este é um projeto Next.js 14 com Supabase para o site da Stemo Consultoria.

## Tecnologias

- **Framework**: Next.js 14.2.5
- **Runtime**: React 18.3.0
- **Banco de Dados**: Supabase (PostgreSQL)
- **Estilo**: Tailwind CSS 3.4.4
- **Email**: Resend 3.2.0
- **Markdown**: react-markdown com remark-gfm
- **Ícones**: Lucide React, SVG inline

## Pré-requisitos

- Node.js 18+ (recomendado 20+)
- npm ou yarn
- Conta no Supabase (gratuita em https://supabase.com)
- Chave API Resend (opcional, para envio de emails)

## Instalação

### 1. Clonar e instalar dependências

```bash
cd Stemo
npm install
```

### 2. Configurar Supabase

#### Criar conta e projeto
1. Vá para https://supabase.com e crie uma conta
2. Crie um novo projeto
3. Copie a **URL do Projeto** e a **Chave Anon (Public)**

#### Executar migrations
1. Na dashboard Supabase, vá para SQL Editor
2. Crie uma nova query
3. Cole todo o conteúdo de `supabase/migrations/001_initial.sql`
4. Execute a query (clique em "Run")
5. Crie outra query com o conteúdo de `supabase/seed.sql` para popular dados iniciais
6. Execute

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key
RESEND_API_KEY=re_sua_chave_resend
CONTACT_EMAIL=glauco.motta@stemo.com.br
NEXT_PUBLIC_SITE_URL=https://www.stemo.com.br
```

#### Encontrar as chaves

**Supabase:**
1. Vá para Project Settings → API
2. Copie `Project URL` (SUPABASE_URL)
3. Copie `anon` public key (SUPABASE_ANON_KEY)
4. Copie `service_role` secret key (SUPABASE_SERVICE_ROLE_KEY)

**Resend (opcional):**
1. Vá para https://resend.com
2. Crie uma conta
3. Vá para API Keys
4. Crie uma nova chave API

### 4. Criar usuário admin

No Supabase SQL Editor, execute:

```sql
-- Criar usuário admin
INSERT INTO auth.users (
  id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at
) VALUES (
  gen_random_uuid(),
  'seu-email@stemo.com.br',
  crypt('sua-senha-segura', gen_salt('bf')),
  now(),
  '{}',
  now(),
  now()
);
```

Ou use a interface Supabase:
1. Vá para Authentication → Users
2. Clique "Create user"
3. Email: `seu-email@stemo.com.br`
4. Password: defina uma senha forte

### 5. Executar em desenvolvimento

```bash
npm run dev
```

O site estará em `http://localhost:3000`

Admin estará em `http://localhost:3000/admin/login`

## Estrutura do Projeto

```
Stemo/
├── app/
│   ├── admin/                    # Painel administrativo
│   │   ├── login/               # Página de login
│   │   ├── page.tsx             # Dashboard
│   │   ├── insights/            # CRUD artigos
│   │   ├── produtos/            # CRUD produtos
│   │   ├── faq/                 # CRUD FAQ
│   │   ├── config/              # Configurações
│   │   ├── contatos/            # Mensagens de contato
│   │   └── layout.tsx           # Layout admin
│   ├── (site)/
│   │   ├── page.tsx             # Home
│   │   ├── insights/
│   │   │   ├── page.tsx         # Listagem artigos
│   │   │   └── [slug]/page.tsx  # Detalhe artigo
│   │   └── produtos/
│   │       └── [slug]/page.tsx  # Detalhe produto
│   ├── api/
│   │   └── contact/route.ts     # API contato
│   ├── globals.css
│   ├── layout.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── Navbar.tsx
│   ├── ScrollEffects.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Sobre.tsx
│   │   ├── Servicos.tsx
│   │   ├── Metodologia.tsx
│   │   ├── Resultados.tsx
│   │   ├── Produtos.tsx
│   │   ├── Insights.tsx
│   │   ├── FAQ.tsx
│   │   ├── Contato.tsx
│   │   └── Footer.tsx
│   └── admin/
│       └── AdminSidebar.tsx
├── lib/
│   ├── supabase.ts
│   └── utils.ts
├── supabase/
│   ├── migrations/
│   │   └── 001_initial.sql
│   └── seed.sql
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── postcss.config.js
```

## Deploy

### Vercel (recomendado)

1. Faça push do código para GitHub
2. Vá para https://vercel.com
3. Conecte seu repositório GitHub
4. Defina as variáveis de ambiente
5. Clique "Deploy"

### Deploy manual (qualquer hospedagem)

```bash
npm run build
npm start
```

## Fluxo de trabalho

### Adicionar novo artigo

1. Vá para `/admin/insights`
2. Clique "+ Novo Artigo"
3. Preencha os campos
4. Marque "Publicado"
5. Clique "Salvar"
6. Artigo aparece em `/insights`

### Adicionar novo produto

1. Vá para `/admin/produtos`
2. Clique "+ Novo Produto"
3. Configure as propriedades
4. Marque "Publicado"
5. Clique "Salvar"
6. Aparece em home se seção estiver visível

### Editar configurações

1. Vá para `/admin/config`
2. Edite emails, links sociais, etc
3. Clique "Salvar Configurações"

## Segurança

- ✓ Row Level Security (RLS) ativado no Supabase
- ✓ Autenticação obrigatória para admin
- ✓ Service role key nunca exposto ao cliente
- ✓ Headers de segurança configurados
- ✓ Validação de entrada em formulários

## Performance

- ✓ Next.js static generation (SSG)
- ✓ Image optimization
- ✓ Code splitting automático
- ✓ Font optimization (Inter via Google Fonts)
- ✓ Lazy loading de componentes

## SEO

- ✓ Meta tags dinâmicas por página
- ✓ Schema.org JSON-LD (Organization, Article, FAQPage)
- ✓ Sitemap dinâmico
- ✓ Robots.txt
- ✓ Open Graph tags
- ✓ Twitter Card tags

## Troubleshooting

### Erro: "Can't find variable: supabaseUrl"
- Verifique se `.env.local` existe
- Verifique se as variáveis estão corretas
- Reinicie o servidor

### Erro: "403 RLS policy violation"
- Verifique se está autenticado
- Verifique as políticas RLS no Supabase
- Para admin, use `service_role_key` em operações server-side

### Emails não enviando
- Verifique se `RESEND_API_KEY` está definida
- Verifique o domínio em Resend
- Contatos serão salvos no banco mesmo sem email

## Support

Para mais informações:
- Documentação Next.js: https://nextjs.org/docs
- Documentação Supabase: https://supabase.com/docs
- Documentação Tailwind: https://tailwindcss.com/docs

---

**Versão**: 1.0.0
**Última atualização**: Abril 2026
