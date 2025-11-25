CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

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

-- Insert default admin user (password: admin123) - User should change this!
INSERT INTO users (username, password) VALUES ('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi') ON DUPLICATE KEY UPDATE id=id;

-- Insert default plans
INSERT INTO plans (id, name, price, features, highlight) VALUES 
('monthly', 'Mensal', '119,90', '["Acesso total à academia", "Sem taxa de matrícula", "Acompanhamento profissional", "Horário livre", "Sem fidelidade"]', 0),
('quarterly', 'Trimestral', '99,90', '["Acesso total à academia", "Sem taxa de matrícula", "Acompanhamento profissional", "Horário livre", "Contrato de 3 meses"]', 0),
('yearly', 'Anual', '69,90', '["Acesso total à academia", "Sem taxa de matrícula", "Acompanhamento profissional", "Horário livre", "Melhor custo-benefício"]', 1)
ON DUPLICATE KEY UPDATE id=id;
