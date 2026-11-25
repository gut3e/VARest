-- =============================================================================
-- QUERIES DE TIMES (Clubes)
-- =============================================================================

-- Inserir novo time
INSERT INTO times (nome, sigla, estadio, fundacao) 
VALUES ($1, $2, $3, $4) 
RETURNING *;

-- Listar todos os times
SELECT * FROM times 
ORDER BY id DESC;

-- Buscar time por ID
SELECT * FROM times 
WHERE id = $1;

-- Buscar time por Nome ou Sigla (validação de duplicidade)
SELECT * FROM times 
WHERE nome = $1 OR sigla = $2;

-- Verificar se o time tem partidas cadastradas (mandante ou visitante)
SELECT 1 FROM partidas 
WHERE time_mandante_id = $1 OR time_visitante_id = $1 
LIMIT 1;

-- Atualizar dados do time
UPDATE times 
SET nome = $1, sigla = $2, estadio = $3, fundacao = $4 
WHERE id = $5 
RETURNING *;

-- Excluir time
DELETE FROM times 
WHERE id = $1 
RETURNING *;
