-- =============================================================================
-- QUERIES DE JOGADORES (Atletas)
-- =============================================================================

-- Inserir novo jogador
INSERT INTO jogadores (time_id, nome, posicao, numero_camisa, nacionalidade, data_nascimento)
VALUES ($1, $2, $3, $4, $5, $6) 
RETURNING *;

-- Listar todos os jogadores com dados do clube vinculado
SELECT j.*, t.nome as time_nome 
FROM jogadores j
LEFT JOIN times t ON j.time_id = t.id
ORDER BY j.id DESC;

-- Buscar jogador por ID
SELECT * FROM jogadores 
WHERE id = $1;

-- Buscar jogador por Nome e Data de Nascimento (validação de cadastro duplicado)
SELECT * FROM jogadores 
WHERE nome = $1 AND data_nascimento = $2;

-- Buscar se número da camisa já está em uso em determinado time
SELECT * FROM jogadores 
WHERE time_id = $1 AND numero_camisa = $2;

-- Atualizar jogador
UPDATE jogadores
SET time_id = $1, nome = $2, posicao = $3, numero_camisa = $4, nacionalidade = $5, data_nascimento = $6
WHERE id = $7
RETURNING *;

-- Excluir jogador
DELETE FROM jogadores 
WHERE id = $1 
RETURNING *;
