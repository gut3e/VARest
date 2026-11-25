-- =============================================================================
-- QUERIES DE PARTIDAS (Confrontos)
-- =============================================================================

-- Inserir nova partida
INSERT INTO partidas (time_mandante_id, time_visitante_id, gols_mandante, gols_visitante, data_partida, estadio)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;

-- Listar todas as partidas com detalhes de mandante e visitante
SELECT 
    p.*,
    tm.nome AS mandante_nome,
    tm.sigla AS mandante_sigla,
    tv.nome AS visitante_nome,
    tv.sigla AS visitante_sigla
FROM partidas p
JOIN times tm ON p.time_mandante_id = tm.id
JOIN times tv ON p.time_visitante_id = tv.id
ORDER BY p.data_partida DESC;

-- Buscar partida por ID
SELECT * FROM partidas 
WHERE id = $1;

-- Atualizar resultado/dados de uma partida
UPDATE partidas 
SET time_mandante_id = $1, time_visitante_id = $2, gols_mandante = $3, gols_visitante = $4, data_partida = $5, estadio = $6
WHERE id = $7
RETURNING *;

-- Excluir partida
DELETE FROM partidas 
WHERE id = $1 
RETURNING *;
