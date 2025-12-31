CREATE TABLE IF NOT EXISTS plans (
    id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price VARCHAR(20) NOT NULL,
    features TEXT, -- JSON array of features
    highlight BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS team (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    photo LONGTEXT -- Base64 or URL
);

CREATE TABLE IF NOT EXISTS gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_url LONGTEXT -- Base64 or URL
);

-- Insert default plans
INSERT INTO plans (id, name, price, features, highlight) VALUES 
('monthly', 'Mensal', '119,90', '["Acesso total à academia", "Sem taxa de matrícula", "Acompanhamento profissional", "Horário livre", "Sem fidelidade"]', 0),
('quarterly', 'Trimestral', '99,90', '["Acesso total à academia", "Sem taxa de matrícula", "Acompanhamento profissional", "Horário livre", "Contrato de 3 meses"]', 0),
('yearly', 'Anual', '69,90', '["Acesso total à academia", "Sem taxa de matrícula", "Acompanhamento profissional", "Horário livre", "Melhor custo-benefício"]', 1)
ON DUPLICATE KEY UPDATE id=id;
