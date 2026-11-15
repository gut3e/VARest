const db = require("../config/database.js");

async function inserirPlayer(time_id, nome, posicao, numero_camisa, nacionalidade, data_nascimento) {
    const sql = `
        INSERT INTO jogadores (time_id, nome, posicao, numero_camisa, nacionalidade, data_nascimento)
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING *
    `;
    const result = await db.query(sql, [time_id, nome, posicao, numero_camisa, nacionalidade, data_nascimento]);
    return result.rows[0];
}

async function buscarNome(nome, data_nascimento) {
    const sql = `
        SELECT * FROM jogadores WHERE nome = $1 AND data_nascimento = $2
    `;
    const result = await db.query(sql, [nome, data_nascimento]);
    return result.rows[0];
}

async function buscarPorId(id) {
    const sql = `
        SELECT * FROM jogadores WHERE id = $1
    `;
    const result = await db.query(sql, [id]);
    return result.rows[0];
}

async function listarTodos() {
    const sql = `
        SELECT j.*, t.nome as time_nome 
        FROM jogadores j
        LEFT JOIN times t ON j.time_id = t.id
        ORDER BY j.id DESC
    `;
    const result = await db.query(sql);
    return result.rows;
}

async function excluirPlayer(id) {
    const sql = `
        DELETE FROM jogadores WHERE id = $1 RETURNING *
    `;
    const result = await db.query(sql, [id]);
    return result.rows[0];
}

async function atualizarPlayer(id, time_id, nome, posicao, numero_camisa, nacionalidade, data_nascimento) {
    const sql = `
        UPDATE jogadores
        SET time_id = $1, nome = $2, posicao = $3, numero_camisa = $4, nacionalidade = $5, data_nascimento = $6
        WHERE id = $7
        RETURNING *
    `;
    const result = await db.query(sql, [time_id, nome, posicao, numero_camisa, nacionalidade, data_nascimento, id]);
    return result.rows[0];
}

async function buscarPorTimeECamisa(time_id, numero_camisa) {
    const sql = `
        SELECT * FROM jogadores WHERE time_id = $1 AND numero_camisa = $2
    `;
    const result = await db.query(sql, [time_id, numero_camisa]);
    return result.rows[0];
}

module.exports = {
    inserirPlayer,
    buscarNome,
    buscarPorId,
    listarTodos,
    excluirPlayer,
    atualizarPlayer,
    buscarPorTimeECamisa
};
