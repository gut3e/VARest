-- Scripts iniciais de criação do banco de dados e tabelas

CREATE TABLE IF NOT EXISTS times (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sigla VARCHAR(10) NOT NULL,
    estadio VARCHAR(100),
    fundacao INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS jogadores (
    id SERIAL PRIMARY KEY,
    time_id INT REFERENCES times(id) ON DELETE SET NULL,
    nome VARCHAR(100) NOT NULL,
    posicao VARCHAR(50) NOT NULL,
    numero_camisa INT,
    nacionalidade VARCHAR(50),
    data_nascimento DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS partidas (
    id SERIAL PRIMARY KEY,
    time_mandante_id INT REFERENCES times(id),
    time_visitante_id INT REFERENCES times(id),
    gols_mandante INT DEFAULT 0,
    gols_visitante INT DEFAULT 0,
    data_partida TIMESTAMP NOT NULL,
    estadio VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS estatisticas_jogadores (
    id SERIAL PRIMARY KEY,
    jogador_id INT REFERENCES jogadores(id) ON DELETE CASCADE,
    partida_id INT REFERENCES partidas(id) ON DELETE CASCADE,
    gols INT DEFAULT 0,
    assistencias INT DEFAULT 0,
    cartoes_amarelos INT DEFAULT 0,
    cartoes_vermelhos INT DEFAULT 0,
    minutos_jogados INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS titulos (
    id SERIAL PRIMARY KEY,
    time_id INT REFERENCES times(id) ON DELETE CASCADE,
    nome VARCHAR(100) NOT NULL,
    ano INT NOT NULL,
    categoria VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserção de dados iniciais de exemplo
INSERT INTO times (nome, sigla, estadio, fundacao) VALUES
('Flamengo', 'FLA', 'Maracanã', 1895),
('Palmeiras', 'PAL', 'Allianz Parque', 1914),
('São Paulo', 'SAO', 'Morumbi', 1930)
ON CONFLICT DO NOTHING;
