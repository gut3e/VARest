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

module.exports = { inserirTime, buscarNomeOuSigla, listarTodos };