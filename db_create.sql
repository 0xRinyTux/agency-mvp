CREATE TABLE leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  company_name TEXT NOT NULL,
  email TEXT,
  status TEXT DEFAULT 'bozza', -- 'bozza', 'inviato', 'pagato'
  website_data JSONB NOT NULL -- Qui ci finisce il JSON di n8n!
);

-- Abilita RLS per sicurezza: permettiamo in lettura a chiunque abbia l'ID (serve per la preview pubblica)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permetti lettura pubblica" ON leads FOR SELECT USING (true);