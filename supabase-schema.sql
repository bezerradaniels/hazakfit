-- Schema para o banco de dados Supabase do HazakFit

-- Extensão necessária para gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Tabela de planos
CREATE TABLE IF NOT EXISTS plans (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price TEXT NOT NULL,
    features JSONB NOT NULL,
    highlight BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Tabela de membros da equipe
CREATE TABLE IF NOT EXISTS team (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    photo TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Tabela de usuários admin (para login)
CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Inserir dados iniciais dos planos
INSERT INTO plans (id, name, price, features, highlight) VALUES
('monthly', 'Mensal', '119,90', '["Acesso total à academia", "Sem taxa de matrícula", "Acompanhamento profissional", "Horário livre", "Sem fidelidade"]', false),
('quarterly', 'Trimestral', '99,90', '["Acesso total à academia", "Sem taxa de matrícula", "Acompanhamento profissional", "Horário livre", "Contrato de 3 meses"]', false),
('yearly', 'Anual', '69,90', '["Acesso total à academia", "Sem taxa de matrícula", "Acompanhamento profissional", "Horário livre", "Melhor custo-benefício"]', true)
ON CONFLICT (id) DO NOTHING;

-- Criar políticas RLS (Row Level Security)

-- Habilitar RLS nas tabelas
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE team ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Políticas para plans (todos podem ler, apenas autenticados podem modificar)
DROP POLICY IF EXISTS "Permitir leitura pública de planos" ON plans;
CREATE POLICY "Permitir leitura pública de planos" ON plans
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Permitir inserção de planos por autenticados" ON plans;
CREATE POLICY "Permitir inserção de planos por autenticados" ON plans
    FOR INSERT TO authenticated
    WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Permitir atualização de planos por autenticados" ON plans;
CREATE POLICY "Permitir atualização de planos por autenticados" ON plans
    FOR UPDATE TO authenticated
    USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Permitir remoção de planos por autenticados" ON plans;
CREATE POLICY "Permitir remoção de planos por autenticados" ON plans
    FOR DELETE TO authenticated
    USING (auth.role() = 'authenticated');

-- Políticas para team (todos podem ler, apenas autenticados podem modificar)
DROP POLICY IF EXISTS "Permitir leitura pública da equipe" ON team;
CREATE POLICY "Permitir leitura pública da equipe" ON team
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Permitir inserção de equipe por autenticados" ON team;
CREATE POLICY "Permitir inserção de equipe por autenticados" ON team
    FOR INSERT TO authenticated
    WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Permitir atualização de equipe por autenticados" ON team;
CREATE POLICY "Permitir atualização de equipe por autenticados" ON team
    FOR UPDATE TO authenticated
    USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Permitir remoção de equipe por autenticados" ON team;
CREATE POLICY "Permitir remoção de equipe por autenticados" ON team
    FOR DELETE TO authenticated
    USING (auth.role() = 'authenticated');

-- Políticas para admins (apenas autenticados podem acessar)
DROP POLICY IF EXISTS "Permitir acesso a admins apenas por autenticados" ON admins;
CREATE POLICY "Permitir acesso a admins apenas por autenticados" ON admins
    FOR ALL USING (auth.role() = 'authenticated');

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updated_at
DROP TRIGGER IF EXISTS update_plans_updated_at ON plans;
CREATE TRIGGER update_plans_updated_at BEFORE UPDATE ON plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_team_updated_at ON team;
CREATE TRIGGER update_team_updated_at BEFORE UPDATE ON team
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_admins_updated_at ON admins;
CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON admins
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Realtime para tabelas (publicação supabase_realtime) somente se ainda não inclusas
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables
        WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'plans'
    ) THEN
        EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.plans';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables
        WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'team'
    ) THEN
        EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.team';
    END IF;
END $$;
