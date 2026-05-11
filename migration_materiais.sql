-- Run this in Supabase SQL Editor

-- Table: materials
CREATE TABLE IF NOT EXISTS public.materials (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token         text UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(16), 'hex'),
  title         text NOT NULL,
  description   text,
  html_content  text NOT NULL,
  is_active     boolean NOT NULL DEFAULT true,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- Table: access_logs
CREATE TABLE IF NOT EXISTS public.access_logs (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  material_id uuid NOT NULL REFERENCES public.materials(id) ON DELETE CASCADE,
  ip          text,
  user_agent  text,
  device_type text,
  browser     text,
  os          text,
  accessed_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS access_logs_material_id_idx ON public.access_logs(material_id);
CREATE INDEX IF NOT EXISTS materials_token_idx ON public.materials(token);

-- RLS: public can select active materials by token (no auth needed)
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.access_logs ENABLE ROW LEVEL SECURITY;

-- Materials: anyone can read active ones (needed for /acesso/[token])
CREATE POLICY "Public read active materials" ON public.materials
  FOR SELECT USING (is_active = true);

-- Materials: admin full access (service role bypasses RLS)
CREATE POLICY "Admin full access materials" ON public.materials
  FOR ALL USING (auth.role() = 'authenticated');

-- Access logs: insert via server action (service role)
CREATE POLICY "Service insert access_logs" ON public.access_logs
  FOR INSERT WITH CHECK (true);

-- Access logs: admin can read
CREATE POLICY "Admin read access_logs" ON public.access_logs
  FOR SELECT USING (auth.role() = 'authenticated');
