const db = require("../config/database.js");

async function inserirTime(nome, sigla, estadio, fundacao) {
    const sql =
        `
        INSERT INTO times (nome, sigla, estadio, fundacao) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *
        `
    ;

    const result = await db.query(sql, [nome, sigla, estadio, fundacao]);
    return result.rows[0];
}

async function buscarNomeOuSigla(nome, sigla) {
    const sql = `
        SELECT * FROM times WHERE nome = $1 OR sigla = $2
        `
    ;

    const result = await db.query(sql , [nome,sigla]);

    return result.rows[0];
}

async function listarTodos() {
    const sql = `SELECT * FROM times ORDER BY id DESC`;
    const result = await db.query(sql);
    return result.rows;
}

async function excluirTime(id){
    const sql = 
    `
        DELETE FROM times WHERE id = $1 RETURNING *
    `

    const result = await db.query(sql, [id]);
    return result.rows[0];
}

async function temPartidas(id){
    const sql = `
        SELECT 1 FROM partidas 
        WHERE time_mandante_id = $1 OR time_visitante_id = $1 
        LIMIT 1
    `;
    const result = await db.query(sql, [id]);
    return result.rowCount > 0;
}

async function buscarPorId(id){
    const sql = `
            SELECT * FROM times WHERE id = $1
        `;
        const result = await db.query(sql, [id]);
        return result.rows[0];
}

module.exports = { inserirTime, buscarNomeOuSigla, listarTodos, buscarPorId, excluirTime, temPartidas };