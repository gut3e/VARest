-- =============================================================================
-- QUERIES DE AUTENTICAÇÃO E USUÁRIOS
-- =============================================================================

-- Criar novo usuário
INSERT INTO usuarios (nome, email, senha) 
VALUES ($1, $2, $3)
RETURNING id, nome, email, created_at;

-- Buscar usuário por email (login)
SELECT * FROM usuarios 
WHERE email = $1;

-- Buscar usuário por ID
SELECT id, nome, email, created_at FROM usuarios 
WHERE id = $1;
