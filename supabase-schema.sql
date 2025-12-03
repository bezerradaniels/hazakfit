-- Schema para o banco de dados Supabase do HazakFit

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
CREATE POLICY "Permitir leitura pública de planos" ON plans
    FOR SELECT USING (true);

CREATE POLICY "Permitir modificação de planos por autenticados" ON plans
    FOR ALL USING (auth.role() = 'authenticated');

-- Políticas para team (todos podem ler, apenas autenticados podem modificar)
CREATE POLICY "Permitir leitura pública da equipe" ON team
    FOR SELECT USING (true);

CREATE POLICY "Permitir modificação da equipe por autenticados" ON team
    FOR ALL USING (auth.role() = 'authenticated');

-- Políticas para admins (apenas autenticados podem acessar)
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
CREATE TRIGGER update_plans_updated_at BEFORE UPDATE ON plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_updated_at BEFORE UPDATE ON team
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON admins
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
