# Quick Start - Stemo Consultoria

## 5 Passos para Começar

### 1. Instalar Dependências (2 min)
```bash
cd "C:\dados Glauco\stemo\site pelo claude\Stemo"
npm install
```

### 2. Criar Conta Supabase (3 min)
- Vá para https://supabase.com/
- Clique "Start your project"
- Faça login com Google/GitHub
- Crie um novo projeto (qualquer região)
- Aguarde criar (5-10 min)

### 3. Executar Migrations (2 min)
Na dashboard Supabase:
1. Vá para **SQL Editor**
2. Clique **New Query**
3. Abra `supabase/migrations/001_initial.sql`
4. Cole todo o conteúdo
5. Clique **Run** (espere terminar)
6. **Repita** com `supabase/seed.sql`

### 4. Configurar Variáveis (2 min)
1. Abra `Project Settings → API` no Supabase
2. Copie:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`
3. Crie arquivo `.env.local` na raiz:
```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-publica
SUPABASE_SERVICE_ROLE_KEY=sua-chave-privada
CONTACT_EMAIL=contato@stemo.com.br
NEXT_PUBLIC_SITE_URL=https://www.stemo.com.br
RESEND_API_KEY=re_xxxxx  # Opcional
```

### 5. Rodando! (1 min)
```bash
npm run dev
```

Visite:
- 🌐 Site: http://localhost:3000
- 🔐 Admin: http://localhost:3000/admin/login

**Login Admin:**
- Email: seu-email-supabase@dominio.com
- Senha: a que foi criada no Supabase

## Criar Usuário Admin (Supabase)

### Opção 1: Interface Supabase (fácil)
1. Dashboard Supabase → **Authentication**
2. Clique **Create user**
3. Email: `seu-email@dominio.com`
4. Password: defina uma senha forte
5. Clique **Create user**

### Opção 2: SQL (rápido)
Na aba **SQL Editor**:
```sql
INSERT INTO auth.users (
  id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at
) VALUES (
  gen_random_uuid(),
  'seu-email@dominio.com',
  crypt('suaSenhaForte123', gen_salt('bf')),
  now(),
  '{}',
  now(),
  now()
);
```

## Primeiras Ações

1. **Login no admin**: http://localhost:3000/admin/login
2. **Ver dashboard**: http://localhost:3000/admin
3. **Adicionar artigo**: http://localhost:3000/admin/insights
4. **Editar config**: http://localhost:3000/admin/config
5. **Ver home**: http://localhost:3000

## Onde está tudo?

| O quê | Onde |
|-------|------|
| Home pública | http://localhost:3000 |
| Artigos | http://localhost:3000/insights |
| Admin | http://localhost:3000/admin |
| Código | `/app`, `/components` |
| Banco | Supabase Dashboard |
| Estilos | `app/globals.css` + Tailwind |

## Próximas ações

- [ ] Criar artigos via admin
- [ ] Editar configurações (emails, LinkedIn)
- [ ] Testar formulário contato
- [ ] Customizar cores/fonte se necessário
- [ ] Deploy em Vercel

## Troubleshooting

**"Cannot find supabaseUrl"**
→ Crie `.env.local` com as variáveis corretas

**"RLS policy violation"**
→ Verifique se está autenticado no admin

**"Email not sending"**
→ Resend é opcional. Contatos serão salvos no BD mesmo assim.

**Servidor não inicia**
→ `rm -rf node_modules && npm install`

## Documentação Completa

Ver `SETUP.md` para instruções detalhadas.

---

**Tempo total**: ~15 minutos
**Status**: Pronto para produção ✓
