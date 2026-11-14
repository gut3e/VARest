const db = require("../config/database.js");

async function inserirPlayer(time_id, nome, posicao, numero_camisa, nacionalidade, data_nascimento){
    const sql = 
    `
        INSERT INTO jogadores (time_id, nome, posicao, numero_camisa, nacionalidade, data_nascimento )
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING *
    `;
    const result = await db.query(sql,[time_id, nome, posicao, numero_camisa, nacionalidade, data_nascimento]);
    return result.rows[0];
}

async function buscarNome(nome, data_nascimento){
    const sql = 
    `
     SELECT * FROM jogadores WHERE nome = $1 AND data_nascimento = $2
    `;

    const result = await db.query(sql, [nome,data_nascimento]);

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

module.exports = { inserirPlayer, buscarNome, listarTodos };